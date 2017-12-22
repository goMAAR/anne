/* eslint-disable */
const { fakeSlimTweet } = require('./fakeTweet.js');
const { fakeFollow } = require('./fakeFollow.js');
const { queueUrls, sendJob } = require('../queue/sqs_queue.js');

const loadQueue = (numRecords, queueUrl, mockThis) => {
  for(var i = 0; i < numRecords; i++) {
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

// Example:
// loadQueue(10, queueUrls.mockTweet, fakeSlimTweet);