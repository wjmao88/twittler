var Tweet = {};

Tweet.factory = function(scope, tweet){
  var $tweet = $(
    '<div class="new tweet nostar current' + tweet.user + '">' + 
      '<div class="title">' +
        '<div class="time" timeStamp="'+ tweet.created_at.getTime()  + '">' + 
            Tweet.timeAgo(tweet.created_at.getTime()) +
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
    scope.displayTimeline($(this).text()); //scope function
  })
  //hover over time change its format
  $tweet.find('.time').mouseenter(function(){
    Tweet.updateTime($(this), Tweet.timeString);
  })
  $tweet.find('.time').mouseleave(function(){
    Tweet.updateTime($(this), Tweet.timeAgo);
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

Tweet.timeAgo = function (time){
  var time = Date.now() - time;
  var str = ' ago.'
  if (time < 60000) {
    return 'a few seconds ago';
  }
  if (time/60000 >= 1){
    str = Math.floor(time/60000) + ((Math.floor(time/60000) == 1)? ' minute' : ' minutes');
  }
  if (time/3600000 >= 1){
    str = Math.floor(time/3600000) + ((Math.floor(time/3600000)) == 1? ' hour' : ' hours');
  }
  if (time/(3600000 * 24) >= 1){
    str = Math.floor(time/(3600000 * 24)) + ((Math.floor(time/(3600000 * 24)) == 1)? ' day' : ' days');
  }
  return str + ' ago';
}

Tweet.timeString = function (time){
  return (new Date(time)).toString();
}