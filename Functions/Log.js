const app_root = require("app-root-path");
const package = require(app_root + "/package.json");
const Colors = require("../Props/Colors");
function Log(...args) {
	console.log(Colors.colorize(`[Node/${package.name}]`, "yellow"), ...args);
}

module.exports = Log;
