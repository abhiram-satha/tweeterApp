/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
]

$(document).ready(function() {
  const renderTweets = function(tweets) {
      for (const userData of tweets) {
        const tweetInfo = {
          name: userData.user.name,
          profileName: userData.user.handle,
          avatar: userData.user.avatars,
          dateCreated: userData.created_at,
          text: userData.content.text,

        }
        $('#tweets-container').append(createTweetElement(tweetInfo));
      }
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const createTweetElement = function(tweet) {
      const {avatar, profileName, text, dateCreated, name} = tweet
      let $tweet = 
      `<article class="tweet-box">
        <header class="profile-header">
          <div class="profile-link">
            <img class="profile-logo" src=${avatar}/>
            <span class="profile-name">${name}</span>
          </div>
          <span class="profile-name">${profileName}</span>
        </header>
        <p>${text}</p>
        <footer class="profile-footer">
          <span>${timeago.format(dateCreated)}</span>
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

    const $form = $('form')
    $form.on('submit', function () {
      const newTweet = $(this).serialize();
      event.preventDefault();

      $.post('/tweets', newTweet, function(event) {
        console.log(newTweet);

        
      })
    })

    const loadTweets = $(function() {
      const $button = $('.tweet-button');
      $button.on('click', function() {
        $.ajax('/tweets', {method: 'GET'})
        .then(function (morePostsHtml) {
          console.log(morePostsHtml);
          renderTweets(morePostsHtml);
        })
      })
    })
    //renderTweets(loadTweets())
})

