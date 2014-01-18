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
    Board.viewArchive($board, $(this).prop('checked'));
  });
  $board.find('.maxTweets').blur(function(){
    scope.log('new max tweets: ' + $(this).val());
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
      scope.log('add tweet by ' + scope.newTweets[i].user);
      $board.children().first().after(Tweet.factory(scope, scope.newTweets[i]));
    }
  }
  Board.autoArchive($board);
}

Board.autoArchive = function ($board){
  scope.log('auto archive on limit: ' + $board.find('.maxTweets').val());
  $board.find('.tweet.current.nostar').slice($board.find('.maxTweets').val()).each(function(){
    var $this = $(this);
    if (! $this.hasClass('new')){
      toggleArchived($this);
    }
  });
  Board.viewArchive($board);
}

Board.viewArchive = function($board, show){
  show = show == undefined? $board.find('.showArchived').prop('checked') : show;
  $board.find('.tweet.archived').toggle(show);
}