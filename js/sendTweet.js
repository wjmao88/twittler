  $('.draft').keypress(function(key){
    if (key.which == 10 && key.ctrlKey){
      doSend();
    }
  })

  $('#send').click(function(){
    doSend();
    update();
  })






function doSend(){
  window.visitor =  $('.nameLabel').text();
  writeTweet($('.draft').val());
  $('.draft').val('');
}