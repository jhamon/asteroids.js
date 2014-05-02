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

  CanvasDrawer.prototype.drawBullets = function () {
    var drawer = this;
    this.game.bullets.forEach(this.defaultDraw.bind(drawer));
    return this;
  };

  CanvasDrawer.prototype.drawAsteroids = function () {
    var drawer = this;
    this.game.asteroids.forEach(this.drawOneAsteroid.bind(drawer));
    return this;
  };

  CanvasDrawer.prototype.drawOneAsteroid = function(asteroid) {
    var ctx         = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = '#CCC';
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';

    asteroid.points.forEach( function (point) {
      ctx.lineTo(asteroid.x + point[0], 
                 asteroid.y + point[1]);
    })
    ctx.fillStyle = asteroid.color;
    ctx.closePath();
    ctx.fill();

    ctx.stroke();
  };

  CanvasDrawer.prototype.defaultDraw = function(movableObj) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = movableObj.color;
    ctx.strokeStyle = movableObj.color;
    ctx.arc(
      movableObj.x,
      movableObj.y,
      movableObj.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    return this;
  };
})();