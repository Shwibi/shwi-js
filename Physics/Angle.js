// Angle class

//#region Imports===================================================================

const Err = require("../Utils/Err");

//#endregion Imports================================================================

class Angle {
	//#region Static==================================================================
	static rads = ["rad", "radian", "radians"];
	static degs = ["deg", "degree", "degrees"];
	static all = [...Angle.rads, ...Angle.degs];
	static IsValidUnit(unit = "deg", callback = (err = new Err()) => {}) {
		if (!Angle.all.includes(unit?.toLowerCase()))
			return callback(
				new Err("Unit must be in deg or rad!", "INV_UNIT", {
					unit,
					dont_log: true,
				})
			);
		return callback();
	}

	static IsRad(unit = "rad") {
		if (Angle.rads.includes(unit?.toLowerCase())) return true;
		else return false;
	}

	static IsDeg(unit = "deg") {
		if (Angle.degs.includes(unit?.toLowerCase())) return true;
		else return false;
	}

	//#endregion Static================================================================

	/**
	 * Create a new angle!
	 */
	constructor(value = 0, unit = "deg") {
		Angle.IsValidUnit(unit, (err) => {
			if (err) return err.log();
			this.value = value;
			this.unit = unit;
		});
	}

	/**
	 * Rotate by some angle
	 */
	rotate(angle = new Angle()) {
		if (angle.unit == this.unit) this.value += angle.value;
		else {
			const degrees = angle.toDegree + this.toDegree;
			const radians = angle.toRadian + this.toRadian;
			if (Angle.IsRad(this.unit)) {
				this.value = radians;
			} else if (Angle.IsDeg(this.unit)) {
				this.value = degrees;
			} else
				return new Err("Unknown unit! Cannot add!", "INV_UNIT", {
					unit_of_adder: angle.unit,
					unit_of_angle: this.unit,
				});
		}

		return this;
	}

	//#region Get methods==============================================================

	get toRadian() {
		if (Angle.IsRad(this.unit)) return this.value;
		if (Angle.IsDeg(this.unit)) {
			return (Math.PI / 180) * this.value;
		} else
			return new Err("Invalid angle unit, cannot convert!", "INV_UNIT", {
				unit: this.unit,
			});
	}

	get toDegree() {
		if (Angle.IsDeg(this.unit)) return this.value;
		if (Angle.IsRad(this.unit)) {
			return (180 / Math.PI) * this.value;
		} else {
			return new Err("Invalid angle unit, cannot convert!", "INV_UNIT", {
				unit: this.unit,
			});
		}
	}

	//#endregion Get methods===========================================================
}

// Exports
module.exports = Angle;
