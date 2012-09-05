var getParam = function(a) {
  return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
}

// Params
var dataSource = getParam('data');
var numberOfDaysToSeedEvents = parseInt(getParam('days')) || 1;
var updateIntervalInSeconds = parseInt(getParam('interval')) || 20;

var maxPins = parseInt(getParam('maxPins')) || 200;
var sparkleRefresh = parseInt(getParam('sparkleRefresh')) || 10000;

var showBackground = getParam('background');
var showExclusionAreas = getParam('showExclusionAreas');

var offsetX = parseInt(getParam('offsetX')) || -40;
var offsetY = parseInt(getParam('offsetY')) || 210;
var clipTop = parseFloat(getParam('clipTop')) || 0.17;
var clipLeft = parseFloat(getParam('clipLeft')) || 0.1;
var clipRight = parseFloat(getParam('clipRight')) || 0.1;
var clipBottom = parseFloat(getParam('clipBottom')) || 0.02;

var config = {
  'shim': { 'lib/moment': { exports: function() { return this.moment; } } }
}

if (dataSource == 'fake') {
  config.map = { '*': { 'data/live_event_source': 'data/fake_event_source' } }
}

requirejs.config(config);

require(['jquery',
         'data/live_event_source',
         'canvas',
         'layers/layout_manager',
         'layers/tweet_features',
         'layers/instagram_features',
         'layers/sparkles',
         'layers/throb'],
        function($, EventSource, Canvas, LayoutManager, TweetFeaturesLayer, InstagramFeaturesLayer, SparklesLayer, ThrobLayer) {

  $(function(){
    if(showBackground === 'true') {
      $("#background").addClass('map-background');
    }

    var canvas = new Canvas($("#map"), offsetX, offsetY);
    window.mapPaper = Raphael($("#raphael-container").get(0), canvas.element.width(), canvas.element.height());

    var layoutManager = new LayoutManager(canvas.element.width(), canvas.element.height());


    var cs = canvas.element.width() / 1366; // scaling constant for pre-defined exclusion areas
    layoutManager.exclude( 840 * cs + offsetX, -50 * cs + offsetY,  140 * cs, 100 * cs);
    layoutManager.exclude(  10 * cs + offsetX,  50 * cs + offsetY, 1050 * cs, 310 * cs);
    layoutManager.exclude(  10 * cs + offsetX, 360 * cs + offsetY,  550 * cs,  40 * cs);
    layoutManager.exclude(1060 * cs + offsetX, 180 * cs + offsetY,   90 * cs, 100 * cs);
    layoutManager.exclude( 330 * cs + offsetX, 400 * cs + offsetY,   80 * cs, 150 * cs);
    layoutManager.exclude(1100 * cs + offsetX, 520 * cs + offsetY,  210 * cs,  50 * cs);

    layoutManager.exclude(0, 0, canvas.element.width() * clipLeft, canvas.element.height());
    layoutManager.exclude(canvas.element.width() * (1 - clipRight), 0, canvas.element.width() * clipRight, canvas.element.height());
    layoutManager.exclude(0, 0, canvas.element.width(), canvas.element.height() * clipTop);
    layoutManager.exclude(0, canvas.element.height() * (1 - clipBottom), canvas.element.width(), canvas.element.height() * clipBottom);

    $('#maskLeft').width(canvas.element.width() * clipLeft);
    $('#maskRight').width(canvas.element.width() * clipRight);
    $('#maskTop').height(canvas.element.height() * clipTop);
    $('#maskBottom').height(canvas.element.height() * clipBottom);

    if (showExclusionAreas)
    {
      // Red debugging areas.
      for (var i = 0; i < layoutManager.exclusionAreas.length; i++)
      {
        r = layoutManager.exclusionAreas[i];
        $("<div style='width:"+r.w+"px; height:"+r.h+"px; left: "+r.x+"px; top: "+r.y+"px; background: red; opacity: 0.5; position:absolute'>&nbsp;</div>").appendTo(canvas.element);
      };
    };

    new EventSource(numberOfDaysToSeedEvents, updateIntervalInSeconds, 2000, function(eventSource){
      new TweetFeaturesLayer(canvas, layoutManager, eventSource);
      new InstagramFeaturesLayer(canvas, layoutManager, eventSource);
      new SparklesLayer(canvas, eventSource, maxPins, sparkleRefresh);
      new ThrobLayer(canvas, { lat: -31.95553, lng: 115.859111 });
    });

  });
});
