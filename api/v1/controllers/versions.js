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
  return res.json(200, req.data.version);
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
  if(!req.body) return res.json(400, { error: 'invalid json' });

  req.data.version.update(req.body, function(err, version) {
    if(err) return res.json(500, err);
    return res.json(version);
  });
};

/**
 * Versions `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Versions.destroy = function(req, res) {
  req.data.version.destroy().complete(function(err, result) {
    if(err) return res.json(500, err);
    res.json(200, { status: 1 });
  });
};