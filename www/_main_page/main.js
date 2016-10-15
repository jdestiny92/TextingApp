// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module("starter", ["ionic",'ionic.service.core', "firebase", "ngSanitize"]);  

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.controller('AppCtrl', function($scope, $ionicModal, $firebaseArray, $http, $ionicSideMenuDelegate, $sce, $ionicPopup) {
  
  $scope.nickname;
  var ref = new Firebase('https://juliansfirstapp.firebaseio.com/');
  
  $scope.records = $firebaseArray(ref);

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal3.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal4.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal4 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal5.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal5 = modal;
  });

  $scope.retrieve = function() {
    $http({
      method: 'GET',
      url: '/retrieve'
    }).then(function successCallback(response) {
        //console.log(response);
        $scope.nickname = response.data;
        $scope.username = $scope.nickname;
        //console.log($scope.nickname);
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.toggleLeft = function(){
  	$ionicSideMenuDelegate.toggleLeft();
  }

  $scope.sendMessage = function(keyWord, message, title){

  if(keyWord){
    keyWord = keyWord.toString();
    console.log('key word is ' + keyWord);
  }
  if(message){
    message = message.toString();
    console.log('message is ' + message);
  }
  if(title){
    title = title.toString();
    console.log('title is ' + title);
  }

  if(keyWord == 'text'){
      var name = $('.tag').val();
      $scope.records.$add({ Name: name, Message: message, Time: new Date().getTime() });
      $scope.modal.hide();
      message = '';
  }
  else if(keyWord == 'gif'){
    var name = $('.tag').val();
  
      $.ajax({url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + message, method: 'GET'})
      .done(function(response) {
        var randomImage = response.data.fixed_width_downsampled_url;
        var picture = '<img src="' + randomImage + '" />';
        $scope.records.$add({ Name: name, Picture: picture, Time: new Date().getTime() });
      });        
      
      $scope.modal2.hide();
      message = '';
  }
  else if(keyWord == 'link'){
    var name = $('.tag').val();
    var search = '<a href="' + message + '" target="_blank">' + title + '</a>';
    //var tag = '<p ng-bind-html="' + search;
    $scope.records.$add({ Name: name, link: search, Time: new Date().getTime() });
    $scope.modal4.hide();
    message = '';
    title = '';
  }
  else if(keyWord == 'picture'){
    var name = $('.tag').val();
    var picture = '<img src="' + message + '" />';
    $scope.records.$add({ Name: name, Picture: picture, Time: new Date().getTime() });
    $scope.modal3.hide();
    message = '';
  }
  else if(keyWord == 'video'){
    var name = $('.tag').val();
    //message = message.toString();
    var body = 'https://youtube.com/embed/';
    var count = message.length;
    message = message.slice(count - 11, count);
    message = body + message;
    //message = message.replace("watch?v=", "embed/");
    var tag = '<iframe src="' + message + '"></iframe>';
    console.log(tag);
    $scope.records.$add({ Name: name, video: tag, Time: new Date().getTime() });
    $scope.modal5.hide();
    message = '';
  }
  else if(keyWord == 'empty'){
    $ionicPopup.confirm({
       title: 'Clear Confirmation',
       template: 'Are you sure you want to completely clear the chat?'
     }).then(function(res){
      if(res){
        ref.remove();
        return;
      }
      else{
        return;
      }
     })
    
  }
  else{
    location.href = '/';
    //alert('there is an error...');
  }

}

$scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
}

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
