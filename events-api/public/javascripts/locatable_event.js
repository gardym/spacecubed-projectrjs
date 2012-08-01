define(['jquery'], function($) {

  var draw = function(event, coords) {
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

    return template;
  };

  var hide = function(event_container) {
    event_container.hide();
  };

  return {
    draw: draw,
    hide: hide
  };
});
