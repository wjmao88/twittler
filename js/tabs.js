var Tabs = {};

Tabs.factory = function(scope){
  var $tabs = $(
    '<div class="tabs">' + 
      '<div class="tabMenu">' + 
      '</div>' + 
      '<div class="tabHolder">' + 
      '</div>' + 
    '</div>' );

  $tabs.children('.tabHolder').append(Board.factory(scope, 'homeType', 'home'));
  $tabs.children('.tabMenu').append(Tabs.buttonFactory('Home', 'homeType', $tabs));

  //listen
  scope.listen('get', function(){
    scope.log('add new users');
    var newUsers = jQuery.map(scope.newTweets, function(tweet){
      return tweet.user;
    });
    jQuery.each(newUsers, function(i, user){
      if ($tabs.find('.board.timeline.' + user).length == 0){
        scope.log('new user: ' + user);
        var $newBoard = Board.factory(scope, 'timeline', user);
        $tabs.children('.tabHolder').append($newBoard);
        $newBoard.hide();
        $tabs.children('.tabMenu').append(Tabs.buttonFactory(user, 'timeline', $tabs));
      }
    });
  });
  //
  return $tabs;
};

Tabs.buttonFactory = function(user, type, $tabs){
  $button = $('<div class="select button" name="' + user + '" type="' + type + '">' + user + '</div>');

  $button.click(function(){
    var user = $(this).attr('name');
    var type = $(this).attr('type')
    scope.log('change to ' + type + ' ' + user);
    $(this).addClass('selected');

    $tabs.find('.tabHolder > .board').hide();
    if ($(this).attr('type') == 'homeType'){
      scope.temp = $tabs;
      $tabs.find('.board.homeType.home').show();
    } else {
      $tabs.find('.board.timeline.' + user).show();
    }
  });

  $button.hover(function(){
    $(this).addClass('hover');
  }, function(){
    $(this).removeClass('hover');
  });

  return $button;
};
