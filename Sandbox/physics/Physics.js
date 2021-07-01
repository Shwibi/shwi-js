// PHYSICS ENGINE - PROTOTYPE

const Err = require("../../Utils/Err");
const Main = require("../../Utils/Main");

// v0.0.6-alpha.1

/**
 * Position
 * @deprecated Use `shwijs#Vector` instead
 */
class Position {
	/**
	 * Create a new position (vector)
	 */
	constructor(
		pos_x = 0,
		pos_y = 0,
		resultant = { value: 0, angle: new Angle(0) }
	) {
		this.x = pos_x;
		this.y = pos_y;
		this.pos = [this.x, this.y];
		if (resultant) this.resultant = resultant;
	}

	/**
	 * Set vectory position to x, y
	 */
	set(x = this.x, y = this.y) {
		this.x = x;
		this.y = y;
		this.pos = [this.x, this.y];
		this.calcResultant();
	}

	/**
	 * Move this vector to x, y
	 */
	move(x = 0, y = 0) {
		this.set((this.x += x), (this.y += y));
		this.calcResultant();
	}

	/**
	 * Calculate the resultant of this vector
	 */
	calcResultant() {
		this.resultant.value = Math.sqrt(this.x * this.x + this.y * this.y);
		this.resultant.angle.set(Math.atan(this.y / this.x), "rad");

		return this.resultant;
	}
}

// Angle
const ALLOWED_UNITS = ["rad", "deg"];
/**
 * Angle
 * @deprecated Use `shwijs#Angle` instead
 */
class Angle {
	/**
	 * Create a new angle
	 */
	constructor(degrees = 0, unit = "deg") {
		this.checkUnit(unit);
		this.value = degrees;
		this.unit = unit;
	}

	/**
	 * Convert the angle to radian and return. NOTE: This does not change the actual unit of angle, it just returns the radian value.
	 */
	toRadian() {
		if (this.unit == "rad") return this.value;
		else return (Math.PI / 180) * this.value;
	}

	/**
	 * Return the angle in degrees. NOTE: This does not change the actual unit of angle, it just returns the degree value of it.
	 */
	toDegrees() {
		if (this.unit == "deg") return this.value;
		else return (180 / Math.PI) * this.value;
	}

	/**
	 * Set the angle to a specific amount and unit
	 */
	set(amount = this.value, unit = this.unit) {
		this.checkUnit(unit);
		this.value = amount;
		this.unit = unit;
	}

	/**
	 * @dev
	 * @ignore
	 */
	checkUnit(unit) {
		if (!ALLOWED_UNITS.includes(unit.toLowerCase()))
			return new Err("Unit of angle must be in rad or deg!", "INV_UNIT", {
				unit,
				dont_log: true,
			});
		else return true;
	}
}

// Engine
/**
 * Physics Engine
 * @deprecated Removed
 */
class Physics extends Main {
	/**
	 * Create a new physics engine
	 */
	constructor(name = "Default") {
		super("Physics", name);
		this.bodies = [];
	}

	/**
	 * Add a new body to this engine
	 * @param {PhysicsBody} physicsBody
	 * @returns {PhysicsBody}
	 */
	addBody(physicsBody) {
		this.bodies.push(physicsBody);
		return physicsBody;
	}

	/**
	 * Get the plane of the engine where the bodies live.
	 */
	get plane() {
		let bodiesArray = [];
		this.bodies.forEach((body) => {
			bodiesArray.push(body.pos);
		});
		return bodiesArray;
	}

	/**
	 * Calculate x and y components of some resultant vector amount
	 */
	static calculateComponents(resultant = 1, angle = new Angle(0)) {
		const x_compo = Math.floor(Math.cos(angle.toRadian()) * resultant);
		const y_compo = Math.floor(Math.sin(angle.toRadian()) * resultant);
		console.log({ x_compo, y_compo, resultant, angle });
		return new Position(x_compo, y_compo);
	}
}

// Physics body
/**
 * Physics body
 * @deprecated Use `shwijs#PhysicsBody` instead
 */
class PhysicsBody {
	/**
	 * Create a new physics body. The engine is REQUIRED, otherwise your bodies will not be able to interact in the future.
	 */
	constructor(engine = new Physics(), name = "PhysicsBody", object = {}) {
		this.mass = 1;
		this.position = new Position();
		this.angle = new Angle();
		this.engine = engine;
		this.engine.addBody(this);
		this.id = this.engine.bodies.length;
		this.name = name;
		this.object = object ?? {};
	}

	/**
	 * Rotate
	 */
	rotate(byDeg = 0) {
		this.angle += byDeg;
	}

	/**
	 * Move this body in some values in x and y. To get x and y, use {@link Physics.calculateComponents}
	 */
	move(x = 0, y = 0) {
		this.position.move(x, y);
		console.log(this.pos);
	}

	/**
	 * Set the position of this physics body
	 */
	setPos(x = this.position.x, y = this.position.y) {
		this.position.set(x, y);
	}

	/**
	 * Apply a force in some directions. To get resultant from two components, use {@link Position#calcResultant} `new Position(x, y).calcResultant()`
	 */
	applyForce(amount = 0, directionInDeg = 0, timeInSeconds = 1) {
		// F = ma
		// amount = this.mass * acceleration
		// acceleration = amount/this.mass
		const forcePosition = Physics.calculateComponents(
			amount,
			new Angle(directionInDeg)
		);
		const accelerationPosition = new Position(
			forcePosition.x / this.mass,
			forcePosition.y / this.mass
		);
		// const position_x =
		// 	(1 / 2) * accelerationPosition.x * timeInSeconds * timeInSeconds;
		// const position_y =
		// 	(1 / 2) * accelerationPosition.y * timeInSeconds * timeInSeconds;
		// this.move(position_x, position_y);
		for (let i = 1; i <= timeInSeconds; i++) {
			setTimeout(() => {
				const position_x = (1 / 2) * accelerationPosition.x * i * i;
				const position_y = (1 / 2) * accelerationPosition.y * i * i;
				this.move(position_x, position_y);
			}, i * 1000);
		}
		// if accn = 1, velocity = increasing by 1 every second
		//TODO: ADD FORCE
	}

	/**
	 * Move continuously in some vectors for some time in seconds
	 */
	moveContinuously(amount = [1, 0], forHowManySeconds = 1) {
		// Forms a vector
		// To get x and y components, we have to use cos(deg) and sin(deg)
		// const x_compo = Math.floor(Math.cos(directionInDeg) / amount);
		// const y_compo = Math.floor(Math.sin(directionInDeg) / amount);
		const x_compo = amount[0];
		const y_compo = amount[1];
		for (let i = 1; i <= forHowManySeconds; i++) {
			setTimeout(() => {
				this.move(x_compo, y_compo);
			}, i * 1000);
			// Check for bodies
		}
	}

	/**
	 * Get position of this body
	 */
	get pos() {
		return {
			name: this.name,
			id: this.id,
			position: this.position,
			angle: this.position.resultant.angle.toDegrees(),
		};
	}
}

module.exports = {
	Physics,
	PhysicsBody,
	Position,
	Angle,
};
