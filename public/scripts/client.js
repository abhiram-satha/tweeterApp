/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [];

$(document).ready(function () {
  const renderTweets = function (tweets) {
    for (const userData of tweets) {
      const tweetInfo = {
        name: userData.user.name,
        profileName: userData.user.handle,
        avatar: userData.user.avatars,
        dateCreated: userData.created_at,
        text: userData.content.text,
      };
      $("#tweets-container").append(createTweetElement(tweetInfo));
    }
  };
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const createTweetElement = function (tweet) {
    const { avatar, profileName, text, dateCreated, name } = tweet;
    let $tweet = `<article class="tweet-box">
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
      </article>`;
    /* Your code for creating the tweet element */
    // ...
    return $tweet;
  };

  //renderTweets(data);

  //const $form = $("form");

  // $form.on('submit', function () {

  //   event.preventDefault();
  //   const newTweet = $(this).serialize();

  //   $.post('/tweets', newTweet, function(event) {

  //   })
  // })

  // const loadTweets = $(function() {
  //   const $button = $('.tweet-button');
  //   $button.on('click', function() {
  //     $.ajax('/tweets', {method: 'GET'})
  //     .then(function (morePostsHtml) {
  //       renderTweets(morePostsHtml);
  //     })
  //   })
  // })

  // renderTweets();

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (morePostsHtml) {
      console.log(morePostsHtml);
      renderTweets(morePostsHtml);
    });
  };
  loadTweets();
  $('#text-form').on("submit", function (event) {
      event.preventDefault();
      if (Number($("#char-counter").val()) === 140 || $("#char-counter").val().serialize() === null) {
      alert("Nothing to tweet");
      return;
    } else if (Number($("#char-counter").val()) < 0) {
      alert("Exceeded our tweet limit")
      return;
    } else {
      const newTweet = $(this).serialize();

      $.post("/tweets", newTweet, function (event) {
        console.log(newTweet);
      });
    }
  });
});
