(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function () {
    var positionX = this.maxX / 2;
    var positionY = this.maxY / 2;
    var ship_properties = {
        pos: [positionX, positionY],
        radius: this.defaults.radius,
        color: this.defaults.color,
        acceleration: this.defaults.acceleration
    }
    Asteroids.MovingObject.call(this, ship_properties)
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.defaults = {
    radius: 20,
    color: "#b3b3b3",
    dir: [0, 1],
    acceleration: 0
  }

  Ship.prototype.move = function () {
    this.power(-.01); // break slowly if not accelerating.
    Asteroids.MovingObject.prototype.move.call(this);
  }

  Ship.prototype.power = function(impulse) {
    if (impulse > 0 && this.speed < 5) {
      this.speed += impulse;
    } else if (impulse < 0 && this.speed > -impulse) {
      this.speed += impulse
    }
  }

  Ship.prototype.fireBullet = function() {
    return new Asteroids.Bullet(this.pos, this.direction, this.speed);
  }

  Ship.prototype.turnRight = function () {
    this.angular_velocity = -0.07;
  }

  Ship.prototype.turnLeft = function () {
    this.angular_velocity = 0.07;
  }

  Ship.prototype.deactivateTurn = function () {
    this.angular_velocity = 0;
  }

  Ship.prototype.boostOn = function () {
    this.acceleration = 0.1;
  }

  Ship.prototype.boostOff = function () {
    this.acceleration = 0;
  }

  Ship.prototype.brake = function () {
    this.acceleration = -0.1;
  }
})();