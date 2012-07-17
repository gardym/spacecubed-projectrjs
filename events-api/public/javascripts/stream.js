var socket_connection = window.location.origin;
var config = { shim: { }, waitSeconds: 15 };
config.shim['/socket.io/socket.io.js'] = {
  exports: function() {
    return this.io;
  }
};

requirejs.config(config);

define(['jquery', 'moment', '/socket.io/socket.io.js'], function($, moment, io) {
  var socket = io.connect(socket_connection);
  return {
    on: function(fn) {
      socket.on('evt', fn);
    }
  };
});
