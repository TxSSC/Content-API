var should = require('should'),
    Helpers = require('../support').helpers,
    Fixtures = require('../support/fixtures'),
    Item = require('../support').models.Item;

describe('Item', function() {

  before(function(done) {
    Helpers.Up(done);
  });

  after(function(done) {
    Helpers.Down(done);
  });

  describe('validation', function() {

    it('should not validate with empty title', function() {
      var item = Item.build({});

      item.validate().should.have.property('title');
    });

    it('should validate with title', function() {
      var item = Item.build({
        title: 'Item title'
      });

      should.not.exist(item.validate());
    });

  });

  describe('association', function() {
    var topic;

    before(function(done) {
      Fixtures.Topic().save()
        .success(function(result) {
          topic = result;
          return done();
        })
        .error(function(error) {
          return done(error);
        });
    });

    it('#create() should save an item with given topic_id', function(done) {
      Item.create({ topic_id: topic.id, title: 'Item title'})
        .success(function(item) {
          item.topic_id.should.equal(topic.id);
          return done();
        });
  });

  });

});