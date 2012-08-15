var config = {
  'shim': {
    'lib/moment': { exports: function() { return this.moment; } }
  }
}

var getParam = function(a) {
  return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
}

if (getParam('data') == 'fake') {
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
    eventStream.eventsToDate(getParam('days') || 4, function(eventsToDate) {

      map.create(locatableEventsFrom(eventsToDate));

      setInterval(function(){
        eventStream.newEvents(20, function(newEvents){
          var newLocatableEvents = locatableEventsFrom(newEvents);
          newLocatableEvents.forEach(function(newEvent){
            map.addEvent(newEvent);
          });
        });
      }, 20000);
    });
  });
});
