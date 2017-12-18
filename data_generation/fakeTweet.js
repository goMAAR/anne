/* eslint-disable */
const jsonfile = require('jsonfile');
const faker = require('faker');
const moment = require('moment');

const sources = ['Safari for iOS', 'Twitter for Mac', 'Twitter for Android', 'Twitter for iOS'];
const timezones = ['Pacific Time', 'Mountain Time', 'Central Time', 'Eastern Time'];
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const prefaces = [
  'Ask me why I think',
  'After much consideration, I have finally decided that',
  'Today made me realize',
  'Have you ever thought about how',
];
const nouns = [
  'pumpkin spice lattes',
  'dogs that skateboard', 
  'critically acclaimed foreign films',
  'all of my ideas',
  'old timey hats',
  'footlong sandwiches from Subway',
  'chatty cashiers',
  'my imaginary friends from elementary school'
];
const adjs = [
  'awesome',
  'stupid',
  'amazing',
  'awful',
  'whatever',
  'fine',
  'a thing',
  'meh'
];

const fakeHex = () => {
  let result = '';
  for (let x = 0; x < 6; x++) {
    let randIndex = Math.floor(Math.random() * 16);
    result += hex[randIndex];
  }
  return result;
};

const fakeTweetText = () => {
  let preface = prefaces[Math.floor(Math.random() * 4)];
  let noun = nouns[Math.floor(Math.random() * 8)];
  let adj = adjs[Math.floor(Math.random() * 8)];

  return `${preface} ${noun} are ${adj}`;
};

const fakeTweet = (tweetID) => {
  let rand = Math.random();
  let tweet = {
    id: tweetID,
    user_id: Math.floor(rand * 33333),
    created_at: moment(faker.date.past()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    text: fakeTweetText(),
    favorited: faker.random.boolean(),
    in_reply_to_screen_name: null,
    in_reply_to_status_id: null,
    in_reply_to_user_id: null,
    retweet_count: Math.floor(rand * 800),
    retweeted: faker.random.boolean(),
    source: `${sources[Math.floor(rand * 4)]}`,
    truncated: false,
    reply_count: Math.floor(rand * 500),
    favorite_count: Math.floor(rand * 700),
    possibly_sensitive: false,
    user_following: faker.random.boolean()
  };
  return tweet;
};

module.exports.fakeTweet = fakeTweet;