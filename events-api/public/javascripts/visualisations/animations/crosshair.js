define(function() {

  CrosshairAnimation = function(coords) {
    this.id = 'id' + Math.random().toString().replace(/\./g, '');
    this.e = $('<div class="grid-visualisation grid-visualisation-container"></div>').appendTo($("body"));
    this.x = coords.x;
    this.y = coords.y;
    this.width = 400;
    this.height = 400;
    this.e.css('top', this.y)
    this.e.css('left', this.x)
    this.e.css('-webkit-transform', 'scaleX(1) scaleY(1)');
    this.animationStopping = false;
    this.animationsInProgress = 0;
    this._createLines(10);
    this.startTime = new Date();
    this.animationDuration = 5000;
    var self = this;
    setTimeout((function() { self.animationStopping = true }), this.animationDuration);

    var stepAnimation2 = function() {
      if (self.animationStopping !== false) return;
      var rot = Math.random() * 10 - 5 ;
      var duration = Math.random() * 2000 + 200;
      self.e.css('-webkit-transform', 'rotate(' + rot + 'deg) scaleX(1) scaleY(1)');
      self.e.css('-webkit-transition', '-webkit-transform ' + duration + 'ms ease-in-out');
      if (self.animationStopping === false) 
      {
        setTimeout(stepAnimation2, duration); 
      }
    } 
    setTimeout(stepAnimation2, 0);


  };

  CrosshairAnimation.prototype.stopAnimation = function() 
  {
    this.animationStopping = true;
  };

  CrosshairAnimation.prototype.remove = function() 
  {
      var self = this;
      var transitionOut = function() {
        var transitionOutDuration = 1000;
        self.e.css('opacity', '0');
        self.e.css('-webkit-transform', 'rotate(0deg) scaleX(0) scaleY(0)');
        self.e.css('-webkit-transition', '-webkit-transform ' + transitionOutDuration + 'ms ease-in-out, opacity ' + transitionOutDuration + 'ms ease-in-out');
        onTransitionOutComplete = function() {
          self.e.remove();
        }
        setTimeout(onTransitionOutComplete, transitionOutDuration)
      };
      setTimeout(transitionOut, 2000);
  };


  CrosshairAnimation.prototype._createLines = function(numLines) 
  {
    for (var i = 0; i < numLines; i++)
    {
      this._createLine(true);
      this._createLine(false);
    }
  };

  CrosshairAnimation.prototype._createLine = function(isHorizontal) 
  {
    var line = $('<div class="horizontal-line"></div>').appendTo(this.e);
    line.css('position', 'absolute');
    if (isHorizontal) {
      var width = Math.random() * 20;
      line.css('top', (-width / 2) + 'px');
      line.css('width', this.width + 'px');
      line.css('left', (- this.width / 2) + 'px');
      line.css('height', width + 'px');
    } else {
      var width = Math.random() * 20;
      line.css('left', (-width / 2) + 'px');
      line.css('width', width + 'px');
      line.css('top', (- this.height / 2) + 'px');
      line.css('height', this.height + 'px');
    }
    //line.css('background', 'white');
    if (isHorizontal) {
      line.css('background-image', '-webkit-gradient(linear, left top, right top, color-stop(0, rgba(255,255,255,0)), color-stop(0.5, rgba(255,255,255,1)), color-stop(1, rgba(255,255,255,0)))');
    } else {
      line.css('background-image', '-webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(255,255,255,0)), color-stop(0.5, rgba(255,255,255,1)), color-stop(1, rgba(255,255,255,0)))');
    }
    line.css('opacity', '0');
    var offset = ((Math.random() - 0.5) * 2) * 400;
    var offsetX = isHorizontal ? 0 : offset;
    var offsetY = isHorizontal ? offset : 0;
    line.css('-webkit-transform', 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)');
    line.css('-webkit-transition', '-webkit-transform 1500ms ease-in-out, opacity 1500ms ease-in-out');

    var self = this;
    var stepAnimation = function() {
      var proportionTimeRemaining = 1 - ((new Date()) - self.startTime) / self.animationDuration;
      var offset = ((Math.random() - 0.5) * 2) * 400 * Math.pow(proportionTimeRemaining, 8);
      var offsetX = isHorizontal ? 0 : offset;
      var offsetY = isHorizontal ? offset : 0;
      var duration = Math.random() * 2000 + 50;
      line.css('-webkit-transform', 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)');
      line.css('-webkit-transition', '-webkit-transform ' + duration + 'ms ease-in-out, opacity ' + duration + 'ms ease-in-out');
      line.css('opacity', Math.random() * 0.50);

      if (self.animationStopping === false) 
      {
        setTimeout(stepAnimation, duration); 
      }
      else 
      {
          self.animationsInProgress--;
          if (self.animationsInProgress <= 0) 
            self.remove();
      }
    } 
    this.animationsInProgress++;
    setTimeout(stepAnimation, 0);
    return line;
  };
  return CrosshairAnimation;
});
