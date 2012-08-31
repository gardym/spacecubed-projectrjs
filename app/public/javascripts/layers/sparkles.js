define(['layers/views/pin'], function(PinView) {

  function SparklesLayer(canvas, events) {

    this.views = [];
    this.maxConcurrentPins = 500;

    var getLocatableEvents = function() {
      return events.all().filter(function(e) {
        return e.coordinates != null && canvas.contains(e.coordinates);
      });
    };

    // TODO Come up with better way of selecting events, having them die, and adding new ones to the layer

    // Overrides start so that we dont pause between each sparkle that is displayed
    this._start = function() {
      for(var i = 0; i < this.maxConcurrentPins; i++) {
        this.views.push(this._createEventView());
      }
    };

    this._createEventView = function() {
      var locatableEvents = getLocatableEvents();
      var randomEvent = locatableEvents.splice(Math.floor(Math.random() * locatableEvents.length), 1)[0];
      return new PinView(canvas, randomEvent);
    };

    this._start();
  };


  return SparklesLayer;

});
