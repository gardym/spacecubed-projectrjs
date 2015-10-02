/*
 * GET client page.
 */
exports.client = function(req, res) {
  res.render('client', { title: 'spacecubed-projectrjs' });
};

/*
 * GET events
 */

var moment = require('moment'),
    mongo  = require('mongodb');

var db_options = {
  'auto_reconnect': true,
  'poolSize': 10
};

exports.events = function(req, res){
  var from = moment.unix(req.query.from),
      to   = moment.unix(req.query.to);

  var query = {
    recorded_at: { '$gte': from.toDate(), '$lt' : to.toDate() }
  };

  var search = function(err, db) {
    db.collection('events', function(err, events_collection) {
      events_collection.find(query, function(err, cursor) {
        cursor.toArray(function(err, items) {
          db.close();
          res.header('Access-Control-Allow-Origin', '*');
          res.send(items);
        });
      });
    });
  };

  if(process.env.MONGOLAB_URI) {
    var db_connection = mongo.MongoClient.connect(process.env.MONGOLAB_URI,
                                          db_options,
                                          search);
  } else {
    var db_connection = new mongo.Db('projectrjs',
                        new mongo.Server('localhost', 27017, db_options));
    db_connection.open(search);
  }
};
