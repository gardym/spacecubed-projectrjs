define(['map'], function(map) {
  var stub_event = function() {

    return {
      username: 'gardym',
      text: "I can't believe I ate the whole thing #omg",
      profile_image: "http://a0.twimg.com/profile_images/1057847588/3405116394_c181846851_m_normal.jpg"
      //coordinates: {
        //lat: map.origin_lat - (Math.random() * map.lat_width),
        //lng: map.origin_lng + (Math.random() * map.lng_height)
      //}
    };
  };

  var on = function(fn) {
    setInterval(function() {
      fn([stub_event()]);
    }, 3000);
  };

  return { on: on };
});
