define(['jquery', 'lib/jquery.imagesloaded', 'visualisations/animations/circular'],
    function($, jQueryImagesLoaded, CircularAnimation) {

  return function(event) {
    var animation;
    var imageBox;
    var image;

    var preloadImage = function(event) {
      image = $('<img src="' + event.image + '" style="width: 100%; height: 100%" />');
      return image.imagesLoaded();
    };

    var displayImageBox = function(event, imageLoadedDeferred) {
      imageBox = $('<div></div>');
      imageBox.hide();
      imageBox.append(image);
      $('#map').append(imageBox);

      var offset = 120;
      imageBox.css('top', (event.xy.y - (offset / 2)) + 'px');
      imageBox.css('left', (event.xy.x + offset) + 'px');
      imageBox.css('position', 'absolute');
      imageBox.css('width', '240px');
      imageBox.css('height', '240px');

      imageLoadedDeferred.always(function() {
        imageBox.show();
      });
    };

    this.shineOnYouCrazyDiamond = function() {
      var imageLoadedDeferred = preloadImage(event);
      animation = new CircularAnimation(event.xy);
      animation.startAnimation(function() {
        // Show our details (instagram and tweet)
        if(event.image) {
          displayImageBox(event, imageLoadedDeferred);
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
