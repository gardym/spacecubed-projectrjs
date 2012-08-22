define(['jquery'], function($) 
{
  function TweetView(canvas, eventData, bounds) {
    this.canvas = canvas;
    this.eventData = eventData;
    this.bounds = bounds;

    var self = this;
    finishTimer = function() 
    { 
      self._destroyElement(); 
      if (self.conComplete) self.onComplete();
    }
    setTimeout(finishTimer, 10000);

    this._createElement();
  };

  DetailsLayer.prototype._createElement = function() {
    this.e = $("<div>Event</div>");
    this.e.css('left', this.bounds.x + 'px');
    this.e.css('top', this.bounds.y + 'px');
    this.e.css('position', 'absolute');
    this.canvas.e.append(this.e);
  };

  DetailsLayer.prototype._destroyElement = function() {
    this.e.remove();        
  };
  
});
