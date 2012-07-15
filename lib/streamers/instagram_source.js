exports.instagram_source = (function() {
  var Instagram = require('instagram-node-lib');
  var Moment = require('moment');
  var Mongo = require('mongodb');
  var async = require('async');

  Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);

  var map_gram_to_event = function(gram, then) {
    var evt = {
      provider: 'Instagram',
      username: gram.user.username,
      name: gram.user.full_name,
      profile_image: gram.user.profile_picture,
      text: gram.link,
      image: gram.images.standard_resolution.url,
      at: Moment(gram.created_time * 1000),
      coordinates: {
        lat: gram.location.latitude,
        lng: gram.location.longitude
      },
      place: gram.location.name,
      recorded_at: Moment().toDate()
    };

    then(evt);
  };

  var search_instagram = function(db, lat, lng, start_time, end_time, then) {
    console.log("-- Instagram -- Searching... from: %s to: %s", start_time, end_time);
    Instagram.media.search({
      lat: lat,
      lng: lng,
      distance: "5000",
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
                              done();
                            });
                          });
                        });
                      });
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

  var poll_instagram = function(lat, lng) {
    // Delay instagrams by an hour
    var start_time = Moment().subtract('hours', 1).subtract('seconds', 30).unix();
    var end_time = Moment().subtract('hours', 1).unix();

    var close_db = function(db) {
      db.close();
    }

    var setup_and_poll = function() {
      end_time = Moment().subtract('hours', 1).unix();
      var start_db = new Mongo.Db('projectrjs', new Mongo.Server('localhost', 27017));
      search_instagram(start_db, lat, lng, start_time, end_time, close_db);
      start_time = end_time;
    };

    setup_and_poll();
    setInterval(function() {
      setup_and_poll();
    }, 30000);
  };

  return {
    track: function(lat, lng) {
      poll_instagram(lat, lng);
    }
  };
})();
