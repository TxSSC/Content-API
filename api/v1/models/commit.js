/**
 * `Commit` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} Commit
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Commit model definition
   */

  var Commit = sequelize.define('Commit', {

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
   * Return Commit model
   */

  return Commit;
};
