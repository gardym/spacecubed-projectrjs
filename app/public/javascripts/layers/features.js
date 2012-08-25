define(function() {

  function FeaturesLayer(layoutManager) {

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
  }

  return FeaturesLayer;

});
