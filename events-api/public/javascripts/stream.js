requirejs.config({
  shim: {
    'http://localhost:5001/socket.io/socket.io.js': {
      exports: function() {
        return this.io;
      }
    }
  }
});

define(['jquery', 'moment', 'http://localhost:5001/socket.io/socket.io.js'], function($, moment, io) {
  var socket = io.connect('http://localhost:5001');
  return {
    on: function(fn) {
      socket.on('evt', fn);
    }
  };
});
