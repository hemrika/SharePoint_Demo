angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('meldingen', {
    url: '/Meldingen',
    templateUrl: 'templates/meldingen.html',
    controller: 'meldingenCtrl'
  })

  .state('aanmelden', {
    url: '/Aanmelden',
    templateUrl: 'templates/aanmelden.html',
    controller: 'aanmeldenCtrl'
  })

  .state('welkom', {
    url: '/Welkom',
    templateUrl: 'templates/welkom.html',
    controller: 'welkomCtrl'
  })

  .state('melding', {
    url: '/Melding',
    templateUrl: 'templates/melding.html',
    controller: 'meldingCtrl'
  })

  .state('nieuweMelding', {
    url: '/Melden',
    templateUrl: 'templates/nieuweMelding.html',
    controller: 'nieuweMeldingCtrl'
  })

$urlRouterProvider.otherwise('/Welkom')

  

});