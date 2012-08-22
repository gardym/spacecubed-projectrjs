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

require(['jquery', 'data/live_event_stream', 'visualisations/map'],
        function($, eventStream, map) {

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

  var last_five = function(ary) {
    return ary.slice(ary.length - 6, ary.length - 1);
  };

  $(function(){
    if(showBackground === 'true') {
      $("#map").addClass('map-background');
    }
    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {

      map.create(locatableEventsFrom(eventsToDate));

      setInterval(function(){
        eventStream.newEvents(updateIntervalInSeconds, function(newEvents) {
          var newLocatableEvents = locatableEventsFrom(newEvents);
          newLocatableEvents.forEach(function(newEvent) {
            map.addEvent(newEvent);
          });

          //var newUnlocatableEvents = unlocatableEventsFrom(newEvents);
        });
      }, updateIntervalInSeconds * 1000);
    });
  });
});
