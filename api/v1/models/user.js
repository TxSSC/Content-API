/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the User model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} User
 */

module.exports = function(sequelize) {

  /**
   * User model definition
   */

  var User = sequelize.define('User', {

    /**
     * Model properties
     */

    first_name: {
      type: Sequelize.STRING,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },

    last_name: {
      type: Sequelize.STRING,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    }
  });

  /**
   * Return User model
   */

  return User;
};