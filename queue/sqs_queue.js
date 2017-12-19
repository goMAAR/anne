/* eslint-disable */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('../sqs_config.json');
var sqs = new AWS.SQS();

var params = {
  MessageBody: 'Im hella working',
  QueueUrl: 'https://sqs.us-west-2.amazonaws.com/711011453741/network-analytics'
}

const sendJob = (params) => {
  sqs.sendMessage(params, (err, data) => {
    if(err) { console.log('error!', err);}
    else {
      console.log('success!', data);
    }
  });
}

const receiveJob = () => {
  sqs.receiveMessage({
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/711011453741/network-analytics'
  }, (err, resp) => {
    if(err) { console.log(err); }
    else {
      try {
        console.log('Message received!  Deleting from queue...\n', resp.Messages[0].Body);
        var deleteParams = {
          QueueUrl: 'https://sqs.us-west-2.amazonaws.com/711011453741/network-analytics',
          ReceiptHandle: resp.Messages[0].ReceiptHandle
        }
        sqs.deleteMessage(deleteParams, (err, resp) => {
          if(err) {
            console.log('Delete error', err);
          } else {
            console.log('Message deleted!', resp);
          }
        });
      }
      catch (err) {
        console.log('queue is empty!  check back later');
      }   
       
    }
  });
}