/**
 * Model dependencies
 */

var Item = require('../models').Item;

/**
 * Expose Items controller
 */

var Items = module.exports = exports;

/**
 * Items `index`
 *
 * @param {Request} req
 * @param {Response} res
 */

Items.index = function(req, res) {
  Item.findAll({
    where: {
      topic_id: req.params.topic_id
    }
  }).complete(function(err, items) {
    if(err) return res.json(500, {error: err});
    return res.json(200, items);
  });
};

/**
 * Items `show`
 *
 * @param {Request} req
 * @param {Response} res
 */

Items.show = function(req, res) {
  return res.json(200, req.data.item);
};

/**
 * Items `create`
 *
 * @param {Request} req
 * @param {Response} res
 */

Items.create = function(req, res) {
  var item,
      validateErrors;

  req.body.topic_id = req.params.topic_id;
  item = Item.build(req.body);

  validateErrors = item.validate();

  if(validateErrors) return res.json(500, {error: validateErrors});

  item.save().complete(function(err, item) {
    if(err) return res.json(500, {error: err});
    return res.json(201, item);
  });
};

/**
 * Items `update`
 *
 * @param {Request} req
 * @param {Response} res
 */

Items.update = function(req, res) {
  if(!req.body) return res.json(400, { error: 'invalid json' });

  req.data.item.update(req.body, function(err, item) {
    if(err) return res.json(500, {error: err});
    return res.json(200, item);
  });
};

/**
 * Items `destroy`
 *
 * @param {Request} req
 * @param {Response} res
 */

Items.destroy = function(req, res) {
  req.data.item.destroy().complete(function(err) {
    if(err) return res.json(500, {error: err});
    return res.json(200, {status: 1});
  });
};