import type { CaveSnapshot } from "./types";

const TABLE = "cave_state";
const ROW_ID = "main";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

type Envelope = { v: 1; salt: string; iv: string; data: string };

function headers(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" };
}
function rest(url: string) { return `${url.replace(/\/$/, "")}/rest/v1/${TABLE}`; }
function b64(bytes: Uint8Array) { let out = ""; for (let i = 0; i < bytes.length; i += 0x8000) out += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(out); }
function unb64(value: string) { return Uint8Array.from(atob(value), (c) => c.charCodeAt(0)); }

async function deriveKey(password: string, salt: Uint8Array) {
  const base = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: 210_000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encryptSnapshot(payload: CaveSnapshot, password: string): Promise<Envelope> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(JSON.stringify(payload)));
  return { v: 1, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(encrypted)) };
}

async function decryptSnapshot(envelope: Envelope, password: string): Promise<CaveSnapshot> {
  if (envelope.v !== 1) throw new Error("Unsupported cave backup format.");
  const key = await deriveKey(password, unb64(envelope.salt));
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(envelope.iv) }, key, unb64(envelope.data));
  return JSON.parse(decoder.decode(decrypted)) as CaveSnapshot;
}

export async function pullCave(url: string, key: string, password: string): Promise<CaveSnapshot | null> {
  const res = await fetch(`${rest(url)}?id=eq.${ROW_ID}&select=payload`, { headers: headers(key) });
  if (!res.ok) throw new Error(`Pull failed (${res.status})`);
  const rows = (await res.json()) as { payload: Envelope }[];
  if (!rows[0]?.payload) return null;
  try { return await decryptSnapshot(rows[0].payload, password); }
  catch { throw new Error("Remote cave exists, but it cannot be unlocked with this access code."); }
}

export async function pushCave(url: string, key: string, payload: CaveSnapshot, password: string): Promise<void> {
  const encrypted = await encryptSnapshot(payload, password);
  const res = await fetch(rest(url), {
    method: "POST",
    headers: { ...headers(key), Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: ROW_ID, payload: encrypted, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) { const text = await res.text(); throw new Error(text || `Push failed (${res.status})`); }
}

export const CAVE_SQL = `create table if not exists cave_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table cave_state enable row level security;

drop policy if exists "cave_anon_rw" on cave_state;
create policy "cave_anon_rw" on cave_state
  for all
  using (true)
  with check (true);`;
