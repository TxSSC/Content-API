/**
 * Model dependencies
 */

var UserModel = require('../models').User;

/**
 * Expose Topics controller
 */

var User = module.exports = exports;

/**
 * GET /users
 *
 * Return all the users in the database.
 */

User.index = function(req, res) {
  UserModel.findAll().done(function(err, result) {
    if(err) return res.json(400, { error: 'Error retrieving records.'});
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
    if(err) return res.json(400, { error: 'No record exists with that ID.'});
    res.json(200, result);
  });
};

/**
 * POST /users
 *
 * Creates a new User record
 */

User.create = function(req, res) {
  var user, error;

  if(!req.body) return res.json(400, { error: 'invalid json' });

  user = UserModel.build(req.body);
  error = user.validate();

  if(error) return res.json(400, { error: error });

  user.save().done(function(err, result) {
    if(err) return res.json(500, { error: err });
    res.json(201, result);
  });
};

/**
 * PUT /users/:id
 *
 * Update a User record
 */

User.update = function(req, res) {
  var data, error;

  if(!req.body) return res.json(400, { error: 'invalid json' });

  UserModel.find(req.params.id).done(function(err, user) {
    if(err) return res.json(400, { error: 'No record exists with that ID.'});

    data = req.body;

    user.first_name = data.first_name || user.first_name;
    user.last_name = data.last_name || user.last_name;
    user.email = data.email || user.email;

    error = user.validate();

    if(error) return res.json(400, { error: error });

    user.save().done(function(err, result) {
      if(err) return res.json(500, { error: err });
      res.json(201, result);
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
    if(err || !user) return res.json(400, { error: 'No record exists with that ID.'});

    user.destroy().done(function(error, result) {
      if(error) return res.json(400, { error: error });
      res.json(200, { status: 1 });
    });
  });
};