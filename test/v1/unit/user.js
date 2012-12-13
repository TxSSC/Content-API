var should = require('should'),
    User = require('../support').models.User,
    Helpers = require('../support').helpers;

describe('User', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('.validations', function() {

    describe('with invalid records', function() {
      it('should validate first_name', function() {
        var user = User.build(),
            err = user.validate();

        should.exist(err.first_name);
      });

      it('should validate last_name', function() {
        var user = User.build(),
            err = user.validate();

        should.exist(err.last_name);
      });

      it('should validate email', function() {
        var user = User.build(),
            err = user.validate();

        should.exist(err.email);
      });
    });

    describe('with valid record', function() {
      it('should be valid', function() {
        var user = User.build({
          first_name: 'Han',
          last_name: 'Solo',
          email: 'han.solo@gmail.com'
        });

        var err = user.validate();
        should.not.exist(err);
      });
    });

  });

  describe('static function', function() {

    it('#save() should write to the database', function(done) {
      var user = User.build({
        first_name: 'Han',
        last_name: 'Solo',
        email: 'han.solo@gmail.com'
      });

      user.save()
	.success(function(result) {
	  result.email.should.equal('han.solo@gmail.com');
	  return done();
	})
	.error(function(error) {
	  return done(error);
	});

    });
  });

});