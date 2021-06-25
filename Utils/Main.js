// Main class (extended by all classes)
const app_root = require("app-root-path");
const Colors = require("../Props/Colors");
class Main {
	// Default app name
	static APP_NAME = require(app_root + "/package.json").name;

	/**
	 * Create the main app process
	 * @param {String} name The name of the app process (For eample, a class which is a stack will have the name "Stack")
	 */
	constructor(...name) {
		// Set app line
		let final_name = "";
		name.forEach((element) => {
			if (element.length !== 0) {
				final_name += `/${element}`;
			}
		});

		// Set the name of the class, which will be used in logging
		this.name = `${Main.APP_NAME}${final_name}`;
		this.colored_name = Colors.colorize(
			`[${Main.APP_NAME}${final_name}]:`,
			"yellow"
		);
	}

	/**
	 * Log anything to the console, along with the app name automatically \
	 * Use {@link Main.SetAppName} to set the app name!
	 * @param  {...any} args Data to log
	 */
	Log(...args) {
		args = args ?? [""];
		console.log(this.colored_name, ...args);
	}

	/**
	 * Set the app name to something else!
	 * @param {String} name Name of app
	 */
	static SetAppName(name = Main.APP_NAME) {
		Main.APP_NAME = name;
	}

	/**
	 * Raw log function (x1) Logs using custom subset of logs [name/your_subset_here]: ...data
	 * @param {String} name_subset Subset of the name you want to log with
	 * @param  {...any} args Data
	 */
	RawLog({name_subset, color = "yellow", args}) {
		args = args ?? [""];
		console.log(Colors.colorize(`[${this.name}/${name_subset}]:`, color, "Bright"), ...args);
	}
}

// Export Main class
module.exports = Main;

// Set global Main class
global.Main = Main;
