# shwi-js @1.1.3-beta.3

All updates and documentation on the [Wiki](https://github.com/Shwibi/shwi-js/wiki). Please refer to the wiki for latest updated docs. \
[Release Notes](./ReleaseNotes.md) \
Feel free to open an [Issue](https://github.com/Shwibi/shwi-js/issues) if you find anything wrong in the module! Or open a new [Discussion](https://github.com/Shwibi/shwi-js/discussions) if you have any suggestions, or just want to give a feedback!

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

Latest feature update: `1.1.3-beta.2`

**Please refer to the [Docs(wiki)](https://github.com/Shwibi/shwi-js/wiki) for proper documentation and updates** \
[Main Class](#main-class) \
[Random integer and items](https://github.com/Shwibi/shwi-js/wiki/Random) \
[Err](https://github.com/Shwibi/shwi-js/wiki/Error) \
[Stack](https://github.com/Shwibi/shwi-js/wiki/Stack) \
[Colors](https://github.com/Shwibi/shwi-js/wiki/Colors) \
[Parser](https://github.com/Shwibi/shwi-js/wiki/Parser) \
[Tank](https://github.com/Shwibi/shwi-js/wiki/Tank) \
Random Integer Generators \
Kill Function \
[Countdown](https://github.com/Shwibi/shwi-js/wiki/Countdown) \
[Physics](https://github.com/Shwibi/shwi-js/wiki/Physics) \
Clock

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
