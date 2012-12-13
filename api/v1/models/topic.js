/**
 * `Topic` model
 *
 * @param {Object} sequelize
 * @param {Object} DataTypes
 * @return {Object} Topic
 */

module.exports = function(sequelize, DataTypes) {

  /**
   * Topic model definition
   */

  var Topic = sequelize.define('Topic', {

    /**
     * Model properties
     */

    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    permalink: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        urlSafe: function(value) {
          if(!/[a-z\-_0-9]/i.test(value)) {
            throw new Error('Invalid permalink');
          }
        }
      }
    }
  },
  {
    /**
     * Model functions
     */

    instanceMethods: {
      createPermalink: function() {
        this.permalink = this.title
                            .toLowerCase()
                            .replace(/[^\w\d\s]+/g, '')
                            .replace(/\s+/g, '_');
        return this;
      }
    }
  });

  /**
   * Return Topic model
   */

  return Topic;
};
