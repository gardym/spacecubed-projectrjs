// Uncomment this to use the stubbed stream - no traffic required!
requirejs.config({
  'map': {
    '*': { 'stream': 'shims/shim-stream' }
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
