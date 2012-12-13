/**
 * Module dependencies
 */

var models = require('../models');

/**
 * Expose params middleware function
 */

module.exports = function(app) {

  /**
   * Params for `Users` controller
   */

  app.param('user_id', function(req, res, next, user_id) {
    models.User.find(user_id).complete(function(err, user) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!user) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.user = user;
      return next();
    });
  });

  /**
   * Params for `Topics` controller
   */

  app.param('topic_id', function(req, res, next, topic_id) {
    models.Topic.find(topic_id).complete(function(err, topic) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!topic) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.topic = topic;
      return next();
    });
  });

  /**
   * Params for `Items` controller
   */

  app.param('item_id', function(req, res, next, item_id) {
    models.Item.find(item_id).complete(function(err, item) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!item) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.item = item;
      return next();
    });
  });

  /**
   * Params for `Versions` controller
   */

  app.param('version_id', function(req, res, next, version_id) {
    models.Version.find(version_id).complete(function(err, version) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!version) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.version = version;
      return next();
    });
  });

  /**
   * Params for `Commits` controller
   */

  app.param('commit_id', function(req, res, next, commit_id) {
    models.Commit.find(commit_id).complete(function(err, commit) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!commit) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.commit = commit;
      return next();
    });
  });

  /**
   * Params for `Comments` controller
   */

  app.param('comment_id', function(req, res, next, comment_id) {
    models.Comment.find(comment_id).complete(function(err, comment) {
      if(err) {
        return res.json(500, {error: err});
      }

      if(!comment) {
        return res.json(404, {error: 'not found'});
      }

      req.data = req.data || {};
      req.data.comment = comment;
      return next();
    });
  });

};