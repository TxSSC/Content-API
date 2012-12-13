/**
 * Model dependencies
 */

var Topic = require('../models').Topic;

/**
 * Expose Topics controller
 */

var Topics = module.exports = exports;

/**
 * Topics `index`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.index = function(req, res) {
  Topic.findAll().complete(function(err, topics) {
    if(err) return res.json(500, err);
    return res.json(200, topics);
  });
};

/**
 * Topics `show`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.show = function(req, res) {
  var id = req.params.topic_id;

  Topic.find({id: id}).complete(function(err, topic) {
    if(err) return res.json(500, err);
    if(!topic) return res.json(404, {error: 'Not found'});
    return res.json(200, topic);
  });
};

/**
 * Topics `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.create = function(req, res) {
  var topic = Topic.build(req.body),
      notValid = topic.validate();

  if(notValid) return res.json(500, {errors: notValid});

  topic.save().complete(function(err, topic) {
    if(err) return res.json(500, err);
    return res.json(201, topic);
  });
};

/**
 * Topics `update`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.update = function(req, res) {
  var notValid,
      data = req.body,
      id = req.params.topic_id;

  Topic.find({id: id}).complete(function(err, topic) {
    if(err) return res.json(500, err);
    if(!topic) return res.json(404, {error: 'Not found'});

    topic.title = data.title || topic.title;
    topic.permalink = data.permalink || topic.permalink;
    notValid = topic.validate();

    if(notValid) return res.json(500, {errors: notValid});

    topic.save().complete(function(err, topic) {
      if(err) return res.json(500, err);
      return res.json(topic);
    });
  });
};

/**
 * Topics `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.destroy = function(req, res) {
  var id = req.params.topic_id;

  Topic.find({id: id}).complete(function(err, topic) {
    if(err) return res.json(500, err);
    if(!topic) return res.json(404, {error: 'Not found'});

    topic.destroy().complete(function(err) {
      if(err) return res.json(500, err);
      return res.json(200, {status: 1});
    });
  });
};