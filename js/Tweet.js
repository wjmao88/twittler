var Tweet = {};

Tweet.factory = function(scope, tweet){
  var $tweet = $(
    '<div class="new tweet nostar current ' + tweet.user + '">' + 
      '<div class="title">' +
        '<div class="name button">' + 
          tweet.user + 
        '</div>' + 
         '<div class="time" timeStamp="'+ tweet.created_at.getTime()  + '">' + 
            Tweet.timeAgo(tweet.created_at.getTime()) +
        '</div>' +
      '</div>' +
      '<div class="message">' + 
        tweet.message + 
      '</div>' +
      '<div class="buttons">' + 
        '<div class="starring button">Star</div>' +
        '<div class="archiving button">Archive</div>' +
      '</div>' +
    '</div>' );

  //add effects
  //go to timeline when name clicked
  $tweet.find('.name').click(function(){
    Tabs.changeTab($(this).text(), 'timeLine', scope.$tabs); //outside function
  })
  //hover over time change its format
  $tweet.find('.time').hover(function(){
    Tweet.updateTime($(this), Tweet.timeString);
  }, function(){
    Tweet.updateTime($(this), Tweet.timeAgo);
  });
  //toggle buttons
  $tweet.find('.buttons .archiving').click(function(){
    Tweet.toggleArchived($tweet, true);
  })
  $tweet.find('.buttons .starring').click(function(){
    Tweet.toggleStar($tweet);
  })

  var id = scope.listenerId++;
  scope.listen('preGet', function(){
    $tweet.removeClass('new');
    Tweet.updateTime($tweet.find('.time'), Tweet.timeAgo);
  });

  return $tweet;
}

Tweet.updateTime = function($time, formatter){
  $time.text(formatter($time.attr('timeStamp')));
}

Tweet.toggleArchived = function($tweet, isButton){
  if (isButton){
    $tweet.removeClass('auto manual').addClass('manual');
  } else {
    $tweet.removeClass('auto manual').addClass('auto');
  }
  if ($tweet.hasClass('current')){
    $tweet.removeClass('new current archived').addClass('archived');
  } else {
    $tweet.removeClass('current archived').addClass('current');
  }
}

Tweet.toggleStar = function($tweet){
  if ($tweet.hasClass('star')){
    $tweet.removeClass('star nostar').addClass('nostar');
  } else {
    $tweet.removeClass('star nostar').addClass('star');
    $tweet.removeClass('current archived').addClass('current');
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
  return (new Date(parseInt(time))).toString().slice(0, 24);
}