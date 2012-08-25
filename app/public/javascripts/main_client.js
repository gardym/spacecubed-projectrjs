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

require(['jquery', 'data/live_event_stream', 'canvas', 'layers/features', 'layers/instagram_features'],
        function($, eventStream, canvas, featuresLayer, instagramFeaturesLayer) {

  var locatableEventsFrom = function(allEvents) {
    return allEvents.filter(function(event) {
      return event.coordinates;
    });
  };

  var unlocatableEventsFrom = function(allEvents) {
    return allEvents.filter(function(event) {
      return !event.coordinates;
    });
  };

  $(function(){
    if(showBackground === 'true') {
      $("#map").addClass('map-background');
    }
    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {
      window.canvas = new canvas($("#map"));
      window.featuresLayer = new featuresLayer(window.canvas, eventsToDate);
      window.instagramFeaturesLayer = new instagramFeaturesLayer(window.canvas, eventsToDate);
    });
  });
});
