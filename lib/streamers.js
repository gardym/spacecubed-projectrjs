exports.start = function() {

  var twitter_stream = require('./streamers/twitter_stream_source');
  twitter_stream.track_terms(process.env.FIREHOSE_TERMS);
  twitter_stream.track_current_user();

  var instagram = require('./streamers/instagram_source');
  instagram.track(process.env.LAT, process.env.LNG);

};
