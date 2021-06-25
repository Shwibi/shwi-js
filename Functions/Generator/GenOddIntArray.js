// Generate odd integers from and to

const Err = require("../../Utils/Err");
const IsOdd = require("../Checks/IsOdd");

function GenOddIntArray(from = 1, to = 5) {

  if (!IsOdd(from) || !IsOdd(to)) return new Err("From and to must be odd integers in generating odd integer array!", "INV_INT", { from, to });
  let OddIntArray = [];
  for (let i = from; i <= to; i += 2) {
    if (IsOdd(i)) OddIntArray.push(i);
  }

  return OddIntArray;
  
}

module.exports = GenOddIntArray;