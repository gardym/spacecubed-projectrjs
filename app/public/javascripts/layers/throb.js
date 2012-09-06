define(['jquery'], function($) {

  function ThrobLayer(canvas, coords) {

    var throbber = $("<div class='throbber'></div>").appendTo('#map');

    var position = canvas.latLongToCartesian(coords)
    throbber.css("left", position.x - throbber.width() / 2 + "px")
    throbber.css("top", position.y - throbber.height() / 2 + 10 + "px")

  };

  return ThrobLayer;

});
