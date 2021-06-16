# Errors

The `Err` class is a better way to create errors! It has all the properties of a normal error, and more!

```js
const { Err } = require("@shwi/super-js");

new Err("My leg is missing!", "LEG_CODE", { leg: "missing" });
// All of these properties are optional
```

The `Err(...)` constructor takes in **three** (all optional) parameters: The error message, The error code, The error object.

## Error message

The error message is a string that describes the error.

## Error code

The error code is a breif code of the error, it is also the string logged as `[Node/app/Error/<Code>]` in the console.

## Error object

The error object is just a plain object containing more information about the error, if any. It can also contain the `dont_log` boolean value to specify whether to log this error when constructed or not. (true = not logged. false(default) = logged)

## Error#log()

The `log()` method on an error logs the error to the console.

```js
const { Err } = require("@shwi/super-js");
const error = new Err("Error!", "ERR", { dont_log: true });
error.log();
// Logs the error to the console along with all the details
```

## Error#fatal()

Make the error fatal. This throws the error to the console, quitting the process.

## Error#as_json

The `as_json` get method returns a JSON object of the error.

## Error#info

The `info` get method returns an object with all the error info:

```js
{
  id: Number,
  code: String,
  message: String,
  details: {
    at: Date,
    time: String,
    day: String,
    timestamp: Number,
    localDate: String,
    raw_err: Error
  },
  resolved: Boolean
}

const { Err } = require("@shwi/super-js");
const error = new Err("error", "ERR", {dont_log: true});
const errorInfo = error.info;
```

## Error#resolve()

The `resolve()`method resolves the error. This calls the callback function specified by the user (if any)

## Error#onResolve(Function)

The `onResolve(Function)` method takes in a function that will be called when the error is resolved.

```js
const superjs = require("@shwi/super-js");
const error = new superjs.Err("Error!", "ERR", { dont_log: true });
error.onResolve(() => {
	superjs.Log("Error resolved!");
});
```

## That's it for the error!
