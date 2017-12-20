/* eslint-disable */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('../sqs_config.json');

module.exports.sqs = new AWS.SQS();

module.exports.queueUrls = {
  tweet: 'https://sqs.us-west-2.amazonaws.com/711011453741/tweet',
  follow: 'https://sqs.us-west-2.amazonaws.com/711011453741/follow',
  feed: 'https://sqs.us-west-2.amazonaws.com/711011453741/feed'
}

module.exports.buildParams = (queueUrl, messageBody) => {
  var params = {
    MessageBody: messageBody,
    QueueUrl: queueUrl
  }; 
  return params;
}

module.exports.sendJob = (params) => {
  sqs.sendMessage(params, (err, data) => {
    if(err) { console.log('error!', err);}
    else {
      console.log('success!', data);
    }
  });
}

module.exports.receiveJob = (queueUrl, callback) => {
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
        console.log('Queue is empty!  check back later');
      }   
    }
  });
}