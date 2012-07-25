define(['jquery'], function($) {
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
    console.log(events);
  };

  var draw = function() {
    console.log("Drawing the shiz");
  }

  var startRedrawTimer = function(interval) {
    setInterval(function(){
      draw();
    }, interval);
  }

  return {
    addEvent: addEvent,
    startRedrawTimer: startRedrawTimer,
    origin_lat: origin_lat,
    origin_lng: origin_lng,
    lat_width: lat_width,
    lng_height: lng_height
  };
});
