//#region Imports==========================================================================

const Log = require("../Functions/Log");
const Vector = require("./Vector");

//#endregion Imports=======================================================================

class PhysicsBody {
	//#region Static=========================================================================

	static CheckIfValidMass(mass) {
		if (isNaN(mass)) return false;
		if (mass <= 0) return false;
		return true;
	}

	//#endregion Static======================================================================

	/**
	 * Create a new physics body!
	 */
	constructor(mass = 1, vector = new Vector()) {
		this.mass = CheckIfValidMass(mass) ? mass : 1;
		this.vector = vector;
		this.velocity = new Vector(0, 0);
	}

	//#region Methods========================================================================

	/**
	 * Move this body by some amount (vector)
	 */
	move(vector = new Vector(0, 0)) {
		this.vector.move(vector.x, vector.y);

		return this;
	}

	/**
	 * Move this body TO some vector
	 */
	moveTo(vector = new Vector()) {
		this.vector.set(vector.x, vector.y);

		return this;
	}

	/**
	 * Set velocity of this body for some set time in s
	 */
	setVelocity(velocityVector = new Vector(0, 0), durationInS = 1) {
		this.velocity.set(velocityVector.x, velocityVector.y);
		for (let i = 0; i < durationInS; i++) {
			setTimeout(() => {
				this.move(new Vector(velocityVector.x, velocityVector.y));
				Log(this.vector);
			}, i * 1000);
		}
		setTimeout(() => {
			this.velocity.set(0, 0);
		}, durationInS * 1000);

		return this;
	}

	/**
	 * Set the mass of this physics body to something else
	 */
	setMass(newMass) {
		this.mass = CheckIfValidMass(newMass) ? newMass : this.mass;

		return this;
	}

	//#endregion Methods=====================================================================

	//#region Get methods====================================================================

	get currentVelocity() {
		return this.velocity;
	}

	get absolutePosition() {
		return this.vector.absolutePosition;
	}

	get position() {
		return this.vector;
	}

	//#endregion Get methods=================================================================
}

// Exports
module.exports = PhysicsBody;
