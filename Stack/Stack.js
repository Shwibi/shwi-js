const Main = require("../Utils/Main");

class Stack extends Main {
	/**
	 *
	 * @param {String} name Name of the stack (optional)
	 * @param {Array<any>} expectedItems Array of items allowed in this stack, for example, a stack of errors would have [Err, Error, InvalidSyntaxError] etc. as this parameter. String "any" means any value is allowed
	 */
	constructor(name = "", expectedItems = ["any"]) {
		super("Stack", name);
		this.top = -1;
		this.items = {};
		this.expectedItems = expectedItems;
	}

	/**
	 * Push an item to the top of the stack
	 * @param this.expectedItems item The item to push to the top of the stack
	 */
	push(item) {
		// Increment the top variable so the item will be at the new top
		this.top++;
		// this.items[this.top] = item;
		return this.item(this.top, item, 1);
	}

	/**
	 * Pop the top item in the stack off and return it
	 * @returns Top item
	 */
	pop() {
		// Store the top item which will be deleted later, then return it
		let storedTopItem = this.topItem;
		this.items[this.top] = null;
		this.top = this.top - 1;
		return storedTopItem;
	}

	/**
	 * Get a particular item in the stack or set an item. Setting an item returns
	 * @param {Number} index The index of the item
	 * @param {any} item The item to set the index to (optional)
	 * @param {Number} returnItemType The return type. 1 = Return the new item. 2 = Return previous item at that index or new one if it doesn't exist. 3 = Return an object of both. Default 2
	 */
	item(index = this.top, item = false, returnItemType = 2) {
		// Check validity

		if (
			isNaN(index) ||
			index > this.top ||
			index < 0 ||
			isNaN(returnItemType) ||
			returnItemType < 0 ||
			returnItemType > 3
		)
			return;

		let previousItemOnIndex;
		if (item) {
			// Check validity of item
			let itemCanBePushed = false;
			this.expectedItems.forEach((expectedItem) => {
				if (expectedItem == "any" || item instanceof expectedItem)
					itemCanBePushed = true;
			});
			if (!itemCanBePushed) return;
			previousItemOnIndex = this.items[index];
			this.items[index] = item;
		} else {
			return this.items[index];
		}

		// Return on the basis of item return type
		switch (returnItemType) {
			case 1:
				return item;
			case 2:
				if (!previousItemOnIndex) return item;
				return previousItemOnIndex;
			case 3:
				return { newItem: item, previousItem: previousItemOnIndex };
			default:
				if (!previousItemOnIndex) return item;
				return previousItemOnIndex;
		}
	}

	/**
	 * Get the top item in the stack
	 */
	get topItem() {
		return this.items[this.top];
	}
}

module.exports = Stack;
