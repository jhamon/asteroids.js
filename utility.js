(function () {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Utils = Asteroids.Utils = {};

  Utils.randomPlusOrMinusMax = function(max) {
      // Random value in range -max to +max
      return (Math.random() * 2 - 1) * max;
  }

  Utils.randomDirection = function () {
    var xComponent = Utils.randomPlusOrMinusMax(2);
    var yComponent = Utils.randomPlusOrMinusMax(2);
    return [xComponent, yComponent];
  }

  Utils.random = function(max) {
      // Random value bewtween 0 and max.
      return Math.random() * max;
  }

  Utils.mod = function (a, b) {
    return ((a%b)+b)%b;
  }

  Utils.rotateVec = function(vec, theta) {
    var theta = theta || -0.2;

    var x1 = vec[0];
    var y1 = vec[1];
    var x2 = x1 * Math.cos(theta) - y1 * Math.sin(theta);
    var y2 = x1 * Math.sin(theta) + y1 * Math.cos(theta);

    return [x2, y2];
  }

  Utils.normalizeVec = function (dir) {
    var magnitude = Math.sqrt(Math.pow(dir[0], 2) + Math.pow(dir[1], 2));
    if (magnitude != 1) {
      dir[0] = dir[0] / magnitude;
      dir[1] = dir[1] / magnitude;
    }
    return dir;
  }
})();