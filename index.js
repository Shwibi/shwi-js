// Index file
// All the things will be exported from here
const Main = require("./Utils/Main");
const Tank = require("./Utils/Tank");
const Err = require("./Utils/Err");
const { Clock, Timer } = require("./Utils/Clock");

const Stack = require("./Stack/Stack");
const ErrorStack = require("./Stack/ErrorStack");

const Vector = require("./Physics/Vector");
const Angle = require("./Physics/Angle");
const PhysicsBody = require("./Physics/PhysicsBody");

const Random = require("./Functions/Random");
const RandomInt = require("./Functions/Generator/RandomInt");
const GenIntArray = require("./Functions/Generator/GenIntArray");
const GenOddIntArray = require("./Functions/Generator/GenOddIntArray");
const GenEvenIntArray = require("./Functions/Generator/GenEvenIntArray");
const MSToTime = require("./Functions/MSToTime");
const jsonify = require("./Functions/Jsonify");

const IsInteger = require("./Functions/Checks/IsInteger");
const IsOdd = require("./Functions/Checks/IsOdd");
const IsEven = require("./Functions/Checks/IsEven");
const IsNumber = require("./Functions/Checks/IsNumber");

const SqueezeString = require("./Functions/SqueezeString");
const RemoveReservedCharacters = require("./Functions/RemoveReservedCharacters");
const Log = require("./Functions/Log");
const Kill = require("./Functions/Kill");
const Countdown = require("./Functions/Countdown");
const Count = require("./Functions/Count");

const ColorProps = require("./Props/Colors");
const ReservedCharacters = require("./Props/ReservedCharacters");
const ReservedWordsArray = require("./Props/ReservedWords");
const Item = require("./Props/Item");

/**
 * @deprecated
 */
const Physics = require("./Sandbox/physics/Physics");

module.exports = {
  Main,
  Err,

  Clock,
  Timer,

  Random,

  Stack,
  ErrorStack,

  RandomInt,

  jsonify,

  IsInteger,
  IsOdd,
  IsEven,
  IsNumber,

  Log,

  Colors: ColorProps.Colors,
  Colorize: ColorProps.colorize,

  Sandbox: {
    parser: require("./Sandbox/storageParser"),
  },

  Tank,

  RemoveReservedCharacters,
  ReservedCharacters,
  ReservedWordsArray,
  SqueezeString,
  Kill,

  Countdown,
  Count,

  GenIntArray,
  GenEvenIntArray,
  GenOddIntArray,

  MSToTime,

  Physics,
  Vector,
  Angle,
  PhysicsBody,

  Item,
};
