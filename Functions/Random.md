# Random

```js
const { Random, RandomItem } = require("shwi-js");
```

## Random(...): Items

You can use the `Random(...)` function to get a random object out of the given objects! \
This takes in all the values as individual parameters, so make sure to spread your array if you're using an array of items!

```js
Random(...array);
```

```js
Random(
	"rng",
	"value",
	"okay",
	"randoms",
	4972,
	472,
	957,
	["okay", "no"],
	"yeah"
);
// Returns a random value from these
// NOTE: The array is treated as ONE item
```

The most basic way to use the function would be using it to get a random item, with each item having an equal chance. \
But, we like to make it more **_spicy_**. Hence, we can use objects!

---

You can use an object `{}` to specify the pools each item would have. Along with that, you need to specify the actual item
inside the object as such:

```js
const MyObject = {
	__item: "This is an item",
	__pools: 10,
};
const AnotherObject = {
	__item: {
		name: "Look!",
		description: "I am speed!",
	},
	__pools: 30,
};
const randomItem = Random(
	MyObject,
	AnotherObject,
	{
		__item: ["Or", "Directly", "In", "here"],
		__pools: 17,
	},
	"or a string",
	"numbers work too",
	56,
	{
		__item: "Greatest",
		__pools: 40,
	}
);
// Returns a random object from the total pool
```

Here, `MyObject` has a 10/total pool chance. The total pool here is (10 + 30 + 17 + 1 + 1 + 1 + 40) = 100. So `MyObject` has
10/100 chance of being pulled, `AnotherObject` has 30/100 chance, `{__item: ["Or", "Directly", "In", "here"], __pools: 17}` has 17/100 chance, and "Greatest" has 40/100 chance. The direct items without specification have a 1/100 chance of being pulled.

### NOTE: There are TWO "`_`" (underscores) in `__item` and `__pools`

The function **always** returns the `__item` property in an object, and just the direct parameter if it isn't an object.

If you pass in an object without the `__pools` property, it will have a 1/total chance.

If you pass in an object without the `__item` property, it will be treated as a standalone item equivilant to `__item`.

## RandomInt(from, to): Integer

We are all tired of using the `Math.random() * number + anotherNumber` then forgetting to add the `Math.floor()` into it, aren't we? To fix that, there's an easy way out! Just use `Random(from, to)` function to get a random integer from `from` to `to`!

```js
RandomInt(1, 10);
// Returns a random integer from 1 to 10

RandomInt(100, 788);
// Returns a random integer from 100 to 788
```

It's just that easy!
