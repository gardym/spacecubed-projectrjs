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

    var idsOfEventsCurrentlyPinned = function() {
      // Using the Chrome only 'keys' function, hope that's cool.
      return Object.keys(views);
    };

    // Adding sparkle

    var selectAnEventNotAlreadyPinned = function(locatableEvents) {
      var alreadyPinned = idsOfEventsCurrentlyPinned();

      var notAlreadyPinned = locatableEvents.filter(function(event){
        return alreadyPinned.indexOf(event._id) == -1;
      });

      if (notAlreadyPinned.length > 0) {
        return notAlreadyPinned[Math.floor(Math.random() * notAlreadyPinned.length)];
      }
      else {
        return null;
      }
    };

    var markAnEventWithAPin = function(locatableEvents) {
      var event = selectAnEventNotAlreadyPinned(locatableEvents);
      if (event) {
        views[event._id] = new PinView(canvas, event);
      }
    };


    // Killing the sparkle

    var replacePin = function() {

      var candidatesToDie = idsOfEventsCurrentlyPinned();

      // Make sure we remove first so we can readd if needed
      var idOfViewToDie = candidatesToDie[Math.floor(Math.random() * candidatesToDie.length)];
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
