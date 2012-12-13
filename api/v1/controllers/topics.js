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
    if(err) return res.json(500, {error: err});
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
  return res.json(200, req.data.topic);
};

/**
 * Topics `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.create = function(req, res) {
  var topic = Topic.build(req.body),
      validateErrors = topic.validate();

  if(validateErrors) return res.json(500, {error: validateErrors});

  topic.save().complete(function(err, topic) {
    if(err) return res.json(500, {error: err});
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
  if(!req.body) return res.json(400, { error: 'invalid json' });

  req.data.topic.update(req.body, function(err, topic) {
    if(err) return res.json(500, {error: err});
    return res.json(topic);
  });
};

/**
 * Topics `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Topics.destroy = function(req, res) {
  req.data.topic.destroy().complete(function(err, result) {
    if(err) return res.json(500, { error: err });
    res.json(200, { status: 1 });
  });
};