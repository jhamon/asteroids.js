(function() {
  'use strict';
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(asteroid_properties) {
    this.radius = asteroid_properties.radius;
    this.speed  = asteroid_properties.speed;
    this.x = asteroid_properties.x;
    this.y = asteroid_properties.y;
    this.direction = asteroid_properties.dir;
    this.makePoints(20);
  };

  Asteroid.prototype = new Asteroids.MovingObject();
  Asteroid.prototype.constructor = Asteroid;

  // Set default properties on prototype
  Asteroid.prototype.color = '#FFFFFF';
  Asteroid.prototype.radius = 40;

  Asteroid.prototype.makePoints = function (numPoints) {
    // Points representing the jagged geometry of the drawn asteroid.
    var az;
    var azimuths = [0, 2*Math.PI];
    this.points = [];

    for (var i = 0; i <= numPoints; i++) {
      azimuths.push(Math.random()*Math.PI*2);
    }

    azimuths = azimuths.sort();
    for (i = 0; i < azimuths.length; i++) {
      az = azimuths[i];
      var noise = Math.random()*this.radius*0.2;
      var x = (this.radius + noise)* Math.cos(az);
      var y = (this.radius + noise) * Math.sin(az);
      this.points.push([x,y]);
    }

    return this.points;
  };

  Asteroid.random = function() {
    // Factory returns an asteroid instance with random position, speed, dir, size.
    var asteroid,
        asteroid_properties;

    var maxX = this.prototype.viewState.width;
    var maxY = this.prototype.viewState.height;

    var randomDirection = Asteroids.Utils.randomDirection;
    var random          = Asteroids.Utils.random;
    var radius          = random(Asteroid.prototype.radius);
    radius              = radius > 5 ? radius : radius + 10;
    asteroid_properties = { 
                            'x'      : random(maxX),
                            'y'      : random(maxY),
                            'speed'  : random(2),
                            'dir'    : randomDirection(),
                            'radius' : radius,
                          };

    asteroid = new Asteroid(asteroid_properties);
    return asteroid;
  };
})();
