var Board = {};

Board.factory = function(scope, type, name){
  var $board = $(
    '<div class="board ' + type + ' ' + name + '">' + 
      '<div class="settings">' +
        '<input class="maxTweets" type="text" value="10">' + 
        '<input class="showArchived" type="checkbox" value="Show Archived">' + 
      '</div>' + 
    '</div>' );

  if (type == 'homeType'){
    $board.prepend(Sender.factory(scope));
  }

  //effects
  $board.find('.showArchived').change(function(){
    if ($(this).is('checked')){
      Board.viewArchive($board, true);
    } else {
      Board.viewArchive($board, false);
    }
  });
  $board.find('.maxTweets').blur(function(){
    Board.updateArchive($board);
  });

  //
  scope.listen('get', function(){
    $board = $(this);
    for (var i = 0; i < scope.newTweets.length; i++){
      if (Board.isHomeBoard($board) || $board.hasClass(scope.newTweets[i].user)){
        $board.prepend(Tweet.factory(scope, scope.newTweets[i]));
      }
    }
    Board.updateArchive($board);
  });

  return $board;
}

Board.updateArchive = function ($board){
  $board.find('.tweet.current').slice($board.find('.maxTweets').prop('value')).each(function(){
    var $this = $(this);
    if (! $this.hasClass('new')){
      toggleArchived($this);
    }
  });
}

Board.isHomeBoard = function($board){
  return $board.hasClass('homeType') && $board.hasClass('home') && ! $board.hasClass('timeline');
}
