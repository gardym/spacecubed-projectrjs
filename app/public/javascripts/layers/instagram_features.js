define(['jquery', 'layers/features', 'layers/views/instagram'], function($, FeaturesLayer, InstagramView)
{
  function InstagramFeaturesLayer(canvas, layoutManager, data)
  {
    _this = new FeaturesLayer(layoutManager);

    _this.data = data.filter(function(event) { return event.coordinates; })
    _this.views = [];
    _this.maxConcurrentViews = 2;

    var self = _this;
    var timerTick = function() {
      if (self.views.length < self.maxConcurrentViews)
        self._createEventView();
      setTimeout(timerTick, 1000 + Math.random() * 5000);
    };
    setTimeout(timerTick, 1);

    _this._createView = function() {
      var randomGram = _this.data[Math.floor(Math.random() * _this.data.length)];
      return new InstagramView(canvas, randomGram);
    };

    return _this;
  };

  return InstagramFeaturesLayer;
});
