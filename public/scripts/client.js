/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [];

$(document).ready(function () {
  $("div.error").slideUp(1);

  //when the user clicks the Tweet button to generate a new tweet 

  
  
  $("#text-form").on("submit", function (event) {
    event.preventDefault();
    
    if (Number($("#char-counter").val()) === 140) {
      $("div.zero-char").slideDown();

      return;
    } else if (Number($("#char-counter").val()) < 0) {
      $("div.overlimit-char").slideDown();
      return;
    } else {
      const newTweet = $(this).serialize();
      $.ajax({ url: "/tweets", method: "POST", data: newTweet }).then((res) => {
        loadTweets();
      });
    }
  });

  //slide up the error message when the user starts to type
  $("#text-form").on("input", function () {
    $("div.error").slideUp();
  });


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const { avatar, profileName, text, dateCreated, name } = tweet;
    const safeHTML = `${escape(text)}`;
    let $tweet = $("<article>").addClass("tweet-box");
    let html = `<header class="profile-header">
                  <div class="profile-link">
                    <img class="profile-logo" src=${avatar}/>
                    <span class="profile-name">${name}</span>
                  </div>
                  <span class="profile-name">${profileName}</span>
                </header>
                <p>${safeHTML}</p>
                <footer class="profile-footer">
                  <span>${timeago.format(dateCreated)}</span>
                  <div class="tweet-icons">
                    <i class="fa-solid fa-flag"></i>
                    <i class="fa-solid fa-retweet"></i>
                    <i class="fa-solid fa-heart"></i>
                  </div>
                </footer>`;
    let result = $tweet.append(html);
    return result;
  };
  const renderTweets = function (tweets) {
    //makes the container empty and removes old tweets
    const container = $("#tweets-container").html("");

    for (const userData of tweets) {
      const tweetInfo = {
        name: userData.user.name,
        profileName: userData.user.handle,
        avatar: userData.user.avatars,
        dateCreated: userData.created_at,
        text: userData.content.text,
      };
      const tweetElement = createTweetElement(tweetInfo);

      container.prepend(tweetElement);
    }
    $("#tweet-text").val("");
  };

  const loadTweets = function () {
    $.ajax({ url: "/tweets", method: "GET" }).then(function (allTweets) {
      renderTweets(allTweets);
      let counter = 140;
      $("#char-counter").val(counter);
    });
  };

  loadTweets();
});
