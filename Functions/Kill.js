// Kill the process

const Err = require("../Utils/Err");
const Countdown = require("./Countdown");
const Log = require("./Log");

/**
 * Kill the node process, useful if something goes ***really*** wrong in your code. (Manually)
 * @param {Number} timeInSeconds Time in seconds to wait until killing off
 */
function Kill(timeInSeconds = 5) {
  console.log(`
      [WARNING] KILLING PROCESS
  `);
  Countdown(timeInSeconds, (err, elapsed, remaining) => {
    if (err) return Log(err);
    console.log(`
      [WARNING] KILLING PROCESS IN ${remaining} SECONDS! ELAPSED: ${elapsed}
    `)
  });
  setTimeout(() => {
    process.exit();
  }, timeInSeconds * 1000)
}

module.exports = Kill;