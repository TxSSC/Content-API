/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Version model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Version
 */

module.exports = function(sequelize) {

  /**
   * Version model definition
   */

  var Version = sequelize.define('Version', {

    /**
     * Model properties
     */

  });

  /**
   * Return Version model
   */

  return Version;
};