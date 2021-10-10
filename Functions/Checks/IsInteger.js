const IsNumber = require("./IsNumber");

/**
 * Check if an item or multiple items are actually integers! Returns false if any of the items are not integers.
 * @param  {...any} input All the items to check!
 * @returns {Boolean} true: the item(s) is/are indeed integers/false: at least one of the item(s) is not an integer.
 */
function IsInteger(...input) {
	let areInts = true;
	input.forEach((inp) => {
		if (!IsNumber(inp)) areInts = false;
		if (
			isNaN(parseFloat(inp)) ||
			parseFloat(inp) !== Math.floor(parseFloat(inp))
		)
			areInts = false;
	});
	return areInts;
}

module.exports = IsInteger;
