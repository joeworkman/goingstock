var request = require('request');

var Stock = {
  get: function(id, callback) {
    var url = '/stock/' + id;

    if(typeof id === 'function') {
      callback = id;
      url = '/stocks';
    }

    request({
      url: process.config.api + url,
      json: true
    }, function (err, response, body) {
      if(err) {
        return callback({
          error: err.message
        });
      }

      if (response.statusCode !== 200) {
        return callback({
          error: 'Response returned code ' + response.statusCode
        });
      }

      callback(null, body);
    });
  },

  create: function(data, callback) {
    request({
      url: process.config.api + '/stock',
      method: 'POST',
      json: true,
      body: data
    }, function (err, response, body) {
      if(err) {
        return callback({
          error: err.message
        });
      }

      if (response.statusCode !== 200) {
        return callback({
          error: 'Response returned code ' + response.statusCode
        });
      }

      callback(null, body);
    });
  }
};

module.exports = Stock;