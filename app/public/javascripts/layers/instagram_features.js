define(['jquery', 'layers/layout_manager', 'layers/views/instagram', 'layers/rect'], function($, layoutManager, instagramView, rect)
{
  function InstagramFeaturesLayer(canvas, data) 
  {
    this.canvas = canvas;
    this.data = data;
    this.views = [];
    this.maxConcurrentViews = 2;
    this.layoutManager = new layoutManager(this.canvas.element.width(), this.canvas.element.height());
    this.layoutManager.exclusionAreas.push(new rect(840, 0, 140, 100));
    this.layoutManager.exclusionAreas.push(new rect(10, 100, 1050, 280));
    this.layoutManager.exclusionAreas.push(new rect(10, 380, 550, 40));
    this.layoutManager.exclusionAreas.push(new rect(1060, 180, 90, 150));
    this.layoutManager.exclusionAreas.push(new rect(310, 420, 100, 150));
    this.layoutManager.exclusionAreas.push(new rect(1100, 520, 210, 50));

    for (var i = 0; i < this.layoutManager.exclusionAreas.length; i++)
    {
      r = this.layoutManager.exclusionAreas[i];
      console.log(r);
      $("<div style='width:"+r.w+"px; height:"+r.h+"px; left: "+r.x+"px; top: "+r.y+"px; background: red; opacity: 0.2; position:absolute'>&nbsp;</div>").appendTo(this.canvas.element);
    };

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
    var instagrams = this.data.filter(function(event) { return event.provider = 'instagram'; });
    return instagrams[Math.floor(Math.random() * instagrams.length)];
  };

  return InstagramFeaturesLayer;

});
