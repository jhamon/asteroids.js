(function () {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var CanvasDrawer = Asteroids.CanvasDrawer = function (game) {
    this.game      = game;
    this.ctx       = game.ctx;
    this.height    = game.gameHeight;
    this.width     = game.gameWidth;
  };

  CanvasDrawer.prototype = {};

  CanvasDrawer.prototype.drawAll = function () {
    this.clear()
        .drawShip()
        .drawAsteroids()
        .drawBullets();
  };

  CanvasDrawer.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  };

  CanvasDrawer.prototype.drawShip = function () {
    var ctx         = this.ctx;
    var ship        = this.game.ship;
    var az          = Math.atan2(ship.direction[1], ship.direction[0]);
    var pt1         = Asteroids.Utils.rotateVec([-10, -25], az - (Math.PI)/2);
    var pt2         = Asteroids.Utils.rotateVec([10, -25], az - (Math.PI)/2);
    
    ctx.beginPath();
    ctx.fillStyle   = ship.color;
    ctx.strokeStyle = ship.color;
    ctx.beginPath();
    
    ctx.beginPath();
    ctx.moveTo(ship.pos[0]+pt1[0], ship.pos[1]+pt1[1]);
    ctx.lineTo(ship.pos[0], ship.pos[1]);
    ctx.lineTo(ship.pos[0]+pt2[0], ship.pos[1]+pt2[1]);
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
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = '#CCC';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    for (var i = 1; i < asteroid.points.length - 1; i++) {
      ctx.lineTo(asteroid.points[i][0] + asteroid.pos[0], asteroid.points[i][1] + asteroid.pos[1]);
    }
    ctx.fillStyle = asteroid.color;
    ctx.closePath();
    ctx.fill();

    ctx.stroke();
  };

  CanvasDrawer.prototype.defaultDraw = function(movableObj) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = movableObj.color;
    ctx.strokeStyle = '#fff';
    ctx.arc(
      movableObj.pos[0],
      movableObj.pos[1],
      movableObj.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    return this;
  };
})();