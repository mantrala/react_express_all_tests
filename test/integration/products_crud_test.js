var request = require('supertest');
var db = require('../../config/database');
var app = require('../../app');

var productsCollection = db.get('products');

describe('products', function () {
  beforeEach(function(done) {
    productsCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  describe('GET /products', function () {
    it('responds with a 200 status code', function (done) {
      request(app).get('/products')
        .expect(200, done);
    });

    it('returns an array of JSON objects representing categories in the database', function(done) {
      var product1 = { name: 'product1', price: 5, category: 'food', description: 'tasty'};
      var product2 = { name: 'product2', price: 8, category: 'music', description: 'rap'};

      productsCollection.insert([product1, product2], function (err, students) {
        if (err) done(err);

        request(app).get('/products')
          .expect(function (response) {
            expect(response.body).to.be.instanceOf(Array);

            expect(response.body[0].name).to.equal(product1.name);

            expect(response.body[1].name).to.equal(product2.name);
          })
          .end(done);
      });
    });

  });


  describe('POST /products', function () {
    it('responds with the object that was persisted', function(done) {
      var product1 = { name: 'product1', price: 5, category: 'food', description: 'tasty'};

      request(app).post('/products')
        .send(product1)
        .expect(function (response) {
          expect(response.status).to.equal(201);
        })
        .end(done);
    });
  });

});
