const Log = require("../Functions/Log");
const Err = require("../Utils/Err");
const Stack = require("./Stack");

class ErrorStack extends Stack {
	constructor() {
		super("ErrorStack", [Err]);
	}

	get all() {
		return JSON.stringify(this.items);
	}

	log() {
		this.items.forEach((item) => {
			item.log();
		});
	}
}

const errStack = new ErrorStack();

module.exports = errStack;
