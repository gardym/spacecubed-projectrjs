
requirejs.config({
  'map': {
    '*': { 'stream': 'shims/shim-stream' }
  }
  // Uncomment this to use the stubbed stream - no traffic required!
  //,'shim': {
    //'d3': {
      //exports: function() {
        //return this.d3;
      //}
    //}
  //}
});

require(['jquery', 'moment', 'stream', 'map', 'd3'], function($, moment, stream, map, d3) {

  var area = $("#map");
  var template_pin = $("#pin");
  var template_tweet = $("#template.template-tweet");

  var rotations = ["top_left", "top_right", "bottom_right", "bottom_left"];
  var current_rotation = 0;

  var positions = { top_left: { x: 0, y: 0 },
                    top_right: { x: 1066, y: 0 },
                    bottom_left: { x: 0, y: 530 },
                    bottom_right: { x: 1066, y: 530 }
                  };

  var occupiers = { };

  var place = function(tweet) {
    var rotation = rotations[current_rotation];
    var position = positions[rotation];

    if(occupiers[rotation])
      occupiers[rotation].addClass('invisible');

    occupiers[rotation] = tweet;

    tweet.css('position', 'absolute');
    tweet.css('left', position.x);
    tweet.css('top', position.y);
    tweet.removeClass('invisible');

    current_rotation += 1;
    if(current_rotation > 3) {
      current_rotation = 0;
    }
  };

  stream.on(function(tweets) {
    $.each(tweets, function(_, tweet) {

      tweet_container = template_tweet.clone();
      tweet_container.removeAttr('id');

      tweet_container.find('.author').text("@" + tweet.username);
      tweet_container.find('.profile-image').attr('src', tweet.profile_image);
      tweet_container.find('.text').text(tweet.text);

      if(tweet.at) {
        tweet_container.find('.date').text(moment(tweet.at).fromNow());
      }

      if(tweet.coordinates) {
        var pin = template_pin.clone();
        pin.removeAttr('id');

        var coords = map.to_cartesian(tweet.coordinates.lat, tweet.coordinates.lng);
        pin.css('left', coords.x + "px");
        pin.css('top',  coords.y + "px");
        pin.css('position', 'absolute');
        area.append(pin);
      }

      area.append(tweet_container);
      setTimeout(function() {
        place(tweet_container);
      }, 1);
    });
  });

});
