/**
 * Item for random object
 */

const IsInteger = require("../Functions/Checks/IsInteger");

class Item {
	/**
	 * Easily create items for pooling using Random function! Just make sure to pass it as item.info
	 * @param {any} item The actual item to pass
	 * @param {Number} pools Number of pools the item gets (integer)
	 */
	constructor(item, pools = 1) {
		this.item = item;
		if (!IsInteger(pools)) return;
		this.pools = pools;
	}

	get __pools() {
		return this.pools;
	}

	get __item() {
		return this.item;
	}

	get info() {
		return {
			__item: this.__item,
			__pools: this.__pools,
		};
	}
}

module.exports = Item;
