var events_api = require('./events-api/app');
var streamers = require('./lib/streamers');

var io = require('socket.io').listen(5001);

streamers.start(io);
