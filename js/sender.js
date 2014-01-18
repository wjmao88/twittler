  
var Sender = {};

Sender.factory = function(scope){
  var $sender = $(
    '<div class="sender">' + 
      '<div class="profile">' + 
        '<a href=""><div class="name">Anonymous</div></a>' + 
        '<div class="editor">' + 
          '<input class="editName" type="text">' + 
          '<div class="editorCaption">1-20 Alphanumeric Characters</div>' + 
        '</div>' + 
      '</div>' + 
      '<textarea class=".draft">' + 
      '</textarea>' + 
      '<a href=""><div class="send"></div></a>' + 
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
    if (Sender.validateName(name)){
      Sender.changeMode($sender, true);
    } else {
      if (window.prompt('invalid name, discard changes?')){
        $sender.find('.name').text($sender.find('.editName').text());
        Sender.changeMode($sender, true);
      }
    }
  });

  //
  return $sender;
}

Sender.changeMode = function($sender, toEdit){
  if (toEdit){
    $sender.find('.name').hide();
    $sender.find('.editor').show();
  } else {
    $sender.find('.name').show();
    $sender.find('.editor').hide();
  }
}

Sender.doSend = function($sender, scope){
   scope.post($sender.find('.name').text(), $sender.find('.draft').text());
   $sender.find('.draft').text('');
}

Sender.validateName = function (name){
  if (name.length == 0){
    return false;
  }
  if (name.length > 20){
    return false;
  }
  var arr = name.split('');
  var allowed = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
  jQuery.each(arr, function(i, letter){
    if (allowed.indexOf(letter) == -1){
      return false;
    }
  })
  return true;
}