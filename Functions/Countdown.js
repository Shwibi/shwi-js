const Err = require("../Utils/Err");
const IsInteger = require("./Checks/IsInteger");
const Count = require("./Count");

/**
 *
 * @param {Err} err
 * @param {Number} elapsed
 * @param {Number} remaining
 */
function func(err, elapsed, remaining) {}

/**
 * Countdown for a set time and call a function for each second!
 * @param {Number} timeInSeconds Time in seconds to countdown for
 * @param {Function} doSomethingAfter Function to be called after the entire time
 * @deprecated Use {@link Count} instead
 */
function Countdown(
	timeInSeconds = 5,
	functionToDo = func,
	doSomethingAfter = () => {}
) {
	if (!IsInteger(timeInSeconds))
		return functionToDo(
			new Err("Time in seconds must be an integer!", "INV_NUM", {
				timeInSeconds,
			})
		);

	for (let i = 0; i <= timeInSeconds; i++) {
		setTimeout(() => {
			functionToDo(null, i, timeInSeconds - i);
		}, i * 1000);
	}

	setTimeout(() => {
		doSomethingAfter();
	}, timeInSeconds * 1000);
}

module.exports = Countdown;
