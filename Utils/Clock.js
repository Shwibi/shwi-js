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
  static TimeDataTemp = { seconds: 0, minutes: 0, hours: 0, days: 0 };
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

  /**
   * Convert milliseconds to proper date format (seconds, minutes, hours, days)
   * @param {Number} duration The duration in MILLISECONDS (1 s = 1000ms)
   * @param {Boolean} debug Whether to debug (console log working)
   */
  static msToNormal(
    duration,
    debug = false,
    callback = (
      compiledData = Clock.TimeDataTemp,
      rawData = Clock.TimeDataTemp
    ) => {}
  ) {
    // Get times
    // const secs = (duration / 1000) % 60;
    // const mins = (duration / (1000 * 60)) % 60;
    // const hours = (duration / (1000 * 60 * 60)) % 24;
    const days = parseFloat((duration / (1000 * 60 * 60 * 24)).toFixed(0));
    const hours = parseFloat(
      (duration / (60 * 60 * 1000) - days * 24).toFixed(0)
    );
    const gotoMins = days * 24 * 60 + hours * 60;
    const mins = parseFloat((duration / (60 * 1000) - gotoMins).toFixed(0));
    const gotoSecs = gotoMins * 60 + mins * 60;
    const secs = parseFloat((duration / 1000 - gotoSecs).toFixed(0));
    let output = ``;
    const _days = days >= 1 ? days : 0;
    const _hours = hours >= 1 ? hours : 0;
    const _mins = mins >= 1 ? mins : 0;
    const _secs = secs >= 1 ? secs : 0;
    if (debug)
      console.log({
        days,
        hours,
        gotoMins,
        mins,
        gotoSecs,
        secs,
        output,
        _days,
        _hours,
        _mins,
        _secs,
      });

    output += _days >= 1 ? _days + " day(s) " : "";
    output += _hours >= 1 ? _hours + " hour(s) " : "";
    output += _mins >= 1 ? _mins + " minute(s) " : "";
    output += _secs >= 1 ? _secs + " second(s) " : "";

    callback(
      {
        seconds: _secs,
        minutes: _mins,
        hours: _hours,
        days: _days,
      },
      {
        seconds: secs,
        minutes: mins,
        hours: hours,
        days: days,
      }
    );
    return output;
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
