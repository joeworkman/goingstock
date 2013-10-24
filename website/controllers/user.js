var request = require('request');

var User = {
  get: function(id, callback) {
    var url = '/user/' + id; 

    if(typeof id === 'function') {
      callback = id;
      url = '/users';
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
      url: process.config.api + '/user',
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

module.exports = User;