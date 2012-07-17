define(['map'], function(map) {
  var stub_event = function() {

    return {
      username: 'gardym',
      text: "Here's my test comment",
      coordinates: {
        lat: map.origin_lat - (Math.random() * map.lat_width),
        lng: map.origin_lng + (Math.random() * map.lng_height)
      }
    };
  };

  var on = function(fn) {
    setInterval(function() {
      fn([stub_event()]);
    }, 3000);
  };

  return { on: on };
});
