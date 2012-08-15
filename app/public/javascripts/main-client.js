var config = {
  'shim': {
    'lib/moment': { exports: function() { return this.moment; } }
  }
}

if (window.location.search.indexOf('data=fake') != -1) {
  config.map = {
    '*': { 'data/live_event_stream': 'data/fake_event_stream' }
  }
}

requirejs.config(config);

require(['jquery', 'data/stream', 'visualisations/map', 'data/live_event_stream', 'visualisations/ticker', 'visualisations/promoter'],
        function($, stream, map, event_stream, ticker, promoter) {

  $(function(){
    event_stream.eventsToDate(function(eventsToDate) {

      var locatableEvents = eventsToDate.filter(function(event) {
        return event.coordinates;
      });

      map.create(locatableEvents);
    });
  });
});
