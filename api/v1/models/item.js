/**
 * `Item` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} Item
 */

module.exports = function(sequelize, DataTypes) {

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
