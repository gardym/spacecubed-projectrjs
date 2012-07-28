define(['jquery', 'lib/moment'], function($, moment) {

  var listeners = [];

  var fromTime = moment().unix();
  var poll = function() {
    var toTime = moment().unix();
    $.get('/events', {from: fromTime, to: toTime}, function(data) {
      listeners.forEach(function(listener) { listener(data); });
    });
    fromTime = toTime;
  };

  setInterval(poll, 5000);
  return {
    on: function(fn) {
      listeners.push(fn);
    }
  };
});
