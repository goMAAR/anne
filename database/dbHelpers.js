/* eslint-disable */
const { client } = require('./db.js');

const insertTweet = (tweet, done, trans) => {
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
      trans.end();
    }
  });
}

const insertFollow = (follow, done, trans) => {
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
      console.log('record inserted successfully, record: ', resp);
      done();
      trans.end();      
    }
  });
}

const getFeed = (user, done, trans) => {
  let { user_id } = user;
  client.search({
    index: 'follows',
    q: 'follower_id:' + user_id
  }, (err, resp) => {
    if(err) { console.log(err); }
    else {
      sortFollows(resp.hits.hits, done, trans);
    }
  })
}

const sortFollows = (follows, done, trans) => {
  follows.sort((a, b) => {
    let aEngagement = parseFloat(a._source.engagement_rating);
    let bEngagement = parseFloat(b._source.engagement_rating);

    if(aEngagement - bEngagement > 0) {
      return -1;
    } else if (aEngagement - bEngagement < 0) {
      return 1;
    }
  });
  getFeedAuthors(follows, done, trans);
};

const getFeedAuthors = (follows, done, trans) => {
  let top5FollowRelationships = follows.slice(0, 5);
  let usersToBeInFeed = top5FollowRelationships.map((follow) => follow._source.followed_id);
  getTweetsForFeed(usersToBeInFeed, done, trans);
};

const getTweetsForFeed = (users, done, trans) => {
  let userIds = users.map(user=> user).join(' OR ');
  client.search({
    index: 'slimtweets',
    type: 'tweet',
    q: 'user_id: ' + userIds,
    size: 10000
  }, (err, resp) => {
    if(err) { console.log(err); }
    else {
      finalizeFeed(resp.hits.hits, done, trans)
      
    }
  })
};

const finalizeFeed = (tweets, done, trans) => {
  tweets.sort((a, b) => {
    let aTime = new Date(a._source.created_at);
    let bTime = new Date(b._source.created_at);

    if(aTime < bTime) {
      return -1;
    } else if(aTime > bTime) {
      return 1;
    }
  });

  let result = tweets.slice(0, 200);
  done();
  trans.end();
};

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