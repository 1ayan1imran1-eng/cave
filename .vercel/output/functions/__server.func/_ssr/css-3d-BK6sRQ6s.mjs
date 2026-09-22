import "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BatEmblem3D, t as BatEmblem } from "./bat-emblem-dZ-KQTYS.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function OrbitingBats({ count = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scene-3d relative mx-auto h-56 w-56 sm:h-72 sm:w-72",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "preserve-3d absolute inset-0",
			style: { animation: "spin-y 22s linear infinite" },
			children: Array.from({ length: count }, (_, i) => {
				const angle = 360 / count * i;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "preserve-3d absolute left-1/2 top-1/2 h-10 w-16 -ml-8 -mt-5",
					style: { transform: `rotateY(${angle}deg) translateZ(118px)` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-full w-full fill-accent" })
				}, i);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem3D, { className: "h-16 w-28" })
		})]
	});
}
function Skyline() {
	const widths = [
		18,
		12,
		22,
		10,
		16,
		14,
		20,
		11,
		15,
		9,
		17
	];
	const heights = [
		40,
		70,
		55,
		90,
		48,
		78,
		62,
		84,
		44,
		66,
		52
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-36 w-full overflow-hidden",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-4",
			children: widths.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-raised border border-line",
				style: {
					width: w,
					height: `${heights[i]}%`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-2 gap-px p-1 opacity-50",
					children: Array.from({ length: 8 }, (_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: k % 3 === 0 ? "h-1 bg-accent/50" : "h-1 bg-bone/15" }, k))
				})
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg to-transparent" })]
	});
}
//#endregion
export { Skyline as n, OrbitingBats as t };
