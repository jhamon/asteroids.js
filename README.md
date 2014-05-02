Asteroids
============

![Asteroids game screenshot](http://www.github.com/jhamon/asteroids.js/raw/master/screenshot.png)

### Tech Inventory
- Vanilla object-oriented javascript
- HTML5 canvas
- sprinkling of jQuery for keyboard stuff

### Description

Asteroids is more experiment than finished game since there are no win conditions.  It's one of the first things I made using javascript, and it was a great way to wrap my head around javascript's prototypical inheritance.  The   game has several different types of objects (the spaceship, bullets, asteroids) that have specific behaviors but have a common need to know where they are, move around, etc.  This is easily accomplished by having a base object, `MovingObject.prototype`, that all other objects delegate to (a.k.a. "inherit from").

Here's a simplified snippet showing the inheritance pattern:

```javascript
(function () {
    var Asteroids = window.Asteroids = (window.Asteroids || {});

    var MovingObject = Asteroids.MovingObject = function (options) {
      // initialization code to set up position, speed, etc.
    }
    MovingObject.prototype.move = function () {
      // complex logic to update object's position
      // based on position, speed, angular velocity, 
      // direction, acceleration, etc.
    }

    var Ship = Asteroids.Ship = function (options) {
      // Ship-specific initialization would go here
      Asteroids.MovingObject.call(this, options)
    };
    Ship.prototype = new MovingObject();
    Ship.prototype.constructor = Ship;

    // Repeat a similar procedure for Asteroid and Bullet constructors.
})();
```

To understand what's happening here, you have to know that every object has a hidden `[[Prototype]]` property that is set by the constructor function at creation time to whatever is at the constructor's `.prototype` property.  Whenever we try to access a property that an object doesn't have, it defers to its prototype.  So when we try to access a property on an object, the interpreter will check that object, then the object's prototype, then the prototype's prototype, etc until it finds a defined property with that name or reaches the end of the prototype chain and returns `undefined`.  For this reason, it's best to avoid long prototype chains because accessing properties high up on the chain is relatively slow.

As a more concrete example, let's say I want to call `ship.move()` on a `Ship` instance that I create with `var ship = new Asteroids.Ship()`.  Well, `ship` doesn't have a property called `move` and neither does the prototype of `ship` (e.g. `Asteroids.Ship.prototype`) which was an instance of `Asteroids.MovingObject`.  But the prototype's prototype, e.g. `Asteroids.MovingObject.prototype` will have a function under the `move` property name.

I want to give a shoutout to Kyle Simpson for explaining prototypical inheritance (better known as "behavior delegation") in <a href="http://davidwalsh.name/javascript-objects">a way that actually makes sense.</a>


### Notes on render performance

While refactoring, I got a big render performance boost when I replaced `window.setInterval` with `window.requestAnimationFrame`, which is a new timer API available in HTML5.  The browser calls the `requestAnimationFrame` (rAF) callback before each repaint, however often that might be.  Browser implementations of rAF have platform-specific knowledge that allows timing to be optimized and avoid dropped frames and other visual jank that crops up when a timer (even a reliable one, which window.setInterval is not) is out of sync with browser repaints.  


The "game" still has performance problems when too many asteroids are added because a lot of calculation is happening to draw the irregularly shaped asteroid polygons in canvas.  In a real game where performance is a serious concern, I would replace these complex geometric objects with a prerendered sprite.
