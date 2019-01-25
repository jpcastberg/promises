/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

//need to import pluckfirstline

var fs = require('fs');
var { pluckFirstLineFromFileAsync } = require('../bare_minimum/promiseConstructor.js');
var Promise = require('bluebird');
var _ = require('underscore');

Promise.promisifyAll(fs);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  //create proms var = map filePaths
  var proms = _.map(filePaths, (filePath) => {
    return pluckFirstLineFromFileAsync(filePath);
  });
    //for each filepath, return pluckfirstlineasync
  //use promise.all with proms
  return Promise.all(proms)
    .then(function(firstLines) {
      var allLines = firstLines.join('\n');
      fs.writeFileAsync(writePath, allLines);
    });
  //to pass on array of lines, which we can join
  //then write that joined string to the writepath
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};