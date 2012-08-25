define(['jquery', 'layers/features', 'layers/views/tweet'], function($, FeaturesLayer, TweetView)
{
  function TweetFeaturesLayer(canvas, layoutManager, data)
  {
    _this = new FeaturesLayer(layoutManager);

    _this.data = data.filter(function(event) { return event.provider = 'twitter'; })
    _this.views = [];
    _this.maxConcurrentViews = 4;

    var self = _this;
    var timerTick = function() {
      if (self.views.length < self.maxConcurrentViews)
        self._createEventView();
      setTimeout(timerTick, 1000 + Math.random() * 5000);
    };
    setTimeout(timerTick, 1);

    _this._createView = function() {
      var randomTweet = _this.data[Math.floor(Math.random() * _this.data.length)];
      return new TweetView(canvas, randomTweet);
    };

    return _this;
  };

  return TweetFeaturesLayer;
});
