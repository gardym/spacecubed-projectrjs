var config = {
  'shim': {
    'lib/d3': { exports: function() { return this.d3; } },
    'lib/moment': { exports: function() { return this.moment; } }
  }
}

// Use a stub if we are developing locally
if (window.location.hostname == 'localhost') {
  config.map = {
    '*': { 'stream': 'stubs/stub-stream' }
  }
}

requirejs.config(config);

require(['jquery', 'stream', 'map', 'live_events', 'ticker', 'promoter', 'lib/d3'],
        function($, stream, map, live_events, ticker, promoter, d3) {

  $(function(){
    var locatableEvents = live_events.events.filter(function(event) {
      return event.coordinates;
    });
    map.create(locatableEvents);

    //ticker.start(3000);
    //promoter.start(3000);
  });

  //stream.on(function(events) {
    //$.each(events, function(_, event) {
      //if (event.coordinates) {
        //map.addEvent(event);
      //} else {
        //// Define some logic to work out what should be featured
        //// ... or leave it random.
        //if(Math.random() < 0.1) {
          //promoter.addEvent(event);
        //}
        //ticker.addEvent(event);
      //}
    //});
  //});
});
