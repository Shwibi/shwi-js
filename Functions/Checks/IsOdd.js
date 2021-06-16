const Err = require("../../Utils/Err");
const IsInteger = require("./IsInteger");

function IsOdd(integer) {
	if (!IsInteger(integer))
		return new Err("The specified item is not an integer!", "INVALID_INTEGER", {
			received: integer,
		});
	if (integer % 2 == 0) return false;
	else return true;
}

module.exports = IsOdd;
