(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function(pos, speed, direction, radius, color) {
		Asteroids.MovingObject.call(this, pos, speed, direction, radius, color)
	}
	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.COLOR = "#ccc";
	Asteroid.RADIUS = 40;

	Asteroid.randomAsteroid = function(dimX, dimY) {

		var randomDirection = function(max) {
			return (Math.random() * 2 - 1) * max;
		}

		var random = function(max) {
			return Math.random() * max;
		}

		var pos = [random(dimX), random(dimY)];
		var speed = random(2);
		var direction = [randomDirection(2), randomDirection(2)];
		var radius = random(Asteroid.RADIUS);
		return new Asteroid(pos, speed, direction, radius, Asteroid.COLOR);
	}

})();