var router = require('express').Router();
var productsCollections = require('../config/database').get('products');

/* GET products listing. */
router.get('/', function(req, res, next) {
  console.log(productsCollections);
  productsCollections.find({}).
    then(function(products) {
      res.json(products);
    }, function(err) {
      throw err;
    });
});

// post products
router.post('/', function(req, res) {
  console.log('products', req.body);
  productsCollections.insert(req.body)
    .then(function(data) {
      res.status(201);
      res.end();
    }, function(err) {
      res.status(500);
      res.end();
    });
});

module.exports = router;
