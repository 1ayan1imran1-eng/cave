import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { hashesMatch, sha256 } from "./hash";
import { emptyRoadmap, ensureRoadmap } from "./roadmap";
import { seedIntel, seedJournal, seedProjects } from "./seed";
import { pullCave, pushCave } from "./supabase-sync";
import type {
  CaveSettings,
  CaveSnapshot,
  IntelContact,
  JournalEntry,
  Project,
  ProjectData,
  ProjectType,
  YearNote,
} from "./types";
import { nid } from "./utils";

const SESSION_KEY = "batcave-session";
const CAVE_OPERATOR = "Shameer";
const CAVE_PASSWORD_HASH =
  "05d8b02be65b27a8e94d03c2ecc3582c93566c2044064f807da1cbb0c5c4122b";

export function emptyData(type: ProjectType): ProjectData {
  switch (type) {
    case "dossier":
      return {
        kind: "dossier",
        sections: [{ id: nid(), heading: "Overview", body: "" }],
      };
    case "roadmap":
      return emptyRoadmap();
    case "evidence":
      return { kind: "evidence", pins: [], strings: [] };
    case "mission":
      return { kind: "mission", items: [] };
    case "blueprint":
      return { kind: "blueprint", strokes: [] };
  }
}

function migrateProject(project: Project): Project {
  if (project.type === "roadmap" && project.data.kind === "roadmap") {
    return { ...project, data: ensureRoadmap(project.data) };
  }
  if (project.data.kind !== project.type) {
    return { ...project, data: emptyData(project.type) };
  }
  return project;
}

const defaultSettings: CaveSettings = {
  operatorName: CAVE_OPERATOR,
  accessHash: CAVE_PASSWORD_HASH,
  supabaseUrl: "",
  supabaseKey: "",
  rainAudio: false,
};

interface CaveState extends CaveSnapshot {
  hydrated: boolean;
  unlocked: boolean;
  syncError: string;
  syncing: boolean;
  setHydrated: () => void;
  restoreSession: () => void;
  initializeCave: (code: string, name: string) => Promise<void>;
  unlock: (code: string) => Promise<boolean>;
  lock: () => void;
  changeCode: (current: string, next: string) => Promise<boolean>;
  patchSettings: (partial: Partial<CaveSettings>) => void;
  addProject: (input: {
    name: string;
    type: ProjectType;
    tagline: string;
  }) => string;
  updateProject: (id: string, patch: Partial<Project>) => void;
  setProjectData: (id: string, data: ProjectData) => void;
  removeProject: (id: string) => void;
  addJournal: (entry: Omit<JournalEntry, "id" | "at">) => void;
  removeJournal: (id: string) => void;
  addIntel: (c: Omit<IntelContact, "id">) => void;
  updateIntel: (id: string, patch: Partial<IntelContact>) => void;
  removeIntel: (id: string) => void;
  setYearNote: (year: number, body: string) => void;
  setHighScore: (n: number) => void;
  importSnapshot: (snap: CaveSnapshot) => void;
  exportSnapshot: () => CaveSnapshot;
  wipe: () => void;
  pullRemote: () => Promise<string>;
  pushRemote: () => Promise<string>;
}

function snapshotOf(s: CaveState): CaveSnapshot {
  return {
    version: 1,
    settings: s.settings,
    projects: s.projects,
    journal: s.journal,
    intel: s.intel,
    yearNotes: s.yearNotes,
    highScore: s.highScore,
  };
}

let pushTimer: ReturnType<typeof setTimeout> | null = null;
let syncPasscode = "";

function schedulePush() {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    const s = useCaveStore.getState();
    const { supabaseUrl, supabaseKey } = s.settings;
    if (!supabaseUrl || !supabaseKey || !syncPasscode) return;
    void pushCave(supabaseUrl, supabaseKey, snapshotOf(s), syncPasscode).catch(
      (err) => {
        useCaveStore.setState({
          syncError: err instanceof Error ? err.message : "Sync failed",
        });
      },
    );
  }, 1200);
}

function applyFreshSeed(): Partial<CaveState> {
  return {
    projects: seedProjects(),
    journal: seedJournal(),
    intel: seedIntel(),
  };
}

export const useCaveStore = create<CaveState>()(
  persist(
    (set, get) => ({
      version: 1,
      settings: defaultSettings,
      projects: [],
      journal: [],
      intel: [],
      yearNotes: [],
      highScore: 0,
      hydrated: false,
      unlocked: false,
      syncError: "",
      syncing: false,
      setHydrated: () => set({ hydrated: true }),
      restoreSession: () => {
        if (typeof window === "undefined") return;
        if (
          sessionStorage.getItem(SESSION_KEY) === "1" &&
          get().settings.accessHash
        ) {
          set({ unlocked: true });
        }
      },
      initializeCave: async (code, name) => {
        const accessHash = await sha256(code.trim());
        set({
          settings: {
            ...get().settings,
            accessHash,
            operatorName: name.trim() || CAVE_OPERATOR,
          },
          projects: get().projects.length ? get().projects : seedProjects(),
          journal: get().journal.length ? get().journal : seedJournal(),
          intel: get().intel.length ? get().intel : seedIntel(),
          unlocked: true,
        });
        sessionStorage.setItem(SESSION_KEY, "1");
        schedulePush();
      },
      unlock: async (code) => {
        const normalized = code.trim();
        const ok = await hashesMatch(normalized, get().settings.accessHash);
        if (!ok) return false;
        sessionStorage.setItem(SESSION_KEY, "1");
        syncPasscode = normalized;
        const emptyVault =
          !get().projects.length && !get().journal.length && !get().intel.length;
        set({
          unlocked: true,
          settings: { ...get().settings, operatorName: CAVE_OPERATOR },
          projects: (emptyVault ? seedProjects() : get().projects).map(
            migrateProject,
          ),
          journal: emptyVault ? seedJournal() : get().journal,
          intel: emptyVault ? seedIntel() : get().intel,
        });
        const { supabaseUrl, supabaseKey } = get().settings;
        if (supabaseUrl && supabaseKey) {
          try {
            const remote = await pullCave(supabaseUrl, supabaseKey, normalized);
            if (remote) {
              set({
                version: 1,
                settings: {
                  ...get().settings,
                  ...remote.settings,
                  operatorName: CAVE_OPERATOR,
                },
                projects: (remote.projects ?? []).map(migrateProject),
                journal: remote.journal ?? [],
                intel: remote.intel ?? [],
                yearNotes: remote.yearNotes ?? [],
                highScore: remote.highScore ?? 0,
              });
            } else {
              await pushCave(
                supabaseUrl,
                supabaseKey,
                snapshotOf(get()),
                normalized,
              );
            }
          } catch (err) {
            useCaveStore.setState({
              syncError:
                err instanceof Error ? err.message : "Remote sync failed",
            });
          }
        }
        return true;
      },
      lock: () => {
        sessionStorage.removeItem(SESSION_KEY);
        syncPasscode = "";
        set({ unlocked: false });
      },
      changeCode: async (current, next) => {
        const ok = await hashesMatch(current, get().settings.accessHash);
        if (!ok) return false;
        const normalizedNext = next.trim();
        const accessHash = await sha256(normalizedNext);
        syncPasscode = normalizedNext;
        set({ settings: { ...get().settings, accessHash } });
        schedulePush();
        return true;
      },
      patchSettings: (partial) => {
        set({ settings: { ...get().settings, ...partial } });
        schedulePush();
      },
      addProject: ({ name, type, tagline }) => {
        const id = nid();
        const t = Date.now();
        const project: Project = {
          id,
          name: name.trim() || "Untitled",
          type,
          tagline: tagline.trim(),
          createdAt: t,
          updatedAt: t,
          data: emptyData(type),
        };
        set({ projects: [project, ...get().projects] });
        schedulePush();
        return id;
      },
      updateProject: (id, patch) => {
        set({
          projects: get().projects.map((p) =>
            p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p,
          ),
        });
        schedulePush();
      },
      setProjectData: (id, data) => {
        set({
          projects: get().projects.map((p) =>
            p.id === id ? { ...p, data, updatedAt: Date.now() } : p,
          ),
        });
        schedulePush();
      },
      removeProject: (id) => {
        set({ projects: get().projects.filter((p) => p.id !== id) });
        schedulePush();
      },
      addJournal: (entry) => {
        const next: JournalEntry = { ...entry, id: nid(), at: Date.now() };
        set({ journal: [next, ...get().journal] });
        schedulePush();
      },
      removeJournal: (id) => {
        set({ journal: get().journal.filter((e) => e.id !== id) });
        schedulePush();
      },
      addIntel: (c) => {
        set({ intel: [{ ...c, id: nid() }, ...get().intel] });
        schedulePush();
      },
      updateIntel: (id, patch) => {
        set({
          intel: get().intel.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        });
        schedulePush();
      },
      removeIntel: (id) => {
        set({ intel: get().intel.filter((c) => c.id !== id) });
        schedulePush();
      },
      setYearNote: (year, body) => {
        const rest = get().yearNotes.filter((n) => n.year !== year);
        const yearNotes: YearNote[] = body.trim()
          ? [...rest, { year, body }].sort((a, b) => a.year - b.year)
          : rest;
        set({ yearNotes });
        schedulePush();
      },
      setHighScore: (n) => {
        if (n <= get().highScore) return;
        set({ highScore: n });
        schedulePush();
      },
      importSnapshot: (snap) => {
        set({
          version: 1,
          settings: { ...defaultSettings, ...snap.settings },
          projects: (snap.projects ?? []).map(migrateProject),
          journal: snap.journal ?? [],
          intel: snap.intel ?? [],
          yearNotes: snap.yearNotes ?? [],
          highScore: snap.highScore ?? 0,
        });
        schedulePush();
      },
      exportSnapshot: () => snapshotOf(get()),
      wipe: () => {
        sessionStorage.removeItem(SESSION_KEY);
        syncPasscode = "";
        set({
          settings: defaultSettings,
          projects: seedProjects(),
          journal: seedJournal(),
          intel: seedIntel(),
          yearNotes: [],
          highScore: 0,
          unlocked: false,
        });
      },
      pullRemote: async () => {
        const { supabaseUrl, supabaseKey } = get().settings;
        if (!supabaseUrl || !supabaseKey)
          return "Add a project URL and anon key first.";
        set({ syncing: true, syncError: "" });
        try {
          if (!syncPasscode) return "Unlock the cave before pulling remote storage.";
          const remote = await pullCave(supabaseUrl, supabaseKey, syncPasscode);
          if (!remote) {
            await pushCave(
              supabaseUrl,
              supabaseKey,
              snapshotOf(get()),
              syncPasscode,
            );
            set({ syncing: false });
            return "Empty remote — uploaded this cave.";
          }
          get().importSnapshot(remote);
          set({ syncing: false });
          return "Cave pulled from remote storage.";
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Pull failed";
          set({ syncing: false, syncError: msg });
          return msg;
        }
      },
      pushRemote: async () => {
        const { supabaseUrl, supabaseKey } = get().settings;
        if (!supabaseUrl || !supabaseKey)
          return "Add a project URL and anon key first.";
        set({ syncing: true, syncError: "" });
        try {
          if (!syncPasscode) return "Unlock the cave before pushing remote storage.";
          await pushCave(
            supabaseUrl,
            supabaseKey,
            snapshotOf(get()),
            syncPasscode,
          );
          set({ syncing: false });
          return "Cave pushed to remote storage.";
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Push failed";
          set({ syncing: false, syncError: msg });
          return msg;
        }
      },
    }),
    {
      name: "batcave-os-v1",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      skipHydration: true,
      partialize: (s) => ({
        version: s.version,
        settings: s.settings,
        projects: s.projects,
        journal: s.journal,
        intel: s.intel,
        yearNotes: s.yearNotes,
        highScore: s.highScore,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const projects = (state.projects ?? []).map(migrateProject);
          const emptyVault =
            !projects.length &&
            !(state.journal ?? []).length &&
            !(state.intel ?? []).length;
          useCaveStore.setState({
            settings: {
              ...defaultSettings,
              ...state.settings,
              operatorName: CAVE_OPERATOR,
              accessHash: state.settings.accessHash || CAVE_PASSWORD_HASH,
            },
            projects: emptyVault ? seedProjects() : projects,
            journal: emptyVault ? seedJournal() : (state.journal ?? []),
            intel: emptyVault ? seedIntel() : (state.intel ?? []),
          });
        } else {
          useCaveStore.setState(applyFreshSeed());
        }
        useCaveStore.getState().setHydrated();
        useCaveStore.getState().restoreSession();
      },
    },
  ),
);

if (typeof window !== "undefined") {
  setTimeout(() => {
    const s = useCaveStore.getState();
    if (!s.hydrated) s.setHydrated();
  }, 800);
}
