exports.streamers = (function() {

  var stream = function() {

    var lat = process.env.LAT;
    var lng = process.env.LNG;

    var twitter_stream = require('./streamers/twitter_stream_source').twitter_stream_source;
    twitter_stream.track_terms(process.env.FIREHOSE_TERMS);
    twitter_stream.track_current_user();

    var instagram = require('./streamers/instagram_source').instagram_source;
    instagram.track(lat, lng);
  };

  return {
    start: stream
  };

})();
