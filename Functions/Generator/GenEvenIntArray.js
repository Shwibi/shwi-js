// Generate even numbers from and to

const Err = require("../../Utils/Err");
const IsEven = require("../Checks/IsEven");

function GenEvenIntArray(from = 0, to = 10) {

  if (!IsEven(from) || !IsEven(to)) return new Err("Integers from and to must be even in generating even int array!", "INV_INT", { from, to });
  let EvenIntArray = [];
  for (let i = from; i <= to; i += 2) {
    if(IsEven(i)) EvenIntArray.push(i);
  }

  return EvenIntArray;
  
}

module.exports = GenEvenIntArray;