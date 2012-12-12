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
    var user, options, password;
    var env = process.env.NODE_ENV || 'development';

    if(env === 'production') {
      user = process.env.DB_USER;
      password = process.env.DB_PASSWORD;

      options = {
        dialect: 'mysql',
        host: 'localhost',

        define: {
          charset: 'utf8',
          timeStamps: true
        }
      };
    }
    else {
      user = 'root';
      password = '';

      options = {
        dialect: 'sqlite',
        storage: __dirname + 'database.sqlite'
      };
    }

    /**
     * Define the new database connection
     */

    sequelize = new Sequelize(user, password, options);
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