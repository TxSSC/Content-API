/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Item model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Item
 */

module.exports = function(sequelize) {

  /**
   * Item model definition
   */

  var Item = sequelize.define('Item', {

    /**
     * Model properties
     */

  });

  /**
   * Return Item model
   */

  return Item;
};