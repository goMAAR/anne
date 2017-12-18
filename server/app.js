/*eslint-disable*/
const express = require('express');
// const path = require('path');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const { createTweet } = require('../database/dbHelpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

module.exports = app;
