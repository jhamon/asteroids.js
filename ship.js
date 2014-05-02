(function() {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function () {
    var positionX = this.viewState.width / 2;
    var positionY = this.viewState.height / 2;
    var ship_properties = {
        pos: [positionX, positionY],
        radius: this.defaults.radius,
        color: this.defaults.color,
        acceleration: this.defaults.acceleration
    }
    Asteroids.MovingObject.call(this, ship_properties)
    this.setupKeypressListeners();
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.defaults = {
    radius: 20,
    color: "#b3b3b3",
    dir: [0, 1],
    acceleration: 0
  }

  Ship.prototype.keydownEvents = {
    '38': 'boostOn',
    '40': 'brake',
    '37': 'turnRight',
    '39': 'turnLeft'
  }

  Ship.prototype.keyupEvents = {
    '38': 'boostOff',
    '37': 'deactivateTurn',
    '39': 'deactivateTurn'
  }

  Ship.prototype.setupKeypressListeners = function () {
    var ship = this;
    $(document).keydown(function (event) {
      var action = ship.keydownEvents[event.keyCode];
      if (action !== undefined) ship[action]();
    });

    $(document).keyup(function (event) {
      var action = ship.keyupEvents[event.keyCode];
      if (action !== undefined) ship[action]();
    });
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