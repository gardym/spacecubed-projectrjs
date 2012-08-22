define(['jquery', 'layers/views/tweet_view'], function($, TweetView) 
{
  function DetailsLayer(eventSource, canvas) {
    this.views = [];
    this.maxConcurrentViews = 3;
    this.layoutManager = new LayoutManager(canvas.width, canvas.height);

    var self = this;
    var timerTick = function() {
      if (self.view.length < self.maxConcurrentViews) 
        self.createEventView();
      setTimeout(timerTick, 10000);
    };
    setTimeout(timerTick, 10000);
  };

  DetailsLayer.prototype.createEventView() {
    viewArea = this.layoutManager.allocateAreaOfDimension(100, 40);
    view = new TweetView(canvas, eventSource.getNextEvent(), viewArea.area);
    var self = this;
    view.onComplete = function() 
    {
      this.layoutManager.deallocateArea(viewArea.handler);
      self.views.remove(view);
    }
  }
});
