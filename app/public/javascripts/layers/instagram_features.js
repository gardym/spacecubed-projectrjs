define(['jquery', 'layers/views/instagram'], function($, instagramView)
{
  function InstagramFeaturesLayer(canvas, layoutManager, data)
  {
    this.canvas = canvas;
    this.data = data;
    this.views = [];
    this.maxConcurrentViews = 2;
    this.layoutManager = layoutManager;

    var self = this;
    var timerTick = function() {
      if (self.views.length < self.maxConcurrentViews)
        self._createEventView();
      setTimeout(timerTick, 1000 + Math.random() * 5000);
    };
    setTimeout(timerTick, 1);
  };

  InstagramFeaturesLayer.prototype._createEventView = function() 
  {
    var view = new instagramView(this, this._getRandomInstagram());
    var viewArea = this.layoutManager.allocateAreaOfDimensions(view.element.width(), view.element.height());
    if (viewArea == null)
    {
      return view.remove();
    } 

    view.setPosition(viewArea.area.x, viewArea.area.y);
    this.views.push(view);

    var self = this;
    view.onComplete = function()
    {
      self.layoutManager.deallocateArea(viewArea.handle);
      var elementIndex = self.views.indexOf(view);
      if (elementIndex != -1) self.views.splice(elementIndex, 1)
    }
  };

  InstagramFeaturesLayer.prototype._getRandomInstagram = function()
  {
    var instagrams = this.data.filter(function(event) { return event.coordinates; });
    return instagrams[Math.floor(Math.random() * instagrams.length)];
  };

  return InstagramFeaturesLayer;

});
