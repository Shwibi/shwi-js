# shwi-js @0.0.5-alpha.1

All updates and documentation on the [Wiki](https://github.com/Shwibi/shwi-js/wiki). Please refer to the wiki for latest updated docs.

## Installation

```
npm i shwi-js
```

## What is shwi-js?

Shwi-js is an easy to use npm module that allows you to make your javascript code better! It makes many things easier, and has many new classes and functions that are usually very annoying to code!

## Usage

```js
const shwijs = require("shwi-js");
```

Just require the shwi js module, and get to coding!

## Feature list

Latest feature update: `0.0.4`

1. Main class that can be extended by all your other classes. `shwijs#Main`

   Logging feature \
   Can include all the objects or functions you need in every class \
   [View docs](#main-class)

2. Random item selector `shwijs#Random`

   Input all your items into the Random function and get a random item back! \
   You can also specify particular items to have more chance in being picked! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Random)

3. Random integer from and to `shwijs#RandomInt`

   Get a random integer from specified integer to specified integer! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Random)

4. Log `shwijs#Log`

   A raw log function if you're not using classes!

5. Custom error `shwijs#Err`

   Custom errors that are better than normal errors! \
   Includes error ids \
   Includes node.js error automatically \
   Automatically sets the date and time of error \
   Auto-logs (can be turned off for all errors or just one error too) \
   Manual logs \
   JSON errors \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Error)

6. Stack `shwijs#Stack`

   Better collection type! All items pushed to the top, and you can pop off the top item and get it back! \
   You can specify particular items if you only want some particular type of items in a stack \
   Create your own custom stacks by extending this! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Stack)

7. Colors `shwijs#Colors`

   Ability to colorize a string of text! You can format a string in any way, and it will be logged that way in the console! \
   You can also access the `shwijs#Colors` object to customise a string in your own way! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Colors)

8. Parser `shwijs#Sandbox#parser`

   Create a new, easy to store storage file `.sjs`! No quotations involved, no curly brackets, just plain storage! \
   Now with the ability to squeeze string automatically, you can have spaces and it will convert them to capitalized object names! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Parser)

9. Tank (Collection Storage) `shwijs#Tank`

   A brand new and easy way to store things! Better way to manage things. A bit like Collection from discord.js. Documentation coming soon! \
   Ability to set and get values. \
   Ability to push to the top and pop from the top. \
   Cache messages and log messages (colored in console) to keep track of things. \
   Does all the hard work like removing spaces and capitalizing key values for you! \
   [View docs](https://github.com/Shwibi/shwi-js/wiki/Tank)

## Props

Props are the extra stuff you need sometimes but are a pain to collect. It includes: 

1. Colors object
2. Reserved characters in object regexp
3. Reserved words array

## Functions

Functions are the important functions you might need to use in your code. Includes:

1. Integer checks (IsEven, IsOdd, IsInteger)
2. Log
3. Random item
4. Random integer
5. Remove reserved characters from a string
6. Squeeze strings

## Main class

```js
const shwijs = require("shwi-js");
class MyClass extends shwijs.Main {
	constructor() {
		super("MyClass");
		this.Log("Hello!");
	}
}
const myClassInstance = new MyClass();
// Logs [Node/your_project_name/MyClass]: Hello to the console
```

To change the project name, you can do `shwijs.Main.APP_NAME = "whatever you want"`!
(By default, it takes the project name from your package.json file)

You can also pass in multiple names for the class `super()` function, if you're making class that is supposed to be part of another class:

```js
const shwijs = require("shwi-js");
class MyClass extends shwijs.Main {
	constructor(name) {
		super("MyClass", name);
	}
}
const myClassInstance = new MyClass();
class MyClassSubset extends MyClass {
	constructor() {
		super("SubsetA");
		this.Log("Hello!");
	}
}
const myClassSubsetInstance = new MyClassSubset();
// Logs [Node/app_name/MyClass/SubsetA]: Hello! to the console
```

You can also manually change the `app_name` in the console logs using `Main.SetAppName(name)` method! \
**NOTE**: This is a static method.
