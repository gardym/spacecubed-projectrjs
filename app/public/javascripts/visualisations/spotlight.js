define(['jquery', 'visualisations/animations/circular'], function($, CircularAnimation) {
  return function(event) {
    var animation;
    var imageBox;

    var displayImageBox = function(event) {
      imageBox = $('<div><img src="' + event.image + '" style="width: 100%; height: 100%" /></div>');
      $('#map').append(imageBox);

      var offset = 120;
      imageBox.css('top', (event.xy.y - (offset / 2)) + 'px');
      imageBox.css('left', (event.xy.x + offset) + 'px');
      imageBox.css('position', 'absolute');
      imageBox.css('width', '120px');
      imageBox.css('height', '120px');
    };

    this.shineOnYouCrazyDiamond = function() {
      animation = new CircularAnimation(event.xy);
      animation.startAnimation(function() {
        // Show our details (instagram and tweet)
        if(event.image) {
          displayImageBox(event);
        } else {
          displayTextBox(event);
        }
      });
    };

    this.die = function() {
      animation.remove();
      imageBox.remove();
    };
  };
});
