define(['jquery', 'layers/features', 'layers/views/tweet'], function($, FeaturesLayer, TweetView)
{
  function TweetFeaturesLayer(canvas, layoutManager, data)
  {
    var _this = new FeaturesLayer(layoutManager);

    _this.data = data.filter(function(event) { return event.provider = 'twitter' && event.text.indexOf("http://instagr.am") == -1; })
    _this.maxConcurrentViews = 4;

    _this._createView = function() {
      var randomTweet = _this.data[Math.floor(Math.random() * _this.data.length)];
      return new TweetView(canvas, randomTweet);
    };

    return _this;
  };

  return TweetFeaturesLayer;
});
