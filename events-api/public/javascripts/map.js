define(
    ['jquery', 'circular_animation', 'crosshair_animation', 'locatable_event'],
    function($, CircularAnimation, CrosshairAnimation, LocatableEvent) {

  var width = $("#map").width(),
      height = $("#map").height();

  var origin_lat = -31.937487,
      origin_lng = 115.841517

  var end_lat = -31.97317,
      end_lng = 115.880442;

  var lat_width = Math.abs(end_lat - origin_lat),
      lng_height = Math.abs(end_lng - origin_lng);

  var to_cartesian = function(lat, lng) {
    return {
      x: (Math.abs(end_lat - lat) / lat_width) * width,
      y: (Math.abs(end_lng - lng) / lng_height) * height
    };
  };

  var events = [];
  var addEvent = function(event) {
    events.push(event);
  };

  var draw = function() {
    var event = events.pop();
    if(!event) return;

    var coords = to_cartesian(event.coordinates.lat, event.coordinates.lng);
    if (Math.random() < 0.5) {
        new CrosshairAnimation(coords);
    } else {
        new CircularAnimation(coords);
    }

    var locatable_event = LocatableEvent.draw(event, coords);

    setTimeout(function() {
      LocatableEvent.hide(locatable_event);
    }, 15000);
  };

  var start = function(interval) {
    setInterval(function(){
      draw();
    }, interval);
  };

  return {
    addEvent: addEvent,
    start: start,
    origin_lat: origin_lat,
    origin_lng: origin_lng,
    lat_width: lat_width,
    lng_height: lng_height
  };
});
