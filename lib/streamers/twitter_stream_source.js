var moment = require('moment');
var ntwitter = require('ntwitter');

var Twitter = new ntwitter({
  consumer_key: process.env.FIREHOSE_OAUTH_CONS_KEY,
  consumer_secret: process.env.FIREHOSE_OAUTH_CONS_SEC,
  access_token_key: process.env.FIREHOSE_OAUTH_TOKEN,
  access_token_secret: process.env.FIREHOSE_OAUTH_TOKEN_SEC
});

var map_tweet_to_event = function(tweet, then) {
  var evt = {
    provider: 'Twitter',
    username: tweet.user.screen_name,
    name: tweet.user.name,
    profile_image: tweet.user.profile_image_url,
    text: tweet.text,
    at: tweet.created_at,
    coordinates: tweet.coordinates ? {
      lat: tweet.coordinates.coordinates[1],
      lng: tweet.coordinates.coordinates[0],
    } : null,
    place: tweet.place,
    recorded_at: moment().toDate()
  };

  then(evt);
};

var start_streaming = function(db, endpoint, params) {
  Twitter.stream(endpoint, params, function(stream) {
    stream.on('error', function(data, err) {
      console.log("++ Twitter -- ERROR -- %s", err);
    });
    stream.on('data', function(data) {
      if(data.user && data.text) {
        console.log("-- Twitter (%s) -- @%s: %s", endpoint, data.user.screen_name, data.text);
        db.collection('tweets', function(err, tweets_collection) {
          tweets_collection.insert(data);
        });
        db.collection('events', function(err, events_collection) {
          map_tweet_to_event(data, function(evt) {
            events_collection.insert(evt);
          });
        });
      }
    });
  });
};

exports.track_current_user = function(db, terms) {
  start_streaming(db, 'user', { 'with': 'followings', 'track': terms });
};
