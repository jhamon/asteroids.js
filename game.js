(function() {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function (canvas) {
    this.bullets    = [];
    this.ctx        = canvas.getContext("2d");
    this.ship       = new Asteroids.Ship();
    this.drawer     = new Asteroids.CanvasDrawer(this);
    this.asteroids  = this.addAsteroids();
    this.configureEventListeners();
  }

  Game.prototype.start = function (canvas) {
    this.step();
  }

  Game.prototype.NUM_ASTEROIDS = 15;

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      asteroids.push(Asteroids.Asteroid.random());
    }
    return asteroids;
  }

  Game.prototype.configureEventListeners = function () {
    var game = this;
    $(document).keydown(function (event) {
      if (event.keyCode === 32 ) game.fireBullet(); // spacebar
    });
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
