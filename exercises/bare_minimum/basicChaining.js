/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var methods = require('./promiseConstructor.js');
var async = require('./promisification.js');

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return methods.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      return async.getGitHubProfileAsync(username);
    })
    .then(function(profile) {
      profile = JSON.stringify(profile);
      return fs.writeFileAsync(writeFilePath, profile);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
