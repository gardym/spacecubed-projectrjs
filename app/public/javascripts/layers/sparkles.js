define(['layers/views/pin'], function(PinView) {

  function SparklesLayer(canvas, events, maxConcurrentPins, sparkleRefresh) {

    // TODO Rename events to event source
    var self = this;

    var views = {};

    var getLocatableEvents = function() {
      return events.all().filter(function(e) {
        return e.coordinates != null && canvas.contains(e.coordinates);
      });
    };

    // Adding sparkle

    var selectAnEventNotAlreadyPinned = function(locatableEvents) {
      var candidateEvent = locatableEvents[Math.floor(Math.random() * locatableEvents.length)];

      // TODO Instead of infinite loop here filter locatable events with keys of currently displayed views
      while (true) {
        if (views[candidateEvent._id] == null) {
          break;
        }
        candidateEvent = locatableEvents[Math.floor(Math.random() * locatableEvents.length)];
      }

      return candidateEvent;
    };

    var markAnEventWithAPin = function(locatableEvents) {
      var event = selectAnEventNotAlreadyPinned(locatableEvents);
      views[event._id] = new PinView(canvas, event);
    };


    // Killing the sparkle

    var replacePin = function() {

      // Using the Chrome only 'keys' function, hope that's cool.
      var idsOfEventsCurrentlyPinned = Object.keys(views);

      var idOfViewToDie = idsOfEventsCurrentlyPinned[Math.floor(Math.random() * idsOfEventsCurrentlyPinned.length)];
      removeView(idOfViewToDie);

      var locatableEvents = getLocatableEvents();
      markAnEventWithAPin(locatableEvents);
    };

    var removeView = function(idOfViewToDie){
      var view = views[idOfViewToDie];
      view.die();
      delete views[idOfViewToDie];
    };

    // Kick this bad boy off

    var start = function() {
      var locatableEvents = getLocatableEvents();
      var numberOfPinsToPlant = Math.min(maxConcurrentPins, locatableEvents.length);
      for(var i = 0; i < numberOfPinsToPlant; i++) {
        markAnEventWithAPin(locatableEvents);
      }

      setInterval(replacePin, sparkleRefresh);
    };

    start();
  };


  return SparklesLayer;

});
