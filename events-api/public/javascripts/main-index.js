requirejs.config({
  shim: {
    'http://localhost:5001/socket.io/socket.io.js': {
      exports: function() {
        return this.io;
      }
    }
  }
});

require(['jquery', 'moment', 'http://localhost:5001/socket.io/socket.io.js'], function($, moment, io) {
  var socket = io.connect('http://localhost:5001');
  socket.on('evt', function(tweets) {
    $.each(tweets, function(_, tweet) {
      $('#output').append('<p>' + tweet.username + ': ' + tweet.text + '</p>');
      if(tweet.image) {
        $('#output').append("<p><img src='" + tweet.image + "' /></p>")
      }
    });
  });
});
