var cfenv = require("cfenv");

var localOptions = {
  vcap : {
    services: {
      "mongo-p": [
        {
          "name": "mongo-development",
          "credentials": {
            "uri": "mongodb://localhost:27017/products_development"
          }
        },
        {
          "name": "mongo-test",
          "credentials": {
            "uri": "mongodb://localhost:27017/products_test"
          }
        }
      ]
    }
  }
};

module.exports = cfenv.getAppEnv(localOptions);
