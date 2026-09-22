import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./router-QmMH7nY_.mjs";
import { t as BatEmblem } from "./bat-emblem-dZ-KQTYS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bat-button-DkQa6Xxs.js
var import_jsx_runtime = require_jsx_runtime();
function BatButton({ label, active, variant = "wing", hideLabel, className, ...rest }) {
	if (variant === "inline") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": label,
		"data-active": active ? "true" : "false",
		className: cn("inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase transition-[transform,background-color,border-color,color] duration-150 ease-out hover:border-accent hover:text-bone active:scale-[0.96] disabled:opacity-40", active && "border-accent text-accent-hot", className),
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-3 w-7 fill-current" }), hideLabel ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
	if (variant === "compact") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		"data-active": active ? "true" : "false",
		className: cn("bat-btn h-11 w-11 text-muted", className),
		...rest,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-4 w-9 fill-current" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": label,
		"data-active": active ? "true" : "false",
		className: cn("bat-btn min-w-[4.5rem] px-1 py-2", className),
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-[1.35rem] w-[2.9rem] fill-current sm:h-6 sm:w-14" }), hideLabel ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[0.62rem] font-semibold tracking-[0.22em] uppercase",
			children: label
		})]
	});
}
//#endregion
export { BatButton as t };
