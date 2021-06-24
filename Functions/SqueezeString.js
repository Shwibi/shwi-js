/**
 * Squeeze a string into one word without spaces and capitalized!
 * @param {String} stringToSqueeze string to squeeze
 * @returns {String} squeezed string
 */
function SqueezeString(stringToSqueeze = "") {
  const splitBySpace = stringToSqueeze.trim().split(/\s/);
  let result = "";
  splitBySpace.forEach(item => {
    item = item.trim();
    result += item.substr(0, 1).toUpperCase() + item.substr(1, item.length);
  })
  return result.trim();

}

module.exports = SqueezeString;