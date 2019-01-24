/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  //readfile
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      data = data.toString('utf8');
      data = data.split('\n');
      data = data[0];
      callback(null, data);
    }
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, resp) => {
    if (err) {
      callback(err);
    } else {
      callback(null, resp.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
