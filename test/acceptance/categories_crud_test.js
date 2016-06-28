require('../helper');

var http = require('http'),
    db = require('../../config/database').get('categories'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Categories create', function() {
  describe('Given I visit /index', function () {
    it('Then I see a header indicating it is the Products header', function() {
      browser.get('/');
      element(by.tagName('h1')).getText().then(function(text) {
        expect(text).to.equal('Adam\'s Stock');
      });
    });

    it('then I can crate a new category', function() {
      browser.get('/');
      var initialCount = 0;
      element.all(by.css('li.category')).count()
        .then(function(count) {
          initialCount = count;
        });

      element(by.id('categoryInput')).sendKeys('glove');
      element(by.id('categoryBtn')).click();

      element.all(by.css('li.category')).count()
        .then(function(count) {
          expect(count + 1).to.equal(initialCount + 1);
        });
    });
  });
});
