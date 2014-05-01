(function () {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	Number.prototype.mod = function(n) {
		return ((this%n)+n)%n;
	}

	var rotateVec = Asteroids.rotateVec = function(vec, theta) {
		var theta = theta || -0.2;

		var x1 = vec[0];
		var y1 = vec[1];
		var x2 = x1 * Math.cos(theta) - y1 * Math.sin(theta);
		var y2 = x1 * Math.sin(theta) + y1 * Math.cos(theta);

	 	return [x2, y2];
	}

	var normalizeVec = Asteroids.normalizeVec = function (dir) {
		var magnitude = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2));
		if (magnitude != 1) {
			dir[0] = dir[0] / magnitude;
			dir[1] = dir[1] / magnitude;
		}
		return dir;
	}

	var MovingObject = Asteroids.MovingObject = function(options) {
		var dir =               options.dir              || [1,1];
		this.direction = normalizeVec(dir);
		this.pos =              options.pos              || [0, 0];
		this.speed =            options.speed            || 1;
		this.radius =           options.radius           || 20;
		this.color =            options.color            || "#ddd" ;
		this.acceleration =     options.acceleration     || 0 ;
		this.max_speed =        options.max_speed        || 5;
		this.angular_velocity = options.angular_velocity || 0;
	}

	MovingObject.prototype.move = function (dimx, dimy) {
		if ((this.speed+this.acceleration < this.max_speed) && (this.speed+this.acceleration > 0)) {
			this.speed += this.acceleration;
		}

		if ( this.angular_velocity ) {
			this.direction = rotateVec(this.direction, this.angular_velocity)
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