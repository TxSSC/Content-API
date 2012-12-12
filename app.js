/**
 * Module dependencies
 */

var http = require('http'),
    express = require('express'),
    addons = require('./lib/utils/addons'),
    app;

/**
 * Set up the express app
 */

app = express();

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

// Add `app.map` to the app
addons.map.call(app);

// Add routes
app.map({
  '/api': {
    '/v1': require('./api').v1()
  }
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});