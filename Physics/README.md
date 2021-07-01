# shwi-js-physics @1.0.0

A physics extension for [shwi-js](https://www.npmjs.com/package/shwi-js)!

## Index

[Installation](#installation) \
[Usage](#usage) \
[Angle](#angle) \
[Vector](#vector)

## Installation

```
npm i shwi-js-physics
```

## Usage

```js
const physics = require("shwi-js-physics");
```

## Angle

---

`physics#Angle`

You can create angles now! It is pretty self explanatory, but:

### <a id="newAngle" name="newAngle"></a> `new Angle(value, unit)`

To create a new angle, just create a new instance with the value of the angle and the unit with it!

```js
const { Angle } = require("shwi-js-physics");
const myAngle = new Angle(10, "deg");
```

Allowed units are `degrees` or `radians`. \
Degrees: Alias[deg, degree, degrees] \
Radians: Alias[rad, radian, radians] \

### <a id="angle-rotate" name="angle-rotate"></a> `Angle#rotate(angle)`

Rotate this angle to a new angle! Just pass in another angle instance to rotate!

```js
const { Angle } = require("shwi-js-physics");
const myAngle = new Angle(0, "deg");
const angleToAdd = new Angle(10, "deg");
myAngle.rotate(angleToAdd);
//=> value = 10, unit = deg
```

Yes, you can also pass in different unit angles, it will automatically convert them.

### <a name="angleToRad" id="angleToRad"> </a> `Angle#toRadian`

Get the radian value of the angle. It will convert degrees to radian if the unit of angle is degrees, otherwise it will just return the value. (Because if the angle's unit is radian already, there's no need to convert, is there?)

### <a name="angleToDeg" id="angleToDeg"> </a> `Angle#toDegree`

Get the degre value of the angle. Same as `Angle#toRadian`

### `Angle.rads`

(Static) Get all the units allowed for radian.

### `Angle.degs`

(Static) Get all the units allowed for degree.

### `Angle.IsRad(unit)`

(Static) Check if a unit is in radian.

### `Angle.IsDeg(unit)`

(Static) Check if a unit is in degree.

## Vector

---

`physics#Vector`

Create a new vector (position).

### `new Vector(x, y)`

Create a new vector with positions. (Defaults to `Vector.ORIGIN`)

```js
const { Vector } = require("shwi-js-physics");
new Vector(0, 0);
```

### `Vector#move(x, y)`

Move this vector by a certain amount. It is the same as adding two vectors.

### `Vector#set(x, y)`

Set this vector position to something else.

### `Vector#add(Vector)`

Add another vector to this vector.

```js
const { Vector } = require("shwi-js-physics");
const myVector = new Vector(0, 2);
const vectorToAdd = new Vector(1, 5);
myVector.add(vectorToAdd);
//=> 1, 7
```

### `Vector#sub(Vector)`

Subtract another vector from this vector. Similar to `Vector#add()`

### `Vector#addResultant(value, angle)`

Add a resultant to this vector.

```js
const { Vector, Angle } = require("shwi-js-physics");
const myVector = new Vector(0, 0);
myVector.addResultant(5, new Angle(53, "deg"));
//=> myVector = 3, 4
```

### `Vector#subResultant(value, angle)`

Subtract a resultant from this vector. Similar to `Vector#addResultant()`

### `Vector#toArray`

Get the vector positions as an array. `[x, y]`

### `Vector#resultant`

Get the resultant value of this vector (without angle).

### `Vector#distanceFromOrigin`

Get the relative distance of the vector from origin.

```js
const { Vector } = require("shwi-js-physics");
const myVector = new Vector(3, 4);
console.log(myVector.distanceFromOrigin);
//=> 5
```

If the origin is different, say:

```js
const { Vector } = require("shwi-js-physics");
Vector.SetOrigin(1, 1);
const myVector = new Vector(5, 12);
console.log(myVector.distanceFromOrigin);
//=> 13
```

### `Vector#absolutePosition`

Get the absolute position of the vector, no matter what the origin. In above example, its value would be `6, 13`

### `Vector.ORIGIN`

(Static) The origin position. (Of all vectors)

### `Vector.CheckIfValidPos(x, y, callback(err))`

(Static) Check if the given vector components x and y are valid numbers.

```js
const { Vector } = require("shwi-js-physics");
Vector.CheckIfValidPos(0, 0, (err) => {
	if (err) return err.log();
	// do your thing
});
```

### `Vector.CalculateResultant(vector)`

(Static) Calculate the resultant value of a vector.

### `Vector.CalculateComponents(value, angle)`

(Static) Calculate the components of a resultant vector along with angle.

Returns a vector.
