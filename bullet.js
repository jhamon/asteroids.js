(function() {
  'use strict';
  
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (ship) {
    this.x = ship.x;
    this.y = ship.y;
    this.direction = ship.direction.slice();
    this.age = 0;
  };

  Bullet.prototype = new Asteroids.MovingObject();
  Bullet.prototype.constructor = Bullet;
  
  // Set default properties on prototype.
  Bullet.prototype.speed = 9;
  Bullet.prototype.radius = 5;
  Bullet.prototype.color = '#FF0000';
  Bullet.prototype.max_speed = 11;

  Bullet.prototype.incrementAge = function() {
    this.age += 1;
  };

  Bullet.prototype.hitAsteroid = function(asteroid) {
    return this.isCollidedWith(asteroid);
  };
})();
