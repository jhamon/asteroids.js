(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Bullet = Asteroids.Bullet = function (pos, direction, ship_speed) {
		var bullet_pos = pos.slice();
		Asteroids.MovingObject.call(this,
			bullet_pos, Bullet.SPEED, direction, Bullet.SIZE, Bullet.COLOR
		);
		this.age = 0;
	}

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.SPEED = 6;
	Bullet.SIZE = 3;
	Bullet.COLOR = "#f00";

	Bullet.prototype.incrementAge = function() {
		this.age += 1;
	}

	Bullet.prototype.hitAsteroid = function(asteroid) {
		return this.isCollidedWith(asteroid);
	}

})();