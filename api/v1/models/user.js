/**
 * `User` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} User
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * User model definition
   */

  var User = sequelize.define('User', {

    /**
     * Model properties
     */

    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },

    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    }
  });

  /**
   * Return User model
   */

  return User;
};
