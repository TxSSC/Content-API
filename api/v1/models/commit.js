/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Commit model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Commit
 */

module.exports = function(sequelize) {

  /**
   * Commit model definition
   */

  var Commit = sequelize.define('Commit', {

    /**
     * Model properties
     */

  });

  /**
   * Return Commit model
   */

  return Commit;
};