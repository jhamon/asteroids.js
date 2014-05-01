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

    var randomDirection = function(max) {
      return (Math.random() * 2 - 1) * max;
    }

    var random = function(max) {
      return Math.random() * max;
    }

    var pos = [random(dimX), random(dimY)];
    var speed = random(2);
    var direction = [randomDirection(2), randomDirection(2)];
    var radius = random(Asteroid.prototype.defaults.radius);
    radius = radius > 5 ? radius : radius + 10;
    asteroid = new Asteroid(pos, speed, direction, radius, Asteroid.COLOR);
    asteroid.makePoints(20);
    return asteroid;
  }

  Asteroid.prototype.draw = function(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "#CCC";
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    for (var i = 1; i < this.points.length - 1; i++) {
      ctx.lineTo(this.points[i][0] + this.pos[0], this.points[i][1] + this.pos[1]);
    };
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();

    ctx.stroke();
  }
})();
