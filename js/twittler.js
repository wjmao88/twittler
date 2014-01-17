var scope = {
  'maxTweets': 10;
  'lastUpdatedTime': 0;
  'lastUpdatedBy': '';
  'users': [];
  'autoInterval': 5000;
  'nameLength': 20;
  'ready': [];
  'addReadyFunction': function(func){
    scope.ready.push(func);
  }
};

$(document).ready(function(){
  log('start calling all ready functions');
  for (var i=0; i<scope.ready.length; i++){
    scope.ready[i].apply(null);
  }
  log('auto start');
  setTimeout(function(){
    update()
  }, twittlerScope.autoInterval);
  setInterval(function(){
    update();
  }, twittlerScope.autoInterval);
});
