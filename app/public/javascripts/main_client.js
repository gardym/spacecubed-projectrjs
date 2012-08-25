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

  $(function(){
    if(showBackground === 'true') {
      $("#map").addClass('map-background');
    }

    var _canvas = new canvas($("#map"));

    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {
      window.featuresLayer = new featuresLayer(_canvas, eventsToDate);
      window.instagramFeaturesLayer = new instagramFeaturesLayer(_canvas, eventsToDate);
    });
  });
});
