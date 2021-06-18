# Parser

`Introduced in 0.0.3-alpha.1`

The new parser is **unstable** parsing utility that allows you to store data in `sjs` files. It is very simple and does not require strings. It can be used to store and maintain lightweight variables such as strings, numbers, and one dimensional arrays.

## Storing sjs

Just create an sjs file similar to `storage.sjs` inside the `Sandbox` folder. It has just a few simple rules:

1. No reserved keywords
2. Identifiers and values are separated by "="
3. All lines end with a semi colon
4. Arrays are enclosed in "[]" and each item is separated by ", " (The space after the comma is **necessary**)

```sjs
my_name = Shwibi;
description = My name is Shwibi! I am a person.;
age = 666;
friends: [none, at, all];
```

## Parsing sjs

To parse sjs, just use the `Parser` (static) class. It is marked as depracated but so far, if you have followed the 4 golden rules, it should work.

```js
const { Sandbox } = require("shwi-js");
const parsed_data = Sandbox.Parser.Parse("absolute path to file");
// Parsed data will be a javascript object
{
  my_name: "Shwibi",
  description: "My name is Shwibi! I am a person.",
  age: 666,
  friends: ["none", "at", "all"]
}
```

It's that easy!