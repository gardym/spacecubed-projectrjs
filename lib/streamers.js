exports.start = function(app) {

  var mongo = require('mongodb');

  var db_options = {
    'auto_reconnect': true,
    'poolSize': 10
  };

  var start_streaming = function(err, db) {
    var twitter_stream = require('./streamers/twitter_stream_source');
    twitter_stream.track_current_user(db, process.env.FIREHOSE_TERMS);

    var instagram = require('./streamers/instagram_source');
    instagram.track(db, process.env.LAT, process.env.LNG);
  };

  if(process.env.MONGOLAB_URI) {
    var db_connection = new mongo.Db.connect(process.env.MONGOLAB_URI,
                                             db_options,
                                             start_streaming);
  } else {
    var db_connection = new mongo.Db('projectrjs',
                        new mongo.Server('localhost', 27017, db_options));
    db_connection.open(start_streaming);
  }

};
