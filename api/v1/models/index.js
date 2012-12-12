var sequelize,
    Sequelize = require('sequelize');

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
   * Return all models
   */

  return {
    User: require('./user')(sequelize),
    Topic: require('./topic')(sequelize),
    Item: require('./item')(sequelize),
    Commit: require('./commit')(sequelize),
    Version: require('./version')(sequelize),
    Comment: require('./comment')(sequelize)
  };

}).call(null);