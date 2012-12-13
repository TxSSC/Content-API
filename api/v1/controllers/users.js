/**
 * Model dependencies
 */

var UserModel = require('../models').User;

/**
 * Expose Users controller
 */

var User = module.exports = exports;

/**
 * GET /users
 *
 * Return all the users in the database.
 */

User.index = function(req, res) {
  UserModel.findAll().done(function(err, result) {
    if(err) return res.json(500, err);
    res.json(result);
  });
};

/**
 * GET /users/:id
 *
 * Return a single user
 */

User.show = function(req, res) {
  return res.json(200, req.data.user);
};

/**
 * POST /users
 *
 * Creates a new User record
 */

User.create = function(req, res) {
  if(!req.body) return res.json(400, { error: 'invalid json' });

  var user = User.build(req.body),
      error = user.validate();

  if(error) return res.json(500, {errors: error});

  user.save().complete(function(err, user) {
    if(err) return res.json(500, err);
    return res.json(201, topic);
  });
};

/**
 * PUT /users/:id
 *
 * Update a User record
 */

User.update = function(req, res) {
  if(!req.body) return res.json(400, { error: 'invalid json' });

  req.data.user.update(req.body, function(err, user) {
    if(err) return res.json(500, err);
    return res.json(user);
  });
};

/**
 * DEL /users/:id
 *
 * Delete a User
 */

User.destroy = function(req, res) {
  req.data.user.destroy().done(function(err, result) {
    if(err) return res.json(500, { error: err });
    res.json(200, { status: 1 });
  });
};