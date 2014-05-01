(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, direction) {
    var bullet_properties = {
        dir: direction,
        pos: pos.slice(),
        speed: this.defaults.speed,
        radius: this.defaults.size,
        color: this.defaults.color,
    }

    Asteroids.MovingObject.call(this, bullet_properties);
    this.age = 0;
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.defaults = {
    speed: 9,
    size: 3,
    color: '#f00'
  }

  Bullet.prototype.incrementAge = function() {
    this.age += 1;
  }

  Bullet.prototype.hitAsteroid = function(asteroid) {
    return this.isCollidedWith(asteroid);
  }

})();