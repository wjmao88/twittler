/*
Tweet.$tweet(tweet, scope) 
takes a tweet from stream and the main scope
create a $ object with all listeners registered

Tweet.updateAll()
update all tweets new status and time description

Tweet.toggleArchived($tweet)
Tweet.toggleStarred($tweet)

Tweet.updateTime($tweet, formatter)
recalculate the time display on $tweet using the formatter
*/

var Tweet = {};

Tweet.$tweet = function(tweet, scope){
  var $tweet = $(
    '<div class="new tweet nostar current' + tweet.user + '">' + 
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
      '<div class="buttons">' + 
        '<a href="">' + 
          '<div class="starring">Toggle Star</div>' +
        '</a>' + 
        '<a href="">' + 
          '<div class="archiving">Toggle Archive</div>' +
        '</a>' + 
      '</div>' +
    '</div>' );

  //add effects
  //go to timeline when name clicked
  $tweet.find('.name').click(function(){
    scope.displayTimeline($(this).text());
  })
  //hover over time change its format
  $tweet.find('.time').mouseenter(function(){
    Tweet.updateTime($(this), scope.timeString);
  })
  $tweet.find('.time').mouseleave(function(){
    Tweet.updateTime($(this), scope.timeAgo);
  })
  //toggle buttons
  $tweet.find('.buttons .archiving').click(function(){
    Tweet.toggleArchived($tweet, true);
  })
  $tweet.find('.buttons .archiving').click(function(){
    Tweet.toggleStarred($tweet);
  })

  scope.listen('update', function(){
    $(this).removeClass('new');
    updateTime($(this).find('.time'), timeAgo);
  });

  return $tweet;
}

Tweet.updateTime = function($time, formatter){
  $time.text(formatter($time.prop('timeStamp')));
}

Tweet.toggleArchived = function($tweet, isButton){
  if (isButton){
    $tweet.removeClass('auto manual').addClass('manual');
  } else {
    $tweet.removeClass('auto manual').addClass('auto');
  }
  if ($tweet.hasClass('current')){
    $tweet.removeClass('new current archived');.addClass('archived');
  } else {
    $tweet.removeClass('current archived').addClass('current');
  }
}

Tweet.toggleStarred = function($tweet){
  if ($tweet.hasClass('starred')){
    $tweet.removeClass('star nostar');.addClass('nostar');
  } else {
    $tweet.removeClass('star nostar');.addClass('star');
  }
}
