// Select a random thing from things
/**
 * Get a random item out of the given items! If you want further customisation, use objects with {__item: your_item_here, __pools: number_of_pools}, {__item: you_can_just_enter_any_object_too, without: pools}, "or a string with it", etc.
 * Passing no item just sends back a random float between 0-1
 * @param  {...any} items All the items to be entered into random
 * @returns {any} Randomised item
 */
function Random(...items) {
	// __item = item
	// __pools = number of pools
	let allItems = [];
	let totalItems = 0;

	// Push items to all items with pools
	items.forEach((item) => {
		// Store for later use for lower limit
		let poolLowerLimit = totalItems;

		// If item is object, use that
		if (item instanceof Object && item.__item) {
			if (!isNaN(item.__pools)) {
				totalItems += item.__pools < 0 ? 1 : item.__pools;
			} else totalItems++;

			item.__pool_low = poolLowerLimit;
			item.__pool_high = totalItems;

			item.__item = item.__item ?? "invalid __item";

			allItems.push(item);
		} else {
			// Else create an object
			totalItems++;

			const push_item = {
				__item: item,
				__pool_low: poolLowerLimit,
				__pool_high: totalItems,
			};

			allItems.push(push_item);
		}
	});

	let randomNumber = Math.random() * totalItems;

	let output = Math.random();

	allItems.forEach((item) => {
		if (item.__pool_low < randomNumber && randomNumber < item.__pool_high) {
			output = item.__item;
		}
	});

	return output;
}

module.exports = Random;
