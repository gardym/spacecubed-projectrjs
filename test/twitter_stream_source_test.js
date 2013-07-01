var chai = require('chai'),
    rewire = require('rewire'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

var expect = chai.expect;
chai.use(sinonChai);

describe('twitter_stream_source', function() {
  var twitter_stream_source = rewire('../lib/streamers/twitter_stream_source');

  describe('start_streaming', function() {
    var clock,
        db = {id: 'db'},
        tweets_collection = {id: 'tweets_collection'},
        events_collection = {id: 'events_collection'},
        error = 'error string',
        expected_data = {id: 'expected_data',
                         user: 'user', text: 'text',
                         coordinates: {coordinates: ['lng', 'lat']}},
        expected_event = {at: undefined,
                          coordinates: {lat: 'lat', lng: 'lng'},
                          name: undefined,
                          place: undefined,
                          profile_image: undefined,
                          provider: 'Twitter',
                          recorded_at: undefined,
                          text: 'text',
                          username: undefined};

    beforeEach(function() {
      tweets_collection.insert = sinon.spy();
      events_collection.insert = sinon.spy();

      var stream = {on: sinon.stub()};
      stream.on.withArgs('error').yields(null, error);
      stream.on.withArgs('data').yields(expected_data);

      var Twitter = {id: 'Twitter', stream: sinon.stub().yields(stream)};
      twitter_stream_source.__set__({Twitter: Twitter});

      db.collection = sinon.stub();
      db.collection.withArgs('tweets').yields(null, tweets_collection);
      db.collection.withArgs('events').yields(null, events_collection);

      clock = sinon.useFakeTimers();
      expected_event.recorded_at = new Date();
    });

    afterEach(function() {
      clock.restore();
    });

    it('should insert streamed tweets', function() {
      twitter_stream_source.track_current_user(db, 'fake terms');

      expect(tweets_collection.insert).to.be.calledWith(expected_data);
    });

    it('should insert streamed events', function() {
      twitter_stream_source.track_current_user(db, 'fake terms');

      expect(events_collection.insert).to.be.calledWith(expected_event);
    });
  });
});
