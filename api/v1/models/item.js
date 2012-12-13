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

    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }

  });

  /**
   * Return Item model
   */

  return Item;
};
