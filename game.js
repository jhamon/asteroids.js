(function() {
	var Asteroids = window.Asteroids = (window.Asteroids || {});

	var Game = Asteroids.Game = function () {
		this.bullets = [];
	}

	Game.FPS = 50;

	Game.prototype.addAsteroids = function (numAsteroids) {
		var asteroids = [];
		for (var i = 0; i < numAsteroids; i++) {
			asteroids.push(Asteroids.Asteroid.randomAsteroid(this.dimx, this.dimy));
		}
		return asteroids;
	}


	Game.prototype.draw = function () {
		this.ctx.clearRect(0,0, this.dimx, this.dimy);
		this.ship.draw(this.ctx);
		for (var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].draw(this.ctx);
		}
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].draw(this.ctx);
		}
	}

	Game.prototype.move = function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].move(this.dimx, this.dimy);
		}
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].move(this.dimx, this.dimy);
		}
		this.ship.move(this.dimx, this.dimy);
	}

	Game.prototype.ageBullets = function () {
		var oldBullets = [];
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].incrementAge();
			if (this.bullets[i].age === 60) {
				oldBullets.push(this.bullets[i]);
			}
		}
		for (var i = 0; i < oldBullets.length; i++) {
			this.deleteBullet(oldBullets[i]);
		}
	}

	Game.prototype.deleteBullet = function (bullet) {
		var delete_index = this.bullets.indexOf(bullet);
		this.bullets.splice(delete_index, 1)
	}

	Game.prototype.deleteAsteroid = function (asteroid) {
		var delete_index = this.asteroids.indexOf(asteroid);
		this.asteroids.splice(delete_index, 1);
	}

	Game.prototype.step = function () {
		this.move();
		this.draw();
		this.ageBullets();
		this.checkBulletImpacts();
		this.ship.power(-.01);
		//this.checkCollisions();
	}

	Game.prototype.stop = function () {
		window.clearInterval(this.timer_id)
	}

	Game.prototype.checkCollisions = function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].isCollidedWith(this.ship)) {
				alert("You dead.");
				this.stop();
			}
		}
	}

	Game.prototype.checkBulletImpacts = function () {
		var bulletsToDelete = [];
		var asteroidsToDelete = [];
		for (var i = 0; i < this.bullets.length; i++) {
			for (var j = 0; j < this.asteroids.length; j++) {
				if (this.bullets[i].hitAsteroid(this.asteroids[j])) {
					console.log('hit!')
					bulletsToDelete.push(this.bullets[i]);
					asteroidsToDelete.push(this.asteroids[j]);
				}
			}
		}

		for (var i = 0; i < bulletsToDelete.length; i++) {
			this.deleteBullet(bulletsToDelete[i]);
		}

		for (var i = 0; i < asteroidsToDelete.length; i++) {
			this.deleteAsteroid(asteroidsToDelete[i]);
		}

	}

	Game.prototype.fireBullet = function() {
		this.bullets.push(this.ship.fireBullet());
	}

	Game.prototype.start = function (canvas) {
		this.dimx = canvas.width;
		this.dimy = canvas.height;
		this.ctx = canvas.getContext("2d");
		this.ship = new Asteroids.Ship([this.dimx/2, this.dimy/2])
		this.asteroids = this.addAsteroids(10);
		this.timer_id = window.setInterval(this.step.bind(this), 1000/Game.FPS)
	}

})();