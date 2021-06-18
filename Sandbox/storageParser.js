const fs = require("fs");
const readline = require("readline");
const Err = require("../Utils/Err");

const RESERVED = `
abstract	arguments	await	boolean
break	byte	case	catch
char	class	const	continue
debugger	default	delete	do
double	else	enum	eval
export	extends	false	final
finally	float	for	function
goto	if	implements	import
in	instanceof	int	interface
let	long	native	new
null	package	private	protected
public	return	short	static
super	switch	synchronized	this
throw	throws	transient	true
try	typeof	var	void
volatile	while	with	yield
`;
const RESERVED_LIST = RESERVED.toLowerCase().split(/\s/);

/**
 * @static Static class
 * @deprecated Under construction. Use JSON for storage instead
 * @use JSON
 */
class Parser {
	static RESERVED_LIST = RESERVED_LIST;
	constructor() {}
	/**
	 *
	 * @param {String} path Path to the storage.sjs file
	 */
	static async Parse(
		path,
		callback = function (err = Err, object = Object) {}
	) {
		if (!(callback instanceof Function))
			return new Err("Callback must be a function!", "INVCB", {
				dont_log: true,
				callback,
			});
		fs.open(path, "r", async (err, fd) => {
			if (err)
				return callback(new Err(err, err.code, { path, dont_log: true }), null);

			const fileStream = fs.createReadStream(path);
			let lines = [];

			const rl = readline.createInterface({
				input: fileStream,
				crlfDelay: Infinity,
			});

			rl.on("line", (line) => {
				lines.push(line);
			});
			rl.on("close", () => {
				const dataobj = {};
				lines.forEach((line) => {
					if (!line.includes("=") || line[line.length - 1] !== ";")
						return callback(
							new Err("Invalid storage file!", "INVSJS", {
								line,
								dont_log: true,
							}),
							null
						);
					const equals = line.split("=");
					const fieldName = equals[0].split(/\s/)[0].trim();
					if (Parser.RESERVED_LIST.includes(fieldName.toLowerCase())) {
						callback(
							new Err("Field name cannot be reserved name!", "INVFLDNM", {
								fieldName,
								dont_log: true,
							}),
							null
						);
						return;
					}
					const fieldVal = equals[1]
						.trim()
						.substr(0, equals[1].trim().lastIndexOf(";"));
					dataobj[fieldName] = Parser.FieldEval(fieldVal);
				});
				return callback(null, dataobj);
			});
		});
	}

	static ArrPush(fieldVal) {
		if (Array.isArray(fieldVal)) {
			let array = [];
			fieldVal.forEach((dataValue) => {
				// if (isNaN(dataValue)) array.push(dataValue);
				// else parseFloat(array.push(dataValue));
				array.push(Parser.FieldEval(dataValue));
				console.log({ dataValue });
			});
			return array;
		}
	}

	static FieldEval(fieldVal) {
		const returner =
			fieldVal.startsWith("[") && fieldVal.endsWith("]")
				? Parser.ArrPush(fieldVal.substr(1, fieldVal.length - 2).split(", "))
				: isNaN(fieldVal)
				? fieldVal
				: parseFloat(fieldVal);
		return returner;
	}
}

module.exports = Parser;
