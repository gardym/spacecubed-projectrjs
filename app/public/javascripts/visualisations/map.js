define(
    ['jquery', 'visualisations/spotlight', 'visualisations/star'],
    function($, Spotlight, Star) {

  var width = $("#map").width(), height = $("#map").height();
  var origin_lat = -31.937487, origin_lng = 115.841517
  var end_lat = -31.97317, end_lng = 115.880442;
  var lat_height = Math.abs(end_lat - origin_lat), lng_width = Math.abs(end_lng - origin_lng);

  var to_cartesian = function(coords) {
    // TODO: Adjust for map rotation
    return {
      x: (Math.abs(coords.lng - origin_lng) / lng_width) * width,
      y: (Math.abs(coords.lat - origin_lat) / lat_height) * height
    };
  };

  var events = [];
  var stars = [];
  var shiningSpotlights = [];
  var spotlightInterval = 20000;
  var simultaneousEventLimit = 100;

  var create = function(locatableEvents, spotlightIntervalArg) {
    events = locatableEvents.map(function(event){
      event.xy = to_cartesian(event.coordinates);
      return event;
    });
    if (spotlightIntervalArg) {
      spotlightInterval = spotlightIntervalArg;
    }
    draw();
  };

  var addEvent = function(event) {
    event.xy = to_cartesian(event.coordinates);
    events.push(event);
    stars.push(new Star(event));
    if(events.length > simultaneousEventLimit) {
      events.pop();
      stars.pop().die();
    }
  };

  var draw = function() {
    events.forEach(function(event) {
      stars.push(new Star(event));
    });

    moveSpotlight();
    setInterval(function(){
      moveSpotlight();
    }, spotlightInterval);
  };

  var recentlySpotlitEvents = [];
  var chooseRandomEvent = function() {
    if(events.length > 0) {
      return events[Math.floor(Math.random() * events.length)];
    } else {
      return undefined;
    }
  };

  var moveSpotlight = function() {
    // Remove the previous spotlight
    if(shiningSpotlights.length > 0) {
      shiningSpotlights.pop().die();
    }

   var event = chooseNextEventToSpotlight();
   recordSpotlight(event);
   createSpotlight(event);
  };

  var recordSpotlight = function(spotlight) {
    recentlySpotlitEvents.push(spotlight);
    if(recentlySpotlitEvents.length > 10) {
      recentlySpotlitEvents.pop();
    }
  };

  var chooseNextEventToSpotlight = function() {
    var spotlightCandidate = chooseRandomEvent();
    while(recentlySpotlitEvents.some(function(e) { return e._id === spotlightCandidate._id })) {
      spotlightCandidate = chooseRandomEvent();
    }

    return spotlightCandidate;
  };

  var createSpotlight = function(event) {
    var spotlight = new Spotlight(event);
    shiningSpotlights.push(spotlight);
    spotlight.shineOnYouCrazyDiamond();
  };

  return {
    addEvent: addEvent,
    create: create
  };
});
