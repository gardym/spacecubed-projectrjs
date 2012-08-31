define(['layers/views/pin'], function(PinView) {

  function SparklesLayer(canvas, eventsToDate) {

    this.data = eventsToDate.filter(
                                function(e) { return e.coordinates })
                            .filter(
                                function(e){ return canvas.containsCoords(e.coordinates) });
    this.views = [];
    this.maxConcurrentPins = this.data.length;

    this._start = function() {
      for(var i = 0; i < this.maxConcurrentPins; i++) {
        this.views.push(this._createEventView());
      }
    };

    this._createEventView = function() {
      var randomEvent = this.data.splice(Math.floor(Math.random() * this.data.length), 1)[0];
      return new PinView(canvas, randomEvent);
    };

    this._start();
  };

  return SparklesLayer;

});
