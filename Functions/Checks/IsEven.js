const IsOdd = require("./IsOdd");
const Err = require("../../Utils/Err");

function IsEven(integer) {
	if (IsOdd(integer) instanceof Err) return IsOdd(integer);
	return !IsOdd(integer);
}

module.exports = IsEven;
