
  //tabs
  $('.tabItem').click(function(){
    //tab buttons
    $('.tabItem').removeClass('activeTab');
    $(this).addClass('activeTab');
    //tab 
    $('.tab').hide();
    $('.tab.' + $(this).data('tab')).show();
  });

 $('.userToggle.allUser').click(function(){
    userListingClick($('.userToggle'), $('.tweet'));
  }).hover(function(){
    userListingHover($(this), true);
  },
  function(){
    userListingHover($(this), false);
  });

     //tabs
  $('.tab').hide();
  $('.currentTab').show();
  $('.tabItem.current').addClass('activeTab');

    //itab buttons settings 
  $('.tabItem.current').data('tab', 'currentTab');
  $('.tabItem.archive').data('tab', 'archiveTab');


/*
* $user: the user that was clicked
* $tweets: the list of tweets to show or hide
*/
function userListingClick($users, $tweets){
  $users.toggleClass('toggleShow', !$users.first().hasClass('toggleShow'));
  $users.toggleClass('toggleHide', !$users.first().hasClass('toggleHide'));
  log($users.size() + '|' + $users.hasClass('toggleShow'));
  if ($users.first().hasClass('toggleShow')) {
    $tweets.show();
  } else {
    $tweets.hide();
  }
}

function userListingHover ($user, isHover){
  if (isHover){
    $user.addClass('hover');
  } else {
    $user.removeClass('hover');
  }
}

function makeUserListing(username){
  return ($('<div class="userToggle ' + username + ' toggleShow">' + username + '</div>'));
}