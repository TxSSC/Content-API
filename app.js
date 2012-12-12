var http = require('http'),
    path = require('path'),
    express = require('express');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(process.env.SESSION_SECRET || 'alligator fish party'));
  app.use(express.session());
  app.use(app.router);
});

app.configure('production', function() {
  app.use(express.logger('short'));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});