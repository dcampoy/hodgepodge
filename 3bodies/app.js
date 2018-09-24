const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");



const center = [canvas.width / 2, canvas.height / 2];
let radius = 5;

class Body {
	constructor(x, y, vx, vy) {
		this.position = [x, y];
		this.velocity = [vx, vy];
	}

	step(ellapseTime) {
		const t = 1;
		const G = 100;

		const newPos = [
			this.position[0] + this.velocity[0] * t,
			this.position[1] + this.velocity[1] * t
		];
		const accel = [0,0];
		const distance_2 = Math.pow(center[0] - this.position[0], 2) + Math.pow(center[1] - this.position[1], 2);

		if (distance_2 > radius*radius) {
			accel[0] = G * (center[0] - this.position[0]) / Math.pow(distance_2, 3/2);
			accel[1] = G * (center[1] - this.position[1]) / Math.pow(distance_2, 3/2);
		} else {
			console.log("crush");
			return;
		}

		const newVel = [
			this.velocity[0] + accel[0] * t,
			this.velocity[1] + accel[1] * t
		];

		const energyP = G * Math.sqrt(distance_2);
		const energyC = this.velocity[0] * this.velocity[0]/2 + this.velocity[1] * this.velocity[1]/2;

		this.position = newPos;
		console.log(energyP + " " + energyC);
		//console.log("t:" + t +" pos:" + newPos + " vel:" + newVel + " acc:" + accel);
		this.velocity = newVel;
		//console.log("d:" + distance_2);
	}
}

const bodies = [
	new Body(400, 200, 1.0, 0),
	// new Body(450, 200, 50, 0),
	// new Body(100, 200, 50, 0),
	// new Body(400, 240, 50, 0),
];

let initial = null;
let prev = null;
function step(ts) {
	initial = initial || ts;

	const ellapsedTime = prev? ts - prev: 1;
	prev = ts;

	//ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.arc(center[0], center[1], radius, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();

	bodies.forEach(function (b) {
		ctx.beginPath();
		ctx.arc(b.position[0], b.position[1], radius, 2 * Math.PI, false);
		b.step(ellapsedTime);
		ctx.fill();
		ctx.closePath();
	});

	if (ts - initial < 50000) {
		window.requestAnimationFrame(step);
	}
}
window.requestAnimationFrame(step);
