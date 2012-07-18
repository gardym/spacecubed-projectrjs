
var config = {
  'shim': {
    'd3': {
      exports: function() {
        return this.d3;
      }
    }
  }
}

// Use a stub if we are developing locally
if (window.location.hostname == 'localhost') {
  config.map = {
    '*': { 'stream': 'stubs/stub-stream' }
  }
}

requirejs.config(config);

require(['jquery', 'moment', 'stream', 'map', 'ticker', 'd3'], function($, moment, stream, map, ticker, d3) {

  $(function(){
    map.startRedrawTimer(4000);
    ticker.start(3000);
  });

  stream.on(function(events) {
    $.each(events, function(_, event) {
      if (event.coordinates) {
        map.addEvent(event);
      }
      else {
        ticker.addEvent(event);
      }
    });
  });
});
