/**
 * Model dependencies
 */

var Comment = require('../models').Comment;

/**
 * Expose Comments controller
 */

var Comments = module.exports = exports;

/**
 * Comments `index`
 *
 * @param {Request} req
 * @param {Response} res
 */

Comments.index = function(req, res) {
  Comment.findAll({
    where: { version_id: req.params.version_id }
  }).complete(function(err, comments) {
    if(err) return res.json(500, {error: err});
    return res.json(200, comments);
  });
};

/**
 * Comments `show`
 *
 * @param {Request} req
 * @param {Response} res
 */

Comments.show = function(req, res) {
  return res.json(200, req.data.comment);
};

/**
 * Comments `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Comments.create = function(req, res) {
  var comment,
      validateErrors;

  req.body.version_id = req.params.version_id;
  if(!req.body.item_id) return res.json(500, {error: 'Missing Item ID' });

  comment = Comment.build(req.body);
  validateErrors = comment.validate();

  if(validateErrors) return res.json(500, {error: validateErrors});

  comment.save().complete(function(err, comment) {
    if(err) return res.json(500, {error: err});
    return res.json(201, comment);
  });
};

/**
 * Comments `update`
 *
 * @param {Request} req
 * @param {Response} res
 */

Comments.update = function(req, res) {
  if(!req.body) return res.json(400, { error: 'invalid json' });

  req.data.comment.update(req.body, function(err, comment) {
    if(err) return res.json(500, {error: err});
    return res.json(200, comment);
  });
};

/**
 * Comments `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Comments.destroy = function(req, res) {
  req.data.comment.destroy().complete(function(err, result) {
    if(err) return res.json(500, err);
    res.json(200, { status: 1 });
  });
};