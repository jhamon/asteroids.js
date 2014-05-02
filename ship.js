(function() {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function () {
    var ship_properties = {
        x            : this.viewState.width / 2,
        y            : this.viewState.height / 2,
        color        : this.defaults.color,
        radius       : this.defaults.radius,
        max_speed    : this.defaults.max_speed,
        acceleration : this.defaults.acceleration
    };
    Asteroids.MovingObject.call(this, ship_properties);
    this.setupKeypressListeners();
  };

  Ship.prototype = new Asteroids.MovingObject();

  Ship.prototype.defaults = {
    acceleration : 0,
    color        : '#b3b3b3',
    dir          : [0, 1],
    max_speed    : 7,
    radius       : 20
  };

  Ship.prototype.keydownEvents = {
    '38' : 'boostOn',
    '40' : 'brake',
    '37' : 'turnRight',
    '39' : 'turnLeft'
  };

  Ship.prototype.keyupEvents = {
    '38' : 'boostOff',
    '37' : 'deactivateTurn',
    '39' : 'deactivateTurn'
  };

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
  };

  Ship.prototype.move = function () {
    this.power(-0.01); // brake slowly if not accelerating.
    Asteroids.MovingObject.prototype.move.call(this);
  };

  Ship.prototype.power = function(impulse) {
    if (impulse > 0 && this.speed < 5) {
      this.speed += impulse;
    } else if (impulse < 0 && this.speed > -impulse) {
      this.speed += impulse;
    }
  };

  Ship.prototype.fireBullet = function() {
    return new Asteroids.Bullet(this);
  };

  Ship.prototype.turnRight = function () {
    this.angular_velocity = -0.07;
  };

  Ship.prototype.turnLeft = function () {
    this.angular_velocity = 0.07;
  };

  Ship.prototype.deactivateTurn = function () {
    this.angular_velocity = 0;
  };

  Ship.prototype.boostOn = function () {
    this.acceleration = 0.1;
  };

  Ship.prototype.boostOff = function () {
    this.acceleration = 0;
  };

  Ship.prototype.brake = function () {
    this.acceleration = -0.1;
  };
})();