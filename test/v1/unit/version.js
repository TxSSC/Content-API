var should = require('should'),
    Version = require('../support').models.Version,
    Helpers = require('../support').helpers,
    Fixtures = require('../support/fixtures');

describe('Version', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('validation', function() {

    it('should require a name', function() {
      var version = Version.build({});

      version.validate().should.have.property('name');
    });

    it('should pass with title', function() {
      var version = Version.build({
        name: 'Version name'
      });

      should.not.exist(version.validate());
    });

  });

  describe('association', function() {
    var Topic;

    before(function(done) {
      Fixtures.Topic().save().success(function(topic) {
        Topic = topic;
        done();
      });
    });

    it('should associate a version with a topic', function(done) {
      var version = Version.build({
         name: 'version model'
      });

      version.setTopic(Topic);

      version.getTopic().success(function(topic) {
        should.exist(topic);
        topic.title.should.eql('Topic Model');
        done();
      });
    });

  });

});