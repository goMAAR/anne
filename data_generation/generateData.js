/* eslint-disable */
const axios = require('axios');
const jsonfile = require('jsonfile');
const { fakeUser } = require('./fakeUser.js');
const { fakeTweet } = require('./fakeTweet.js');
const { fakeFollow } = require('./fakeFollow.js');
const { client } = require('../database/db.js');
const usersFile = './users.json';
const tweetsFile = './tweets1.json';

// ========= User generator function ==========
var userRecordsInserted = 0;
var numUsersToInsert = 33333;

const generateUserArray = (startIndex = 0, arraySize = 10000) => {
  var arrayOfUsers = [];

  for(var i = 0; i < startIndex + arraySize; i++) {
    let userMetadata = {
      index: {
        _id: i
      }
    };
    let newUser = fakeUser(i);

    arrayOfUsers.push(userMetadata);
    arrayOfUsers.push(newUser);

    userRecordsInserted++;
    userRecordsInserted === numUsersToInsert ? i += arraySize : null;
  }

  return arrayOfUsers;
}

const insertUsersIntoDatabase = (arrayOfUsers) => {
  client.bulk({
    index: 'users',
    type: 'user',
    body: arrayOfUsers
  }, (err, resp) => {
    if(err) { console.log(err); }
    if (userRecordsInserted !== numUsersToInsert) {
      setTimeout(makeUsersAndInsertIntoDatabase);
    } else {
      setTimeout(() => console.log('COMPLETE!!!!'));
    }

    userRecordsInserted % 10000 === 0 ? console.log(userRecordsInserted) : null;
  }); 
};

const makeUsersAndInsertIntoDatabase = () => {
  let users = generateUserArray(userRecordsInserted);
  insertUsersIntoDatabase(users);
}

const generateUsers = (userQty = 33333) => {
  for(var i = 0; i < userQty; i++) {
    let userMetadata = {
      index: {
        _id: i
      }
    };
    let newUser = fakeUser(i);
    jsonfile.writeFileSync(usersFile, userMetadata, { spaces:0, EOL: '\r\n', flag: 'a'});
    jsonfile.writeFileSync(usersFile, newUser, { spaces: 0, EOL: '\r\n', flag: 'a'}, (err) => {
      if(err) { console.log(err)}
    });

    i % 5000 === 0 ? console.log('inserting user with id', i) : null;
  }
}


// ======== Tweet generator functions ==========
var tweetRecordsInserted = 0; // starts the id's at 0, incremented each record, everything stops once it equals numTweetsToInsert
var numTweetsToInsert =  6666600; // set max number of tweets you want to insert

const generateTweetArray = (startIndex = 0, arraySize = 10000) => {
  var arrayOfTweets = [];

  for(var i = startIndex; i < startIndex + arraySize; i++) {
    let tweetMetaData = {
      index: {
        _id: i
      }
    };

    let newTweet = fakeTweet(i);

    arrayOfTweets.push(tweetMetaData);
    arrayOfTweets.push(newTweet);

    tweetRecordsInserted++;
    tweetRecordsInserted === numTweetsToInsert ? i += arraySize : null;
  }

  return arrayOfTweets;
};

const insertTweetsIntoDatabase = (arrayOfTweets) => {
  client.bulk({
    index: 'tweets',
    type: 'tweet',
    body: arrayOfTweets
  }, (err, resp) => {
    if(err) { console.log(err); }
    if (tweetRecordsInserted !== numTweetsToInsert) {
      setTimeout(makeTweetsAndInsertIntoDatabase);
    } else {
      setTimeout(() => console.log('COMPLETE!!!!'));
    }

    tweetRecordsInserted % 10000 === 0 ? console.log(tweetRecordsInserted) : null;
  }); 
};

const makeTweetsAndInsertIntoDatabase = () => {
  let tweets = generateTweetArray(tweetRecordsInserted);
  insertTweetsIntoDatabase(tweets);
}

// ===== Follow generator functions ======
var followRecordsInserted = 0;
var numFollowsToInsert = 3333300;

const generateFollowsArray = (startIndex = 0, arraySize = 10000) => {
  var arrayOfFollows = [];
  for(var i = startIndex; i < startIndex + arraySize; i++) {
    let followMetaData = {
      index: {
        _id: i
      }
    };

    let newFollow = fakeFollow(i);

    arrayOfFollows.push(followMetaData);
    arrayOfFollows.push(newFollow);

    followRecordsInserted++;
    followRecordsInserted === numFollowsToInsert ? i += arraySize : null;
  }
  return arrayOfFollows;
}

const insertFollowsIntoDatabase = (arrayOfFollows) => {
  client.bulk({
    index: 'follows',
    type: 'follow',
    body: arrayOfFollows
  }, (err, resp) => {
    if(err) { console.log(err); }
    if(followRecordsInserted !== numFollowsToInsert) {
      setTimeout(makeFollowsAndInsertIntoDatabase);
    } else {
      setTimeout(()=> console.log('COMPLETE!!!!'));
    }

    followRecordsInserted % 10000 === 0 ? console.log(followRecordsInserted) : null;
  });
};

const makeFollowsAndInsertIntoDatabase = () => {
  let follows = generateFollowsArray(followRecordsInserted);
  insertFollowsIntoDatabase(follows);
};

// ====== Inserts new follow records into the database =====
// makeFollowsAndInsertIntoDatabase();

// ====== Inserts new tweet records into the database ====== //
// makeTweetsAndInsertIntoDatabase();

// ====== Generate a users.json file, insert using curl command (< 100,000 users)======
// curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/users/user/_bulk?pretty' --data-binary @users.json
// generateUsers(); // default is 33,333, pass in value to be more specific if desired, larger quantities

// ====== Generate users (> 100,000) with script (modify config vars above functions) =========
// makeUsersAndInsertIntoDatabase();

