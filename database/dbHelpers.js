/* eslint-disable */
const { client } = require('./db.js');

const insertTweet = (tweet, done) => {
  let { id, user_id, created_at } = tweet;
  let record = {
    index: 'slimtweets',
    type: 'tweet',
    id: id,
    body: {
      user_id: user_id,
      created_at: created_at
    }
  };

	client.create(record, (err, resp) => {
    if(err) { console.log(err); }
    else {
      console.log('record inserted successfully, record:', tweet);
      done();
    }
  });
}

const insertFollow = (follow, done) => {
  let { id, follower_id, followee_id, created_at } = follow;
  let record = {
    index: 'follows',
    type: 'follow',
    id: id,
    body: {
      follower_id: follower_id,
      followee_id: followee_id,
      created_at: created_at
    }
  };

  client.create(record, (err, resp) => {
    if(err) { console.log(err); }
    else {
      console.log('record inserted successfully, record:', resp);
      done();
    }
  })
}

const getFeed = (user, done) => {
  let { user_id } = user;
  console.log('user:', user, 'user id:', user_id);
  done(); 
}

// needs reworking
const insertALotOfTweets = (tweetArray) => {
  let { id, user_id, created_at } = req.body;
  let arrayOfTweets = [];

  let tweetMetaData = {
    index: {
      _index: 'slimtweets',
      type: 'tweet',
      _id: id
    }
  };

  let tweet = {
    id: id,
    user_id: user_id,
    created_at: created_at
  }

  arrayOfTweets.push(tweetMetaData);
  arrayOfTweets.push(tweet);

  client.bulk({
    body: arrayOfTweets
  }, (err, resp) => {
    if(err) { console.log(err); }
    else {
      console.log('bulk load')
    }
  }); 
}

module.exports.insertTweet = insertTweet;
module.exports.insertFollow = insertFollow;
module.exports.getFeed = getFeed;
module.exports.insertALotOfTweets = insertALotOfTweets;

// helpers for creating documents and querying for data