requirejs.config({
  'map': {
    '*': { 'stream': 'shims/shim-stream' }
  }
  ,'shim': {
    'd3': {
      exports: function() {
        return this.d3;
      }
    }
  }
});

require(['jquery', 'moment', 'stream', 'map', 'ticker'], function($, moment, stream, map, ticker) {
  stream.on(function(events) {
    $.each(events, function(_, evt) {

      ticker.start(3000);
      ticker.addEvent(evt);
    });
  });
});
