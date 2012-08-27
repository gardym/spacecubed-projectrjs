define(['jquery', 'layers/features', 'layers/views/instagram'], function($, FeaturesLayer, InstagramView)
{
  function InstagramFeaturesLayer(canvas, layoutManager, data)
  {
    var _this = new FeaturesLayer(layoutManager);

    _this.data = data.filter(function(event) { return event.coordinates; })
    _this.maxConcurrentViews = 2;

    _this._createView = function() {
      var randomGram = _this.data[Math.floor(Math.random() * _this.data.length)];
      return new InstagramView(canvas, randomGram);
    };

    return _this;
  };

  return InstagramFeaturesLayer;
});
