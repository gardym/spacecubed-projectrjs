define(['jquery'], function($) {
  return function(event) {
    var star;
    var blue = '#4ABFD9';
    var yellow = '#F2B33D';

    var eventColour = function() {
      if(event.provider == 'Twitter') {
        return yellow;
      } else {
        return blue;
      }
    };

    var css_scale = function(scaleX, scaleY) {
      star.css('-webkit-transform',
        'translate3d(0, 0, 0) ' +
        'scaleX(' + scaleX + ') ' +
        'scaleY(' + scaleY + ')');
    };

    star = $('<div class="star"></div>');
    $('#map').append(star);
    star.css('top', event.xy.y + 'px');
    star.css('left', event.xy.x + 'px');
    star.css('borderRadius', star.width() /2);

    var twinkle = function(scaleX, scaleY) {
      star.css('backgroundColor', eventColour());
      setInterval(function() {
        var resize = Math.random();
        css_scale(resize * scaleX, resize * scaleY);
        star.css('opacity', (Math.random() * 0.5) + 0.5);
      }, Math.floor(Math.random() * 3000));
    };
    twinkle(1, 1);

    this.die = function() {
      css_scale(4, 4);
      star.css('opacity', '0.7');
      setTimeout(function() {
        star.css('opacity', '0');
        css_scale(0.1, 0.1);
        setTimeout(function() {
          star.remove();
        }, 500);
      }, 500);
    };
  };
});
