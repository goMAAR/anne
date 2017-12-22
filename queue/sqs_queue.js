/* eslint-disable */
// Make fake queues with this curl command upon running fake-sqs
// curl http://0.0.0.0:4568 -d "Action=CreateQueue&QueueName=feed&AWSAccessKeyId=AKIAJRC2ZQKCJH6PM6HA"
// curl http://0.0.0.0:4568 -d "Action=CreateQueue&QueueName=follow&AWSAccessKeyId=AKIAJRC2ZQKCJH6PM6HA"
// curl http://0.0.0.0:4568 -d "Action=CreateQueue&QueueName=tweet&AWSAccessKeyId=AKIAJRC2ZQKCJH6PM6HA"

var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./sqs_config.json');
let sqs = new AWS.SQS();
const Consumer = require('sqs-consumer');
const { insertTweet, insertALotOfTweets, insertFollow } = require('../database/dbHelpers.js');

const queueUrls = {
  tweet: 'https://sqs.us-west-2.amazonaws.com/711011453741/tweet',
  follow: 'https://sqs.us-west-2.amazonaws.com/711011453741/follow',
  feed: 'https://sqs.us-west-2.amazonaws.com/711011453741/feed',
  mockTweet: 'http://0.0.0.0:4568/tweet',
  mockFollow: 'http://0.0.0.0:4568/follow',
  mockFeed: 'http://0.0.0.0:4568/feed'
}

const buildParams = (queueUrl, messageBody) => {
  var params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody
  }; 
  return params;
}

const sendJob = (params) => {
  console.log('message that was sent:', params.MessageBody);
  sqs.sendMessage(params, (err, data) => {
    if(err) { console.log('error!', err);}
    else {
      console.log('success!', data);
    }
  });
}

let url = queueUrls.mockTweet;
let params = buildParams(url, 'hello world');
// sendJob(params, 12345); // uncomment to send a test message

let tweetConsumer = Consumer.create({
  queueUrl: queueUrls.mockTweet,
  handleMessage: (message, done) => {
    console.log('tweet consumer, message incoming!', message.Body);
    let msg = JSON.parse(message.Body);
    insertTweet(msg, done);
  }
})

const followConsumer = Consumer.create({
  queueUrl: queueUrls.mockFollow,
  handleMessage: (message, done) => {
    console.log('follow consumer, message incoming!', message.Body);
    let msg = JSON.parse(message.Body);
    insertFollow(msg, done);
  }
})

let feedConsumer = Consumer.create({
  queueUrl: queueUrls.mockFeed,
  handleMessage: (message, done) => {
    console.log('feed consumer, message incoming!', message.Body);
    // do some work
    done();
  }
})

module.exports.queueUrls = queueUrls;
module.exports.sendJob = sendJob;
module.exports.tweetConsumer = tweetConsumer;
module.exports.followConsumer = followConsumer;
module.exports.feedConsumer = feedConsumer;

// This can be ignored since consumers are being used. 
const receiveJob = (queueUrl, callback) => {
  sqs.receiveMessage({
    QueueUrl: queueUrl
  }, (err, resp) => {
    if(err) { console.log(err); }
    else {
      try {
        let message = resp.Messages[0].Body;
        console.log('Message received!  Deleting from queue...\n', message);
        var deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: resp.Messages[0].ReceiptHandle
        }
        sqs.deleteMessage(deleteParams, (err, resp) => {
          if(err) {
            console.log('Delete error', err);
          } else {
            console.log('Message deleted!', resp);
          }
        });

        callback(message);
      }
      catch (err) {
        console.log(err);
        console.log('Queue is empty!  check back later');
      }   
    }
  });
}

// Uncomment to receive one job at a time
// receiveJob(queueUrls.tweet, (message) => {
//   console.log(message);
// })
