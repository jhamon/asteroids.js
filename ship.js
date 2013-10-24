(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Ship = Asteroids.Ship = function (pos, speed) {
		Asteroids.MovingObject.call(this, pos, speed, Ship.DIR, Ship.RADIUS, Ship.COLOR)
	}

	Ship.inherits(Asteroids.MovingObject);

	Ship.RADIUS = 20;
	Ship.COLOR = "#286334" // stealth green
	Ship.DIR = [0,1];

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

		var xdir = this.direction[0];
		var ydir = this.direction[1];
		new_x_dir = xdir * Math.cos(theta) - ydir * Math.sin(theta);
		new_y_dir = xdir * Math.sin(theta) + ydir * Math.cos(theta);

		this.direction = [new_x_dir, new_y_dir];
	}

	Ship.prototype.turnLeft = function (theta) {
		var theta = theta || -0.2;

		var xdir = this.direction[0];
		var ydir = this.direction[1];
		new_x_dir = xdir * Math.cos(theta) - ydir * Math.sin(theta);
		new_y_dir = xdir * Math.sin(theta) + ydir * Math.cos(theta);

		this.direction = [new_x_dir, new_y_dir];
	}

	Ship.prototype.draw = function (ctx) {
		ctx.beginPath()
		ctx.fillStyle = this.color;
    ctx.beginPath();

		ctx.beginPath();
		ctx.moveTo(this.pos[0]-10, this.pos[1]-25);
		ctx.lineTo(this.pos[0], this.pos[1]);
		ctx.lineTo(this.pos[0]+10, this.pos[1]-25);
		ctx.lineJoin = 'miter';
		ctx.lineWidth = 10;
		ctx.stroke();
  }

})();