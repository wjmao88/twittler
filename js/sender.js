  
var Sender = {};

Sender.factory = function(scope){
  var $sender = $(
    '<div class="sender">' + 
      '<div class="profile">' + 
        '<div class="label">Send As (click name to change)</div>' + 
        '<div class="name button">Anonymous</div>' + 
        '<div class="editor">' + 
          '<input class="editName" type="text" value="Anonymous">' + 
          '<div class="label">1-20 Alphanumeric Characters</div>' + 
        '</div>' + 
      '</div>' + 
      '<textarea class="draft">' + 
      '</textarea>' + 
      '<div class="send button">Click or Ctrl+Enter to Send</div>' + 
    '</div>' 
    );

  $sender.find('.editor').hide();

  //sending
  $sender.find('.draft').keypress(function(key){
    if (key.which == 10 && key.ctrlKey){
      Sender.doSend($sender, scope);
    }
  });
  $sender.find('.send').click(function(){
    Sender.doSend($sender, scope);
  });

  //change name
  $sender.find('.name').click(function(){
    Sender.changeMode($sender, true);
  })

  $sender.find('.editName').blur(function(){
    if (Sender.validateName($(this).val())){
      $sender.find('.name').text($(this).val());
      Sender.changeMode($sender, false);
    } else {
      if (window.confirm('invalid name, discard changes?')){
        Sender.changeMode($sender, false);
      }
    }
  });
  //
  return $sender;
}

Sender.changeMode = function($sender, toEdit){
  if (toEdit){
    scope.log('edit mode');
    $sender.find('.name').hide();
    $sender.find('.editor').show();
    $sender.find('.editor').val($sender.find('.name').text());
  } else {
    scope.log('display mode');
    $sender.find('.name').show();
    $sender.find('.editor').hide();
    $sender.find('.editor').val($sender.find('.name').text());
  }
}

Sender.doSend = function($sender, scope){
   scope.post($sender.find('.name').text(), $sender.find('.draft').val());
   $sender.find('.draft').val('');
}

Sender.validateName = function (name){
  scope.log(name);
  if (name.length == 0){
    scope.log('too short');
    return false;
  }
  if (name.length > 20){
    scope.log('too long');
    return false;
  }
  var arr = name.split('');
  var allowed = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
  jQuery.each(arr, function(i, letter){
    if (allowed.indexOf(letter) == -1){
      scope.log(letter +' is not allowed');
      return false;
    }
  })
  scope.log('good name');
  return true;
}