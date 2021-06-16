const app_root = require("app-root-path");
const package = require(app_root + "/package.json");
function Log(...args) {
	console.log(`[Node/${package.name}]`, ...args);
}

module.exports = Log;
