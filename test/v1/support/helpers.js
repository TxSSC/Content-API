/*
 * Helper Tasks
 */

module.exports = function(sequelize) {
  return {
    Up: function(cb) {
      sequelize.sync().success(function() {
        return cb();
      });
    },

    Down: function(cb) {
      sequelize.drop().success(function() {
        return cb();
      });
    }
  };
};