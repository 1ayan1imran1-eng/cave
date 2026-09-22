import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn, r as useCaveStore, u as formatStamp } from "./router-QmMH7nY_.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
import { n as TYPE_META } from "./types-Da3UI9VU.mjs";
import { o as nextBirthday, r as countdownTo, s as turningAge, t as ageYears } from "./birthday-t-K33K6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/command-DRgrVro3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Command() {
	const name = useCaveStore((s) => s.settings.operatorName);
	const projects = useCaveStore((s) => s.projects);
	const journal = useCaveStore((s) => s.journal);
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [signal, setSignal] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(t);
	}, []);
	const cd = countdownTo(nextBirthday(now), now);
	const recent = [...projects].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker",
					children: "Command center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 text-3xl sm:text-4xl",
					children: [
						"Welcome back, ",
						name,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Gotham clock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular text-2xl text-fg",
						children: now.toLocaleTimeString(void 0, {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "The command wall"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "A live overview of the cave systems."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: signal ? "Signal on" : "Signal off",
						variant: "inline",
						active: signal,
						onClick: () => setSignal((v) => !v)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden bg-inset p-5 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-[1.35fr_.65fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-h-[250px] overflow-hidden rounded-sm border border-line bg-black p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-30",
								style: {
									backgroundImage: "linear-gradient(rgb(180 35 35 / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(180 35 35 / .12) 1px, transparent 1px)",
									backgroundSize: "28px 28px"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex h-full flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-kicker text-accent",
										children: "BAT-COMMAND / ONLINE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", signal ? "bg-accent ember-glow" : "bg-muted") })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										["FILES", String(projects.length)],
										["JOURNAL", String(journal.length)],
										["SIGNAL", signal ? "ACTIVE" : "OFF"]
									].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border border-line bg-surface/80 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "label-kicker",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-lg tabular text-fg",
											children: value
										})]
									}, label))
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-line bg-surface p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: "System status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 space-y-4 text-sm",
								children: [
									["Vault", "READY"],
									["Project editor", "READY"],
									["Roadmap canvas", "READY"],
									["Remote sync", "CONFIGURABLE"]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular text-accent",
										children: value
									})]
								}, label))
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: "18th protocol"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 type-display text-4xl tabular text-fg",
								children: [cd.days, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-base tracking-normal text-muted",
									children: "days"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Age ",
									ageYears(now),
									". Turning ",
									turningAge(now),
									" on 2 Dec."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/birthday",
								className: "mt-4 inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase transition-colors duration-150 hover:border-accent",
								children: "Open protocol"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: "Vault"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 type-display text-4xl tabular",
								children: projects.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Active files in the ring."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vault",
								className: "mt-4 inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase transition-colors duration-150 hover:border-accent",
								children: "Enter vault"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: "Last watch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-lg text-fg",
								children: journal[0]?.title ?? "No entry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: journal[0] ? formatStamp(journal[0].at) : "Write the night down."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/watch",
								className: "mt-4 inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase transition-colors duration-150 hover:border-accent",
								children: "Open watch"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker",
					children: "Recent files"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: recent.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/vault/$id",
					params: { id: p.id },
					className: "panel p-4 transition-colors duration-150 hover:border-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-kicker text-accent",
							children: TYPE_META[p.type].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-lg",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-muted",
							children: p.tagline
						})
					]
				}, p.id))
			})] })
		]
	});
}
//#endregion
export { Command as component };
