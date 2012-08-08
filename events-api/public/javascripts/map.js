define(
    ['jquery', 'circular_animation', 'crosshair_animation', 'locatable_event'],
    function($, CircularAnimation, CrosshairAnimation, LocatableEvent) {

  var width = $("#map").width(), height = $("#map").height();
  var origin_lat = -31.937487, origin_lng = 115.841517
  var end_lat = -31.97317, end_lng = 115.880442;
  var lat_width = Math.abs(end_lat - origin_lat), lng_height = Math.abs(end_lng - origin_lng);

  var to_cartesian = function(coords) {
    return {
      x: (Math.abs(end_lat - coords.lat) / lat_width) * width,
      y: (Math.abs(end_lng - coords.lng) / lng_height) * height
    };
  };

  var events = [];

  var create = function(locatableEvents) {
    events = locatableEvents;
    draw();
  };

  var addEvent = function(event) {
    events.push(event);
    // TODO: Drop off once we hit a certain size (ensure we don't drop off an event this is currently spotlighted
  };

  var draw = function() {

    // TODO for each event draw its pin
    // TODO Trigger timer for spotlight animation etc..
    //var event = events.pop();
    //if(!event) return;
    //
    events.forEach(function(event) {
      drawPin(event);
    });
  };

  var drawPin = function(event) {
    var pin = $('<div>o</div>');
    $('#map').append(pin);

    var coords = to_cartesian(event.coordinates);
    console.log(coords);
    pin.css('position', 'absolute');
    pin.css('top', coords.y + 'px');
    pin.css('left', coords.x + 'px');
    pin.css('color', '#fff');
  };

  var chooseNextEventToSpotlight = function() {

  };

  var drawSpotlight = function(event) {

    //if (Math.random() < 0.5) {
        //new CrosshairAnimation(coords);
    //} else {
        //new CircularAnimation(coords);
    //}
    // Draw the text/content of the event
    //var locatable_event = LocatableEvent.draw(event, coords);
  };

  return {
    addEvent: addEvent,
    create: create
  };
});
