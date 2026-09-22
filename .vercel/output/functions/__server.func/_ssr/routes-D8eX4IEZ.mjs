import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCaveStore } from "./router-QmMH7nY_.mjs";
import { n as BatEmblem3D } from "./bat-emblem-dZ-KQTYS.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
import { t as BootScreen } from "./boot-screen-Bk3Tw5s2.mjs";
import { t as setRainAudio } from "./rain-audio-BYrN2Lc8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D8eX4IEZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RainLayer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-1 overflow-hidden",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rain-sheet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rain-sheet rain-sheet-slow" })]
	});
}
function LightningFlash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-2 bg-bone/40",
		style: { animation: "lightning 7.5s var(--ease-out) infinite" },
		"aria-hidden": true
	});
}
function Gate() {
	const hydrated = useCaveStore((s) => s.hydrated);
	const unlocked = useCaveStore((s) => s.unlocked);
	const hasHash = useCaveStore((s) => Boolean(s.settings.accessHash));
	const rain = useCaveStore((s) => s.settings.rainAudio);
	const unlock = useCaveStore((s) => s.unlock);
	const patchSettings = useCaveStore((s) => s.patchSettings);
	const [locator, setLocator] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (hydrated && rain) setRainAudio(true);
	}, [hydrated, rain]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (unlocked && hasHash) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/command" });
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		if (locator.trim().toLowerCase() !== "84fd6e98") {
			setError("Unknown cave identifier.");
			return;
		}
		setBusy(true);
		try {
			if (!await unlock(code)) setError("Access denied.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "cave-shell vignette scanlines relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightningFlash, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-5 py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scene-3d mb-8 h-28 w-56",
						style: { animation: "bat-float 6s var(--ease-smooth) infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "preserve-3d relative h-full w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem3D, { className: "h-full w-full" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker mb-3",
						children: "Restricted uplink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-center text-4xl tracking-[0.28em] text-fg sm:text-5xl",
						children: "THE BATCAVE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-center text-sm text-muted",
						children: "Single-operator system. Identify the cave, then enter the access code."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "panel mt-10 w-full space-y-4 p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Cave identifier",
								value: locator,
								onChange: setLocator,
								placeholder: "84fd6e98",
								autoComplete: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Access code",
								value: code,
								onChange: setCode,
								type: "password",
								autoComplete: "current-password"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-accent-hot",
								role: "alert",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
									label: busy ? "Authenticating…" : "Enter the cave",
									variant: "inline",
									disabled: busy,
									className: "px-5 py-3",
									type: "submit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
									label: rain ? "Rain on" : "Rain off",
									variant: "compact",
									active: rain,
									onClick: () => {
										const next = !rain;
										patchSettings({ rainAudio: next });
										setRainAudio(next);
									}
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-center text-[0.65rem] tracking-[0.18em] text-faint uppercase",
						children: "One account · Operator: Shameer"
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", autoComplete, placeholder }) {
	const id = label.replace(/\s+/g, "-").toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		htmlFor: id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "label-kicker",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type,
			value,
			autoComplete,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 h-11 w-full bg-inset px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-accent"
		})]
	});
}
//#endregion
export { Gate as component };
