define(['jquery', 'layers/layout_manager', 'layers/views/tweet', 'layers/rect'], function($, layoutManager, tweetView, rect)
{
  function TweetFeaturesLayer(canvas, layoutManager, data)
  {
    this.canvas = canvas;
    this.data = data;
    this.views = [];
    this.maxConcurrentViews = 4;
    this.layoutManager = layoutManager;

    var self = this;
    var timerTick = function() {
      if (self.views.length < self.maxConcurrentViews)
        self._createEventView();
      setTimeout(timerTick, 1000 + Math.random() * 5000);
    };
    setTimeout(timerTick, 1);
  };

  TweetFeaturesLayer.prototype._createEventView = function()
  {
    var view = new tweetView(this, this._getRandomTweet());
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

  TweetFeaturesLayer.prototype._getRandomEvent = function()
  {
    return this.data[Math.floor(Math.random() * this.data.length)];
  };

  TweetFeaturesLayer.prototype._getRandomTweet = function()
  {
    var tweets = this.data.filter(function(event) { return event.provider = 'twitter'; });
    return tweets[Math.floor(Math.random() * tweets.length)];
  };

  return TweetFeaturesLayer;

});
