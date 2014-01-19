var Board = {};
Board.factory = function(scope, type, name){
  var $board = $(
    '<div class="board ' + type + ' ' + name + '" + type="' + type + '">' + 
      '<div class="boardTitle">' + 
        '<div class="title">' + name + '</div>' +
        '<div class="settings">' +
          '<div class="label">Max tweets: </div>' + 
          '<input class="maxTweets" type="text" value="10">' + 
          '<div class="label">Show Archived</div>' + 
          '<input class="showArchived" type="checkbox">' + 
        '</div>' + 
      '</div>' + 
    '</div>' );


  $board.prepend($());

  if (type == 'homeType'){
    $board.children().first().prepend(Sender.factory(scope));
    scope.temp = $board;
  } 

  //effects
  $board.find('.showArchived').change(function(){
    $board.find('.tweet.archived').toggle($(this).prop('checked'));
  });
  $board.find('.maxTweets').blur(function(){
    scope.log('new max tweets: ' + $(this).val() + ' ' + $(this).attr('value'));
    //$(this).attr('value', $(this).val());
    scope.log('new max tweets: ' + $(this).val() + ' ' + $(this).attr('value'));
    Board.autoArchive($board);
  });

  //
  scope.listen('get', function(){
    Board.getTweets ($board, type, name);
  }, 'board ' + type + ' ' + name);
  Board.getTweets ($board, type, name);

  return $board;
}

Board.getTweets = function ($board, type, name){
  for (var i = 0; i < scope.newTweets.length; i++){
    scope.log(name + ' board try to add tweet by ' + scope.newTweets[i].user);
    if (type == 'homeType' || $board.hasClass(scope.newTweets[i].user)){
      $board.children().first().after(Tweet.factory(scope, scope.newTweets[i]));
    }
  }
  Board.autoArchive($board);
}

Board.autoArchive = function ($board){
  var currentNum = $board.find('.tweet.current.nostar').length;
  var maxTweets = $board.find('.maxTweets').val();
  scope.log('get to ' + maxTweets + ' tweets, has ' + currentNum);
  if (currentNum > maxTweets) { //put into archive
    scope.log('kill');
    $($board.find('.tweet.current.nostar').slice(maxTweets)).each(function(i, tweet){
      if (! $(tweet).hasClass('new')){
        Tweet.toggleArchived($(tweet));
        $(tweet).hide();
      }
    });
  } else { //bring back from archive
    scope.log('revive');
    $archives = $board.find('.tweet.archived.auto');
    scope.log('archive size: ' + $archives.length);
    $($archives.slice(0, maxTweets - currentNum)).each(function(i, tweet){
      scope.log('reviving' + i);
      Tweet.toggleArchived($(tweet));
      $(tweet).show();
    });
  }
}