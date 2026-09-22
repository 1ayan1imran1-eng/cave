import { i as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, d as useRouterState, m as Outlet, v as Link, y as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as cn, r as useCaveStore } from "./_ssr/router-QmMH7nY_.mjs";
import { t as BatEmblem } from "./_ssr/bat-emblem-dZ-KQTYS.mjs";
import { t as BatButton } from "./_ssr/bat-button-DkQa6Xxs.mjs";
import { t as BootScreen } from "./_ssr/boot-screen-Bk3Tw5s2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_cave-ZIzHl4pu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIMARY = [
	{
		to: "/command",
		label: "Command"
	},
	{
		to: "/vault",
		label: "Vault"
	},
	{
		to: "/birthday",
		label: "Protocol"
	},
	{
		to: "/watch",
		label: "Watch"
	}
];
var MORE = [
	{
		to: "/intel",
		label: "Intel"
	},
	{
		to: "/training",
		label: "Strike"
	},
	{
		to: "/settings",
		label: "System"
	}
];
function NavBat({ to, label, on, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"aria-label": label,
		"data-active": on ? "true" : "false",
		className: cn("bat-btn min-w-[4.5rem] px-1 py-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-[1.35rem] w-[2.9rem] fill-current sm:h-6 sm:w-14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[0.62rem] font-semibold tracking-[0.22em] uppercase",
			children: label
		})]
	});
}
function CaveNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const name = useCaveStore((s) => s.settings.operatorName);
	const lock = useCaveStore((s) => s.lock);
	const [more, setMore] = (0, import_react.useState)(false);
	function active(to) {
		return pathname === to || pathname.startsWith(`${to}/`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden lg:flex w-[6.5rem] shrink-0 flex-col items-center border-r border-line bg-surface/80 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/command",
					className: "mb-8 text-accent-hot",
					"aria-label": "Command",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-7 w-16 fill-current" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-1 flex-col items-center gap-1",
					children: [PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBat, {
						to: item.to,
						label: item.label,
						on: active(item.to)
					}, item.to)), MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBat, {
						to: item.to,
						label: item.label,
						on: active(item.to)
					}, item.to))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[5.5rem] truncate text-center text-[0.6rem] tracking-[0.18em] text-muted uppercase",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Lock",
						variant: "compact",
						onClick: lock
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex lg:hidden items-center justify-between border-b border-line bg-surface/90 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/command",
				className: "flex items-center gap-2 text-accent-hot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-5 w-12 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "type-display text-sm tracking-[0.2em] text-fg",
					children: "THE CAVE"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
				label: "Lock",
				variant: "compact",
				onClick: lock
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-end justify-around border-t border-line bg-surface/95 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1",
			children: [PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBat, {
				to: item.to,
				label: item.label,
				on: active(item.to),
				className: "flex-1"
			}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
					label: "More",
					active: more || MORE.some((m) => active(m.to)),
					className: "w-full",
					onClick: () => setMore((v) => !v)
				}), more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-[4.6rem] right-1 w-40 panel p-2",
					children: MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setMore(false),
						className: cn("flex items-center gap-2 px-2 py-2 text-xs tracking-[0.18em] uppercase", active(item.to) ? "text-accent-hot" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-3 w-7 fill-current" }), item.label]
					}, item.to))
				}) : null]
			})]
		})
	] });
}
function CaveShell() {
	const hydrated = useCaveStore((s) => s.hydrated);
	const unlocked = useCaveStore((s) => s.unlocked);
	const hasHash = useCaveStore((s) => Boolean(s.settings.accessHash));
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!hasHash || !unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cave-shell flex min-h-dvh lg:flex-row flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaveNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1 pb-24 lg:pb-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
//#endregion
export { CaveShell as component };
