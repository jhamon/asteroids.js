(function() {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function () {
    this.x = this.viewState.width / 2;
    this.y = this.viewState.height / 2;
    this.direction = [1,1];
    this.setupKeypressListeners();
  };

  Ship.prototype = new Asteroids.MovingObject();
  Ship.prototype.constructor = Ship;

  // Set defaults on prototype
  Ship.prototype.dir          = [0, 1];
  Ship.prototype.color        = '#B3B3B3';
  Ship.prototype.radius       = 20;
  Ship.prototype.max_speed    = 7;
  Ship.prototype.acceleration =  0;

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

    function keyEventCallback (eventList) {
      return function (event) {
        var action = eventList[event.keyCode];
        if (action !== undefined) { ship[action](); }
      };
    }

    $(document).keydown(keyEventCallback(ship.keydownEvents));
    $(document).keyup(keyEventCallback(ship.keyupEvents));
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
