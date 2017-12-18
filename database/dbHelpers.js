/* eslint-disable */
const { client } = require('./db.js');

const createTweet = (req, res, next) => {
  // client.create code here
  next();
}

module.exports.createTweet = createTweet;

// helpers for creating documents and querying for data