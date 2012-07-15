require(["jquery", "moment"], function($, moment) {
  var default_interval = 3 * 1000;
  var start_time = moment();

  setInterval(function() {

    var now_time = moment();

    // Load new tweets
    $.get("/events?from=" + start_time.unix() + "&to=" + now_time.unix(), function(tweets) {
      $.each(tweets, function(_, tweet) {
        $("#output").append("<p>" + tweet.username + ": " + tweet.text + "</p>");
        if(tweet.image) {
          $("#output").append("<p><img src='" + tweet.image + "' /></p>")
        }
      });
    });

    start_time = now_time;
  }, default_interval);
});
