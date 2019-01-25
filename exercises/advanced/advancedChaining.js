/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of concepts between
 * multiple github profile pictures
 *
 * Given an array of github handles, searchCommonConceptsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of concepts for each avatar_url (requires API key)
 *   5) find the intersection of the concepts
 *
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib');
var _ = require('underscore');
var API_KEY = '1fcf6178a5a6411582250e27ce0c9621';

// We're using Clarifai's API to recognize concepts in an image into a list of concepts
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/login/
// Then, create a new API Key and add your API key to the
// `advancedChainingLib.js` file. When creating an API key, you can give it
// the `Predict on Public and Custom Models` scope

var searchCommonConceptsFromGitHubProfiles = function (githubHandles) {
  var profiles = _.map(githubHandles, (handle) => {
    return lib.getGitHubProfile(handle);
  });
  return Promise.all(profiles)
    .then((profiles) => {
      console.log('PROFILES', profiles);
      var concepts = _.map(profiles, (profile) => {
        return lib.predictImage(profile.avatarUrl); 
      });
      return Promise.all(concepts)
        .then((concepts) => {
          // console.log('Concepts:', concepts);
          return lib.getIntersection(concepts);
        });         
    });
};

// Export these functions so we can unit test them
module.exports = {
  searchCommonConceptsFromGitHubProfiles,
};
