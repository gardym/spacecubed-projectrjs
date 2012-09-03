define( ['jquery', 'lib/moment', 'data/fixed_queue' ], function($, moment, FixedQueue) {

  function EventSource(numberOfDaysToSeedWith, updateIntervalInSeconds, maxEventsToStore, seedCompleteCallback)
  {
    var self = this;

    this.events = new FixedQueue(maxEventsToStore);

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

    var newEvents = function(secondsSinceLastCall, doneCallback) {
      var fromTime = moment().subtract('seconds', secondsSinceLastCall).unix();
      var toTime = moment().unix();

      return fetchEvents(fromTime, toTime, doneCallback);
    };

    eventsToDate(numberOfDaysToSeedWith, function(rawEvents){
      rawEvents.forEach(function(event) {
        this.events.push(event);
      });
      seedCompleteCallback(self);
    });

    setInterval(function(){
      newEvents(updateIntervalInSeconds, function(newEvents) {

        newEvents.forEach(function(newEvent) {
          self.events.push(newEvent);
        });

      }, updateIntervalInSeconds * 1000);
    });

  }

  EventSource.prototype.all = function() {
    return this.events.allItems();
  };

  return EventSource;
});
