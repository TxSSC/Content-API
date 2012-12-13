/**
 * `Version` model
 *
 * @param {Object} sequelize
 * @return {Object} Version
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Version model definition
   */

  var Version = sequelize.define('Version', {

    /**
     * Model properties
     */

    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    published: {
      type: DataTypes.BOOLEAN
    }

  });

  /**
   * Return Version model
   */

  return Version;
};
