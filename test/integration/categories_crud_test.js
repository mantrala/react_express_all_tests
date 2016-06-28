var request = require('supertest');
var db = require('../../config/database');
var app = require('../../app');

var categoriesCollection = db.get('categories');

describe('categories', function () {
  beforeEach(function(done) {
    categoriesCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  describe('GET /categories', function () {
    it('responds with a 200 status code', function (done) {
      request(app).get('/categories')
        .expect(200, done);
    });

    it('returns an array of JSON objects representing categories in the database', function(done) {
      var category1 = { name: 'category1'};
      var category2 = { name: 'category2'};

      categoriesCollection.insert([category1, category2], function (err, students) {
        if (err) done(err);

        request(app).get('/categories')
          .expect(function (response) {
            expect(response.body).to.be.instanceOf(Array);

            expect(response.body[0].name).to.equal(category1.name);

            expect(response.body[1].name).to.equal(category2.name);
          })
          .end(done);
      });
    });

  });


  describe('POST /categories', function () {
    it('responds with the object that was persisted', function (done) {
        request(app).post('/categories')
          .send({name: 'Adam category'})
          .expect(function (response) {
            expect(response.status).to.equal(201);
          })
          .end(done);
    });
  });

});
