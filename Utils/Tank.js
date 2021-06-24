// Database storage mod - test
// Add date: 23/06/2021/Wednesday

const RemoveReservedCharacters = require("../Functions/RemoveReservedCharacters");
const Main = require("./Main");
/**
 * Tank storage like a collection database!
 */
class Tank extends Main {
  /**
   * Create a new tank storage that stores everything you want!
   * @param {String} name Name of the tank Logged: [app/Tank/name] NOTE: Cannot have spaces (all spaces will be converted to subsets). For multiple words either use Camel casing or underscores (multipleWords)(Multiple_Words)
   */
  constructor(name = "storage") {
    super("tank", ...name.split(/\s/));
    this.cell = {};
    this.cache = {
      info: {},
      error: {},
      warning: {},
      success: {}
    };
    this.cacheColorExchange = {
      info: "cyan",
      warning: "yellow",
      error: "red",
      success: "green"
    }
  }

  /**
   * 
   * @param {String} key The key it should be known as
   * @param {any} value Value of the key
   */
  set(key, value) {
    key = RemoveReservedCharacters(key);
    this.cell[key] = value;
  }

  /**
   * Get an item from the tank
   * @param {String} key Key value
   * @returns {any} Element value
   */
  get(key) {
    return this.cell[key];
  }

  /**
   * Loop through the items in the tank
   * @param {Function} function_callback Callback(element)
   */
  forEachOf(function_callback = function (element) { }) {    
    for (const keyValue in this.cell) {
      function_callback(this.cell[keyValue]);
    }
  }

  /**
   * Delete an item from the tank 
   * @param {String} key Key value of item to delete
   * @returns {Tank} Tank
   */
  delete(key) {
    if (this.cell[key]) this.cell.key = null;
    return this;
  }

  /**
   * Store a value to the top
   * @param {any} value Value to store on the top
   */
  push(value) {
    this.cell.top = value;
    return this;
  }

  /**
   * Get the top item in this tank!
   */
  get top() {
    return this.cell.top || null;
  }

  /**
   * Pop off the top item if any and return it!
   * @returns {any} Top item
   */
  pop() {
    if (this.cell.top) {
      this.cell.top = null;
      return;
    }
    return this.cell.top;
  }

  /**
   * Stamp a value to the tank which stores it on the timestamp which is returned as a date!
   * @param {any} value Value to stamp
   * @returns {Date} Date of stamp
   */
  stamp(value) {
    const dated = new Date();
    this.cell[dated.getTime()] = value;
    return dated;
  }

  /**
   * Cache a message in the tank which can be logged. This is NOT stored in the tank storage which stores items. For that, use {@link Tank.set}
   * @param {String} message Message to cache
   * @param {String} state info|warning|error|success
   */
  cacheM(message, state = "info") {
    if (!this.cacheColorExchange[state]) state = "info";
    state = state.toLowerCase();
    this.cache[state.toLowerCase()][Date.now()] = message;
    this.RawLog({name_subset: state, color: this.cacheColorExchange[state], args: [message]});
  }

  /**
   * Log the cachein this tank
   * @returns JSON log
   */
  logCache() {
    return this.Log(JSON.stringify(this.cache, undefined, 2));
  }

  /**
   * Log the storage items in this tank
   * @returns JSON log
   */
  log() {
    return this.Log(JSON.stringify(this.cell, undefined, 2));
  }

}

module.exports = Tank;