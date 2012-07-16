exports.start = function() {

  var io = require('socket.io').listen(5001);
  var mongo = require('mongodb');

  var db_options = {
    'auto_reconnect': true,
    'poolSize': 10
  };

  var db_connection = new mongo.Db('projectrjs', new mongo.Server('localhost', 27017, db_options));

  db_connection.open(function(err, db) {
    var twitter_stream = require('./streamers/twitter_stream_source');
    twitter_stream.track_terms(io, process.env.FIREHOSE_TERMS);
    twitter_stream.track_current_user(io);

    var instagram = require('./streamers/instagram_source');
    instagram.track(db, io, process.env.LAT, process.env.LNG);
  });

};
