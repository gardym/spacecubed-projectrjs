// This is pretty hokey but it's purpose is two fold:
// - shim around the socket.io.js library which isn't requirejs compatible
// - load all this from the current server on the well-known port of 5678
var socket_connection = 'http://' + window.location.hostname + ':5678';
var socket_module = socket_connection + '/socket.io/socket.io.js';
var config = { shim: { } };
config.shim[socket_module] = {
  exports: function() {
    return this.io;
  }
};

requirejs.config(config);

define(['jquery', 'moment', socket_module], function($, moment, io) {
  var socket = io.connect(socket_connection);
  return {
    on: function(fn) {
      socket.on('evt', fn);
    }
  };
});
