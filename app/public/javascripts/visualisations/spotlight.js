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
      imageBox.css('-webkit-transition-property', 'opacity');
      imageBox.css('-webkit-transition-duration', '1s');
      imageBox.css('-webkit-transition-timing-function', 'ease-in');
      imageBox.css('opacity', '0.0');

      imageLoadedDeferred.always(function() {
        imageBox.show();
        imageBox.css('opacity', '0.9');
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
      imageBox.css('opacity', '0.0');
      setTimeout(function() {
        imageBox.remove();
      }, 1500);
    };
  };
});
