/**
 * Module dependencies
 */

var http = require('http'),
    express = require('express'),
    Addons = require('./lib/utils/addons');

/**
 * Set up the express app
 */

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
});

app.configure('production', function() {
  app.use(express.logger('short'));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

/**
 * Add the `map` function to the app instance
 * - Allows 'pretty' addition of routes
 */

Addons.map.call(app);

/**
 * Add `api` routes
 */

app.map({
  '/api': {
    '/v1': require('./api').v1
  }
});

/**
 * Start the server on the given `port`
 */

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});