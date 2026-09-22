import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCaveStore } from "./router-QmMH7nY_.mjs";
import { t as OrbitingBats } from "./css-3d-BK6sRQ6s.mjs";
import { a as livedFor, i as isBirthday, n as birthDate, o as nextBirthday, r as countdownTo, s as turningAge, t as ageYears } from "./birthday-t-K33K6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/birthday--Ya_HMlN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Birthday() {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const notes = useCaveStore((s) => s.yearNotes);
	const setYearNote = useCaveStore((s) => s.setYearNote);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 250);
		return () => clearInterval(t);
	}, []);
	const cd = countdownTo(nextBirthday(now), now);
	const lived = livedFor(now);
	const years = (0, import_react.useMemo)(() => {
		const list = [];
		for (let y = 2008; y <= now.getFullYear() + 1; y++) list.push(y);
		return list;
	}, [now]);
	const [openYear, setOpenYear] = (0, import_react.useState)(turningAge(now) + 2008 - 1);
	const units = [
		{
			k: "Days",
			v: cd.days
		},
		{
			k: "Hours",
			v: cd.hours
		},
		{
			k: "Minutes",
			v: cd.minutes
		},
		{
			k: "Seconds",
			v: cd.seconds
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-5xl flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: isBirthday(now) ? "Protocol complete" : "The 18th protocol"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl sm:text-6xl",
						children: isBirthday(now) ? "It is the day." : "Eighteen approaches."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-muted",
						children: [
							"Born 2 December 2008. Age ",
							ageYears(now),
							". Next mark: ",
							turningAge(now),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitingBats, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel px-3 py-5 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "type-display text-4xl tabular sm:text-5xl",
						children: u.v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker mt-2",
						children: u.k
					})]
				}, u.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel grid gap-6 p-5 sm:grid-cols-3 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Years lived",
						value: String(lived.years)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Nights counted",
						value: lived.days.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Origin",
						value: birthDate().toLocaleDateString(void 0, {
							month: "short",
							day: "numeric",
							year: "numeric"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker mb-4",
					children: "Year files"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpenYear(y),
						className: "h-11 min-w-11 border border-line px-2 text-xs tabular tracking-wider text-muted transition-colors duration-150 hover:border-accent hover:text-fg data-[on=true]:border-accent data-[on=true]:text-accent-hot",
						"data-on": openYear === y,
						children: y
					}, y))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker mb-2",
						children: openYear
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: notes.find((n) => n.year === openYear)?.body ?? "",
						onChange: (e) => setYearNote(openYear, e.target.value),
						rows: 5,
						className: "w-full bg-transparent text-sm leading-relaxed outline-none",
						placeholder: "What this year was. What it must become."
					})]
				})
			] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "label-kicker",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 type-display text-2xl tabular",
		children: value
	})] });
}
//#endregion
export { Birthday as component };
