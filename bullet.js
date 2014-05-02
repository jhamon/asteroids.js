(function() {
  'use strict';
  
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, direction) {
    var bullet_properties = {
        dir: direction,
        pos: pos.slice(),
        speed: this.defaults.speed,
        radius: this.defaults.size,
        color: this.defaults.color,
        max_speed: this.defaults.max_speed
    };

    Asteroids.MovingObject.call(this, bullet_properties);
    this.age = 0;
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.defaults = {
    speed: 9,
    size: 5,
    color: '#ff0000',
    max_speed: 11
  };

  Bullet.prototype.incrementAge = function() {
    this.age += 1;
  };

  Bullet.prototype.hitAsteroid = function(asteroid) {
    return this.isCollidedWith(asteroid);
  };
})();