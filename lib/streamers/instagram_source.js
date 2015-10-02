var instagram = require('instagram-node-lib');
var moment = require('moment');
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

var search_instagram = function(db, lat, lng, start_time, end_time) {
  console.log("-- Instagram -- Searching... from: %s to: %s", start_time, end_time);
  instagram.media.search({
    lat: lat,
    lng: lng,
    distance: '5000',
    min_timestamp: start_time,
    max_timestamp: end_time,
    complete: function(data, pagination) {
      console.log("-- Instagram -- Recvd - Inserting (found %s grams)", data.length);
      db.collection('grams', function(err, grams_collection) {
        async.forEach(data,
          function(gram, done) {
            grams_collection.find({id: gram.id}, function(err, cursor) {
              cursor.count(function(err, count) {
                if(count == 0) {
                  grams_collection.insert(gram, { w: 0 });
                  db.collection('events', function(err, events_collection) {
                    map_gram_to_event(gram, function(evt) {
                      events_collection.insert(evt, function(err, inserted) {
                        done();
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
          }
      );
      });
    }
  });
};

var poll_instagram = function(db, lat, lng) {
  // Delay instagrams by an hour
  var start_time = moment().subtract('hours', 1).subtract('seconds', 30).unix();
  var end_time = moment().subtract('hours', 1).unix();

  var next_poll = function() {
    end_time = moment().subtract('hours', 1).unix();
    search_instagram(db, lat, lng, start_time, end_time);
    start_time = end_time;
  };

  next_poll();
  setInterval(function() {
    next_poll();
  }, 30000);
};

exports.track = function(db,lat, lng) {
  poll_instagram(db, lat, lng);
};
