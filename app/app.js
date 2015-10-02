/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , serveStatic = require('serve-static')
  , errorHandler = require('errorhandler')
  , methodOverride = require('method-override')
  , http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/', routes.client);
app.get('/events', routes.events);

app.use(serveStatic(__dirname + '/public'));

app.use(errorHandler());

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

exports.app = server;
