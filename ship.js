(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Ship = Asteroids.Ship = function (pos, speed) {
		Asteroids.MovingObject.call(this, pos, speed, Ship.DIR, Ship.RADIUS, Ship.COLOR, Ship.ACCEL)
	}

	Ship.inherits(Asteroids.MovingObject);

	Ship.RADIUS = 20;
	Ship.COLOR = "#286334" // stealth green
	Ship.DIR = [0,1];
	Ship.ACCEL = 0;

	Ship.prototype.power = function(impulse) {
		if (impulse > 0 && this.speed < 5) {
			this.speed += impulse;
		} else if (impulse < 0 && this.speed > -impulse) {
			this.speed += impulse
		}
	}

	Ship.prototype.fireBullet = function() {
		return new Asteroids.Bullet(this.pos, this.direction, this.speed);
	}

	Ship.prototype.turnRight = function (theta) {
		var theta = theta || 0.2;
		this.direction = rotateVec(this.direction, theta);
	}

	Ship.prototype.boostOn = function () {
		this.acceleration = 0.1;
		console.log("Boost on!");
	}

	Ship.prototype.boostOff = function () {
		this.acceleration = 0;
		console.log("Boost on!");
	}

	Ship.prototype.brake = function () {
		this.acceleration = -0.1;
	}

	Ship.prototype.turnLeft = function (theta) {
		var theta = theta || -0.2;
		this.direction = rotateVec(this.direction, theta);
	}

	var rotateVec = function(vec, theta) {
		var theta = theta || -0.2;

		var x1 = vec[0];
		var y1 = vec[1];
		var x2 = x1 * Math.cos(theta) - y1 * Math.sin(theta);
		var y2 = x1 * Math.sin(theta) + y1 * Math.cos(theta);

	 	return [x2, y2];
	}

	Ship.prototype.draw = function (ctx) {
		ctx.beginPath()
		ctx.fillStyle = this.color;
    ctx.beginPath();
    var az = Math.atan2(this.direction[1], this.direction[0]);

    var pt1 = rotateVec([-10, -25], az-(Math.PI)/2);
    var pt2 = rotateVec([10, -25], az-(Math.PI)/2);

		ctx.beginPath();
		ctx.moveTo(this.pos[0]+pt1[0], this.pos[1]+pt1[1]);
		ctx.lineTo(this.pos[0], this.pos[1]);
		ctx.lineTo(this.pos[0]+pt2[0], this.pos[1]+pt2[1]);
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 10;
		ctx.stroke();
  }

})();