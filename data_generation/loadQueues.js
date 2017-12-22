/* eslint-disable */
const { fakeSlimTweet } = require('./fakeTweet.js');
const { fakeFollow } = require('./fakeFollow.js');
const { fakeSlimUser } = require('./fakeUser.js');
const { queueUrls, sendJob, receiveJob } = require('../queue/sqs_queue.js');

const loadQueue = (numRecords, queueUrl, mockThis, startIndex = 0) => {
  for(var i = startIndex; i < startIndex + numRecords; i++) {
    let thing = mockThis(i);
    let params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(thing)
    }
    sendJob(params);
  }
};

// Invoke with ctrl + b or in the terminal with node loadQueues.js
// with a few invokations of this function

// Load 10 follows and save in elasticsearch:
// loadQueue(10, queueUrls.mockFollow, fakeFollow);

// Load 10 tweets and save in elasticsearch:
// loadQueue(10, queueUrls.mockTweet, fakeSlimTweet);

// Load a random user, produce a feed:
let rand = Math.floor(Math.random() * 33333);
loadQueue(1, queueUrls.mockFeed, fakeSlimUser, rand);