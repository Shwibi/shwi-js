const fs = require("fs");
const readline = require("readline");
const RemoveReservedCharacters = require("../Functions/RemoveReservedCharacters");
const SqueezeString = require("../Functions/SqueezeString");
const ReservedCharacters = require("../Props/ReservedCharacters");
const RESERVED_WORDS_ARRAY = require("../Props/ReservedWords");
const Err = require("../Utils/Err");

/**
 * @static Static class
 */
class Parser {
	constructor() {
		throw new Err("Parser is a static class! Cannot create a new one!", "PARSER_STATIC").as_json;
	}
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
					const fieldName = RemoveReservedCharacters(SqueezeString(equals[0]));
					if (RESERVED_WORDS_ARRAY.includes(fieldName.toLowerCase())) {
						const fieldNameErr = new Err("Field name cannot be reserved name!", "INVFLDNM", {
							fieldName,
							dont_log: true,
						});
						callback(
							fieldNameErr,
							null
						);
						throw fieldNameErr;
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

//testing
Parser.Parse("./storage.sjs", (err, data) => {
	if (err) return console.log(err);
	console.log({data});
})