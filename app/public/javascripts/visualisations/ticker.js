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
    event_container.css('top', '0');
    event_container.css('left', '-500px');

    $('#tape').append(event_container);
    var offset = '-' + event_container.width().toString() + 'px';

    event_container.css('left', offset);
    $('#tape').append(event_container);

    distance = event_container.width();

    return event_container;
  };

  var moveRight = function(visible) {
    setTimeout(function() {
      var left = visible.position().left;
      visible.css('left', left + distance + 'px');
      setTimeout(function() {
        if(visible.position().left > ($('#tape').width() - (visible.width()) * 2)) {
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
        moveRight(event);
      });
    }
  };

  var start = function(intervalInSeconds) {
    setInterval(draw, intervalInSeconds * 1000);
  };

  return {
    addEvent: addEvent,
    start: start
  };
});
