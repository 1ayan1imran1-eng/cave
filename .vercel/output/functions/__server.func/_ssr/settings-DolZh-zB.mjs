import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CAVE_SQL, r as useCaveStore } from "./router-QmMH7nY_.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
import { t as setRainAudio } from "./rain-audio-BYrN2Lc8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DolZh-zB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const settings = useCaveStore((s) => s.settings);
	const patchSettings = useCaveStore((s) => s.patchSettings);
	const changeCode = useCaveStore((s) => s.changeCode);
	const exportSnapshot = useCaveStore((s) => s.exportSnapshot);
	const importSnapshot = useCaveStore((s) => s.importSnapshot);
	const wipe = useCaveStore((s) => s.wipe);
	const pullRemote = useCaveStore((s) => s.pullRemote);
	const pushRemote = useCaveStore((s) => s.pushRemote);
	const syncing = useCaveStore((s) => s.syncing);
	const syncError = useCaveStore((s) => s.syncError);
	const fileRef = (0, import_react.useRef)(null);
	const [current, setCurrent] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	async function onCode() {
		const ok = await changeCode(current, next);
		setMsg(ok ? "Access code rotated." : "Current code was wrong.");
		if (ok) {
			setCurrent("");
			setNext("");
		}
	}
	function download() {
		const blob = new Blob([JSON.stringify(exportSnapshot(), null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "batcave.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-2xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-kicker",
				children: "System"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl sm:text-4xl",
				children: "Cave configuration."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Operator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-inset p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] uppercase tracking-[0.18em] text-faint",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg",
								children: "Shameer"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-inset p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] uppercase tracking-[0.18em] text-faint",
								children: "Cave ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-sm text-fg",
								children: "84fd6e98"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "This build has one operator only. There is no account creation or multi-user system."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: settings.rainAudio ? "Rain on" : "Rain off",
						variant: "inline",
						active: settings.rainAudio,
						onClick: () => {
							const rainAudio = !settings.rainAudio;
							patchSettings({ rainAudio });
							setRainAudio(rainAudio);
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Access code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: current,
						placeholder: "Current",
						onChange: (e) => setCurrent(e.target.value),
						className: "h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: next,
						placeholder: "New code",
						onChange: (e) => setNext(e.target.value),
						className: "h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Rotate code",
						variant: "inline",
						onClick: () => void onCode()
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: msg
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Remote storage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Optional remote backup. Paste your Supabase project URL and public anon key, run the SQL once, then press Push. The cave payload is encrypted in your browser with your access code before it leaves the device. Never use a Supabase service-role key here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: settings.supabaseUrl,
						placeholder: "https://xxxx.supabase.co",
						onChange: (e) => patchSettings({ supabaseUrl: e.target.value.trim() }),
						className: "h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: settings.supabaseKey,
						placeholder: "anon public key",
						onChange: (e) => patchSettings({ supabaseKey: e.target.value.trim() }),
						className: "h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-auto bg-inset p-3 text-[0.7rem] leading-relaxed text-muted",
						children: CAVE_SQL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Pull",
							variant: "inline",
							disabled: syncing,
							onClick: async () => setMsg(await pullRemote())
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Push",
							variant: "inline",
							disabled: syncing,
							onClick: async () => setMsg(await pushRemote())
						})]
					}),
					syncError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-accent-hot",
						children: syncError
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Backup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Export JSON",
							variant: "inline",
							onClick: download
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Import JSON",
							variant: "inline",
							onClick: () => fileRef.current?.click()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						className: "hidden",
						onChange: async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							const text = await file.text();
							try {
								const snap = JSON.parse(text);
								importSnapshot(snap);
								setMsg("Imported.");
							} catch {
								setMsg("That file was not a cave backup.");
							}
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Wipe cave",
						variant: "inline",
						onClick: () => {
							if (confirm("Destroy everything in this cave?")) wipe();
						}
					})
				]
			})
		]
	});
}
//#endregion
export { Settings as component };
