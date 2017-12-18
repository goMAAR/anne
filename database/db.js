/* eslint-disable */
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

// Simple ping to verify client is running
// client.ping({
//   requestTimeout: 1000
// }, (err) => {
//   err ? console.trace('elasticsearch cluster is down!') : console.log('all is well!');
// });

module.exports.client = client;

// Simple query example: 

// client.search({
//   q: 'the'
// }).then((resp) => {
//   var hits = resp;
//   console.log(hits);
// }, (err) =>
// console.log('error!', err));