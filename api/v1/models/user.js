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

  });

  /**
   * Return User model
   */

  return User;
};