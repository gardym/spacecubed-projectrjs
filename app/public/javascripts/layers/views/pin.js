define(['jquery'], function($) {
  function PinView(canvas, event) {

    var blue = '#4ABFD9', yellow = '#F2B33D';
    var eventColour = function() {
      if(event.provider == 'Twitter') { return yellow; }
      else { return blue; }
    };

    var star = $('<div class="star"></div>');
    canvas.element.append(star);

    var css_scale = function(scaleX, scaleY) {
      star.css('-webkit-transform',
        'translate3d(0, 0, 0) ' +
        'scaleX(' + scaleX + ') ' +
        'scaleY(' + scaleY + ')');
    };

    var xy = canvas.latLongToCartesian(event.coordinates);
    star.css('top', xy.y + 'px');
    star.css('left', xy.x + 'px');
    star.css('borderRadius', star.width() /2);

    var twinkle = function(scaleX, scaleY) {
      star.css('backgroundColor', eventColour());
      return setInterval(function() {
        var resize = Math.random();
        css_scale(resize * scaleX, resize * scaleY);
        star.css('opacity', (Math.random() * 0.5) + 0.5);
      }, Math.floor(Math.random() * 3000));
    };

    var twinkleIntervalId = twinkle(1, 1);

    this.die = function() {
      clearInterval(twinkleIntervalId);

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

  return PinView;

});
