var events_api = require('./app/app');

if (process.env["STREAM_SOURCE"] == 'live') {
  var streamers = require('./lib/streamers');
  streamers.start(events_api.app);
}
