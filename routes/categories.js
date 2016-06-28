var router = require('express').Router();
var categoryCollection = require('../config/database').get('categories');

/* GET users listing. */
router.get('/', function(req, res, next) {
  categoryCollection.find({}).
    then(function(students) {
      res.json(students);
    }, function(err) {
      throw err;
    });
});

// post categories
router.post('/', function(req, res) {
  categoryCollection.insert(req.body)
    .then(function(data) {
      res.status(201);
      res.end();
    }, function(err) {
      res.status(500);
      res.end();
    });
});

module.exports = router;
