import { i as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as BOARD_W, c as nodeCenter, d as nid, n as Route, o as ensureRoadmap, r as useCaveStore, s as insertStep, u as formatStamp } from "./_ssr/router-QmMH7nY_.mjs";
import { t as BatButton } from "./_ssr/bat-button-DkQa6Xxs.mjs";
import { n as TYPE_META } from "./_ssr/types-Da3UI9VU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-_T8fKlc5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	{
		id: "red",
		token: "var(--color-accent)"
	},
	{
		id: "bone",
		token: "var(--color-bone)"
	},
	{
		id: "steel",
		token: "var(--color-muted)"
	}
];
function pathD(points) {
	if (!points.length) return "";
	return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}
function BlueprintEditor({ data, onChange }) {
	const svg = (0, import_react.useRef)(null);
	const live = (0, import_react.useRef)([]);
	const drawing = (0, import_react.useRef)(false);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [color, setColor] = (0, import_react.useState)("red");
	const [width, setWidth] = (0, import_react.useState)(2.8);
	function pos(e) {
		const box = svg.current.getBoundingClientRect();
		return {
			x: (e.clientX - box.left) / box.width * 1e3,
			y: (e.clientY - box.top) / box.height * 620
		};
	}
	function down(e) {
		if (e.button !== void 0 && e.button !== 0) return;
		drawing.current = true;
		live.current = [pos(e)];
		setPreview([...live.current]);
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function move(e) {
		if (!drawing.current) return;
		const next = pos(e);
		const last = live.current[live.current.length - 1];
		if (last && Math.abs(last.x - next.x) < .8 && Math.abs(last.y - next.y) < .8) return;
		live.current.push(next);
		setPreview([...live.current]);
	}
	function up() {
		if (!drawing.current) return;
		drawing.current = false;
		const points = live.current;
		live.current = [];
		setPreview(null);
		if (points.length < 2) return;
		onChange({
			kind: "blueprint",
			strokes: [...data.strokes, {
				id: nid(),
				points,
				color,
				width
			}]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: c.id,
						variant: "inline",
						active: color === c.id,
						onClick: () => setColor(c.id)
					}, c.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-2 flex items-center gap-2 text-[0.65rem] tracking-[0.18em] text-muted uppercase",
						children: ["Weight", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 1,
							max: 10,
							step: .4,
							value: width,
							onChange: (e) => setWidth(Number(e.target.value)),
							"aria-label": "Stroke weight"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Undo",
						variant: "inline",
						onClick: () => onChange({
							kind: "blueprint",
							strokes: data.strokes.slice(0, -1)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Clear",
						variant: "inline",
						onClick: () => onChange({
							kind: "blueprint",
							strokes: []
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				ref: svg,
				viewBox: "0 0 1000 620",
				className: "h-[min(62vh,560px)] w-full touch-none rounded-[10px] border border-line bg-inset",
				onPointerDown: down,
				onPointerMove: move,
				onPointerUp: up,
				onPointerCancel: up,
				onPointerLeave: up,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "grid",
						width: "40",
						height: "40",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 40 0 L 0 0 0 40",
							fill: "none",
							stroke: "var(--color-line)",
							strokeWidth: "1"
						})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "1000",
						height: "620",
						fill: "url(#grid)"
					}),
					data.strokes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathD(s.points),
						fill: "none",
						stroke: COLORS.find((c) => c.id === s.color)?.token,
						strokeWidth: s.width,
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}, s.id)),
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: pathD(preview),
						fill: "none",
						stroke: COLORS.find((c) => c.id === color)?.token,
						strokeWidth: width,
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Draw on the grid. Use undo to take back the last stroke, or clear the whole sheet."
			})
		]
	});
}
function DossierEditor({ data, onChange }) {
	function patchSection(id, patch) {
		onChange({
			...data,
			sections: data.sections.map((s) => s.id === id ? {
				...s,
				...patch
			} : s)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [data.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: section.heading,
					onChange: (e) => patchSection(section.id, { heading: e.target.value }),
					className: "type-display min-w-0 flex-1 bg-transparent text-xl text-fg outline-none",
					"aria-label": "Section heading"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
					label: "Remove section",
					variant: "compact",
					onClick: () => onChange({
						...data,
						sections: data.sections.filter((s) => s.id !== section.id)
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: section.body,
				onChange: (e) => patchSection(section.id, { body: e.target.value }),
				rows: 8,
				className: "w-full resize-y bg-inset p-3 text-sm leading-relaxed text-fg outline-none ring-1 ring-line focus:ring-accent",
				placeholder: "Write the file. No filler."
			})]
		}, section.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
			label: "Add section",
			variant: "inline",
			onClick: () => onChange({
				...data,
				sections: [...data.sections, {
					id: nid(),
					heading: "New section",
					body: ""
				}]
			})
		})]
	});
}
var TONES = [
	"red",
	"bone",
	"steel"
];
var TONE_BORDER = {
	red: "#b42323",
	bone: "#eceae4",
	steel: "#6e6b66"
};
function EvidenceEditor({ data, onChange }) {
	const [selected, setSelected] = (0, import_react.useState)(data.pins[0]?.id ?? null);
	const [linkFrom, setLinkFrom] = (0, import_react.useState)(null);
	const drag = (0, import_react.useRef)(null);
	const pin = data.pins.find((p) => p.id === selected) ?? null;
	function addPin() {
		const next = {
			id: nid(),
			x: 40 + data.pins.length % 5 * 28,
			y: 40 + data.pins.length * 18,
			title: "Pin",
			body: "",
			tone: "red"
		};
		onChange({
			...data,
			pins: [...data.pins, next]
		});
		setSelected(next.id);
	}
	function patch(id, p) {
		onChange({
			...data,
			pins: data.pins.map((n) => n.id === id ? {
				...n,
				...p
			} : n)
		});
	}
	function onDown(e, p) {
		e.stopPropagation();
		setSelected(p.id);
		drag.current = {
			id: p.id,
			ox: e.clientX,
			oy: e.clientY,
			nx: p.x,
			ny: p.y
		};
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function onMove(e) {
		if (!drag.current) return;
		patch(drag.current.id, {
			x: Math.max(8, drag.current.nx + (e.clientX - drag.current.ox)),
			y: Math.max(8, drag.current.ny + (e.clientY - drag.current.oy))
		});
	}
	function tryLink(id) {
		if (!linkFrom) {
			setLinkFrom(id);
			return;
		}
		if (linkFrom !== id) {
			if (!data.strings.some((s) => s.from === linkFrom && s.to === id || s.from === id && s.to === linkFrom)) onChange({
				...data,
				strings: [...data.strings, {
					id: nid(),
					from: linkFrom,
					to: id
				}]
			});
		}
		setLinkFrom(null);
	}
	const width = Math.max(720, ...data.pins.map((p) => p.x + 200));
	const height = Math.max(480, ...data.pins.map((p) => p.y + 160));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_260px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
				label: "Add pin",
				variant: "inline",
				onClick: addPin
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
				label: linkFrom ? "Stringing…" : "Red string",
				variant: "inline",
				active: !!linkFrom,
				onClick: () => setLinkFrom(linkFrom ? null : selected)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-[min(62vh,560px)] overflow-auto rounded-[10px] border border-line",
			style: { background: "radial-gradient(circle at 20% 10%, #2a1a1a, #141210 42%, #0c0b0a)" },
			onPointerMove: onMove,
			onPointerUp: () => {
				drag.current = null;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				style: {
					width,
					height
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "pointer-events-none absolute inset-0 h-full w-full",
					children: data.strings.map((s) => {
						const a = data.pins.find((p) => p.id === s.from);
						const b = data.pins.find((p) => p.id === s.to);
						if (!a || !b) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: a.x + 80,
							y1: a.y + 12,
							x2: b.x + 80,
							y2: b.y + 12,
							stroke: "#b42323",
							strokeWidth: "1.6",
							opacity: "0.85"
						}, s.id);
					})
				}), data.pins.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onPointerDown: (e) => onDown(e, p),
					onClick: () => {
						setSelected(p.id);
						if (linkFrom) tryLink(p.id);
					},
					className: "absolute w-40 rounded-sm bg-surface/95 px-3 py-2 text-left shadow-[var(--shadow-cave)]",
					style: {
						left: p.x,
						top: p.y,
						border: `1px solid ${TONE_BORDER[p.tone]}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block h-2 w-2 rounded-full",
							style: { background: TONE_BORDER[p.tone] }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-3 text-xs text-muted",
							children: p.body
						})
					]
				}, p.id))]
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "panel h-fit p-4",
			children: pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "Pin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: pin.title,
						onChange: (e) => patch(pin.id, { title: e.target.value }),
						className: "w-full bg-inset px-2 py-2 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: pin.body,
						onChange: (e) => patch(pin.id, { body: e.target.value }),
						rows: 5,
						className: "w-full bg-inset px-2 py-2 text-sm outline-none ring-1 ring-line focus:ring-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: TONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: t,
							variant: "inline",
							active: pin.tone === t,
							onClick: () => patch(pin.id, { tone: t })
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Remove pin",
						variant: "inline",
						onClick: () => {
							onChange({
								kind: "evidence",
								pins: data.pins.filter((p) => p.id !== pin.id),
								strings: data.strings.filter((s) => s.from !== pin.id && s.to !== pin.id)
							});
							setSelected(null);
						}
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Select a pin."
			})
		})]
	});
}
var COLS = [
	{
		id: "planned",
		label: "Planned"
	},
	{
		id: "active",
		label: "Active"
	},
	{
		id: "done",
		label: "Done"
	}
];
function MissionEditor({ data, onChange }) {
	function add() {
		onChange({
			kind: "mission",
			items: [{
				id: nid(),
				title: "New task",
				notes: "",
				column: "planned"
			}, ...data.items]
		});
	}
	function patch(id, p) {
		onChange({
			kind: "mission",
			items: data.items.map((i) => i.id === id ? {
				...i,
				...p
			} : i)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
			label: "Add task",
			variant: "inline",
			onClick: add
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel min-h-[280px] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker mb-3",
					children: col.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: data.items.filter((i) => i.column === col.id).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-line bg-inset p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: item.title,
								onChange: (e) => patch(item.id, { title: e.target.value }),
								className: "w-full bg-transparent text-sm font-medium outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: item.notes,
								onChange: (e) => patch(item.id, { notes: e.target.value }),
								rows: 3,
								className: "mt-2 w-full bg-transparent text-xs text-muted outline-none",
								placeholder: "Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1",
								children: [COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
									label: c.label,
									variant: "inline",
									active: item.column === c.id,
									className: "px-2 py-1 text-[0.6rem]",
									onClick: () => patch(item.id, { column: c.id })
								}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
									label: "Remove",
									variant: "compact",
									onClick: () => onChange({
										kind: "mission",
										items: data.items.filter((i) => i.id !== item.id)
									})
								})]
							})
						]
					}, item.id))
				})]
			}, col.id))
		})]
	});
}
var STATUS = [
	"pending",
	"active",
	"done"
];
function RoadmapEditor({ data, onChange }) {
	const board = (0, import_react.useRef)(null);
	const [connectFrom, setConnectFrom] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const drag = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const needsStart = !data.nodes.some((n) => n.role === "start");
		const needsEnd = !data.nodes.some((n) => n.role === "end");
		if (needsStart || needsEnd) onChange(ensureRoadmap(data));
	}, [data, onChange]);
	const map = ensureRoadmap(data);
	const selectedNode = map.nodes.find((n) => n.id === selected) ?? null;
	function patchNode(id, patch) {
		onChange({
			...map,
			nodes: map.nodes.map((n) => n.id === id ? {
				...n,
				...patch
			} : n)
		});
	}
	function onNodeDown(e, node) {
		e.stopPropagation();
		setSelected(node.id);
		drag.current = {
			id: node.id,
			ox: e.clientX,
			oy: e.clientY,
			nx: node.x,
			ny: node.y,
			moved: false
		};
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function onBoardMove(e) {
		if (!drag.current) return;
		const dx = e.clientX - drag.current.ox;
		const dy = e.clientY - drag.current.oy;
		if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
		patchNode(drag.current.id, {
			x: Math.max(16, Math.min(BOARD_W - 176 - 16, drag.current.nx + dx)),
			y: Math.max(16, Math.min(666, drag.current.ny + dy))
		});
	}
	function endPointer() {
		drag.current = null;
	}
	function toggleConnect(id) {
		if (!connectFrom) {
			setConnectFrom(id);
			return;
		}
		if (connectFrom === id) {
			setConnectFrom(null);
			return;
		}
		if (!map.edges.some((ed) => ed.from === connectFrom && ed.to === id || ed.from === id && ed.to === connectFrom)) onChange({
			...map,
			edges: [...map.edges, {
				id: nid(),
				from: connectFrom,
				to: id
			}]
		});
		setConnectFrom(null);
	}
	function onNodeClick(node) {
		if (drag.current?.moved) return;
		setSelected(node.id);
		if (connectFrom) toggleConnect(node.id);
	}
	function add() {
		const next = insertStep(map);
		const created = next.nodes.find((n) => !map.nodes.some((old) => old.id === n.id));
		onChange(next);
		if (created) setSelected(created.id);
	}
	function removeEdge(id) {
		onChange({
			...map,
			edges: map.edges.filter((e) => e.id !== id)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel p-4 sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-kicker",
							children: "Mission route"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl",
							children: "Start → steps → end"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "START and END stay on the board. Add steps between them, drag to place, then string them together."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: "Add step",
							variant: "inline",
							onClick: add
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
							label: connectFrom ? "Tap a node…" : "Connect string",
							variant: "inline",
							active: !!connectFrom,
							onClick: () => setConnectFrom(connectFrom ? null : selected ?? null)
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[10px] border border-line bg-inset",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: board,
					className: "h-[min(72vh,680px)] touch-none overflow-auto",
					onPointerMove: onBoardMove,
					onPointerUp: endPointer,
					onPointerCancel: endPointer,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						style: {
							width: BOARD_W,
							height: 760
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-30",
								style: {
									backgroundImage: "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
									backgroundSize: "40px 40px"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "absolute inset-0 h-full w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
									id: "roadmap-arrow",
									markerWidth: "8",
									markerHeight: "8",
									refX: "7",
									refY: "4",
									orient: "auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M0,0 L8,4 L0,8 z",
										fill: "var(--color-accent)"
									})
								}) }), map.edges.map((edge) => {
									const a = map.nodes.find((n) => n.id === edge.from);
									const b = map.nodes.find((n) => n.id === edge.to);
									if (!a || !b) return null;
									const p = nodeCenter(a);
									const q = nodeCenter(b);
									const mx = (p.x + q.x) / 2;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`,
										fill: "none",
										stroke: "transparent",
										strokeWidth: "18",
										className: "cursor-pointer",
										onClick: () => removeEdge(edge.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`,
										fill: "none",
										stroke: "var(--color-accent)",
										strokeWidth: "2.5",
										markerEnd: "url(#roadmap-arrow)",
										opacity: "0.9",
										className: "pointer-events-none"
									})] }, edge.id);
								})]
							}),
							map.nodes.map((node) => {
								const isAnchor = node.role !== "step";
								const on = selected === node.id || connectFrom === node.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onPointerDown: (e) => onNodeDown(e, node),
									onClick: () => onNodeClick(node),
									className: "absolute rounded-sm border px-3 py-2 text-left",
									style: {
										left: node.x,
										top: node.y,
										width: 176,
										height: 78,
										borderColor: on ? "var(--color-accent-hot)" : isAnchor ? "var(--color-accent)" : "var(--color-line)",
										background: isAnchor ? "color-mix(in oklab, var(--color-accent-dim) 55%, black)" : "var(--color-surface)",
										boxShadow: on ? "var(--shadow-ember)" : void 0
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-kicker mb-1",
										children: node.role === "start" ? "Start" : node.role === "end" ? "End" : node.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium text-fg",
										children: node.title
									})]
								}, node.id);
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1fr_300px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-kicker",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-inset p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-sm",
									children: "01 · Add"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: "Drop a step on the string between start and end."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-inset p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-sm",
									children: "02 · Connect"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: "Hit Connect string, then tap two nodes. Tap a string to cut it."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-inset p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-sm",
									children: "03 · Track"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: "Mark each step pending, active, or done."
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "panel h-fit p-4",
					children: selectedNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-kicker",
								children: selectedNode.role === "step" ? "Selected step" : selectedNode.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: selectedNode.title,
								onChange: (e) => patchNode(selectedNode.id, { title: e.target.value }),
								className: "w-full bg-inset px-2 py-2 text-sm text-fg outline-none ring-1 ring-line focus:ring-accent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: selectedNode.detail,
								onChange: (e) => patchNode(selectedNode.id, { detail: e.target.value }),
								rows: 5,
								className: "w-full bg-inset px-2 py-2 text-sm text-fg outline-none ring-1 ring-line focus:ring-accent",
								placeholder: "What this step actually is."
							}),
							selectedNode.role === "step" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: STATUS.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
									label: st,
									variant: "inline",
									active: selectedNode.status === st,
									onClick: () => patchNode(selectedNode.id, { status: st })
								}, st))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
								label: "Delete step",
								variant: "inline",
								onClick: () => {
									onChange({
										kind: "roadmap",
										nodes: map.nodes.filter((n) => n.id !== selectedNode.id),
										edges: map.edges.filter((e) => e.from !== selectedNode.id && e.to !== selectedNode.id)
									});
									setSelected(null);
								}
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Anchors stay on the board. Rename them, but you cannot delete START or END."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Add or select a step to edit it."
					})
				})]
			})
		]
	});
}
function ProjectFile() {
	const { id } = Route.useParams();
	const project = useCaveStore((s) => s.projects.find((p) => p.id === id));
	const updateProject = useCaveStore((s) => s.updateProject);
	const setProjectData = useCaveStore((s) => s.setProjectData);
	const removeProject = useCaveStore((s) => s.removeProject);
	const hydrated = useCaveStore((s) => s.hydrated);
	const navigate = useNavigate();
	const [savedAt, setSavedAt] = (0, import_react.useState)(project?.updatedAt ?? Date.now());
	(0, import_react.useEffect)(() => {
		if (project?.updatedAt) setSavedAt(project.updatedAt);
	}, [project?.updatedAt]);
	const onData = (0, import_react.useCallback)((data) => {
		setProjectData(id, data);
		setSavedAt(Date.now());
	}, [id, setProjectData]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-kicker",
			children: "Opening file"
		})
	});
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: "File missing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "This card is no longer in the vault."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/vault",
				className: "mt-6 inline-flex items-center gap-2 rounded-sm border border-line bg-raised px-3 py-2 text-xs font-semibold tracking-[0.18em] text-fg uppercase hover:border-accent",
				children: "Return"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/vault",
							className: "label-kicker text-muted hover:text-fg",
							children: "Vault"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: project.name,
							onChange: (e) => updateProject(id, { name: e.target.value }),
							className: "mt-2 block w-full bg-transparent type-display text-3xl text-fg outline-none sm:text-4xl",
							"aria-label": "Project name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: project.tagline,
							onChange: (e) => updateProject(id, { tagline: e.target.value }),
							className: "mt-2 block w-full bg-transparent text-sm text-muted outline-none",
							placeholder: "Briefing",
							"aria-label": "Project briefing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[0.65rem] tracking-[0.18em] text-faint uppercase",
							children: [
								TYPE_META[project.type].label,
								" · ",
								formatStamp(project.updatedAt)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-sm border border-line bg-inset px-2 py-1 text-[0.6rem] font-semibold tracking-[0.16em] text-muted uppercase",
						children: ["Saved ", formatStamp(savedAt)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: "Destroy file",
						variant: "inline",
						onClick: () => {
							if (window.confirm("Destroy this file?")) {
								removeProject(id);
								navigate({ to: "/vault" });
							}
						}
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-kicker",
					children: "Project workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [TYPE_META[project.type].blurb, " Everything below saves as you work."]
				})]
			}),
			project.data.kind === "dossier" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DossierEditor, {
				data: project.data,
				onChange: onData
			}) : null,
			project.data.kind === "roadmap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadmapEditor, {
				data: project.data,
				onChange: onData
			}) : null,
			project.data.kind === "evidence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceEditor, {
				data: project.data,
				onChange: onData
			}) : null,
			project.data.kind === "mission" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionEditor, {
				data: project.data,
				onChange: onData
			}) : null,
			project.data.kind === "blueprint" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlueprintEditor, {
				data: project.data,
				onChange: onData
			}) : null
		]
	});
}
//#endregion
export { ProjectFile as component };
