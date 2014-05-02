(function () {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var CanvasDrawer = Asteroids.CanvasDrawer = function (game) {
    this.game      = game;
    this.ctx       = game.ctx;
  };

  CanvasDrawer.prototype = {};

  CanvasDrawer.prototype.drawAll = function () {
    this.clear()
        .drawShip()
        .drawAsteroids()
        .drawBullets();
  };

  CanvasDrawer.prototype.clear = function () {
    var width = this.viewState.width;
    var height = this.viewState.height;
    this.ctx.clearRect(0, 0, width, height);
    return this;
  };

  CanvasDrawer.prototype.drawShip = function () {
    var ctx         = this.ctx;
    var ship        = this.game.ship;
    var az          = Math.atan2(ship.direction[1], ship.direction[0]);
    var pt1         = Asteroids.Utils.rotateVec([-10, -25], az - (Math.PI)/2);
    var pt2         = Asteroids.Utils.rotateVec([10, -25], az - (Math.PI)/2);
    
    ctx.fillStyle   = ship.color;
    ctx.strokeStyle = ship.color;
    ctx.beginPath();
    ctx.moveTo(ship.x + pt1[0],
               ship.y + pt1[1]);
    ctx.lineTo(ship.x,
               ship.y);
    ctx.lineTo(ship.x + pt2[0],
               ship.y + pt2[1]);
    ctx.lineJoin    = 'miter';
    ctx.lineWidth   = 10;
    ctx.stroke();
    return this;
  };

  CanvasDrawer.prototype.drawAsteroids = function () {
    this.ctx.strokeStyle = '#CCC';
    this.ctx.lineWidth   = 2;
    this.ctx.lineJoin    = 'round';
    this.game.asteroids.forEach(this.drawOneAsteroid.bind(this));
    return this;
  };

  CanvasDrawer.prototype.drawBullets = function () {
    this.game.bullets.forEach(this.defaultDraw.bind(this));
    return this;
  };

  CanvasDrawer.prototype.drawOneAsteroid = function(asteroid) {
    this.ctx.fillStyle   = asteroid.color;
    this.polygonFromPoints(asteroid);
    this.ctx.fill();
    this.ctx.stroke();
  };

  CanvasDrawer.prototype.polygonFromPoints = function (asteroid) {
    var ctx = this.ctx;
    ctx.beginPath();
    asteroid.points.forEach( function (point) {
      ctx.lineTo(asteroid.x + point[0], 
                 asteroid.y + point[1]);
    });
    ctx.closePath();
  };

  CanvasDrawer.prototype.defaultDraw = function(movableObj) {
    var ctx         = this.ctx;
    ctx.fillStyle   = movableObj.color;
    ctx.strokeStyle = movableObj.color;
    this.circleAt(movableObj.x, movableObj.y, movableObj.radius);
    ctx.fill();
    return this;
  };

  CanvasDrawer.prototype.circleAt = function (x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
  };
})();