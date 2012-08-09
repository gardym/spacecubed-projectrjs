define(['jquery'], function($) {
  var events = [];
  var addEvent = function(evt) {
    events.push(evt);
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

    var event_container = $('#template').clone();
    feature = event_container;

    $('#map').append(event_container);
    event_container.removeAttr('id').removeClass('invisible').addClass('feature');

    event_container.find('.profile-image').hide();
    event_container.find('.text').html('&#147;' + newEvent.text +'&#148;');
    event_container.find('.author').text(newEvent.username);

    var random_offset = Math.floor(Math.random() * 15);
    event_container.css('position', 'absolute');
    event_container.css('top', random_offset + 'px');
    event_container.css('left', random_offset + 'px');

    setTimeout(function() {
      event_container.css('opacity', '0.8');
    }, 5);

  };

  var start = function(interval) {
    setInterval(draw, interval);
  };

  return {
    addEvent: addEvent,
    start: start
  };
});
