$(document).ready( function () {
  "use strict";
  
  var game;
  var canvas = document.getElementById("asteroids_canvas");

  Asteroids = window.Asteroids = (window.Asteroids || {});
  Asteroids.viewState = {};

  function updateViewState() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    Asteroids.viewState.width = width;
    Asteroids.viewState.height = height;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }
  updateViewState();

  Asteroids.MovingObject.prototype.viewState = Asteroids.viewState;
  Asteroids.CanvasDrawer.prototype.viewState = Asteroids.viewState;

  window.onresize = updateViewState;

  console.log("Thanks for checking out my project.  If you're looking for a good Ruby/Javascript dev in the SF Bay Area, please reach out.  I'm Jen Hamon, jen@hamon.io");
  
  game = new Asteroids.Game(canvas);
  game.start();
});
