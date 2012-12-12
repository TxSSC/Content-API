var should = require('should'),
    Topic = require('../support').models.Topic;


describe('Topic', function() {

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