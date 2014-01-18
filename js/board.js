/*

add tweets to board when first created
show and hide archived tweets

*/

var Board = {};

Board.factory = function(type, name){
  var $board = $(
    '<div class="board ' + type + ' ' + name + '">' + 
      '<div class="settings">' +
        '<input class="maxTweets" type="text" value="10">' + 
        '<input class="showArchived" type="checkbox" value="Show Archived">' + 
      '</div>' + 
    '</div>' );

  //effects
  $board.find('.showArchived').change(function(){
    if ($(this).is('checked')){
      Board.viewArchive($board, true);
    } else {
      Board.viewArchive($board, false);
    }
  })
  $board.find('.maxTweets').blur(function()){
    Board.updateArchive($board);
  }

  //
  scope.listen('update', function(){
    $board = $(this);
    for (var i = 0; i < scope.newTweets.length; i++){
      if ($board.hasClass('home') || $board.hasClass(newTweets[i].user)){
        $board.prepend(Tweet.factory(newTweets[i], scope));
      }
    }
    Board.updateArchive($board);
  })

  return $board;
}

Tweet.updateArchive = function ($board){
  $board.find('.tweet.current').slice($board.find('.maxTweets').prop('value')).each(function(){
    var $this = $(this);
    if (! $this.hasClass('new')){
      toggleArchived($this);
    }
  });
}
