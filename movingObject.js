(function () {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var mod          = Asteroids.Utils.mod;
  var rotateVec    = Asteroids.Utils.rotateVec;
  var normalizeVec = Asteroids.Utils.normalizeVec;

  var MovingObject = Asteroids.MovingObject = function(options) {
    var dir               = options.dir || [1,1];
    this.direction        = normalizeVec(dir);
    this.pos              = options.pos || [0, 0];
    this.speed            = options.speed || 1;
    this.radius           = options.radius || 20;
    this.color            = options.color || '#ddd' ;
    this.acceleration     = options.acceleration || 0 ;
    this.max_speed        = options.max_speed || 5;
    this.angular_velocity = options.angular_velocity || 0;
  };

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
    this.pos[0] += (this.direction[0] * this.speed);
    this.pos[1] += (this.direction[1] * this.speed);
    return this;
  };

  MovingObject.prototype.toroidalWrap = function () {
    var maxX = this.viewState.width;
    var maxY = this.viewState.height;

    this.pos[0] = mod(this.pos[0], maxX);
    this.pos[1] = mod(this.pos[1], maxY);
    return this;
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return (distance <= (this.radius + otherObject.radius));
  };
})();