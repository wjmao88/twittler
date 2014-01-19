var scope = {
  throwingLog: true,
  listenerId: 0,
  settings: {
    'maxTweets': 10,
    'lastUpdatedTime': 0,
    'lastUpdatedBy': '',
    'autoUpdate': true,
    'autoInterval': 5000,
    'nameLength': 20,
  },
  newTweets: [],
  //listening
  listeners: {
    ready: [],
    preGet: [],
    get: [],
    post: [],
    tab:[]
  },
  listen: function(type, func, msg){
    if (msg){
      scope.log('======listen:' + msg);
    }
    scope.listeners[type].push(func);
  },
  broadcast: function(type){  
    scope.log('!!!!!!braodcasting ' + type);
    scope.log(scope.listeners[type].length);
    jQuery.each(scope.listeners[type], function(i, func){
      scope.log('++++++++++calling ' + func(1));
    });    
  },
  //actions
  ready: function(){
    //build
    scope.$tabs = Tabs.factory(scope);
    $('.page').append(scope.$tabs);
    //start update cycle;
    scope.log('new tweets: ' + window.streams.home.length);
    scope.get();
    setInterval(function(){
      if (scope.autoUpdate == true) {
          scope.get();
      }
    }, scope.settings.autoInterval);
  },
  post: function(user, message){
    window.visitor = user;
    writeTweet(message);
    scope.broadcast('post');
    scope.get();
  },
  get: function (){
    scope.broadcast('preGet');
    scope.newTweets = [];
    var index = streams.home.length - 1;
    while (index >= 0 && scope.isNew(streams.home[index], scope.lastTweet)){
      scope.newTweets.push(streams.home[index]);
      index -= 1;
    } 
    scope.lastTweet = scope.newTweets[0];
    scope.newTweets.reverse();
    scope.broadcast('get');
  }
};

scope.isNew = function(tweet, lastTweet){
  if (lastTweet == undefined){
    return true;
  }
  if (tweet.created_at > lastTweet.created_at){
    return true;
  }
  if (tweet.created_at == scope.lastTweet.created_at){
    if (tweet.user != scope.lastTweet.user || 
      tweet.message != scope.lastTweet.message){
      return true;
    }
  }
  return false;
};

scope.log = function(msg) {
  setTimeout(function() {
    if(scope.throwingLog) {
      throw new Error(msg);
    }
  }, 0);
}

