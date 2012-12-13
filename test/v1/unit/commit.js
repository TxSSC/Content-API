var should = require('should'),
    Commit = require('../support').models.Commit,
    Helpers = require('../support').helpers,
    Fixtures = require('../support/fixtures');

describe('Commit', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('validation', function() {

    it('should not validate with empty content', function() {
      var commit = Commit.build({});

      commit.validate().should.have.property('content');
    });

    it('should validate with content', function() {
      var commit = Commit.build({
        content: 'Some really nice content here.'
      });

      should.not.exist(commit.validate());
    });

  });

  describe('associations', function() {

    describe('with item', function() {
      var item;

      before(function(done) {
        Fixtures.Item().save()
          .success(function(result) {
            item = result;
            return done();
          })
          .error(function(error) {
            return done(error);
          });
      });

      it('should set up association', function(done) {
        Commit.create({content: 'Amazing content here', item_id: item.id})
          .success(function(commit) {
            commit.item_id.should.equal(item.id);

            commit.getItem()
              .success(function(result) {
                result.id.should.equal(item.id);
                return done();
              });
          });
      });

    });

    describe('with user', function() {
      var user;

      before(function(done) {
        Fixtures.User().save()
          .success(function(result) {
            user = result;
            return done();
          })
          .error(function(error) {
            return done(error);
          });
      });

      it('should set up association', function(done) {
        Commit.create({content: 'Amazing content here', user_id: user.id})
          .success(function(commit) {
            commit.user_id.should.equal(user.id);

            commit.getUser()
              .success(function(result) {
                result.id.should.equal(user.id);
                return done();
              });
          });
      });

    });

  });

});