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
  UserModel.find(req.params.id).done(function(err, result) {
    if(err) return res.json(500, err);
    if(!result) return res.json(404, { error: 'Not found' });
    return res.json(200, result);
  });
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

  User.find(req.params.id).complete(function(err, user) {
    if(err) return res.json(500, err);
    if(!user) return res.json(404, {error: 'Not found'});

    user.update(req.body, function(err, user) {
      if(err) return res.json(500, err);
      return res.json(user);
    });
  });
};

/**
 * DEL /users/:id
 *
 * Delete a User
 */

User.destroy = function(req, res) {
  UserModel.find(req.params.id).done(function(err, user) {
    if(err) return res.json(500, err);
    if(!user) return res.json(400, { error: 'Not found' });

    user.destroy().done(function(error, result) {
      if(error) return res.json(400, { error: error });
      res.json(200, { status: 1 });
    });
  });
};