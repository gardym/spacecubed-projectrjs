exports.start = function() {

  var io = require('socket.io').listen(5001);

  var twitter_stream = require('./streamers/twitter_stream_source');
  twitter_stream.track_terms(io, process.env.FIREHOSE_TERMS);
  twitter_stream.track_current_user(io);

  var instagram = require('./streamers/instagram_source');
  instagram.track(io, process.env.LAT, process.env.LNG);

};
