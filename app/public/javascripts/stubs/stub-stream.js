define(['visualisations/map'], function(map) {
  var random_text = function() {
    var sample = "If you are at #fground2012 today don't forget to see @TomTolchard at 3.30 talk about Understanding Social Enterprise";
    return sample.substring(0, Math.floor(Math.random() * sample.length));
  };

  var stub_event = function() {

    if(Math.random() > 0.5) {
      var coordinates = {
        lat: map.origin_lat - (Math.random() * map.lat_width),
        lng: map.origin_lng + (Math.random() * map.lng_height)
      };
    }

    return {
      username: 'sii_wa',
      text: random_text(),
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
