(function () {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	Number.prototype.mod = function(n) {
		return ((this%n)+n)%n;
	}

	var MovingObject = Asteroids.MovingObject = function(pos, speed, dir, radius, color, acceleration, max_speed) {

		function normalizeVec(dir) {
			var magnitude = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2));
			if (magnitude != 1) {
				dir[0] = dir[0] / magnitude;
				dir[1] = dir[1] / magnitude;
			}
			return dir;
		}

		this.pos = pos; // # [x,y]
		this.speed = speed || 1;
		// this.direction = dir || [1,1]; // # [delta_x, delta_y]
		this.direction = normalizeVec(dir);
		this.radius = radius || 20;
		this.color = color || "#ddd" ;
		this.acceleration = acceleration || 0 ;
		this.max_speed = max_speed || 5;
	}

	MovingObject.prototype.move = function (dimx, dimy) {
		if ((this.speed+this.acceleration < this.max_speed) && (this.speed+this.acceleration > 0)) {
			this.speed += this.acceleration;
		}

		this.pos[0] += (this.direction[0] * this.speed);
		this.pos[1] += (this.direction[1] * this.speed);

		this.pos[0] = this.pos[0].mod(dimx);
		this.pos[1] = this.pos[1].mod(dimy);
	}

	MovingObject.prototype.draw = function(ctx) {
		ctx.beginPath()
		ctx.fillStyle = this.color;
		ctx.arc(
		      this.pos[0],
		      this.pos[1],
		      this.radius,
		      0,
		      2 * Math.PI,
		      false
		 	 		);
		ctx.fill();
	}

	MovingObject.prototype.isCollidedWith = function(otherObject) {
			var dx = this.pos[0] - otherObject.pos[0];
			var dy = this.pos[1] - otherObject.pos[1];
			var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			if (distance <= (this.radius + otherObject.radius)) {
				return true;
			} else {
				return false;
			}
	}

})();