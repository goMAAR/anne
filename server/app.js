/*eslint-disable*/
var apm = require('elastic-apm-node').start({
  appName: 'network-analytics',
  serverUrl: 'http://localhost:8200',
});
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const { createTweet } = require('../database/dbHelpers.js');
const axios = require('axios');
const { tweetConsumer, feedConsumer, followConsumer } = require('../queue/sqs_queue.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// followConsumer.start();
// tweetConsumer.start();
// feedConsumer.start();

app.get('/', (req, res) => {
	res.sendStatus(200);
});

http.listen(3000, () => {
  console.log('listening on 3000');
});

app.use(apm.middleware.express());

module.exports = app;
