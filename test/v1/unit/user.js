var should = require('should'),
    User = require('../../../api/v1/models').User;

describe('User', function() {

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

  describe('write to db', function() {
    var user;

    before(function() {
      user = User.build({
        first_name: 'Han',
        last_name: 'Solo',
        email: 'han.solo@gmail.com'
      });
    });

    it('should save the user', function(done) {
      user.save().success(function(record) {
        record.email.should.eql('han.solo@gmail.com');
        done();
      });
    });
  });

});