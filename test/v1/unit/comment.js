var should = require('should'),
    Helpers = require('../support').helpers,
    Fixtures = require('../support/fixtures'),
    Comment = require('../support').models.Comment;

describe('Comment', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('validation', function() {

    it('should not validate with empty comment', function() {
      var comment = Comment.build({});

      comment.validate().should.have.property('content');
    });

    it('should validate with comment', function() {
      var comment = Comment.build({
        content: 'Comment body'
      });

      should.not.exist(comment.validate());
    });

  });

  describe('association', function() {

    beforeEach(function(done) {
      Comment.sync().success(function() {
        done();
      });
    });

    afterEach(function(done) {
      Comment.drop().success(function() {
        done();
      });
    });

    describe('with item', function() {
      var item;

      before(function(done) {
        var Item = Fixtures.Item();
        Item.topic_id = 1;
        Item.save().success(function(result) {
          item = result;
          done();
        });
      });

      it('should link comments', function(done) {
        Comment.create({ item_id: item.id, version_id: 1, user_id: 1, content: 'Comment Body'})
          .success(function(comment) {
            item.getComments().success(function(items) {
              items.should.be.an.instanceOf(Array);
              items.length.should.eql(1);
              items[0].content.should.eql('Comment Body');
              return done();
            });
          });
      });
    });

    describe('with version', function() {
      var version;

      before(function(done) {
        var Version = Fixtures.Version();
        Version.topic_id = 1;
        Version.save().success(function(result) {
          version = result;
          done();
        });
      });

      it('should link comments', function(done) {
        Comment.create({ item_id: 1, version_id: version.id, user_id: 1, content: 'Comment Body'})
          .success(function(comment) {
            version.getComments().success(function(items) {
              items.should.be.an.instanceOf(Array);
              items.length.should.eql(1);
              items[0].content.should.eql('Comment Body');
              return done();
            });
          });
      });
    });

    describe('with user', function() {
      var user;

      before(function(done) {
        var User = Fixtures.User();
        User.save().success(function(result) {
          user = result;
          done();
        });
      });

      it('should link comments', function(done) {
        Comment.create({ item_id: 1, version_id: 1, user_id: user.id, content: 'Comment Body'})
          .success(function(comment) {
            user.getComments().success(function(items) {
              items.should.be.an.instanceOf(Array);
              items.length.should.eql(1);
              items[0].content.should.eql('Comment Body');
              return done();
            });
          });
      });
    });

  });

});