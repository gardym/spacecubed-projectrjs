define(['jquery', 'circular_animation'], function($, CircularAnimation) {
  return function(event) {
    var animation;

    this.shineOnYouCrazyDiamond = function() {
      animation = new CircularAnimation(event.xy);

      // Wait for however long the above takes (would be better in a callback)
      setTimeout(function() {
        // Show our details (instagram and tweet)
        console.log("Details: username: " + event.username);
      }, 4000);
    };

    this.die = function() {
      animation.remove();
    };
  };
});
