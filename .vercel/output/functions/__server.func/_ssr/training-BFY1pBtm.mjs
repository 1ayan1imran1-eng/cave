import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCaveStore } from "./router-QmMH7nY_.mjs";
import { t as BatEmblem } from "./bat-emblem-dZ-KQTYS.mjs";
import { t as BatButton } from "./bat-button-DkQa6Xxs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-BFY1pBtm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShadowStrike() {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const high = useCaveStore((s) => s.highScore);
	const setHigh = useCaveStore((s) => s.setHighScore);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [combo, setCombo] = (0, import_react.useState)(0);
	const scoreRef = (0, import_react.useRef)(0);
	const comboRef = (0, import_react.useRef)(0);
	const runningRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		runningRef.current = running;
	}, [running]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let w = 0;
		let h = 0;
		let raf = 0;
		let last = performance.now();
		let spawnAcc = 0;
		let id = 1;
		const targets = [];
		let timeLeft = 45;
		let ended = false;
		function resize() {
			w = wrap.clientWidth;
			h = Math.max(320, wrap.clientHeight);
			const dpr = Math.min(devicePixelRatio || 1, 2);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		function spawn() {
			const fromLeft = Math.random() > .5;
			targets.push({
				id: id++,
				x: fromLeft ? -30 : w + 30,
				y: 40 + Math.random() * (h - 80),
				vx: (fromLeft ? 1 : -1) * (80 + Math.random() * 140),
				vy: (Math.random() - .5) * 50,
				life: 1,
				born: performance.now()
			});
		}
		function drawBat(x, y, s, a) {
			ctx.save();
			ctx.translate(x, y);
			ctx.scale(s, s);
			ctx.globalAlpha = a;
			ctx.fillStyle = "#e8e6e1";
			ctx.beginPath();
			ctx.moveTo(0, -10);
			ctx.bezierCurveTo(-6, 4, -18, 6, -28, 2);
			ctx.bezierCurveTo(-20, 8, -10, 14, 0, 18);
			ctx.bezierCurveTo(10, 14, 20, 8, 28, 2);
			ctx.bezierCurveTo(18, 6, 6, 4, 0, -10);
			ctx.fill();
			ctx.restore();
		}
		function frame(now) {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = "#070708";
			ctx.fillRect(0, 0, w, h);
			ctx.strokeStyle = "#2c2c32";
			ctx.strokeRect(8, 8, w - 16, h - 16);
			if (runningRef.current && !ended) {
				timeLeft -= dt;
				spawnAcc += dt;
				const rate = Math.max(.35, .9 - scoreRef.current / 400);
				if (spawnAcc > rate) {
					spawnAcc = 0;
					spawn();
				}
				if (timeLeft <= 0) {
					ended = true;
					runningRef.current = false;
					setRunning(false);
					setHigh(scoreRef.current);
				}
			}
			for (let i = targets.length - 1; i >= 0; i--) {
				const t = targets[i];
				t.x += t.vx * dt;
				t.y += t.vy * dt;
				t.life -= dt * .12;
				if (t.x < -60 || t.x > w + 60 || t.life <= 0) {
					if (runningRef.current && t.life <= 0) {
						comboRef.current = 0;
						setCombo(0);
					}
					targets.splice(i, 1);
					continue;
				}
				drawBat(t.x, t.y, 1.1, Math.max(.3, t.life));
			}
			ctx.fillStyle = "#9a968e";
			ctx.font = "12px Barlow, sans-serif";
			ctx.fillText(`TIME ${Math.max(0, timeLeft).toFixed(1)}`, 20, 28);
			ctx.fillText(`SCORE ${scoreRef.current}`, 20, 48);
			ctx.fillText(`COMBO ${comboRef.current}`, 20, 68);
			raf = requestAnimationFrame(frame);
		}
		function hit(e) {
			if (!runningRef.current || ended) return;
			const r = canvas.getBoundingClientRect();
			const x = e.clientX - r.left;
			const y = e.clientY - r.top;
			for (let i = targets.length - 1; i >= 0; i--) {
				const t = targets[i];
				const dx = x - t.x;
				const dy = y - t.y;
				if (dx * dx + dy * dy < 1600) {
					targets.splice(i, 1);
					comboRef.current += 1;
					const gain = 10 + comboRef.current * 2;
					scoreRef.current += gain;
					setScore(scoreRef.current);
					setCombo(comboRef.current);
					return;
				}
			}
			comboRef.current = 0;
			setCombo(0);
		}
		resize();
		window.addEventListener("resize", resize);
		canvas.addEventListener("pointerdown", hit);
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			canvas.removeEventListener("pointerdown", hit);
		};
	}, [setHigh]);
	function start() {
		scoreRef.current = 0;
		comboRef.current = 0;
		setScore(0);
		setCombo(0);
		setRunning(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-kicker",
				children: "Shadow Strike"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Strike the silhouettes. Miss and the combo dies. 45 seconds."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 text-sm tabular text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Score ", score] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Combo ", combo] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Best ", high] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatButton, {
						label: running ? "In flight" : "Begin",
						variant: "inline",
						disabled: running,
						onClick: start
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: wrapRef,
			className: "relative h-[min(58vh,480px)] overflow-hidden rounded-[10px] border border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-full w-full touch-none"
			}), !running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatEmblem, { className: "h-10 w-24 fill-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "type-display tracking-[0.28em]",
					children: "STRIKE"
				})]
			}) : null]
		})]
	});
}
function Training() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-kicker",
			children: "Training"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl sm:text-4xl",
			children: "Shadow Strike."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadowStrike, {})]
	});
}
//#endregion
export { Training as component };
