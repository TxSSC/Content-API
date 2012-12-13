/**
 * Module dependencies
 */

var Sequelize = require('sequelize');

/**
 * Expose the Version model `boot` function
 *
 * @param {Object} sequelize
 * @return {Object} Version
 */

module.exports = function(sequelize) {

  var Topic = require('./topic')(sequelize);

  /**
   * Version model definition
   */

  var Version = sequelize.define('Version', {

    /**
     * Model properties
     */

    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    published: {
      type: Sequelize.BOOLEAN
    }

  });

  // Association
  Version.belongsTo(Topic);

  /**
   * Return Version model
   */

  return Version;
};