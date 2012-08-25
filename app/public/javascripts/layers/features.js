define(function() {

  function FeaturesLayer(layoutManager) {

    this.views = [];

    // Override this in your subclass for your specific viewing needs.
    this._createView = function() { };

    this._start = function() {
      var self = this;
      var timerTick = function() {
        if (self.views.length < self.maxConcurrentViews)
          self._createEventView();
        setTimeout(timerTick, 1000 + Math.random() * 5000);
      };
      setTimeout(timerTick, 1);
    };

    this._createEventView = function() {

      var view = this._createView();
      var viewArea = layoutManager.allocateAreaOfDimensions(view.element.width(), view.element.height());

      if (viewArea == null)
      {
        return view.remove();
      }

      view.setPosition(viewArea.area.x, viewArea.area.y);
      this.views.push(view);

      var self = this;
      view.onComplete = function()
      {
        layoutManager.deallocateArea(viewArea.handle);
        var elementIndex = self.views.indexOf(view);
        if (elementIndex != -1) self.views.splice(elementIndex, 1)
      }
    };

    this._start();
  }

  return FeaturesLayer;

});
