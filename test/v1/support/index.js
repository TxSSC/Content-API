/**
 * Expose support
 */

var models = require('../../../api/v1/models');

module.exports = {

  /**
   * Consolidate models `require()`
   * - just change if model path changes
   */

  models: models,
  helpers: require('./helpers')(models.Sequelize)
};