define(function() {
  function Canvas($element, offsetX, offsetY) {

    this.element = $element;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    var width = this.element.width(),
        height = this.element.height();

    var origin_lat = -31.937487,
        origin_lng = 115.841517;

    var end_lat = -31.97317,
        end_lng = 115.880442;

    var lat_height = Math.abs(end_lat - origin_lat),
        lng_width = Math.abs(end_lng - origin_lng);

    this.latLongToCartesian = function(coords) {
      // TODO: Adjust for map rotation
      return {
        x: ((Math.abs(coords.lng - origin_lng) / lng_width) * width) + offsetX,
        y: ((Math.abs(coords.lat - origin_lat) / lat_height) * (596 / 1366) * width) + offsetY
      };
    };

    this.contains = function(coords) {
      var c = this.latLongToCartesian(coords);
      return (c.x <= width) && (c.y <= height);
    };
  };
  return Canvas;
});
