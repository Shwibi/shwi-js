/**
 * Check whether a certain thing is a number or not
 * @param {any} toCheck The item/object/thing to check
 * @returns {Boolean}
 */
function IsNumber(toCheck) {
	if (!isNaN(toCheck) || !isNaN(parseFloat(toCheck))) return true;
	return false;
}

module.exports = IsNumber;
