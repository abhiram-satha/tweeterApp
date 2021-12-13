/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  const renderTweets = function(tweets) {
      for (const userData of tweets) {
        const tweetInfo = {
          name: userData.user.name,
          profileName: userData.user.handle,
          avatar: userData.user.avatars,
          dateCreated: userData.created_at,
          tweet: userData.content.text,

        }
        $('#tweets-container').append(createTweetElement(tweetInfo));
      }
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const createTweetElement = function(tweet) {
      let $tweet = `<article class="tweet-box">
      <header class="profile-header">
        <div class="profile-link">
          <img class="profile-logo" src=${tweet.avatar}/>
          <span class="profile-name">${tweet.name}</span>
        </div>
        <span class="profile-name">${tweet.profileName}</span>
      </header>
      <p>${tweet.tweet}</p>
      <footer class="profile-footer">
          <span>${tweet.dateCreated}</span>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>

    </article>`
    /* Your code for creating the tweet element */
      // ...
      return $tweet;
    }
    
    renderTweets(data);
})

