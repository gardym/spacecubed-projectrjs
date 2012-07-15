/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * GET events
 */

exports.events = function(req, res){
  var Moment = require('moment');
  var Mongo = require('mongodb');

  var from = Moment.unix(req.query.from);
  var to = Moment.unix(req.query.to);

  console.log("from: %s, to: %s", from, to);

  var query = {
    recorded_at: {
      '$gte': from,
      '$lt' : to
    }
  };

  var db = new Mongo.Db('projectrjs', new Mongo.Server('localhost', 27017));

  db.open(function() {
    db.collection('events', function(err, events_collection) {
      events_collection.find(query, function(err, cursor) {
        cursor.toArray(function(err, items) {
          db.close();
          res.send(items);
        });
      });
    });
  });
};
