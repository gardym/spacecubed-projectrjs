/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'the future' });
};

/*
 * GET events
 */

exports.events = function(req, res){

  var moment = require('moment'),
      mongo  = require('mongodb');

  var from = moment.unix(req.query.from),
      to   = moment.unix(req.query.to);

  console.log("from: %s, to: %s", from, to);

  var query = {
    recorded_at: { '$gte': from.toDate(), '$lt' : to.toDate() }
  };

  var db = new mongo.Db('projectrjs', new mongo.Server('localhost', 27017));

  db.open(function() {
    db.collection('events', function(err, events_collection) {
      events_collection.find(query, function(err, cursor) {
        cursor.toArray(function(err, items) {
          db.close();
          res.header('Access-Control-Allow-Origin', '*');
          res.send(items);
        });
      });
    });
  });
};
