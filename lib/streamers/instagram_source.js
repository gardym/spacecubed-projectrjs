var instagram = require('instagram-node-lib');
var moment = require('moment');
var mongo = require('mongodb');
var async = require('async');

instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);

var map_gram_to_event = function(gram, then) {
  var evt = {
    provider: 'Instagram',
    username: gram.user.username,
    name: gram.user.full_name,
    profile_image: gram.user.profile_picture,
    text: gram.link,
    image: gram.images.standard_resolution.url,
    at: moment(gram.created_time * 1000),
    coordinates: {
      lat: gram.location.latitude,
      lng: gram.location.longitude
    },
    place: gram.location.name,
    recorded_at: moment().toDate()
  };

  then(evt);
};

var search_instagram = function(io, db, lat, lng, start_time, end_time, then) {
  console.log("-- Instagram -- Searching... from: %s to: %s", start_time, end_time);
  instagram.media.search({
    lat: lat,
    lng: lng,
    distance: '5000',
    min_timestamp: start_time,
    max_timestamp: end_time,
    complete: function(data, pagination) {
      console.log("-- Instagram -- Recvd - Inserting (found %s grams)", data.length);
      db.open(function() {
        db.collection('grams', function(err, grams_collection) {
          async.forEach(data,
            function(gram, done) {

              grams_collection.find({id: gram.id}, function(err, cursor) {
                cursor.count(function(err, count) {
                  if(count == 0) {
                    grams_collection.insert(gram, function(err, inserted) {
                      db.collection('events', function(err, events_collection) {
                        map_gram_to_event(gram, function(evt) {
                          events_collection.insert(evt, function(err, inserted) {
                            io.sockets.emit('evt', [evt]);
                            done();
                          });
                        });
                      });
                    });
                  } else {
                    done();
                  }
                });
              });

            },
            function(err) {
              console.log("-- Instagram -- Inserting -- Done.");
              then(db);
            }
          );
        });
      });
    }
  });
};

var poll_instagram = function(io, lat, lng) {
  // Delay instagrams by an hour
  var start_time = moment().subtract('hours', 1).subtract('seconds', 30).unix();
  var end_time = moment().subtract('hours', 1).unix();

  var close_db = function(db) {
    db.close();
  }

  var next_poll = function() {
    end_time = moment().subtract('hours', 1).unix();
    var start_db = new mongo.Db('projectrjs', new mongo.Server('localhost', 27017));
    search_instagram(io, start_db, lat, lng, start_time, end_time, close_db);
    start_time = end_time;
  };

  next_poll();
  setInterval(function() {
    next_poll();
  }, 30000);
};

exports.track = function(io, lat, lng) {
  poll_instagram(io, lat, lng);
};
