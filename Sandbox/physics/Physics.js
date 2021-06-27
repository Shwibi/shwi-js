// PHYSICS ENGINE - PROTOTYPE

const Main = require("../../Utils/Main");

// v0.0.6-alpha.1

// Position
class Position {
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
	set(x = this.x, y = this.y) {
		this.x = x;
		this.y = y;
		this.pos = [this.x, this.y];
		this.resultant();
	}
	move(x = 0, y = 0) {
		this.x += x;
		this.y += y;
		this.pos = [this.x, this.y];
		this.calcResultant();
	}
	calcResultant() {
		this.resultant.value = Math.sqrt(this.x * this.x + this.y * this.y);
		this.resultant.angle.set(Math.atan(this.y / this.x), "rad");

		return this.resultant;
	}
}

// Angle
class Angle {
	constructor(degrees = 0, unit = "deg") {
		this.value = degrees;
		this.unit = unit;
	}
	toRadian() {
		if (this.unit == "rad") return this.value;
		else return (Math.PI / 180) * this.value;
	}
	toDegrees() {
		if (this.unit == "deg") return this.value;
		else return (180 / Math.PI) * this.value;
	}
	set(amount = this.value, unit = this.unit) {
		this.value = amount;
		this.unit = unit;
	}
}

// Engine

class Physics extends Main {
	constructor() {
		super("Physics");
		this.bodies = [];
	}

	/**
	 *
	 * @param {PhysicsBody} physicsBody
	 * @returns {PhysicsBody}
	 */
	addBody(physicsBody) {
		this.bodies.push(physicsBody);
		return physicsBody;
	}
	get plane() {
		let bodiesArray = [];
		this.bodies.forEach((body) => {
			bodiesArray.push(body.pos);
		});
		return bodiesArray;
	}
	static calculateComponents(resultant = 1, angle = new Angle(0)) {
		const x_compo = Math.floor(Math.cos(angle.toRadian()) * resultant);
		const y_compo = Math.floor(Math.sin(angle.toRadian()) * resultant);
		console.log({ x_compo, y_compo, resultant, angle });
		return new Position(x_compo, y_compo);
	}
}

// Physics body

class PhysicsBody {
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
	rotate(byDeg = 0) {
		this.angle += byDeg;
	}
	move(x = 0, y = 0) {
		this.position.move(x, y);
		console.log(this.pos);
	}
	setPos(x = this.position.x, y = this.position.y) {
		this.position.set(x, y);
	}
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
