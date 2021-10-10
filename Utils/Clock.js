const Err = require("./Err");
class Timer {
	constructor() {
		this.start = Date.now();
		this.running = true;
	}
	get msTime() {
		if (this.running) return Date.now() - this.start;
		else return this.end - this.start;
	}
	get time() {
		return Clock.msToTime(this.msTime);
	}
	end() {
		if (!this.running) return this;
		this.running = false;
		this.end = Date.now();
		return this;
	}
}

class Clock {
	static msToTime(duration, isSec) {
		let ms = isSec ? duration * 1e3 : duration,
			lm = ~(4 * !!isSec) /* limit fraction */,
			fmt = new Date(ms).toISOString().slice(11, lm);

		if (ms >= 8.64e7) {
			/* >= 24 hours */
			let parts = fmt.split(/:(?=\d{2}:)/);
			parts[0] -= -24 * ((ms / 8.64e7) | 0);
			return parts.join(":");
		}

		return fmt;
	}

	static get now() {
		return Date.now();
	}

	static get og() {
		return new Date();
	}

	static sToTime(duration = 120) {
		return Clock.msToTime(duration * 1000);
	}

	static minToTime(duration = 2) {
		return Clock.msToTime(duration * 60 * 1000);
	}

	static fastMst(ms) {
		if (ms > 24 * 60 * 60 * 1000)
			return new Err("Maximum time for fastMst is 1 day!", "BIGTIME", {
				input: ms,
			});
		return new Date(ms).toISOString().slice(11, -1);
	}

	constructor() {
		this.startAt = new Date();
		this.startAtTimestamp = Date.now();
		this.timer = new Timer().end();
	}

	get time() {
		return new Date().toLocaleTimeString();
	}

	get date() {
		return new Date().toLocaleDateString();
	}

	get datetime() {
		return new Date().toLocaleString();
	}

	startTimer() {
		if (this.timer.running) return this.timer;
		this.timer = new Timer();
		return this.timer;
	}

	getTimerTime() {
		return this.timer.msTime;
	}

	endTimer() {
		return this.timer.end();
	}

	get relTimeMS() {
		return Clock.now - this.startAtTimestamp;
	}

	get relTime() {
		return Clock.fastMst(this.relTimeMS);
	}
}

module.exports = { Clock, Timer };
