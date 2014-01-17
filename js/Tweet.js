/*
Tweet.$tweet(tweet, scope) 
takes a tweet from stream and the main scope
create a $ object with all listeners registered

Tweet.unmarkNew($tweet)
remove new tweet status from $tweet

Tweet.setArchived($tweet)
make $tweet be treated as archived 

Tweet.unArchived($tweet)
revese the archived status

Tweet.updateTimeAgo($tweet)
recalculate the time ago display on $tweet
*/

var Tweet = {};

Tweet.$tweet = function(tweet, scope){
  var $tweet = $(
    '<div class="new tweet current' + tweet.user + '">' + 
      '<div class="title">' +
        '<div class="time" timeStamp="'+ tweet.created_at.getTime()  + '">' + 
            scope.timeAgo(tweet.created_at.getTime()) +
        '</div>' +
        '<a href="">' + 
          '<div class="name">' + 
            tweet.user + 
          '</div>' + 
        '</a>' +
      '</div>' +
      '<div class="message">' + 
        tweet.message + 
      '</div>' +
      '<a href="">' +
        '<div class="buttons">' + 
          '<div class="archiving">Toggle Archive</div>' +
        '</div>' +
      '</a>' +
    '</div>' );

  //add effects
  //go to timeline when name clicked
  $tweet.find('.name').click(function(){
    scope.displayTimeline($(this).text());
  })
  //hover over time change its format
  $tweet.find('.time').mouseenter(function(){
    Tweet.displayTime($(this), scope.timeString);
  })
  $tweet.find('.time').mouseleave(function(){
    Tweet.displayTime($(this), scope.timeAgo);
  })
  //click button to mark as archive
  $tweet.find('.buttons .archiving').click(function(){
    Tweet.setArchived($tweet);
  })

  return $tweet;
}

Tweet.unmarkNew = function ($tweet){
  $tweet.removeClass('new');
}

Tweet.updateTimeAgo = function($tweet){
  $time = $tweet.find('.time')
  displayTime($time, timeAgo);
}

Tweet.displayTime = function($time, formatter){
  $time.text(formatter($time.prop('timeStamp')));
}

Tweet.setArchived = function($tweet, isAuto){
  $tweet.addClass('archived');
  if (isAuto){
    $tweet.addClass('auto');
  }
  $tweet.removeClass('current');
  $tweet.removeClass('new');
}

Tweet.unArchived = function($tweet){
  $tweet.addClass('current');
  $tweet.removeClass('archived');
  $tweet.removeClass('auto');
}
