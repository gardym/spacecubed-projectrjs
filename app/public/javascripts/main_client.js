var getParam = function(a) {
  return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
}

// Params
var dataSource = getParam('data');
var numberOfDaysToSeedEvents = parseInt(getParam('days')) || 1;
var updateIntervalInSeconds = parseInt(getParam('interval')) || 20;
var showBackground = getParam('background');

var config = {
  'shim': { 'lib/moment': { exports: function() { return this.moment; } } }
}

if (dataSource == 'fake') {
  config.map = { '*': { 'data/live_event_stream': 'data/fake_event_stream' } }
}

requirejs.config(config);

require(['jquery', 'data/live_event_stream', 'canvas', 'layers/layout_manager', 'layers/tweet_features', 'layers/instagram_features', 'layers/sparkles'],
        function($, eventStream, Canvas, LayoutManager, TweetFeaturesLayer, InstagramFeaturesLayer, SparklesLayer) {

  $(function(){
    if(showBackground === 'true') {
      $("#map").addClass('map-background');
    }

    var canvas = new Canvas($("#map"));

    var layoutManager = new LayoutManager(canvas.element.width(), canvas.element.height());
    layoutManager.exclude(840, 0, 140, 100);
    layoutManager.exclude(10, 100, 1050, 280);
    layoutManager.exclude(10, 380, 550, 40);
    layoutManager.exclude(1060, 180, 90, 150);
    layoutManager.exclude(310, 420, 100, 150);
    layoutManager.exclude(1100, 520, 210, 50);

    // Red debugging areas.
    for (var i = 0; i < layoutManager.exclusionAreas.length; i++)
    {
      r = layoutManager.exclusionAreas[i];
      $("<div style='width:"+r.w+"px; height:"+r.h+"px; left: "+r.x+"px; top: "+r.y+"px; background: red; opacity: 0.2; position:absolute'>&nbsp;</div>").appendTo(canvas.element);
    };

    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {
      new TweetFeaturesLayer(canvas, layoutManager, eventsToDate);
      new InstagramFeaturesLayer(canvas, layoutManager, eventsToDate);
      new SparklesLayer(canvas, eventsToDate);
    });
  });
});
