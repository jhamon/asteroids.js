(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, speed, direction, radius, color) {
    var asteroid_properties = {
        dir: direction,
        pos: pos,
        speed: speed,
        radius: radius,
        color: color
    }
    Asteroids.MovingObject.call(this, asteroid_properties);
  }
  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.defaults = {
    color: '#FFF',
    radius: 40
  }

  Asteroid.prototype.makePoints = function (numPoints) {
    this.points = [];
    var azimuths = [0, 2*Math.PI];

    for (var i = 0; i <= numPoints; i++) {
      azimuths.push(Math.random()*Math.PI*2);
    };

    azimuths = azimuths.sort();
    for (var i = 0; i < azimuths.length; i++) {
      az = azimuths[i];
      var noise = Math.random()*this.radius*0.2;
      var x = (this.radius + noise)* Math.cos(az);
      var y = (this.radius + noise) * Math.sin(az);
      this.points.push([x,y]);
    };

    return this.points;
  }

  Asteroid.randomAsteroid = function(dimX, dimY) {

    var randomDirection = Asteroids.Utils.randomDirection;
    var random = Asteroids.Utils.random;

    var pos = [random(dimX), random(dimY)];
    var speed = random(2);
    var direction = [randomDirection(2), randomDirection(2)];
    var radius = random(Asteroid.prototype.defaults.radius);
    radius = radius > 5 ? radius : radius + 10;
    asteroid = new Asteroid(pos, speed, direction, radius, Asteroid.COLOR);
    asteroid.makePoints(20);
    return asteroid;
  }
})();
