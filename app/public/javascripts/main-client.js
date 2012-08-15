var config = {
  'shim': {
    'lib/moment': { exports: function() { return this.moment; } }
  }
}

var getParam = function(a) {
  return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
}

// Params
var dataSource = getParam('data');
var numberOfDaysToSeedEvents = parseInt(getParam('days')) || 4;
var updateIntervalInSeconds = parseInt(getParam('interval')) || 20;

if (dataSource == 'fake') {
  config.map = {
    '*': { 'data/live_event_stream': 'data/fake_event_stream' }
  }
}

var locatableEventsFrom = function(allEvents) {
  return allEvents.filter(function(event) {
    return event.coordinates;
  });
}

requirejs.config(config);

require(['jquery', 'visualisations/map', 'data/live_event_stream', 'visualisations/ticker', 'visualisations/promoter'],
        function($, map, eventStream, ticker, promoter) {

  $(function(){
    eventStream.eventsToDate(numberOfDaysToSeedEvents, function(eventsToDate) {

      map.create(locatableEventsFrom(eventsToDate));

      // TODO Load up ticker etc...

      setInterval(function(){
        eventStream.newEvents(updateIntervalInSeconds, function(newEvents){
          var newLocatableEvents = locatableEventsFrom(newEvents);
          newLocatableEvents.forEach(function(newEvent){
            map.addEvent(newEvent);
          });

          // TODO Add to ticker etc...
        });
      }, updateIntervalInSeconds * 1000);
    });
  });
});
