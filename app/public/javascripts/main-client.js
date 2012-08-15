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

requirejs.config(config);

require(['jquery', 'visualisations/map', 'data/live_event_stream', 'visualisations/ticker', 'visualisations/promoter'],
        function($, map, event_stream, ticker, promoter) {

  $(function(){
    event_stream.eventsToDate(getParam('days') || 4, function(eventsToDate) {

      var locatableEvents = eventsToDate.filter(function(event) {
        return event.coordinates;
      });

      map.create(locatableEvents);
    });
  });
});
