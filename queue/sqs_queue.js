/* eslint-disable */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./sqs_config.json');
let sqs = new AWS.SQS();
const Consumer = require('sqs-consumer');

const queueUrls = {
  tweet: 'https://sqs.us-west-2.amazonaws.com/711011453741/tweet',
  follow: 'https://sqs.us-west-2.amazonaws.com/711011453741/follow',
  feed: 'https://sqs.us-west-2.amazonaws.com/711011453741/feed'
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

let url = queueUrls.tweet;
let params = buildParams(url, 'hello tommy');
// sendJob(params); uncomment to send a test message

let tweetConsumer = Consumer.create({
  queueUrl: queueUrls.tweet,
  handleMessage: (message, done) => {
    console.log('tweet consumer, message incoming!', message.Body);
    // do some work here
    done();
  }
})

const followConsumer = Consumer.create({
  queueUrl: queueUrls.follow,
  handleMessage: (message, done) => {
    console.log('follow consumer, message incoming!', message.Body);
    // do some work
    done();
  }
})

let feedConsumer = Consumer.create({
  queueUrl: queueUrls.feed,
  handleMessage: (message, done) => {
    console.log('feed consumer, message incoming!', message.Body);
    // do some work
    done();
  }
})

module.exports.queueUrls = queueUrls;
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

// receiveJob(queueUrls.tweet, (message) => {
//   console.log(message);
// })