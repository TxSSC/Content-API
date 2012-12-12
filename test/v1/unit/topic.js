var should = require('should'),
    Topic = require('../support').models.Topic;


describe('Topic', function() {

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

});