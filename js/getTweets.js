







function update(){
  var $newHolder = $('.newHolder');
  var $oldHolder = $('.oldHolder');
  var $archive = $('.archiveHolder');
  //update time description
  $('.tweet').each(function(){
    $($(this).children()[0]).text(timeString($($(this).children()[1]).text()));
  })
  //move former new tweets to old tweets
  while ($newHolder.children().length > 0){
    $newHolder.children().last().prependTo($oldHolder);
  }
  //move excess tweets to archive
  while ($oldHolder.children().length > twittlerScope.maxTweets){
    $archive.prepend($oldHolder.children().last());
  }
  //get new tweets
  var index = streams.home.length - 1;
  while (index >= 0 && 
          (streams.home[index].created_at > twittlerScope.lastUpdatedTime || 
            (streams.home[index].created_at == twittlerScope.lastUpdatedTime && streams.home[index].user != twittlerScope.lastUpdatedBy))) {
    $newHolder.append(makeTweet(streams.home[index]));
    if ($('.userToggle.' + streams.home[index].user).size() == 0){
      log('new user: ' + streams.home[index].user);
      var $newUser = makeUserListing(streams.home[index].user);
      $newUser.data('name', streams.home[index].user);
      $('.userList').append($newUser);
      $newUser.click(function(){
        userListingClick($(this), $('.tweet.' + $(this).data('name')))
      });
      $newUser.hover(function(){
        userListingHover($(this), true);
      },
      function(){
        userListingHover($(this), false);
      });
    }
    index -= 1;
  } 
  twittlerScope.lastUpdatedTime = streams.home[streams.home.length - 1].created_at;
  twittlerScope.lastUpdatedBy = streams.home[streams.home.length - 1].user;
}

function makeTweet(tweet){
  var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
  var tweetText = '';
  $tweet.append($('<div class="tweetTime">' + timeString(tweet.created_at.getTime())+ '</div>'));
  $tweet.append($('<div class="tweetTimeStamp hide">' + tweet.created_at.getTime() + '</div>'));
  $tweet.append($('<div class="tweetUser"><div class="newTag">*NEW*</div> from: ' + tweet.user + '</div>'));
  $tweet.append($('<div class="tweetContent">' + tweet.message + '</div>'));
  return $tweet;
}