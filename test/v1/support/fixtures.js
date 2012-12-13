/**
 * Fixtures for tests
 */

var Fixtures = module.exports = {},
    Models = require('./index').models;

Fixtures.User = function() {
  return Models.User.build({
    first_name: 'Han',
    last_name: 'Solo',
    email: 'han.solo@gmail.com'
  });
};

Fixtures.Topic = function() {
  return Models.Topic.build({
    title: 'Topic Model',
    permalink: 'topic-model'
  });
};

Fixtures.Version = function() {
  return Models.Version.build({
    name: 'Version Model'
  });
};

Fixtures.Item = function() {
  return Models.Item.build({
    title: 'Item Title'
  });
};