const Err = require("../Utils/Err");
const IsInteger = require("./Checks/IsInteger");

/**
 * Get a random integer between two integers!
 * @param {Number} from Lower limit integer
 * @param {Number} to Upper limit integer
 * @returns {Number} Random integer between `from` and `to`
 */

function RandomInt(from, to) {
	if (!IsInteger(from, to))
		return new Err("The specified inputs are not integers!", "INVALID_INTEGER");
	if (from > to)
		return new Err("From must be smaller than to", "FROM_BIGGER_THAN_TO");
	const total = to - from;
	const RNG = Math.floor(Math.random() * total) + from;
	return RNG;
}

module.exports = RandomInt;
