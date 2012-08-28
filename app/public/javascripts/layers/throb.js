define(['layers/views/pin'], function(PinView) {
  
  function ThrobLayer(canvas, coords) {

    var throbber = $("<div class='throbber'></div>").appendTo('#map');

    var position = canvas.latLongToCartesian(coords)
    throbber.css("left", position.x + "px")
    throbber.css("top", position.y + "px")

  };

  return ThrobLayer;

});
