/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Topic model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Topic
 */

module.exports = function(sequelize) {

  /**
   * Topic model definition
   */

  var Topic = sequelize.define('Topic', {

    /**
     * Model properties
     */

  });

  /**
   * Return Topic model
   */

  return Topic;
};