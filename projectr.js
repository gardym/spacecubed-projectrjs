var events_api = require('./events-api/app');
var streamers = require('./lib/streamers');

streamers.start(events_api.app);
