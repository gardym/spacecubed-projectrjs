define(['map'], function(map) {
  var stub_event = function() {

    if(Math.random() > 0.5) {
      var coordinates = {
        lat: map.origin_lat - (Math.random() * map.lat_width),
        lng: map.origin_lng + (Math.random() * map.lng_height)
      };
    }

    return {
      username: 'gardym',
      text: "All of the donkeys ride the rainbows of my life with dark sunglasses on their brains",
      profile_image: "http://a0.twimg.com/profile_images/1057847588/3405116394_c181846851_m_normal.jpg",
      coordinates: coordinates
    };
  };

  var on = function(fn) {
    setInterval(function() {
      fn([stub_event()]);
    }, 1500);
  };

  return { on: on };
});
