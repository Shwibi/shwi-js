// Generator an array of integers from specified start and end ints

const IsInteger = require("../Checks/IsInteger");
const Err = require("../../Utils/Err");

function GenIntArray(from = 0, to = 10, additive = 1) {

  if (!IsInteger(from, to, additive)) return new Err("From, to, and additive must be integers!", "INV_INT", { from, to, additive });
  let IntArray = [];
  for (let i = from; i <= to; i += additive) {
    IntArray.push(i);
  }

  return IntArray;

}

module.exports = GenIntArray;