import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCaveStore } from "./router-QmMH7nY_.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
import { n as Skyline } from "./css-3d-BK6sRQ6s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intel-SOvisbSF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"ally",
	"neutral",
	"watch"
];
function Intel() {
	const intel = useCaveStore((s) => s.intel);
	const addIntel = useCaveStore((s) => s.addIntel);
	const updateIntel = useCaveStore((s) => s.updateIntel);
	const removeIntel = useCaveStore((s) => s.removeIntel);
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-kicker",
				children: "Intel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl sm:text-4xl",
				children: "The city and its names."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skyline, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-kicker",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "mt-2 h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-kicker",
						children: "Role"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: role,
						onChange: (e) => setRole(e.target.value),
						className: "mt-2 h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Add name",
						variant: "inline",
						className: "h-11",
						onClick: () => {
							if (!name.trim()) return;
							addIntel({
								name: name.trim(),
								role: role.trim() || "Unknown",
								notes: "",
								status: "neutral"
							});
							setName("");
							setRole("");
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: intel.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: c.name,
								onChange: (e) => updateIntel(c.id, { name: e.target.value }),
								className: "type-display bg-transparent text-xl outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: c.role,
								onChange: (e) => updateIntel(c.id, { role: e.target.value }),
								className: "mt-1 block w-full bg-transparent text-xs tracking-[0.18em] text-muted uppercase outline-none"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: "Remove",
								variant: "compact",
								onClick: () => removeIntel(c.id)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1",
							children: STATUSES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: st,
								variant: "inline",
								active: c.status === st,
								onClick: () => updateIntel(c.id, { status: st })
							}, st))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: c.notes,
							onChange: (e) => updateIntel(c.id, { notes: e.target.value }),
							rows: 3,
							className: "mt-3 w-full bg-transparent text-sm outline-none",
							placeholder: "Notes"
						})
					]
				}, c.id))
			})
		]
	});
}
//#endregion
export { Intel as component };
