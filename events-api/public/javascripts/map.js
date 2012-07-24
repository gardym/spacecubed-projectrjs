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
  };

  var draw = function() {
    var event = events.pop();
    if(!event) return;

    var pin = $("#pin").clone();
    pin.removeAttr('id');

    var coords = to_cartesian(event.coordinates.lat, event.coordinates.lng);
    $("#map").append(pin);
    pin.css('position', 'absolute');
    pin.css('top', coords.y + 'px');
    pin.css('left', coords.x + 'px');

    var template = $('#template').clone();
    template.removeAttr('id').removeClass('invisible');

    template.find('.text').text(event.text);
    template.find('.author').text(event.username);
    template.find('.profile-image').attr('src', event.profile_image);

    template.css('backgroundColor', '000');
    template.css('position', 'absolute');
    if(coords.y > (Math.floor($("#map").height() / 2))) {
      template.css('top', $("#map").height() - 100 );
    } else {
      template.css('top', 20 );
    }
    template.css('left', 600);

    $("#map").append(template);

    setTimeout(function() {
      pin.remove();
      template.remove();
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
