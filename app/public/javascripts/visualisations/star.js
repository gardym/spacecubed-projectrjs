define(['jquery'], function($) {
  return function(event) {

    this.create = function() {
      var star = $('<div class="star"></div>');
      $('#map').append(star);

      star.css('top', event.xy.y + 'px');
      star.css('left', event.xy.x + 'px');

      star.css('borderRadius', star.width() /2);

      return star;
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
      setInterval(function() {
        var resize = Math.random();
        star.css('-webkit-transform',
          'translate3d(0, 0, 0) ' +
          'scaleX(' + (resize * scaleX) + ') ' +
          'scaleY(' + (resize * scaleY) + ')');
        star.css('opacity', (Math.random() * 0.5) + 0.5);
      }, Math.floor(Math.random() * 3000));
    };

    this.twinkle(this.create(), 1, 1);
  };
});
