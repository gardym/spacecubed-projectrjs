define(['circular_animation'], function() {

  // TODO Replace pin with white dot

  CircularAnimation = function(coords) {
    this.id = 'id' + Math.random().toString().replace(/\./g, '');
    this.e = $('<div class="circular-animation circular-animation-container"></div>').appendTo($("body"));
    this.x = coords.x;
    this.y = coords.y;
    this.e.css('top', coords.y);
    this.e.css('left', coords.x);
    this.startAnimation();
    this.rings = [];
    this.animationStopping = false;
    this.animationsInProgress = 0;
    this._createRingElements(10);
    var self = this;
    setTimeout((function() { self.animationStopping = true }), 5000);
  };


  CircularAnimation.prototype.startAnimation = function()
  {
  };

  CircularAnimation.prototype.stopAnimation = function()
  {
    this.animationStopping = true;
  };

  CircularAnimation.prototype.remove = function()
  {
    var self = this;
    var transitionOut = function() {
      var transitionOutDuration = 1000;
      self.e.css('-webkit-transform', 'rotate(0deg) scaleX(0) scaleY(0)');
      self.e.css('opacity', '0');
      self.e.css('-webkit-transition', '-webkit-transform ' + transitionOutDuration + 'ms ease-in-out, opacity ' + transitionOutDuration + 'ms ease-in-out');
      onTransitionOutComplete = function() {
        self.e.remove();
      }
      setTimeout(onTransitionOutComplete, transitionOutDuration)
    };
    setTimeout(transitionOut, 2000);
  };


  CircularAnimation.prototype._createRingElements = function(numRings)
  {
    for (var i = 0; i < numRings; i++)
    {
      this.rings.push(this._createRingElement(Math.random()*100, Math.random()*20));
    }
  };

  CircularAnimation.prototype._createRingElement = function(radiusInner, thickness)
  {
    var ring = $('<div class="ring"></div>').appendTo(this.e);
    var br = radiusInner + thickness;
    ring.css('border-radius', br +'px')
    ring.css('border-top', (thickness) +'px solid white')
    ring.css('border-left', (thickness) +'px solid white')
    ring.css('border-bottom', (thickness) +'px solid rgba(255,255,255,0.1)')
    ring.css('border-right', (thickness) +'px solid rgba(255,255,255,0.1)')
    ring.css('width', radiusInner * 2 + 'px')
    ring.css('height', radiusInner * 2 + 'px')
    ring.css('top', - (radiusInner + thickness) + 'px')
    ring.css('left', - (radiusInner + thickness) + 'px')
    initialScale = 10
    ring.css('-webkit-transform', 'translate3d(0, 0, 0) scaleX(' + initialScale + ') scaleY(' + initialScale + ')');
    ring.css('-webkit-transition', '-webkit-transform 1500ms ease-in-out, opacity 1500ms ease-in-out');
    ring.css('opacity', '0.0');

    var self = this;
    var stepAnimation = function() {
      var scale = 1 - Math.pow(Math.random(), 4) * 5;
      var rot = Math.random() * 360;
      var duration = Math.random() * 2000 + 50;
      ring.css('-webkit-transform', 'translate3d(0, 0, 0) scaleX(' + scale + ') scaleY(' + scale + ') rotate(' + rot + 'deg)');
      ring.css('-webkit-transition', '-webkit-transform ' + duration + 'ms ease-in-out, opacity ' + duration + 'ms ease-in-out');
      ring.css('opacity', Math.random());

      if (self.animationStopping === false)
        {
          setTimeout(stepAnimation, duration);
        }
        else
          {
            console.log(self);
            self.animationsInProgress--;
            console.log("Animations remaining: " + self.animationsInProgress)
            if (self.animationsInProgress <= 0)
              {
                console.log("removing");
                self.remove();
              }
          }
    }
    this.animationsInProgress++;
    setTimeout(stepAnimation, 0);
    return ring;
  };
  return CircularAnimation;
});
