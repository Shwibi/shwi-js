//#region IMPORTS=============================================================================================

const Err = require("../Utils/Err");
const Angle = require("./Angle");
const IsNumber = require("../Functions/Checks/IsNumber");

//#endregion IMPORTS==========================================================================================

class Vector {
	//#region Static============================================================================================

	static ORIGIN = new Vector(0, 0);
	static AllVectors = [];

	/**
	 * Set the origin of the vector
	 */
	static SetOrigin(x = 0, y = 0) {
		Vector.CheckIfValidPos(x, y, (err) => {
			if (err) return err.log();

			x = parseFloat(x);
			y = parseFloat(y);

			Vector.AllVectors.forEach((vector) => {
				vector.sub(new Vector(x, y).sub(Vector.ORIGIN));
			});
		});
	}

	/**
	 * Check if certain x and y coordinates are valid
	 */
	static CheckIfValidPos(x = 0, y = 0, callback = (err = new Err()) => {}) {
		if (!IsNumber(x, y))
			return callback(
				new Err("Vector of x and y must be integers!", "INV_INT", {
					x,
					y,
					dont_log: true,
				})
			);
		else return callback(null);
	}

	/**
	 * Calculate the resultant from a Vector vector
	 */
	static CalculateResultant(vector = new Vector(3, 4)) {
		return Math.sqrt(vector.x * vector.x + vector.y + vector.y);
	}

	static CalculateComponents(resultant = 5, angle = new Angle(45, "deg")) {
		const x_compo = Math.floor(Math.cos(angle.toRadian) * resultant);
		const y_compo = Math.floor(Math.sin(angle.toRadian) * resultant);
		return new Vector(x_compo, y_compo);
	}

	//#endregion Static========================================================================================

	/**
	 * Create a new vector
	 */
	constructor(x = 0, y = 0) {
		Vector.CheckIfValidPos(x, y, (err) => {
			if (err) return err.log();
			this.x = x;
			this.y = y;
		});
		Vector.AllVectors?.push(this);
	}

	//#region Methods==========================================================================================

	/**
	 * Move this vector vector by some amount to another point
	 */
	move(x = 0, y = 0) {
		Vector.CheckIfValidPos(x, y, (err) => {
			if (err) return err.log();
			this.x += x;
			this.y += y;
		});

		return this;
	}

	/**
	 * Set the vector of this vector to some coordinates
	 */
	set(x = this.x, y = this.y) {
		Vector.CheckIfValidPos(x, y, (err) => {
			if (err) return err.log();
			this.x = x;
			this.y = y;
		});

		return this;
	}

	/**
	 * Add another vector (vector) to this vector (vector)
	 */
	add(vector = new Vector(0, 0)) {
		this.move(vector.x, vector, y);

		return this;
	}

	/**
	 * Subtract another vector (vector) from this vector (vector)
	 */
	sub(vector = new Vector(0, 0)) {
		this.add(new Vector(-vector.x, -vector.y));

		return this;
	}

	/**
	 * Add a resultant to this vector
	 */
	addResultant(value = 0, angle = new Angle(0)) {
		const componentVector = Vector.CalculateComponents(value, angle);
		this.add(new Vector(componentVector.x, componentVector.y));

		return this;
	}

	/**
	 * Subtract a resultant from this vector (vector)
	 */
	subResultant(value = 0, angle = new Angle(0)) {
		this.addResultant(-value, angle);

		return this;
	}

	//#endregion Methods=======================================================================================

	//#region Get methods======================================================================================

	get toArray() {
		return [this.x, this.y];
	}

	get resultant() {
		return Vector.CalculateResultant(this);
	}

	get distanceFromOrigin() {
		return this.resultant;
	}

	get absolutePosition() {
		return this.add(Vector.ORIGIN);
	}

	//#endregion Get methods===================================================================================
}

//Exports
module.exports = Vector;

/** Testing */
