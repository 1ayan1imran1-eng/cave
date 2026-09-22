import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./router-QmMH7nY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bat-emblem-dZ-KQTYS.js
var import_jsx_runtime = require_jsx_runtime();
var PATH = "M256 32c-16 64-56 96-128 88-16 56-56 100-112 88 40-8 56-48 40-96C24 144 0 160 0 160c48 48 96 128 160 144 32 8 64-16 96 32 32-48 64-24 96-32 64-16 112-96 160-144 0 0-24-16-56-48-16 48 0 88 40 96-56 12-96-32-112-88-72 8-112-24-128-88z";
function BatEmblem({ className, title = "Bat emblem" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 512 304",
		width: "56",
		height: "33",
		className: cn("bat-wing", className),
		"aria-hidden": title ? void 0 : true,
		role: title ? "img" : "presentation",
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: PATH })]
	});
}
function BatEmblem3D({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative preserve-3d", className),
		"aria-hidden": true,
		children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 512 304",
			className: "absolute inset-0 h-full w-full",
			width: "512",
			height: "304",
			style: {
				transform: `translateZ(${i * 2.2}px)`,
				fill: i === 9 ? "#e8e6e1" : i > 6 ? "#b42323" : "#1a0a0a",
				filter: i === 9 ? "drop-shadow(0 0 12px rgb(180 35 35 / 0.55))" : void 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: PATH })
		}, i))
	});
}
//#endregion
export { BatEmblem3D as n, BatEmblem as t };
