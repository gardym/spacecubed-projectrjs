define(["jquery"], function($) {

  var events = [];
  var addEvent = function(evt) {
    events.push(evt);
  };

  var moveDown = function(event) {
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

  var moveDown = function(visible) {
    setTimeout(function() {
      var top = visible.position().top;
      var height = visible.height();
      visible.css('top', top + height + 'px');
      setTimeout(function() {
        if(visible.position().top > ($("#map").height() - (4 * visible.height()))) {
          visible.css('opacity', '0');
        }
      }, 1);
    }, 1);
  };


  var feature;
  var drawFeature = function(newEvent) {

    if(feature) {
      oldFeature = feature;
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

  var visibles = [];
  var draw = function() {
    var newEvent = events.shift();
    if(newEvent) {
      if(Math.random() < 0.1) {
        drawFeature(newEvent);
      } else {
        var visible = drawVisible(newEvent);
        visibles.push(visible);

        $.each(visibles, function(_, event) {
          moveDown(event);
        });
      }
    }
  };

  var start = function(interval) {
    setInterval(draw, interval);
  };

  return {
    addEvent: addEvent,
    start: start
  };
});
