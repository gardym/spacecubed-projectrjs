define(['jquery', 'layers/features', 'layers/views/tweet'], function($, FeaturesLayer, TweetView)
{
  function TweetFeaturesLayer(canvas, layoutManager, eventSource)
  {
    var _this = new FeaturesLayer(layoutManager);

    var getTweets = function() {
      return eventSource.all().filter(function(event) {
          return event.provider == 'Twitter' &&
                 event.text.indexOf("http://instagr.am") == -1;
        });
    };
    _this.maxConcurrentViews = 4;

    _this._createView = function() {
      var tweets = getTweets();
      var randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
      return new TweetView(canvas, randomTweet);
    };

    return _this;
  };

  return TweetFeaturesLayer;
});
