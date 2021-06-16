# Stack

Stack is a better collection system for all your items! Well, kind of. It's basically a push to the top and pop from the top type of thing.

## new Stack(name?, expectedItems?)

Create a new stack using a constructor:

```js
const { Stack } = require("super-js");
new Stack("My stack");
```

Optionally, you can pass in an array of expected items in the stack:

```js
new Stack("Error Stack", [Err, Error]);
```

## Stack#push(item)

Push an item to the top of the stack!

```js
const stack = new Stack();
stack.push("Top!");
// The top becomes "Top!"
stack.push("New top!");
// The top now becomes "New top!"
```

To get the top item you can use the `Stack#topItem` property (get method).

## Stack#topItem

Gets the top item in the stack.

```js
const myStack = new Stack();
myStack.push(1);
myStack.push(4);
myStack.push("A string?!");
const top = myStack.topItem;
// top will be "A string?!"
```

## Stack#pop()

Pop the top item off of the stack and return it!

## Stack#item(index?, item?, returnItemType?)

Get an item from the stack, or replace an item. The index is the index of the stack item. If an item is provided, it will replace the item and return on the basis of the `returnItemType` provided.

Return item types:

| Value |           Returns           |
| :---- | :-------------------------: |
| 1     |    New item at the index    |
| 2     | Previous item at that index |
| 3     |  Return an object of both   |

The value type 3 returns an object that has the properties `newItem` and `previousItem`
