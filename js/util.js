function log(msg) {
  setTimeout(function() {
    if(true) {
      throw new Error(msg);
    }
  }, 0);
}


function timeString(time){
  var time = Date.now() - time;
  var str = ' ago.'
  log(time + ' ' +  time/60000  + ' ' +  time/3600000 + ' ' + time/(3600000 * 24));
  if (time < 60000) {
    return 'a few seconds ago';
  }
  if (time/60000 >= 1){
    str = Math.floor(time/60000) + ((Math.floor(time/60000) == 1)? ' minute' : ' minutes') + str;
  }
  if (time/3600000 >= 1){
    str = Math.floor(time/3600000) + ((Math.floor(time/3600000)) == 1? ' hour' : ' hours') + str;
  }
  if (time/(3600000 * 24) >= 1){
    str = Math.floor(time/(3600000 * 24)) + ((Math.floor(time/(3600000 * 24)) == 1)? ' day' : ' days') + str;
  }
  return str;
}