/**
 * Module dependencies
 */

var middleware = require('./middleware'),
    controllers = require('./controllers');

/**
 * Version 1 JSON API
 * uses `app.map()` to map routes in express
 *
 * @return {Object} routes
 */

module.exports = function(app) {

  /**
   * Initialize any middleware functions on
   * `app`.
   */

  middleware.Params(app);

  /**
   * Access Levels:
   *
   * 0 - Read Only
   * 1 - Editor (can write values to properties)
   * 2 - Creator (can create buckets, items and properties)
   */

  return {
    '/users': {
      get: controllers.Users.index,
      post: controllers.Users.create,

      '/:user_id': {
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
        del: controllers.Topics.destroy,

        '/items': {
          get: controllers.Items.index,
          post: controllers.Items.create,

          '/:item_id': {
            get: controllers.Items.show,
            put: controllers.Items.update,
            del: controllers.Items.destroy,

            '/commits': {
              get: controllers.Commits.show,
              post: controllers.Commits.create,

              '/:commit_id': {
                get: controllers.Commits.show,
                put: controllers.Commits.update,
                del: controllers.Commits.destroy
              }
            }
          }
        },

        '/versions': {
          get: controllers.Versions.index,
          post: controllers.Versions.create,

          '/:version_id': {
            get: controllers.Versions.show,
            put: controllers.Versions.update,
            del: controllers.Versions.destroy,

            '/comments': {
              get: controllers.Comments.index,
              post: controllers.Comments.create,

              '/:comment_id': {
                get: controllers.Comments.show,
                put: controllers.Comments.update,
                del: controllers.Comments.destroy
              }
            }
          }
        }
      }
    }
  };
};