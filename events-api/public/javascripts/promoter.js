define(['jquery'], function($) {
  var events = [];
  var addEvent = function(evt) {
    events.push(evt);
  };

  var drawVisible = function(event) {
    var event_container = $('#template').clone();
    event_container.removeAttr('id');
    event_container.removeClass('invisible');

    event_container.find('.profile-image').attr('src', event.profile_image);
    event_container.find('.text').text(event.text);
    event_container.find('.author').text(event.username);

    event_container.css('position', 'absolute');
    event_container.css('top', '-44px');
    event_container.css('left', '1050px');

    $('#map').append(event_container);

    return event_container;
  };

  var feature;
  var draw = function() {

    var newEvent;
    if(events.length > 0) {
      newEvent = events.pop();
    } else {
      return;
    }

    if(feature) {
      var oldFeature = feature;
      setTimeout(function() {
        oldFeature.css('opacity', '0');
      }, 1);
    }

    var event = drawVisible(newEvent);
    feature = event;
    event.addClass('feature');
    event.find('.text').html('&#147;' + event.find('.text').text() +'&#148;');
    event.css('fontSize', '2em');
    var random_offset = Math.floor(Math.random() * 15);
    event.css('top', random_offset + 'px');
    event.css('left', random_offset + 'px');
    event.css('opacity', '0');
    setTimeout(function() {
      event.css('opacity', '0.8');
    }, 1);

  };

  var start = function(interval) {
    setInterval(draw, interval);
  };

  return {
    addEvent: addEvent,
    start: start
  };
});
