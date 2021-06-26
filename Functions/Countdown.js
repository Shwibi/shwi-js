const Err = require("../Utils/Err");
const IsInteger = require("./Checks/IsInteger");

/**
 * Countdown for a set time and call a function for each second!
 * @param {Number} timeInSeconds Time in seconds to countdown for
 */
function Countdown(timeInSeconds = 5, functionToDo = (err = Err, elapsed = Number, remaining = Number) => { }, doSomethingAfter = () => { }) {
  if (!IsInteger(timeInSeconds)) return functionToDo(new Err("Time in seconds must be an integer!", "INV_NUM", { timeInSeconds }))

  for (let i = 0; i <= timeInSeconds; i++) {
    setTimeout(() => {
      functionToDo(null, i, timeInSeconds - i);
    }, i * 1000)
  }

  setTimeout(() => {
    doSomethingAfter();
  }, timeInSeconds * 1000);
}

module.exports = Countdown;