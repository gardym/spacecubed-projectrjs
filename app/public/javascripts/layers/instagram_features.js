define(['jquery', 'layers/features', 'layers/views/instagram'], function($, FeaturesLayer, InstagramView)
{
  function InstagramFeaturesLayer(canvas, layoutManager, eventSource)
  {
    var _this = new FeaturesLayer(layoutManager);

    var fetchGrams = function() {
      return eventSource.all().filter(function(event) {
        return event.provider == "Instagram" &&
               event.coordinates &&
               canvas.contains(event.coordinates);
      });
    };

    _this.maxConcurrentViews = 2;

    _this._createView = function() {
      var grams = fetchGrams();
      var randomGram = grams[Math.floor(Math.random() * grams.length)];
      return new InstagramView(canvas, randomGram);
    };

    return _this;
  };

  return InstagramFeaturesLayer;
});
