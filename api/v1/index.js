/**
 * Require `controllers`
 */

var controllers = require('./controllers');

/**
 * Version 1 JSON API
 * uses app.map to map routes in express
 */

module.exports = {

  /**
   * Access Levels:
   *
   * 0 - Read Only
   * 1 - Editor (can write values to properties)
   * 2 - Creator (can create buckets, items and properties)
   */

  '/users': {
    get: controllers.Users.index,
    post: controllers.Users.create,

    '/:id': {
      get: controllers.Users.show,
      put: controllers.Users.update,
      del: controllers.Users.destroy
    }
  },

  '/topics': {
    get: controllers.Topics.index,
    post: controllers.Topics.create,

    '/:topic_id': {
      get: controllers.Topics.show,
      put: controllers.Topics.update,
      del: controllers.Topics.destroy
    }
  }

};