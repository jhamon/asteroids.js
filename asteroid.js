(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(asteroid_properties) {
    asteroid_properties.color = this.defaults.color; 
    Asteroids.MovingObject.call(this, asteroid_properties);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.defaults = {
    color: '#FFF',
    radius: 40
  }

  Asteroid.prototype.makePoints = function (numPoints) {
    // Points represent the jagged geometry of the drawn asteroid.
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

  Asteroid.random = function() {
    // Factory returns an asteroid instance with random position, speed, dir, size.
    var randomDirection, 
        random, 
        pos, 
        speed, 
        direction, 
        radius, 
        asteroid_properties,
        width,
        height;

    width = this.prototype.viewState.width;
    height = this.prototype.viewState.height;

    randomDirection     = Asteroids.Utils.randomDirection;
    random              = Asteroids.Utils.random;

    pos                 = [random(width), random(height)];
    speed               = random(2);
    direction           = randomDirection();
    radius              = random(Asteroid.prototype.defaults.radius);
    radius              = radius > 5 ? radius : radius + 10;
    asteroid_properties = { 
                            'pos': pos,
                            'speed': speed,
                            'dir': direction,
                            'radius': radius,
                          }


    asteroid = new Asteroid(asteroid_properties);
    asteroid.makePoints(15);
    return asteroid;
  }
})();
