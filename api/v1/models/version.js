/**
 * `Version` model
 *
 * @param {Object} sequelize
 * @return {Object} Version
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Model dependencies for associations
   */

  var Topic = sequelize.import(__dirname + '/topic');

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
   * Model Associations
   */

  Version.belongsTo(Topic);

  /**
   * Return Version model
   */

  return Version;
};
