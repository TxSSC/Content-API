/**
 * Expose support
 */

module.exports = {

  /**
   * Consolidate models `require()`
   * - just change if model path changes
   */

  models: require('../../../api/v1/models'),

  fixtures: require('./fixtures')
};