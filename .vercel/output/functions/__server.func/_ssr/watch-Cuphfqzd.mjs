import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCaveStore, u as formatStamp } from "./router-QmMH7nY_.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-Cuphfqzd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THREATS = [
	"low",
	"moderate",
	"high",
	"critical"
];
function Watch() {
	const journal = useCaveStore((s) => s.journal);
	const addJournal = useCaveStore((s) => s.addJournal);
	const removeJournal = useCaveStore((s) => s.removeJournal);
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [threat, setThreat] = (0, import_react.useState)("low");
	function submit() {
		if (!title.trim() && !body.trim()) return;
		addJournal({
			title: title.trim() || "Watch note",
			body,
			threat
		});
		setTitle("");
		setBody("");
		setThreat("low");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-3xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-kicker",
				children: "Night watch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl sm:text-4xl",
				children: "Write what happened."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Title",
						className: "w-full bg-transparent type-display text-2xl outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: body,
						onChange: (e) => setBody(e.target.value),
						rows: 6,
						placeholder: "The city, the work, the weather in your head.",
						className: "mt-4 w-full bg-transparent text-sm leading-relaxed outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [THREATS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: t,
							variant: "inline",
							active: threat === t,
							onClick: () => setThreat(t)
						}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Log it",
							variant: "inline",
							onClick: submit
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: journal.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: entry.threat
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl",
								children: entry.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: "Remove",
								variant: "compact",
								onClick: () => removeJournal(entry.id)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: entry.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[0.65rem] tracking-[0.16em] text-faint uppercase tabular",
							children: formatStamp(entry.at)
						})
					]
				}, entry.id))
			})
		]
	});
}
//#endregion
export { Watch as component };
