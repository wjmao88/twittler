$('#edit').click(function(){
    $('#edit').hide();
    $('#ok').show();
    $('#cancel').show();
    $('.nameField').show();
    $('.nameLabel').hide();
    $('.nameField').focus();

  });

$('#ok').click(function(){
    var msg = validateName($('.nameField').val());
    if (msg.length > 0){
      $('.nameAlert').text(msg);
    }else {
      $('.nameAlert').text('');
      changeName(true);
    }
  });

  $('#cancel').click(function(){
    changeName(false);
  });

  $('.nameField').val('Anonymous');

changeName(true);


function changeName(oked){       
  if (oked){
    $('.nameLabel').text($('.nameField').val());
  } else {
    $('.nameField').val($('.nameLabel').text());
  }
  $('#edit').show();
  $('#ok').hide();
  $('#cancel').hide();
  $('.nameField').hide();
  $('.nameLabel').show();
}

function validateName(name){
  if (name.length == 0){
    return 'name is empty!';
  }
  if (name.length > twittlerScope.nameLength){
    return 'must be less than ' + twittlerScope.nameLength + 'characters';
  }
  var arr = name.split('');
  var test = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
  for (var i = 0; i < name.length; i++){
    if (test.indexOf(name[i]) == -1){
      return 'can only contain alphanumeric';
    }
  }
  return '';
}