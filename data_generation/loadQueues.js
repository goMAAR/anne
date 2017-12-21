/* eslint-disable */
const { fakeSlimTweet } = require('./fakeTweet.js');
const { fakeFollow } = require('./fakeFollow.js');
const { queueUrls, sendJob } = require('../queue/sqs_queue.js');

// [complete] to do, write a script that loads fake tweets and follows
// into a mock queue
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

loadQueue(10, queueUrls.mockTweet, fakeSlimTweet);

// [complete] other things to do: load up a ruby mock-sqs thing 