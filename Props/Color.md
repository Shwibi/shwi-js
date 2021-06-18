# Colors

Use Colors to colorize your console output! The usage is pretty easy:

```js
const shwijs = require("shwi-js");
console.log(shwijs.Colorize("Yellow!", "yellow"));
// Logs "Yellow!" in yellow color
```

You can also pass in multiple parameters (for dim, background, etc.)

```js
shwijs.Colorize("Background is cyan, I am black!", "black", "BgCyan");
```

NOTE: The color parameters must be exactly same as the ones in the `Colors` object (shwijs#Colors)

## shwijs#Colorize(string, ...colors?)

You can pass in multiple options one by one as individual parameters.

## shwijs#Colors

This is an object of all the colors for the node.js console. Putting any of these values before a string will give that string the specified color/specialty. Keep in mind, you need to reset the console back to normal after the string, otherwise all other logs after your string log will be formatted in the same way!

## NOTE: If you want more functionality, please use the `colors` package. It offers much more options and better customisation and formatting, etc. Overall, it's just must better if you want a better color panel.
