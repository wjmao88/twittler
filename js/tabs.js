var Tabs = {};

Tabs.factory = function(scope){
  var $tabs = $(
    '<div class="tabs">' + 
      '<div class="tabMenu">' + 
        '<a href=""><div class="select selected" type="home">Home</div></a>' +  
      '</div>' + 
      '<div class="tabHolder">' + 
      '</div>' + 
    '</div>' );

  $tabs.children('.tabHolder').append(Board.factory(scope, 'homeType', 'home'));

  //event
  $tabs.find('.tabMenu .select').click(function(){
    var user = $(this).prop('name');
    $(this).addClass('selected');
    jQuery.each($tabs.find('.tabHolder > .board'), function(i, $board){
      $board.hide();
    });

    if (user == undefined && $(this).prop('type') == 'home'){
      $board = $tabs.find('.board.homeType.home').show();
    } else {
      $board = $tabs.find('.board.timeline.' + name).show();
    }
  });

  $tabs.find('.tabMenu .select').hover(function(){
    $(this).addClass('hover');
  }, function(){
    $(this).removeClass('hover');
  });

  //listen
  scope.listen('get', function(){
    var newUsers = jQuery.map(scope.newTweets, function(tweet){
      return tweet.user;
    });
    jQuery.each(newUsers, function(i, user){
      if ($tabs.find('.board.timeline.' + user).length == 0){
        //add new board
        var $newBoard = Board.factory(scope, 'timeline', user);
        $tabs.children('.tabHolder').append($newBoard);
        $newBoard.hide();
        //add new button
        $newButton = '<a href=""><div class="select" name="' + user + '">' + user + '</div></a>'
        $tabs.children('tabMenu').append($newButton);
      }
    })
  })

}


