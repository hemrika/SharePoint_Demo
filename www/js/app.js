// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('rapporteren', ['ionic', /*'ionic.service.core', 'ionic.service.analytics',*/ 'rapporteren.controllers', 'rapporteren.routes', 'rapporteren.services', 'rapporteren.directives', 'ngSharePoint', 'ngCordova']) /* , 'ionic-native-transitions'])*/

.run(function($ionicPlatform, /*$ionicAnalytics,*/ SharePoint) {
  $ionicPlatform.ready(function() {

    /*
    try {
      $ionicAnalytics.register();
    }
    catch (error) {
      console.log(error);
    }

    $ionicAnalytics.setGlobalProperties({
      app_version_number: 'v0.0.0.1',
      day_of_week: (new Date()).getDay()
    });
    */
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //ionic.Platform.fullscreen();

    SharePoint.EndPoint("duwboot.sharepoint.com/sites/BLAUD/Demo");
  });
});
