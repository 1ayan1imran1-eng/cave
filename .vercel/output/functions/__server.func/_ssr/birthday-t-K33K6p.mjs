//#region node_modules/.nitro/vite/services/ssr/assets/birthday-t-K33K6p.js
var BIRTH = {
	year: 2008,
	month: 11,
	day: 2
};
function birthDate(year = BIRTH.year) {
	return new Date(year, BIRTH.month, BIRTH.day, 0, 0, 0, 0);
}
function nextBirthday(from = /* @__PURE__ */ new Date()) {
	const y = from.getFullYear();
	let next = birthDate(y);
	if (from >= next) next = birthDate(y + 1);
	return next;
}
function ageYears(from = /* @__PURE__ */ new Date()) {
	const b = birthDate();
	let age = from.getFullYear() - b.getFullYear();
	if (!(from.getMonth() > b.getMonth() || from.getMonth() === b.getMonth() && from.getDate() >= b.getDate())) age -= 1;
	return age;
}
function turningAge(from = /* @__PURE__ */ new Date()) {
	return ageYears(from) + (isBirthday(from) ? 0 : 1);
}
function isBirthday(from = /* @__PURE__ */ new Date()) {
	return from.getMonth() === BIRTH.month && from.getDate() === BIRTH.day;
}
function countdownTo(target, from = /* @__PURE__ */ new Date()) {
	const totalMs = Math.max(0, target.getTime() - from.getTime());
	const secondsTotal = Math.floor(totalMs / 1e3);
	return {
		totalMs,
		days: Math.floor(secondsTotal / 86400),
		hours: Math.floor(secondsTotal % 86400 / 3600),
		minutes: Math.floor(secondsTotal % 3600 / 60),
		seconds: secondsTotal % 60
	};
}
function livedFor(from = /* @__PURE__ */ new Date()) {
	const start = birthDate().getTime();
	const ms = Math.max(0, from.getTime() - start);
	return {
		ms,
		days: Math.floor(ms / 864e5),
		years: ageYears(from)
	};
}
//#endregion
export { livedFor as a, isBirthday as i, birthDate as n, nextBirthday as o, countdownTo as r, turningAge as s, ageYears as t };
