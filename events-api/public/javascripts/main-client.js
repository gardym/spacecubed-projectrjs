
requirejs.config({
  'map': {
    '*': { 'stream': 'shims/shim-stream' }
  }
  // Uncomment this to use the stubbed stream - no traffic required!
  //,'shim': {
    //'d3': {
      //exports: function() {
        //return this.d3;
      //}
    //}
  //}
});

require(['jquery', 'moment', 'stream', 'map', 'd3'], function($, moment, stream, map, d3) {

  $(function(){
    map.startRedrawTimer(4000);
  });

  stream.on(function(events) {
    $.each(events, function(_, event) {
      if (event.coordinates) {
        map.addEvent(event);
      }
      else {
        //ticker.addEvent(event);
      }
    });
  });
});
