/* eslint-disable */

const jsonfile = require('jsonfile');
const faker = require('faker');
const moment = require('moment');

const timezones = ['Pacific Time', 'Mountain Time', 'Central Time', 'Eastern Time'];
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const fakeHex = () => {
  let result = '';
  for (let x = 0; x < 6; x++) {
    let randIndex = Math.floor(Math.random() * 16);
    result += hex[randIndex];
  }
  return result;
};

const fakeUser = (userID) => {
  let rand = Math.random();
  let hex = fakeHex();
  let user = {
    id: userID,
    screen_name: faker.random.word(),
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
    profile_sidebar_fill_color: hex,
    profile_sidebar_border_color: hex,
    profile_background_color: hex,
    profile_background_tile: false,
    profile_background_image_url: 'http://lorempixel.com/400/200/',
    profile_background_image_url_https: 'http://lorempixel.com/400/200/',
    profile_use_background_image: true,
    profile_image_url: 'http://lorempixel.com/400/200/',
    profile_image_url_https: 'http://lorempixel.com/400/200/',
    default_profile_image: false,
    profile_link_color: hex,
    profile_text_color: hex,
    created_at: moment(faker.date.past()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    default_profile: true,
    url: faker.internet.url(),
    contributors_enabled: false,
    favorites_count: Math.floor(rand * 500),
    statuses_count: Math.floor(rand * 800),
    friends_count: Math.floor(rand * 600),
    followers_count: Math.floor(rand * 700),
    listed_count: Math.floor(rand * 400),
    location: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    time_zone: `${timezones[Math.floor(rand * 4)]}`,
    utc_offset: (Math.floor(rand * 3 - 8) * 360),
    lang: 'en',
    protected: false,
    verified: false,
  };
  return user;
};

module.exports.fakeUser = fakeUser;