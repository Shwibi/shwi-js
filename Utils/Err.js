const Main = require("./Main");

class Err extends Main {
  static LogByDefault = true;
  static ErrorCount = 0;

  /**
   * Create a new error
   * @param {String} message The message of error
   * @param {String} code Error code (optional)
   */
  constructor(
    message = "An Unknown Error occurred!",
    code = "ERR",
    details = {
      dont_log: !Err.LogByDefault,
    }
  ) {
    super("Error", code);

    Err.ErrorCount++;
    this.id = Err.ErrorCount;

    this.code = code;
    this.message = message;

    if (!(details instanceof Object))
      return new Err("Details must be an object!", "INVDET");

    let date = new Date();
    details.at = date;
    details.time = date.toLocaleTimeString();
    details.day = date.toLocaleDateString();
    details.timestamp = Date.now();
    details.localDate = date.toLocaleString();

    details.raw_err = new Error(this.message);
    this.details = details;

    this.resolved = false;
    this.onResolveCallback = function () {
      this.Log(
        `Resolved error ${this.id} from ${this.details.localDate} | Code: ${this.code} | Message: ${this.message}!`
      );
    };

    // Log error if allowed
    if (Err.LogByDefault && !this.details.dont_log) this.log();
  }

  /**
   * Log the error to the console
   * @returns {Err} Error instance
   */
  log(...extra) {
    extra = extra || [];
    this.Log(this.message, this.details, ...extra);
    return this;
  }

  /**
   * Make this error fatal (throws the error)
   */
  fatal() {
    throw this.as_json;
  }

  /**
   * Get error data as json string
   */
  get as_json() {
    return JSON.stringify(this.info);
  }

  /**
   * Get error info
   */
  get info() {
    return {
      id: this.id,
      code: this.code,
      message: this.message,
      details: this.details,
      resolved: this.resolved,
    };
  }

  /**
   * Resolve this error
   */
  resolve() {
    if (!this.resolved) this.resolve = true;
    this.onResolveCallback();
    return this;
  }

  /**
   * Do some function automatically once this error gets resolved
   * @param {Function} callback Callback function to be called once error is resolved
   */
  onResolve(callback = this.onResolveCallback) {
    if (!(callback instanceof Function))
      return new Err("Callback must be a function!", "INVALID_CALLBACK", {
        callback,
      });
    this.onResolveCallback = callback;
    return this;
  }
}

module.exports = Err;
