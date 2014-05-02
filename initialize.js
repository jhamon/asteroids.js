$(document).ready( function () {
  'use strict';
  
  var game;
  var canvas = document.getElementById("asteroids_canvas");

  Asteroids.viewState = {};

  function updateViewState() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    Asteroids.viewState.width = width;
    Asteroids.viewState.height = height;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    console.log('reconfig');
  }
  updateViewState();

  Asteroids.MovingObject.prototype.viewState = Asteroids.viewState;
  Asteroids.CanvasDrawer.prototype.viewState = Asteroids.viewState;

  window.onresize = updateViewState;

  game = new Asteroids.Game()
  game.start(canvas);
})