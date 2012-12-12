/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Comment model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Comment
 */

module.exports = function(sequelize) {

  /**
   * Comment model definition
   */

  var Comment = sequelize.define('Comment', {

    /**
     * Model properties
     */

  });

  /**
   * Return Comment model
   */

  return Comment;
};