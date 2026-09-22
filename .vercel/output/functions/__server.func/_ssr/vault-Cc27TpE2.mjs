import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn, r as useCaveStore, u as formatStamp } from "./router-QmMH7nY_.mjs";
import { t as BatEmblem } from "./bat-emblem-dZ-KQTYS.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
import { n as TYPE_META, t as PROJECT_TYPES } from "./types-Da3UI9VU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-Cc27TpE2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectCard({ project, onDestroy, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("panel relative flex min-h-64 flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-cave)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/vault/$id",
			params: { id: project.id },
			"aria-label": `Open ${project.name}`,
			className: "flex min-h-64 flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-line p-4 pr-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker text-accent",
					children: TYPE_META[project.type].label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 text-xl text-fg",
					children: project.name
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "mt-1 h-4 w-8 fill-muted" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-3 text-sm leading-6 text-muted",
					children: project.tagline || "No briefing added yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-4 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Last updated"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs tabular text-muted",
						children: formatStamp(project.updatedAt)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase",
						children: "Open"
					})]
				})]
			})]
		}), onDestroy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				onDestroy();
			},
			className: "absolute top-3 right-3 z-10 inline-flex h-11 items-center rounded-sm border border-line bg-raised px-3 text-[0.62rem] font-semibold tracking-[0.16em] text-muted uppercase hover:border-accent hover:text-accent-hot",
			children: "Destroy"
		}) : null]
	});
}
function Vault() {
	const projects = useCaveStore((s) => s.projects);
	const addProject = useCaveStore((s) => s.addProject);
	const removeProject = useCaveStore((s) => s.removeProject);
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [tagline, setTagline] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("dossier");
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const visibleProjects = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return projects.filter((p) => (filter === "all" || p.type === filter) && (!q || `${p.name} ${p.tagline}`.toLowerCase().includes(q)));
	}, [
		projects,
		query,
		filter
	]);
	function create() {
		const id = addProject({
			name: name || "Untitled file",
			type,
			tagline
		});
		setOpen(false);
		setName("");
		setTagline("");
		navigate({
			to: "/vault/$id",
			params: { id }
		});
	}
	function destroy(id, label) {
		if (window.confirm(`Destroy “${label}”? This cannot be undone.`)) removeProject(id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Project vault"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl sm:text-4xl",
						children: "The ring of files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: "Open a card to edit it. Roadmaps have a start and an end, stitched with string. Blueprints are a drawing canvas. Destroy files you no longer need."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
					label: "New file",
					variant: "inline",
					onClick: () => setOpen(true)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "panel p-4 sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 md:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search files…",
						"aria-label": "Search files",
						className: "h-11 min-w-0 flex-1 bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filter,
						onChange: (e) => setFilter(e.target.value),
						"aria-label": "Filter by type",
						className: "h-11 bg-inset px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All types"
						}), PROJECT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: TYPE_META[t].label
						}, t))]
					})]
				})
			}),
			projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mx-auto flex min-h-[280px] w-full flex-col items-center justify-center gap-3 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-fg",
						children: "The vault is empty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Create a file to start building."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "New file",
						variant: "inline",
						onClick: () => setOpen(true)
					})
				]
			}) : visibleProjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel flex min-h-[180px] items-center justify-center p-8 text-center text-sm text-muted",
				children: "No project files match that search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker",
					children: "All files"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						visibleProjects.length,
						" visible · ",
						projects.length,
						" total"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: visibleProjects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
					project: p,
					onDestroy: () => destroy(p.id, p.name)
				}, p.id))
			})] }),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-bg/80 p-4 sm:items-center",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "new-file-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel w-full max-w-lg p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "new-file-title",
							className: "text-2xl",
							children: "New file"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-5 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-kicker",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "mt-2 h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-kicker",
								children: "Briefing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: tagline,
								onChange: (e) => setTagline(e.target.value),
								className: "mt-2 h-11 w-full bg-inset px-3 text-sm outline-none ring-1 ring-line focus:ring-accent"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-kicker mt-5 mb-2",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: PROJECT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setType(t),
								className: "border border-line p-3 text-left transition-colors duration-150 hover:border-accent data-[on=true]:border-accent",
								"data-on": type === t,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: TYPE_META[t].label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: TYPE_META[t].blurb
								})]
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: "Create",
								variant: "inline",
								onClick: create
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: "Cancel",
								variant: "inline",
								onClick: () => setOpen(false)
							})]
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { Vault as component };
