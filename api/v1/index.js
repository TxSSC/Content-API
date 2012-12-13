
/**
 * Version 1 JSON API
 * uses app.map to map routes in express
 */

module.exports = function() {

  /**
   * Access Levels:
   *
   * 0 - Read Only
   * 1 - Editor (can write values to properties)
   * 2 - Creator (can create buckets, items and properties)
   */

  return {
    // /users
    '/users': {
      get: controllers.Users.index,
      post: controllers.Users.create,

      // /users/:id
      '/:id': {
        get: controllers.Users.show,
        put: controllers.Users.update,
        del: controllers.Users.destroy
      }
    }
  };
};