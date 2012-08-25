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

require(['jquery', 'data/live_event_stream', 'canvas', 'layers/tweet_features', 'layers/instagram_features'],
        function($, eventStream, Canvas, TweetFeaturesLayer, InstagramFeaturesLayer) {

  var locatableEventsFrom = function(allEvents) {
    return allEvents.filter(function(event) {
      return event.coordinates;
    });
  };

  $(function(){
    if(showBackground === 'true') {
      $("#map").addClass('map-background');
    }

    var canvas = new Canvas($("#map"));

    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {
      new TweetFeaturesLayer(canvas, eventsToDate);
      new InstagramFeaturesLayer(canvas, eventsToDate);
    });
  });
});
