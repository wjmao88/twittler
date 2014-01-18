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

Tabs.changeTab = function(user, type, $tabs){
  scope.log('change tab to ' + type + ' ' + user);
  $tabs.find('.tabHolder > .board').hide();
  if (type == 'homeType'){
    $tabs.find('.board.homeType.home').show();
  } else {
    $tabs.find('.board.timeline.' + user).show();
  }
}

Tabs.buttonFactory = function(user, type, $tabs){
  $button = $(
    '<div class="select name button" name="' + user + '" type="' + type + '">' + 
      user.slice(0, 10) + 
    '</div>');

  $button.click(function(){
    $button.addClass('selected');
    Tabs.changeTab($button.attr('name'), $button.attr('type'), $tabs);
  });

  $button.hover(function(){
    $button.addClass('hover');
    $button.text($button.attr('name'));
  }, function(){
    $button.removeClass('hover');
    $button.text($button.attr('name').slice(0, 10));
  });

  return $button;
};
