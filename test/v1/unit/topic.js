var should = require('should'),
    Topic = require('../support').models.Topic,
    Helpers = require('../support').helpers,
    Fixtures = require('../support/fixtures');

describe('Topic', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('static function', function() {

    it('#create() should write to the database', function(done) {
      var topic = Topic.build({
        title: 'Topic title'
      });

      topic.save()
        .success(function(result) {
          result.title.should.equal('Topic title');
          return done();
        })
        .error(function(error) {
          return done(error);
        });
    });

  });

  describe('validation', function() {

    it('should not pass with empty title', function() {
      var topic = Topic.build({});

      topic.validate().should.have.property('title');
    });

    it('should pass with title', function() {
      var topic = Topic.build({
        title: 'Topic title'
      });

      should.not.exist(topic.validate());
    });

  });

  describe('member function', function() {

    it('#createPermalink() should generate the correct permalink', function() {
      var topic = Topic.build({
        title: 'Topic title?'
      });

      topic.createPermalink();
      topic.permalink.should.equal('topic_title');
    });

  });

  describe('associations', function() {
    var topic;

    before(function(done) {
      Topic.create({ title: 'Topic title', permalink: 'topic-child-test' })
        .success(function(record) {
          topic = record;

          var version = Fixtures.Version();
          version.topic_id = record.id;
          version.save().success(function() {
            done();
          });
      });
    });

    it('should allow many versions', function(done) {

      topic.getVersions().success(function(versions) {
        should.exist(versions);
        versions.should.be.an.instanceof(Array);
        versions[0].name.should.eql('Version Model');
        done();
      });
    });

  });

});