// JSONify!

/**
 * Convert any object to a json format!
 * @param {*} input The input to convert into a json format
 * @param {Number} spacing The amount of index (defaults to 2)
 * @returns {String}
 */
function jsonify(input, spacing = 2) {
  return JSON.stringify(input, null, 2);
}

module.exports = jsonify;
