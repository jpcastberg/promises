/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data = data.toString('utf8');
        data = data.split('\n');
        data = data[0];
        resolve(data);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url, callback) {
  return new Promise((resolve, reject) => {
    request(url, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
