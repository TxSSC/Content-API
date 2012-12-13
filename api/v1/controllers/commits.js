/**
 * Model dependencies
 */

var Commit = require('../models').Commit;

/**
 * Expose Commits controller
 */

var Commits = module.exports = exports;

/**
 * Commits `index`
 *
 * @param {Request} req
 * @param {Response} res
 */

Commits.index = function(req, res) {
  req.data.item.getCommits().complete(function(err, commits) {
    if(err) return res.json(500, {error: err});
    return res.json(200, commits);
  });
};

/**
 * Commits `show`
 *
 * @param {Request} req
 * @param {Response} res
 */

Commits.show = function(req, res) {
  return res.json(req.data.commit);
};

/**
 * Commits `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Commits.create = function(req, res) {
  var commit,
      validateErrors;

  req.body.item_id = req.params.item_id;
  commit = Commit.build(req.body);

  validateErrors = commit.validate();

  if(validateErrors) return res.json(500, {error: validateErrors});

  commit.save().complete(function(err, commit) {
    if(err) return res.json(500, {error: err});
    return res.json(201, commit);
  });
};

/**
 * Commits `update`
 *
 * @param {Request} req
 * @param {Response} res
 */

Commits.update = function(req, res) {
  req.data.commit.update(req.body, function(err, commit) {
    if(err) return res.json(500, {error: err});
    if(!commit) return res.json(404, {error: 'not found'});
    return res.json(200, commit);
  });
};

/**
 * Commits `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Commits.destroy = function(req, res) {
  req.data.commit.destroy().complete(function(err) {
    if(err) return res.json(500, {error: err});
    return res.json(200, {status: 1});
  });
};