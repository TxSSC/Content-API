/**
 * Fixtures for tests
 */

var Fixtures = module.exports = {},
    Models = require('./index').models;

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