var sequelize,
    Sequelize = require('sequelize'),
    models;

/**
 * Create a self calling function to define the database connection
 * if it isn't defined and return the models
 */

module.exports = (function() {

  /**
   * No connection to the database already
   */

  if(!sequelize) {
    var user, password, database, options = {};
    var env = process.env.NODE_ENV || 'development';

    if(env === 'production') {
      user = process.env.DB_USER;
      password = process.env.DB_PASSWORD;
      database = 'content_api_production';

      options.dialect = 'mysql';
      options.host = 'localhost';
      options.logging = false;
    }
    else {
      user = 'root';
      password = '';
      database = 'content_api_development';

      options.dialect = 'sqlite';
      options.storage = '/tmp/database.sqlite';
    }

    /**
     * Base options
     */

    options.define = {
      charset: 'utf8',
      timeStamps: true,
      underscored: true,

      /**
       * Global model instance methods
       */

      instanceMethods: {

        /**
         * Update attributes and call `.validate()` on the model
         *  - if it passes call `.save()`
         *
         * @param {Object} data
         * @param {Function} callback
         */

        update: function(data, callback) {
          var validateErrors;

          for(var key in data) {
            if(this.hasOwnProperty(key)) {
              this[key] = data[key];
            }
          }

          validateErrors = this.validate();

          if(validateErrors) {
            return callback(validateErrors);
          }
          else {
            return this.save().complete(callback);
          }
        }
      }
    };

    /**
     * Define the new database connection
     */

    sequelize = new Sequelize(database, user, password, options);
  }

  /**
   * Build Models Object
   */

  models = {
    Sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Topic: sequelize.import(__dirname + '/topic'),
    Item: sequelize.import(__dirname + '/item'),
    Commit: sequelize.import(__dirname + '/commit'),
    Version: sequelize.import(__dirname + '/version'),
    Comment: sequelize.import(__dirname + '/comment')
  };

  /**
   * Set Associations
   */

  models.User
          .hasMany(models.Comment, { as: 'Comments' });

  models.Topic
          .hasMany(models.Version, { as: 'Versions' })
          .hasMany(models.Item, { as: 'Items' });

  models.Item
          .belongsTo(models.Topic)
          .hasMany(models.Commit, { as: 'Commits'})
          .hasMany(models.Comment, { as: 'Comments' });

  models.Commit
          .belongsTo(models.Item)
          .belongsTo(models.User)
          .hasMany(models.Version, { as: 'Versions' });

  models.Version
          .belongsTo(models.Topic)
          .hasMany(models.Comment, { as: 'Comments' })
          .hasMany(models.Commit, { as: 'Commits' });

  models.Comment
          .belongsTo(models.User)
          .belongsTo(models.Item)
          .belongsTo(models.Version);

  /**
   * Return all models
   */

  return models;

}).call(null);
