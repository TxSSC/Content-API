/**
 * Model dependencies
 */

var Version = require('../models').Version;

/**
 * Expose Versions controller
 */

var Versions = module.exports = exports;

/**
 * Versions `index`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.index = function(req, res) {
  var topic_id = req.params.topic_id;

  Version.findAll({ where: { topic_id: topic_id }})
    .complete(function(err, versions) {
      if(err) return res.json(500, err);
      return res.json(200, versions);
    });
};

/**
 * Versions `show`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.show = function(req, res) {
  var id = req.params.version_id,
      topic_id = req.params.topic_id;

  Version.find({ where: { topic_id: topic_id, id: id }})
    .complete(function(err, version) {
      if(err) return res.json(500, err);
      if(!version) return res.json(404, { error: 'Not found' });
      return res.json(200, version);
    });
};

/**
 * Versions `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.create = function(req, res) {
  var version = Version.build(req.body),
      error;

  version.topic_id = req.params.topic_id;
  error = version.validate();

  if(error) return res.json(500, {errors: error});

  version.save().complete(function(err, result) {
    if(err) return res.json(500, err);
    return res.json(201, result);
  });
};

/**
 * Versions `update`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.update = function(req, res) {
  var id = req.params.version_id,
      topic_id = req.params.topic_id;

  if(!req.body) return res.json(400, { error: 'invalid json' });

  Version.find({ where: { topic_id: topic_id, id: id }})
    .complete(function(err, version) {
      if(err) return res.json(500, err);
      if(!version) return res.json(404, {error: 'Not found'});

      version.update(req.body, function(err, topic) {
        if(err) return res.json(500, err);
        return res.json(topic);
      });
    });
};

/**
 * Versions `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.destroy = function(req, res) {
  var id = req.params.version_id,
      topic_id = req.params.topic_id;

  Version.find({ where: { topic_id: topic_id, id: id }})
    .complete(function(err, version) {
      if(err) return res.json(500, err);
      if(!version) return res.json(404, { error: 'Not found'});

      version.destroy().done(function(error, result) {
        if(error) return res.json(500, error);
        res.json(200, { status: 1 });
      });
    });

};