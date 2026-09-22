import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-QmMH7nY_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
async function sha256(text) {
	const data = new TextEncoder().encode(text);
	const buf = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hashesMatch(plain, hash) {
	return await sha256(plain.trim()) === hash;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function formatStamp(ms) {
	return new Date(ms).toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
var BOARD_W = 1600;
var START_POS = {
	x: 48,
	y: 341
};
var END_POS = {
	x: 1376,
	y: 341
};
function emptyRoadmap() {
	const startId = nid();
	const endId = nid();
	return {
		kind: "roadmap",
		nodes: [{
			id: startId,
			x: START_POS.x,
			y: START_POS.y,
			title: "START",
			detail: "Where the mission begins.",
			status: "done",
			role: "start"
		}, {
			id: endId,
			x: END_POS.x,
			y: END_POS.y,
			title: "END",
			detail: "Where the mission ends.",
			status: "pending",
			role: "end"
		}],
		edges: [{
			id: nid(),
			from: startId,
			to: endId
		}]
	};
}
function ensureRoadmap(data) {
	const nodes = data.nodes.map((n) => ({
		...n,
		role: n.role ?? "step"
	}));
	let start = nodes.find((n) => n.role === "start");
	let end = nodes.find((n) => n.role === "end");
	const edges = [...data.edges];
	if (!start) {
		start = {
			id: nid(),
			x: START_POS.x,
			y: START_POS.y,
			title: "START",
			detail: "Where the mission begins.",
			status: "done",
			role: "start"
		};
		nodes.unshift(start);
	}
	if (!end) {
		end = {
			id: nid(),
			x: END_POS.x,
			y: END_POS.y,
			title: "END",
			detail: "Where the mission ends.",
			status: "pending",
			role: "end"
		};
		nodes.push(end);
	}
	const startId = start.id;
	const endId = end.id;
	if (!pathExists(nodes, edges, startId, endId)) {
		const steps = nodes.filter((n) => n.role === "step");
		if (!steps.length) edges.push({
			id: nid(),
			from: startId,
			to: endId
		});
		else {
			const ordered = [...steps].sort((a, b) => a.x - b.x);
			edges.push({
				id: nid(),
				from: startId,
				to: ordered[0].id
			});
			for (let i = 0; i < ordered.length - 1; i++) edges.push({
				id: nid(),
				from: ordered[i].id,
				to: ordered[i + 1].id
			});
			edges.push({
				id: nid(),
				from: ordered[ordered.length - 1].id,
				to: endId
			});
		}
	}
	return {
		kind: "roadmap",
		nodes,
		edges: dedupeEdges(edges)
	};
}
function insertStep(data) {
	const ensured = ensureRoadmap(data);
	const start = ensured.nodes.find((n) => n.role === "start");
	const end = ensured.nodes.find((n) => n.role === "end");
	const steps = ensured.nodes.filter((n) => n.role === "step");
	const col = steps.length;
	const lane = steps.length % 3;
	const node = {
		id: nid(),
		x: Math.min(END_POS.x - 220, 280 + col * 210),
		y: 110 + lane * 190,
		title: `Step ${steps.length + 1}`,
		detail: "",
		status: "pending",
		role: "step"
	};
	const intoEnd = ensured.edges.find((e) => e.to === end.id);
	let edges = ensured.edges;
	if (intoEnd) {
		edges = edges.filter((e) => e.id !== intoEnd.id);
		edges.push({
			id: nid(),
			from: intoEnd.from,
			to: node.id
		});
		edges.push({
			id: nid(),
			from: node.id,
			to: end.id
		});
	} else edges = [
		...edges,
		{
			id: nid(),
			from: start.id,
			to: node.id
		},
		{
			id: nid(),
			from: node.id,
			to: end.id
		}
	];
	return {
		kind: "roadmap",
		nodes: [...ensured.nodes, node],
		edges: dedupeEdges(edges)
	};
}
function nodeCenter(n) {
	return {
		x: n.x + 88,
		y: n.y + 39
	};
}
function neighbors(edges, id) {
	const out = [];
	for (const e of edges) {
		if (e.from === id) out.push(e.to);
		if (e.to === id) out.push(e.from);
	}
	return out;
}
function pathExists(_nodes, edges, from, to) {
	const seen = /* @__PURE__ */ new Set([from]);
	const q = [from];
	while (q.length) {
		const cur = q.shift();
		if (cur === to) return true;
		for (const n of neighbors(edges, cur)) if (!seen.has(n)) {
			seen.add(n);
			q.push(n);
		}
	}
	return false;
}
function dedupeEdges(edges) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const e of edges) {
		if (e.from === e.to) continue;
		const key = [e.from, e.to].sort().join("::");
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(e);
	}
	return out;
}
var now = Date.now();
function seedProjects() {
	const start = nid();
	const a = nid();
	const b = nid();
	const c = nid();
	const d = nid();
	const e = nid();
	const end = nid();
	const p1 = {
		id: nid(),
		name: "The 18th Protocol",
		type: "roadmap",
		tagline: "Turning eighteen. Build the man, not just the myth.",
		createdAt: now - 10368e5,
		updatedAt: now - 36e5,
		data: {
			kind: "roadmap",
			nodes: [
				{
					id: start,
					x: 48,
					y: 341,
					title: "START",
					detail: "Where the mission begins.",
					status: "done",
					role: "start"
				},
				{
					id: a,
					x: 280,
					y: 160,
					title: "Hold the line",
					detail: "Finish the year clean. Sleep. Train. Keep the cave in order.",
					status: "done",
					role: "step"
				},
				{
					id: b,
					x: 520,
					y: 90,
					title: "Skill stack",
					detail: "Code, design, and one physical craft. No half-skills.",
					status: "active",
					role: "step"
				},
				{
					id: c,
					x: 520,
					y: 280,
					title: "Body of work",
					detail: "Ship three things you can point at. This cave is one of them.",
					status: "active",
					role: "step"
				},
				{
					id: d,
					x: 780,
					y: 180,
					title: "Independence",
					detail: "Money, papers, a plan that does not ask permission.",
					status: "pending",
					role: "step"
				},
				{
					id: e,
					x: 1040,
					y: 180,
					title: "The night shift",
					detail: "Eighteen. The city does not get easier. You do.",
					status: "pending",
					role: "step"
				},
				{
					id: end,
					x: 1376,
					y: 341,
					title: "END",
					detail: "Where the mission ends.",
					status: "pending",
					role: "end"
				}
			],
			edges: [
				{
					id: nid(),
					from: start,
					to: a
				},
				{
					id: nid(),
					from: a,
					to: b
				},
				{
					id: nid(),
					from: a,
					to: c
				},
				{
					id: nid(),
					from: b,
					to: d
				},
				{
					id: nid(),
					from: c,
					to: d
				},
				{
					id: nid(),
					from: d,
					to: e
				},
				{
					id: nid(),
					from: e,
					to: end
				}
			]
		}
	};
	const p2 = {
		id: nid(),
		name: "Cave Operating System",
		type: "dossier",
		tagline: "How this place works when the lights are off.",
		createdAt: now - 5184e5,
		updatedAt: now - 72e5,
		data: {
			kind: "dossier",
			sections: [
				{
					id: nid(),
					heading: "Purpose",
					body: "This is not a mood board. It is a working cave — projects, missions, evidence, and a clock that does not lie about how much time is left."
				},
				{
					id: nid(),
					heading: "Vault types",
					body: "Dossier for writing. Roadmap for sequenced work (start, steps, end, connected by string). Evidence for messy thinking with red string. Mission for kanban. Blueprint for sketches."
				},
				{
					id: nid(),
					heading: "Rules",
					body: "One thing in motion. Name it. Date it. Do not leave ghosts in the vault."
				}
			]
		}
	};
	const n1 = nid();
	const n2 = nid();
	const n3 = nid();
	return [
		p1,
		p2,
		{
			id: nid(),
			name: "Open Cases",
			type: "evidence",
			tagline: "Threads that do not get to stay loose.",
			createdAt: now - 3456e5,
			updatedAt: now - 54e5,
			data: {
				kind: "evidence",
				pins: [
					{
						id: n1,
						x: 48,
						y: 56,
						title: "Time",
						body: "Dec 2 is not abstract. Count it.",
						tone: "red"
					},
					{
						id: n2,
						x: 280,
						y: 40,
						title: "Craft",
						body: "The vault only matters if it fills with real work.",
						tone: "bone"
					},
					{
						id: n3,
						x: 160,
						y: 200,
						title: "Signal",
						body: "Who you become in private is who shows up in public.",
						tone: "steel"
					}
				],
				strings: [{
					id: nid(),
					from: n1,
					to: n2
				}, {
					id: nid(),
					from: n2,
					to: n3
				}]
			}
		},
		{
			id: nid(),
			name: "Night Operations",
			type: "mission",
			tagline: "What is on the board tonight.",
			createdAt: now - 1728e5,
			updatedAt: now - 18e5,
			data: {
				kind: "mission",
				items: [
					{
						id: nid(),
						title: "Stand up the cave",
						notes: "Access code, vault, first dossier.",
						column: "done"
					},
					{
						id: nid(),
						title: "Map the 18th protocol",
						notes: "Connect the remaining steps.",
						column: "active"
					},
					{
						id: nid(),
						title: "Train in Shadow Strike",
						notes: "Beat the current high score.",
						column: "planned"
					}
				]
			}
		},
		{
			id: nid(),
			name: "Batmobile schematic",
			type: "blueprint",
			tagline: "Scratch the plan on the grid. Nothing is finished until it is drawn.",
			createdAt: now - 864e5,
			updatedAt: now - 9e5,
			data: {
				kind: "blueprint",
				strokes: []
			}
		}
	];
}
function seedJournal() {
	return [{
		id: nid(),
		at: now - 864e5,
		title: "Cave online",
		body: "Lights up. Rain on the stone. The vault is empty until I put work in it.",
		threat: "low"
	}];
}
function seedIntel() {
	return [{
		id: nid(),
		name: "Alfred",
		role: "Steward",
		notes: "The voice that tells the truth when the cave gets theatrical.",
		status: "ally"
	}, {
		id: nid(),
		name: "Lucius",
		role: "Engine",
		notes: "If it can be built, he already drafted it.",
		status: "ally"
	}];
}
var TABLE = "cave_state";
var ROW_ID = "main";
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function headers(key) {
	return {
		apikey: key,
		Authorization: `Bearer ${key}`,
		"Content-Type": "application/json",
		Prefer: "return=representation"
	};
}
function rest(url) {
	return `${url.replace(/\/$/, "")}/rest/v1/${TABLE}`;
}
function b64(bytes) {
	let out = "";
	for (let i = 0; i < bytes.length; i += 32768) out += String.fromCharCode(...bytes.subarray(i, i + 32768));
	return btoa(out);
}
function unb64(value) {
	return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}
async function deriveKey(password, salt) {
	const base = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
	return crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations: 21e4,
		hash: "SHA-256"
	}, base, {
		name: "AES-GCM",
		length: 256
	}, false, ["encrypt", "decrypt"]);
}
async function encryptSnapshot(payload, password) {
	const salt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const iv = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
	const key = await deriveKey(password, salt);
	const encrypted = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, encoder.encode(JSON.stringify(payload)));
	return {
		v: 1,
		salt: b64(salt),
		iv: b64(iv),
		data: b64(new Uint8Array(encrypted))
	};
}
async function decryptSnapshot(envelope, password) {
	if (envelope.v !== 1) throw new Error("Unsupported cave backup format.");
	const key = await deriveKey(password, unb64(envelope.salt));
	const decrypted = await crypto.subtle.decrypt({
		name: "AES-GCM",
		iv: unb64(envelope.iv)
	}, key, unb64(envelope.data));
	return JSON.parse(decoder.decode(decrypted));
}
async function pullCave(url, key, password) {
	const res = await fetch(`${rest(url)}?id=eq.${ROW_ID}&select=payload`, { headers: headers(key) });
	if (!res.ok) throw new Error(`Pull failed (${res.status})`);
	const rows = await res.json();
	if (!rows[0]?.payload) return null;
	try {
		return await decryptSnapshot(rows[0].payload, password);
	} catch {
		throw new Error("Remote cave exists, but it cannot be unlocked with this access code.");
	}
}
async function pushCave(url, key, payload, password) {
	const encrypted = await encryptSnapshot(payload, password);
	const res = await fetch(rest(url), {
		method: "POST",
		headers: {
			...headers(key),
			Prefer: "resolution=merge-duplicates,return=minimal"
		},
		body: JSON.stringify({
			id: ROW_ID,
			payload: encrypted,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		})
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `Push failed (${res.status})`);
	}
}
var CAVE_SQL = `create table if not exists cave_state (
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
var SESSION_KEY = "batcave-session";
var CAVE_OPERATOR = "Shameer";
var CAVE_PASSWORD_HASH = "05d8b02be65b27a8e94d03c2ecc3582c93566c2044064f807da1cbb0c5c4122b";
function emptyData(type) {
	switch (type) {
		case "dossier": return {
			kind: "dossier",
			sections: [{
				id: nid(),
				heading: "Overview",
				body: ""
			}]
		};
		case "roadmap": return emptyRoadmap();
		case "evidence": return {
			kind: "evidence",
			pins: [],
			strings: []
		};
		case "mission": return {
			kind: "mission",
			items: []
		};
		case "blueprint": return {
			kind: "blueprint",
			strokes: []
		};
	}
}
function migrateProject(project) {
	if (project.type === "roadmap" && project.data.kind === "roadmap") return {
		...project,
		data: ensureRoadmap(project.data)
	};
	if (project.data.kind !== project.type) return {
		...project,
		data: emptyData(project.type)
	};
	return project;
}
var defaultSettings = {
	operatorName: CAVE_OPERATOR,
	accessHash: CAVE_PASSWORD_HASH,
	supabaseUrl: "",
	supabaseKey: "",
	rainAudio: false
};
function snapshotOf(s) {
	return {
		version: 1,
		settings: s.settings,
		projects: s.projects,
		journal: s.journal,
		intel: s.intel,
		yearNotes: s.yearNotes,
		highScore: s.highScore
	};
}
var pushTimer = null;
var syncPasscode = "";
function schedulePush() {
	if (pushTimer) clearTimeout(pushTimer);
	pushTimer = setTimeout(() => {
		const s = useCaveStore.getState();
		const { supabaseUrl, supabaseKey } = s.settings;
		if (!supabaseUrl || !supabaseKey || !syncPasscode) return;
		pushCave(supabaseUrl, supabaseKey, snapshotOf(s), syncPasscode).catch((err) => {
			useCaveStore.setState({ syncError: err instanceof Error ? err.message : "Sync failed" });
		});
	}, 1200);
}
function applyFreshSeed() {
	return {
		projects: seedProjects(),
		journal: seedJournal(),
		intel: seedIntel()
	};
}
var useCaveStore = create()(persist((set, get) => ({
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
		if (sessionStorage.getItem(SESSION_KEY) === "1" && get().settings.accessHash) set({ unlocked: true });
	},
	initializeCave: async (code, name) => {
		const accessHash = await sha256(code.trim());
		set({
			settings: {
				...get().settings,
				accessHash,
				operatorName: name.trim() || CAVE_OPERATOR
			},
			projects: get().projects.length ? get().projects : seedProjects(),
			journal: get().journal.length ? get().journal : seedJournal(),
			intel: get().intel.length ? get().intel : seedIntel(),
			unlocked: true
		});
		sessionStorage.setItem(SESSION_KEY, "1");
		schedulePush();
	},
	unlock: async (code) => {
		const normalized = code.trim();
		if (!await hashesMatch(normalized, get().settings.accessHash)) return false;
		sessionStorage.setItem(SESSION_KEY, "1");
		syncPasscode = normalized;
		const emptyVault = !get().projects.length && !get().journal.length && !get().intel.length;
		set({
			unlocked: true,
			settings: {
				...get().settings,
				operatorName: CAVE_OPERATOR
			},
			projects: (emptyVault ? seedProjects() : get().projects).map(migrateProject),
			journal: emptyVault ? seedJournal() : get().journal,
			intel: emptyVault ? seedIntel() : get().intel
		});
		const { supabaseUrl, supabaseKey } = get().settings;
		if (supabaseUrl && supabaseKey) try {
			const remote = await pullCave(supabaseUrl, supabaseKey, normalized);
			if (remote) set({
				version: 1,
				settings: {
					...get().settings,
					...remote.settings,
					operatorName: CAVE_OPERATOR
				},
				projects: (remote.projects ?? []).map(migrateProject),
				journal: remote.journal ?? [],
				intel: remote.intel ?? [],
				yearNotes: remote.yearNotes ?? [],
				highScore: remote.highScore ?? 0
			});
			else await pushCave(supabaseUrl, supabaseKey, snapshotOf(get()), normalized);
		} catch (err) {
			useCaveStore.setState({ syncError: err instanceof Error ? err.message : "Remote sync failed" });
		}
		return true;
	},
	lock: () => {
		sessionStorage.removeItem(SESSION_KEY);
		syncPasscode = "";
		set({ unlocked: false });
	},
	changeCode: async (current, next) => {
		if (!await hashesMatch(current, get().settings.accessHash)) return false;
		const normalizedNext = next.trim();
		const accessHash = await sha256(normalizedNext);
		syncPasscode = normalizedNext;
		set({ settings: {
			...get().settings,
			accessHash
		} });
		schedulePush();
		return true;
	},
	patchSettings: (partial) => {
		set({ settings: {
			...get().settings,
			...partial
		} });
		schedulePush();
	},
	addProject: ({ name, type, tagline }) => {
		const id = nid();
		const t = Date.now();
		set({ projects: [{
			id,
			name: name.trim() || "Untitled",
			type,
			tagline: tagline.trim(),
			createdAt: t,
			updatedAt: t,
			data: emptyData(type)
		}, ...get().projects] });
		schedulePush();
		return id;
	},
	updateProject: (id, patch) => {
		set({ projects: get().projects.map((p) => p.id === id ? {
			...p,
			...patch,
			updatedAt: Date.now()
		} : p) });
		schedulePush();
	},
	setProjectData: (id, data) => {
		set({ projects: get().projects.map((p) => p.id === id ? {
			...p,
			data,
			updatedAt: Date.now()
		} : p) });
		schedulePush();
	},
	removeProject: (id) => {
		set({ projects: get().projects.filter((p) => p.id !== id) });
		schedulePush();
	},
	addJournal: (entry) => {
		set({ journal: [{
			...entry,
			id: nid(),
			at: Date.now()
		}, ...get().journal] });
		schedulePush();
	},
	removeJournal: (id) => {
		set({ journal: get().journal.filter((e) => e.id !== id) });
		schedulePush();
	},
	addIntel: (c) => {
		set({ intel: [{
			...c,
			id: nid()
		}, ...get().intel] });
		schedulePush();
	},
	updateIntel: (id, patch) => {
		set({ intel: get().intel.map((c) => c.id === id ? {
			...c,
			...patch
		} : c) });
		schedulePush();
	},
	removeIntel: (id) => {
		set({ intel: get().intel.filter((c) => c.id !== id) });
		schedulePush();
	},
	setYearNote: (year, body) => {
		const rest = get().yearNotes.filter((n) => n.year !== year);
		set({ yearNotes: body.trim() ? [...rest, {
			year,
			body
		}].sort((a, b) => a.year - b.year) : rest });
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
			settings: {
				...defaultSettings,
				...snap.settings
			},
			projects: (snap.projects ?? []).map(migrateProject),
			journal: snap.journal ?? [],
			intel: snap.intel ?? [],
			yearNotes: snap.yearNotes ?? [],
			highScore: snap.highScore ?? 0
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
			unlocked: false
		});
	},
	pullRemote: async () => {
		const { supabaseUrl, supabaseKey } = get().settings;
		if (!supabaseUrl || !supabaseKey) return "Add a project URL and anon key first.";
		set({
			syncing: true,
			syncError: ""
		});
		try {
			if (!syncPasscode) return "Unlock the cave before pulling remote storage.";
			const remote = await pullCave(supabaseUrl, supabaseKey, syncPasscode);
			if (!remote) {
				await pushCave(supabaseUrl, supabaseKey, snapshotOf(get()), syncPasscode);
				set({ syncing: false });
				return "Empty remote — uploaded this cave.";
			}
			get().importSnapshot(remote);
			set({ syncing: false });
			return "Cave pulled from remote storage.";
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Pull failed";
			set({
				syncing: false,
				syncError: msg
			});
			return msg;
		}
	},
	pushRemote: async () => {
		const { supabaseUrl, supabaseKey } = get().settings;
		if (!supabaseUrl || !supabaseKey) return "Add a project URL and anon key first.";
		set({
			syncing: true,
			syncError: ""
		});
		try {
			if (!syncPasscode) return "Unlock the cave before pushing remote storage.";
			await pushCave(supabaseUrl, supabaseKey, snapshotOf(get()), syncPasscode);
			set({ syncing: false });
			return "Cave pushed to remote storage.";
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Push failed";
			set({
				syncing: false,
				syncError: msg
			});
			return msg;
		}
	}
}), {
	name: "batcave-os-v1",
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
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
		highScore: s.highScore
	}),
	onRehydrateStorage: () => (state) => {
		if (state) {
			const projects = (state.projects ?? []).map(migrateProject);
			const emptyVault = !projects.length && !(state.journal ?? []).length && !(state.intel ?? []).length;
			useCaveStore.setState({
				settings: {
					...defaultSettings,
					...state.settings,
					operatorName: CAVE_OPERATOR,
					accessHash: state.settings.accessHash || CAVE_PASSWORD_HASH
				},
				projects: emptyVault ? seedProjects() : projects,
				journal: emptyVault ? seedJournal() : state.journal ?? [],
				intel: emptyVault ? seedIntel() : state.intel ?? []
			});
		} else useCaveStore.setState(applyFreshSeed());
		useCaveStore.getState().setHydrated();
		useCaveStore.getState().restoreSession();
	}
}));
if (typeof window !== "undefined") setTimeout(() => {
	const s = useCaveStore.getState();
	if (!s.hydrated) s.setHydrated();
}, 800);
function CaveHydrate({ children }) {
	(0, import_react.useEffect)(() => {
		let live = true;
		const done = () => {
			if (!live) return;
			const s = useCaveStore.getState();
			if (!s.hydrated) s.setHydrated();
			s.restoreSession();
		};
		const result = useCaveStore.persist.rehydrate();
		if (result && typeof result.then === "function") result.then(done, done);
		else done();
		return () => {
			live = false;
		};
	}, []);
	return children;
}
var styles_default = "/assets/styles-CH5ZRfR0.css";
var APP_NAME = "THE BATCAVE";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#070708"
			},
			{
				name: "description",
				content: "A private Batcave — vault, protocols, and the night shift."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaveHydrate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-D8eX4IEZ.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_cave-ZIzHl4pu.mjs");
var Route$9 = createFileRoute("/_cave")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./birthday--Ya_HMlN.mjs");
var Route$8 = createFileRoute("/_cave/birthday")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./command-DRgrVro3.mjs");
var Route$7 = createFileRoute("/_cave/command")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./intel-SOvisbSF.mjs");
var Route$6 = createFileRoute("/_cave/intel")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./settings-DolZh-zB.mjs");
var Route$5 = createFileRoute("/_cave/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./training-BFY1pBtm.mjs");
var Route$4 = createFileRoute("/_cave/training")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./vault-ZkOP7GAj.mjs");
var Route$3 = createFileRoute("/_cave/vault")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./watch-Cuphfqzd.mjs");
var Route$2 = createFileRoute("/_cave/watch")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./vault-Cc27TpE2.mjs");
var Route$1 = createFileRoute("/_cave/vault/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_id-_T8fKlc5.mjs");
var Route = createFileRoute("/_cave/vault/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var CaveRoute = Route$9.update({
	id: "/_cave",
	getParentRoute: () => Route$11
});
var CaveBirthdayRoute = Route$8.update({
	id: "/birthday",
	path: "/birthday",
	getParentRoute: () => CaveRoute
});
var CaveCommandRoute = Route$7.update({
	id: "/command",
	path: "/command",
	getParentRoute: () => CaveRoute
});
var CaveIntelRoute = Route$6.update({
	id: "/intel",
	path: "/intel",
	getParentRoute: () => CaveRoute
});
var CaveSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => CaveRoute
});
var CaveTrainingRoute = Route$4.update({
	id: "/training",
	path: "/training",
	getParentRoute: () => CaveRoute
});
var CaveVaultRoute = Route$3.update({
	id: "/vault",
	path: "/vault",
	getParentRoute: () => CaveRoute
});
var CaveWatchRoute = Route$2.update({
	id: "/watch",
	path: "/watch",
	getParentRoute: () => CaveRoute
});
var CaveVaultIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => CaveVaultRoute
});
var CaveVaultRouteChildren = {
	CaveVaultIdRoute: Route.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => CaveVaultRoute
	}),
	CaveVaultIndexRoute
};
var CaveRouteChildren = {
	CaveBirthdayRoute,
	CaveCommandRoute,
	CaveIntelRoute,
	CaveSettingsRoute,
	CaveTrainingRoute,
	CaveVaultRoute: CaveVaultRoute._addFileChildren(CaveVaultRouteChildren),
	CaveWatchRoute
};
var rootRouteChildren = {
	IndexRoute,
	CaveRoute: CaveRoute._addFileChildren(CaveRouteChildren)
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { BOARD_W as a, nodeCenter as c, nid as d, CAVE_SQL as i, cn as l, Route as n, ensureRoadmap as o, useCaveStore as r, insertStep as s, router_exports as t, formatStamp as u };
