angular.module('rapporteren.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      .state('Welkom', {
          url: '/Welkom',
          templateUrl: 'templates/Welkom.html',
          controller: 'WelkomCtrl'
      })

      .state('Aanmelden', {
          url: '/Aanmelden',
          templateUrl: 'templates/Aanmelden.html',
          controller: 'AanmeldenCtrl'
      })

      .state('Meldingen', {
        url: '/Meldingen',
        templateUrl: 'templates/Meldingen.html',
        controller: 'MeldingenCtrl'
      })

      .state('Melding', {
          url: '/Melding/:ItemId',
          templateUrl: 'templates/Melding.html',
          controller: 'MeldingCtrl'
      })

      .state('CreateMelding', {
        url: '/MeldingCreate',
        templateUrl: 'templates/MeldingCreate.html',
        controller: 'MeldingBewerkenCtrl'
      })

      .state('ModifyMelding', {
        url: '/MeldingModify/:ItemId',
        templateUrl: 'templates/MeldingModify.html',
        controller: 'MeldingBewerkenCtrl'
      })

  $urlRouterProvider.otherwise('/Welkom');

});
