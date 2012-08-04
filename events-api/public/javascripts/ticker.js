define(["jquery"], function($) {

  var events = [];
  var addEvent = function(evt) {
    events.push(evt);
  };

  var distance;
  var drawVisible = function(event) {
    var event_container = $('#template').clone();
    event_container.removeAttr('id').removeClass('invisible');

    event_container.find('.profile-image').attr('src', event.profile_image);
    event_container.find('.text').text(event.text);
    event_container.find('.author').text(event.username);

    event_container.css('position', 'absolute');
    event_container.css('top', '-500px');
    event_container.css('left', '1050px');

    $('#map').append(event_container);
    var offset = '-' + event_container.height().toString() + 'px';

    event_container.css('top', offset);
    $('#map').append(event_container);

    distance = event_container.height();

    return event_container;
  };

  var moveDown = function(visible) {
    setTimeout(function() {
      var top = visible.position().top;
      visible.css('top', top + distance + 'px');
      setTimeout(function() {
        if(visible.position().top > ($("#map").height() - 210)) {
          visible.css('opacity', '0');
        }
      }, 1);
    }, 1);
  };

  var visibles = [];
  var draw = function() {
    var newEvent = events.shift();
    if(newEvent) {
      var visible = drawVisible(newEvent);
      visibles.push(visible);

      $.each(visibles, function(_, event) {
        moveDown(event);
      });
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
