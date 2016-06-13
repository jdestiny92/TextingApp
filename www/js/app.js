// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module("starter", ["ionic",'ionic.service.core', "firebase"]);  


app.controller('AppCtrl', function($scope, $ionicModal, $firebaseArray) {
  
  var ref = new Firebase('https://juliansfirstapp.firebaseio.com/');
  
  $scope.records = $firebaseArray(ref);

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.sendMessage = function(u) {        
    $scope.records.$add({ Name: u.userName, Message: u.userMessage, Time: new Date().getTime() });
    $scope.modal.hide();
    u.userMessage = '';
  };

  $scope.emptyChat = function() {
    ref.remove();
  };

   

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
