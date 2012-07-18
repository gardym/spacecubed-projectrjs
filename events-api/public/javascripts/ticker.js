define(function() {

  var events = [];
  var addEvent = function(evt) {
    events.push(evt);
  };

  var draw = function() {
    console.log(events);
  };

  var start = function(interval) {
    setInterval(draw, interval);
  };

  return {
    addEvent: addEvent,
    start: start
  };
});
