const RESERVED_REG = require("../Props/ReservedCharacters");

/**
 * Remove all the reserved characters from a string! Useful for when you want to push a key to an object but don't want any errors.
 * Matches regex removed {@link RESERVED_REG}
 * @param {String} stringToRemoveFrom The string which you want to remove reserved characters from
 * @param {String} replaceAllWith [OPTIONAL] Replace all reserved characters with? (By default it just removes them)
 * @returns {String} Updated string
 */
function RemoveReservedCharacters(stringToRemoveFrom = "", replaceAllWith = "") {
  return stringToRemoveFrom.split(RESERVED_REG).join(replaceAllWith ?? "");
}
module.exports = RemoveReservedCharacters;