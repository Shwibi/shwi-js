const Colors = {
	Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",

	black: "\x1b[30m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m",

	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m",
};
/**
 * Colorize a string of text!
 * @param {String} text The string text to colorize
 * @param {String} options Strings of options (like "white", "red", "BgWhite", "BgRed", "Bold", "Dim", etc.)
 * @returns {String} Colored String
 */
function colorize(text = "", ...options) {
	let opts = "";
	options = options ?? "white";
	options.forEach((opt) => {
		opts += Colors[opt] ?? Colors.white;
	});
	return `${opts}${text}${Colors.Reset}`;
}

module.exports = { Colors, colorize };
