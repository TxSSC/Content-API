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
      underscored: true
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

  // Versions Associations
  models.Topic.hasMany(models.Version, { as: 'Versions' });
  models.Item.belongsTo(models.Topic);
  models.Version.belongsTo(models.Topic);

  // Comments associations
  models.User.hasMany(models.Comment, { as: 'Comments' });
  models.Item.hasMany(models.Comment, { as: 'Comments' });
  models.Version.hasMany(models.Comment, { as: 'Comments' });
  models.Comment.belongsTo(models.User);
  models.Comment.belongsTo(models.Item);
  models.Comment.belongsTo(models.Version);

  /**
   * Return all models
   */

  return models;

}).call(null);
