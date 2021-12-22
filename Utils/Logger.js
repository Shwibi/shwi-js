/**
 * (c) @Shwi 2021
 * Logger
 */

const { Clock } = require("./Clock");
const Main = require("./Main");

class Logger extends Main {
  constructor(_custom_name = "Custom") {
    super("Logger", _custom_name);
    this.clock = new Clock(this.name);
  }

  /**
   * Print out
   * @param {...any} statement
   * @returns {Logger}
   */
  out(...statement) {
    this.Log(...statement);
    return this;
  }
  /**
   * Set the app name to default log
   * @param {String} name The new name
   * @returns {Logger}
   */
  setName(name) {
    Main.SetAppName(name);
    return this;
  }

  /**
   *
   * @param  {...any} args Arguments to log
   * @returns {Logger}
   */
  time(...args) {
    this.out(Clock.now, ...args);
    return this;
  }
}

const logger = new Logger("NodeApp");
module.exports = logger;
