/*eslint-disable*/
var apm = require('elastic-apm-node').start({
  appName: 'network-analytics',
  serverUrl: 'http://localhost:8200'
});
var sqs = require('simple-sqs')();

const { insertTweet, insertFollow, getFeed } = require('../database/dbHelpers.js');
const { queueUrls } = require('../queue/sqs_queue.js');

const tweetQueue = sqs(queueUrls.mockTweet);
const feedQueue = sqs(queueUrls.mockFeed);
const followQueue = sqs(queueUrls.mockFollow);

tweetQueue.on('message', (msg, done) => {
  let name = 'tweet-queue';
  let type = 'tweet';
  let trans = apm.startTransaction(name, type);
  insertTweet(msg.Body, done, trans);
});

followQueue.on('message', (msg, done) => {
  let name = 'follow-queue';
  let type = 'follow';
  let trans = apm.startTransaction(name, type);
  insertFollow(msg.Body, done, trans);
});

feedQueue.on('message', (msg, done) => {
  let name = 'feed-queue';
  let type = 'feed';
  let trans = apm.startTransaction(name, type);
  getFeed(msg.Body, done, trans);
});

tweetQueue.on('error', function (err) {
  apm.captureError(err)
});

feedQueue.on('error', function(err) {
  apm.captureError(err);
})
