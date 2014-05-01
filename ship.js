(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Ship = Asteroids.Ship = function (pos, speed) {
		var ship_properties = {
				pos: pos,
				speed: speed,
				radius: this.defaults.radius,
				color: this.defaults.color,
				acceleration: this.defaults.acceleration
		}
		Asteroids.MovingObject.call(this, ship_properties)
	}

	Ship.inherits(Asteroids.MovingObject);

	Ship.prototype.defaults = {
		radius: 20,
		color: "#286334", // stealth green
		dir: [0, 1],
		acceleration: 0
	}

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

	Ship.prototype.turnRight = function () {
		this.angular_velocity = -0.07;
	}

	Ship.prototype.turnLeft = function () {
		this.angular_velocity = 0.07;
	}

	Ship.prototype.deactivateTurn = function () {
		this.angular_velocity = 0;
	}

	Ship.prototype.boostOn = function () {
		this.acceleration = 0.1;
	}

	Ship.prototype.boostOff = function () {
		this.acceleration = 0;
	}

	Ship.prototype.brake = function () {
		this.acceleration = -0.1;
	}

	Ship.prototype.draw = function (ctx) {
		ctx.beginPath()
		ctx.fillStyle = this.color;
    ctx.beginPath();
    var az = Math.atan2(this.direction[1], this.direction[0]);

    var pt1 = Asteroids.rotateVec([-10, -25], az-(Math.PI)/2);
    var pt2 = Asteroids.rotateVec([10, -25], az-(Math.PI)/2);

		ctx.beginPath();
		ctx.moveTo(this.pos[0]+pt1[0], this.pos[1]+pt1[1]);
		ctx.lineTo(this.pos[0], this.pos[1]);
		ctx.lineTo(this.pos[0]+pt2[0], this.pos[1]+pt2[1]);
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 10;
		ctx.stroke();
  }

})();