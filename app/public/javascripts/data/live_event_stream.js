define( ['jquery', 'lib/moment' ], function($, moment) {

  var fetchEvents = function(fromTime, toTime, doneCallback) {
    $.get('/events', {from: fromTime, to: toTime}, function(data) {
      doneCallback(data);
    });
  };

  var eventsToDate = function(days, doneCallback) {
    var fromTime = moment().subtract('days', days).unix();
    var toTime = moment().unix();

    return fetchEvents(fromTime, toTime, doneCallback);
  };

  return {
    newEvents: function(doneCallback) { return []; },
    eventsToDate: eventsToDate
  }
});
