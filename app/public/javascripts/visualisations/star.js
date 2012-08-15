define(['jquery'], function($) {
  return function(event) {

    this.create = function() {
      var pin = $('<div class="star"></div>');
      $('#map').append(pin);

      pin.css('position', 'absolute');
      pin.css('top', event.xy.y + 'px');
      pin.css('left', event.xy.x + 'px');
      pin.css('color', '#fff');

      pin.css('borderRadius', pin.width() /2);

      return pin;
    };

    var randomColour = function() {
      var randomHex = function() {
        return Math.floor(Math.random() * 0xff);
      };

      return 'rgb(' + randomHex() + ', ' + randomHex() + ', ' + randomHex() + ')';
    };

    var blue = '#4ABFD9';
    var yellow = '#F2B33D';

    var eventColour = function() {
      if(event.provider == 'Twitter') {
        return yellow;
      } else {
        return blue;
      }
    };

    this.twinkle = function(star, scaleX, scaleY) {
      star.css('backgroundColor', eventColour());
      star.css('-webkit-transition',
        '-webkit-transform 500ms ease-in-out, ' +
        'opacity 500ms ease-in-out, ' +
        'background-color 500ms ease-in-out');
      star.css('opacity', (Math.random() * 0.5) + 0.5);
      setInterval(function() {
        var resize = Math.random();
        star.css('-webkit-transform',
          'translate3d(0, 0, 0) ' +
          'scaleX(' + (resize * scaleX) + ') ' +
          'scaleY(' + (resize * scaleY) + ')');
        star.css('borderRadius', star.width() * 0.8);
        star.css('opacity', (Math.random() * 0.5) + 0.5);
      }, Math.floor(Math.random() * 3000));
    };

    this.twinkle(this.create(), 1, 1);
  };
});
