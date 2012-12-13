/**
 * `Comment` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} Comment
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Comment model definition
   */

  var Comment = sequelize.define('Comment', {

    /**
     * Model properties
     */

    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }

  });

  /**
   * Return Comment model
   */

  return Comment;
};
