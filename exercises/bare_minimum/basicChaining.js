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
var earlierModule = require('./promiseConstructor.js');
var laterModule = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  var promiseWrite = Promise.promisify(fs.writeFile);
  var user = earlierModule.pluckFirstLineFromFileAsync(readFilePath);
  return user
    .then(function (newUser) {
      return laterModule.getGitHubProfileAsync(newUser);
    })
    .then(function (writeUser) {
      return promiseWrite(writeFilePath, JSON.stringify(writeUser));//promisify fs.writefile look up
    });// write out functionality/return statements
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
