/**
 * `Item` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} Item
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Model dependencies for associations
   */

  var Topic = sequelize.import(__dirname + '/topic');

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
   * Model associations
   */

  Item.belongsTo(Topic);

  /**
   * Return Item model
   */

  return Item;
};
