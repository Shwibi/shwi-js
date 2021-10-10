const Err = require("../Utils/Err");
const IsInteger = require("./Checks/IsInteger");

/**
 * Count for some amount of seconds, then call a function afterwards if needed.
 * @param {Number} Time Time in seconds to count for
 * @example Count(5, (err, elapsed, remaining) => {
 *  if(err) return err.log();
 * }).then(() => {
 *  console.log("Done!")
 * })
 */
async function Count(
	Time = 5,
	callEachSecond = (err, elapsed, remaining) => {}
) {
	return new Promise((resolve, reject) => {
		if (!IsInteger(Time))
			return callEachSecond(
				new Err("Time must be an integer!", "INVTIME", { Time })
			);

		time = parseInt(Time);

		// Perform stuff
		for (let i = 0; i < time; i++) {
			setTimeout(() => {
				callEachSecond(null, i, time - i);
			}, i * 1000);
		}

		// Call after stuff
		setTimeout(() => {
			resolve();
		}, time * 1000);
	});
}

module.exports = Count;
