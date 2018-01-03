/* eslint-disable */

const fakeFollow = (followID) => {
  let rand1 = Math.random();
  let rand2 = Math.random();
  let follow = {
  	id: followID,
    follower_id: Math.floor(rand1 * 33333),
    followed_id: Math.floor(rand2 * 33333),
    followed_influencer_ratio: Math.random().toFixed(2)
  }

  return follow;
};

module.exports.fakeFollow = fakeFollow;