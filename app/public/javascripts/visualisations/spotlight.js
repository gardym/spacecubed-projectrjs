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

      var offset = 240;
      var direction = event.xy.x < ($('#map').get(0).clientWidth / 2) ? 1 : -1;

      imageBox.css('top', (event.xy.y - 120) + 'px');
      imageBox.css('left', (event.xy.x + (180 * direction) - 120) + 'px');
      imageBox.css('position', 'absolute');
      imageBox.css('width', '240px');
      imageBox.css('height', '240px');
      imageBox.css('-webkit-transform', 'scale(0,0)');
      imageBox.css('-webkit-transform-origin',  (-180 * direction + 120) + 'px ' + 120 + 'px');
      imageBox.css('-webkit-transition', 'opacity 1s ease-in, -webkit-transform 2s ease-out');
      imageBox.css('opacity', '0.5');

      imageLoadedDeferred.always(function() {
        setTimeout(function() { 
          imageBox.show();
          imageBox.css('opacity', '1.0');
          imageBox.css('-webkit-transform', 'scale(1,1)');
        }, 0);
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
