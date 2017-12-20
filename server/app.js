/*eslint-disable*/
// var apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  // appName: 'network-analytics'
  // Use if APM Server requires a token
  // secretToken: '',

  // Set custom APM Server URL (default: http://localhost:8200)
  // serverUrl: 'http://localhost:8200',
// });
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const { createTweet } = require('../database/dbHelpers.js');
const axios = require('axios');
const { tweetConsumer, feedConsumer, followConsumer } = require('../queue/sqs_queue.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

followConsumer.start();
tweetConsumer.start();
feedConsumer.start();

app.get('/', (req, res) => {
		res.sendStatus(200);
});

app.get('/feed', (req, res) => {
	res.sendStatus(200);
});

app.post('/metrics', (req, res) => {
	res.sendStatus(201);
});

app.post('/tweet/create', createTweet, (req, res) => {
	res.sendStatus(201);
});

app.post('/user/create', (req, res) => {
	res.sendStatus(201);
});

http.listen(3000, () => {
  console.log('listening on 3000');
});

// app.use(apm.middleware.express());

module.exports = app;
