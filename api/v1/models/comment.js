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

  });

  /**
   * Return Comment model
   */

  return Comment;
};
