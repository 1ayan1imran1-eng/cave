import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BatEmblem } from "./bat-emblem-dZ-KQTYS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boot-screen-Bk3Tw5s2.js
var import_jsx_runtime = require_jsx_runtime();
function BootScreen({ label = "THE BATCAVE" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cave-shell flex min-h-dvh flex-col items-center justify-center gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-10 w-24 fill-accent animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "type-display text-xl tracking-[0.42em] text-fg",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-kicker",
				children: "Establishing uplink"
			})
		]
	});
}
//#endregion
export { BootScreen as t };
