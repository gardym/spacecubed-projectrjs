var getParam = function(a) {
  return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
}

// Params
var dataSource = getParam('data');
var numberOfDaysToSeedEvents = parseInt(getParam('days')) || 1;
var updateIntervalInSeconds = parseInt(getParam('interval')) || 20;
var showBackground = getParam('background');
var showExclusionAreas = getParam('showExclusionAreas');

var exclusionTop = getParam('exclusionTop');
var exclusionBottom = getParam('exclusionBottom');
var scale = getParam('scale');
var offsetX = getParam('offsetX');
var offsetY = getParam('offsetY');

var config = {
  'shim': { 'lib/moment': { exports: function() { return this.moment; } } }
}

if (dataSource == 'fake') {
  config.map = { '*': { 'data/live_event_stream': 'data/fake_event_stream' } }
}

requirejs.config(config);

require(['jquery', 
         'data/live_event_stream', 
         'canvas', 
         'layers/layout_manager', 
         'layers/tweet_features', 
         'layers/instagram_features', 
         'layers/sparkles', 
         'layers/throb'],
        function($, eventStream, Canvas, LayoutManager, TweetFeaturesLayer, InstagramFeaturesLayer, SparklesLayer, ThrobLayer) {

  $(function(){
    if(showBackground === 'true') {
      $("#background").addClass('map-background');
    }

    var canvas = new Canvas($("#map"));
    window.mapPaper = Raphael($("#raphael-container").get(0), canvas.element.width(), canvas.element.height());

    var layoutManager = new LayoutManager(canvas.element.width(), canvas.element.height());

    // apply the scale / offset to the background layer
    $("#background").css("-webkit-transform", "scale(" + (scale || 1) + ", " + (scale || 1) + ") translateX(" + (offsetX || 0) + "px) translateY(" + (offsetY || 0) + "px)");

    var cs = canvas.element.width() / 1366; // scaling constant for pre-defined exclusion areas 
    layoutManager.exclude( 840 * cs,   0 * cs,  140 * cs, 100 * cs);
    layoutManager.exclude(  10 * cs, 100 * cs, 1050 * cs, 280 * cs);
    layoutManager.exclude(  10 * cs, 380 * cs,  550 * cs,  40 * cs);
    layoutManager.exclude(1060 * cs, 180 * cs,   90 * cs, 150 * cs);
    layoutManager.exclude( 310 * cs, 420 * cs,  100 * cs, 150 * cs);
    layoutManager.exclude(1100 * cs, 520 * cs,  210 * cs,  50 * cs);

    if (exclusionTop)
      layoutManager.exclude(0, 0, canvas.element.width(), canvas.element.height() * exclusionTop);
    if (exclusionBottom)
      layoutManager.exclude(0, canvas.element.height() * (1 - exclusionBottom), canvas.element.width(), canvas.element.height() * exclusionBottom);

    if (showExclusionAreas)
    {
      // Red debugging areas.
      for (var i = 0; i < layoutManager.exclusionAreas.length; i++)
      {
        r = layoutManager.exclusionAreas[i];
        $("<div style='width:"+r.w+"px; height:"+r.h+"px; left: "+r.x+"px; top: "+r.y+"px; background: red; opacity: 0.5; position:absolute'>&nbsp;</div>").appendTo(canvas.element);
      };
    };

    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {
      new TweetFeaturesLayer(canvas, layoutManager, eventsToDate);
      new InstagramFeaturesLayer(canvas, layoutManager, eventsToDate);
      new SparklesLayer(canvas, eventsToDate);
      new ThrobLayer(canvas, { lat: -31.95553, lng: 115.859111 })
    });
  });
});
