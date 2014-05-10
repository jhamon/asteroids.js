(function () {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var mod          = Asteroids.Utils.mod;
  var rotateVec    = Asteroids.Utils.rotateVec;

  var MovingObject = Asteroids.MovingObject = function() {};

  // Set default properties on prototype.
  MovingObject.prototype.color            = '#DDD';
  MovingObject.prototype.speed            = 1;
  MovingObject.prototype.radius           = 20;
  MovingObject.prototype.direction        = [1, 1];
  MovingObject.prototype.max_speed        = 5;
  MovingObject.prototype.acceleration     = 0;
  MovingObject.prototype.angular_velocity = 0;

  MovingObject.prototype.move = function () {
    this.accelerate()
        .turn()
        .advance()
        .toroidalWrap();
    return this;
  };

  MovingObject.prototype.accelerate = function () {
    var underMaxSpeed = (this.speed + this.acceleration < this.max_speed);
    var wontSendBackwards = (this.speed + this.acceleration > 0);
    if (underMaxSpeed && wontSendBackwards) {
      this.speed += this.acceleration;
    }
    return this;
  };

  MovingObject.prototype.turn = function () {
    if ( this.angular_velocity ) {
      this.direction = rotateVec(this.direction, this.angular_velocity);
    }
    return this;
  };

  MovingObject.prototype.advance = function () {
    this.x += (this.direction[0] * this.speed);
    this.y += (this.direction[1] * this.speed);
    return this;
  };

  MovingObject.prototype.toroidalWrap = function () {
    var maxX = this.viewState.width;
    var maxY = this.viewState.height;
    this.x = mod(this.x, maxX);
    this.y = mod(this.y, maxY);
    return this;
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dx = this.x - otherObject.x;
    var dy = this.y - otherObject.y;
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return (distance <= (this.radius + otherObject.radius));
  };
})();