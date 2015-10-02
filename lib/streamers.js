exports.start = function(app) {

  var mongo = require('mongodb');
  var async = require('async');

  var db_options = {
    'auto_reconnect': true,
    'poolSize': 10
  };

  var megabytes = 1000000;
  var maxCollectionSizeBytes = (process.env.DB_MAX_COLLECTION_SIZE_MB || 50) * megabytes;

  var seconds = 1000;
  var dbCleanUpInterval = ((process.env.DB_CLEANUP_INTERVAL_MINS || 1) * 60) * seconds;

  var dropCollectionIfOversize = function(collection, done) {
    collection.stats(function(err, stats) {
      if(stats['size'] > maxCollectionSizeBytes) {
        collection.drop();
      }
      done();
    });
  };

  var cleanUpOversizeCollections = function(db) {
    async.forEach(['grams', 'events', 'tweets'], function(collName, done) {
      db.collection(collName, function(err, collection) {
        dropCollectionIfOversize(collection, done);
      });
    });
  };

  var start_streaming = function(err, db) {
    var twitter_stream = require('./streamers/twitter_stream_source');
    twitter_stream.track_current_user(db, process.env.FIREHOSE_TERMS);

    var instagram = require('./streamers/instagram_source');
    instagram.track(db, process.env.LAT, process.env.LNG);

    cleanUpOversizeCollections(db);
    setInterval(function() { cleanUpOversizeCollections(db); }, dbCleanUpInterval);
  };

  if(process.env.MONGOLAB_URI) {
    var db_connection = mongo.MongoClient.connect(process.env.MONGOLAB_URI,
                                             db_options,
                                             start_streaming);
  } else {
    var db_connection = new mongo.Db('projectrjs',
                        new mongo.Server('localhost', 27017, db_options));
    db_connection.open(start_streaming);
  }

};
