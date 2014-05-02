(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function () {
    this.bullets = [];
  }

  Game.prototype.start = function (canvas) {
    this.gameWidth  = canvas.width;
    this.gameHeight = canvas.height;
    this.configureMovables();
    this.ctx        = canvas.getContext("2d");
    this.ship       = new Asteroids.Ship();
    this.asteroids  = this.addAsteroids();
    this.drawer     = new Asteroids.CanvasDrawer(this);
    this.step();
  }

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    var numAsteroids = Math.floor(this.gameWidth * this.gameHeight / 70000);
    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.random());
    }
    return asteroids;
  }

  Game.prototype.configureMovables = function () {
    Asteroids.MovingObject.prototype.maxX = this.gameWidth;
    Asteroids.MovingObject.prototype.maxY = this.gameHeight;
  }

  Game.prototype.step = function () {
    this.moveAll();
    this.drawer.drawAll();
    this.ageBullets();
    this.checkBulletImpacts();
    requestAnimationFrame(this.step.bind(this))
  }

  Game.prototype.moveAll = function () {
    var movables = this.asteroids
                   .concat(this.bullets)
                   .concat(this.ship);

    movables.forEach( function (movable) {
      movable.move();
    });
  }

  Game.prototype.ageBullets = function () {
    this.bullets = this.bullets.filter( function (bullet) { 
      bullet.incrementAge();
      return bullet.age < 100; 
    });
  }

  Game.prototype.deleteBullet = function (bullet) {
    var delete_index = this.bullets.indexOf(bullet);
    this.bullets.splice(delete_index, 1)
  }

  Game.prototype.deleteAsteroid = function (asteroid) {
    var delete_index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(delete_index, 1);
  }

  Game.prototype.checkBulletImpacts = function () {
    var game = this;
    var bulletsToDelete = [];
    var asteroidsToDelete = [];

    game.bullets.forEach( function (bullet) {
      game.asteroids.forEach( function (asteroid) {
        if (bullet.hitAsteroid(asteroid)) {
          bulletsToDelete.push(bullet);
          asteroidsToDelete.push(asteroid);
        }
      });
    });

    bulletsToDelete.map(game.deleteBullet.bind(game))
    asteroidsToDelete.map(game.deleteAsteroid.bind(game))
  }

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet());
  }
})();