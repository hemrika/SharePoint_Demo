angular.module('rapporteren.controllers', [])

.controller('meldingenCtrl', function($scope, $state, SharePoint) {

  var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
  //if(SharePoint.Security.Authenticated) {
  if(auth) {
      try
      {
        SharePoint.CurrentList().Items().then(function(Items){

        });
      }
    catch(error)
    {
      console.log(error);
    }
  }
  else {
    $state.go('aanmelden', {}, {reload: true});
  }
})

.controller('aanmeldenCtrl', function($scope, $state, SharePoint) {

  $scope.loginData = {};

  $scope.Authenticate = function () {
    var domain = SharePoint.Security.Endpoint;
    SharePoint.Security.SetConfiguration($scope.loginData.username, $scope.loginData.password, domain).then(function () {

      SharePoint.Security.Authenticate().then(function () {
        var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
        //if(SharePoint.Security.Authenticated) {
        if(auth) {
          $state.go('welkom', {}, {reload: true});
          //$state.go($state.current, {}, {reload: true});
        }
      });
    });
  };
})

.controller('welkomCtrl', function($scope, SharePoint) {

    $scope.$on('$ionicView.enter', function() {
      //$scope.Authenticated = SharePoint.Security.Authenticated;

      var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
      $scope.Authenticated = auth;
      //if(SharePoint.Security.Authenticated) {
      if(auth) {
        SharePoint.Web().then(function (Web) {
          $scope.Web = Web;
          Web.Lists('Meldingen').then(function (List) {
            $scope.Web.List = List;
          });
        });
      }
    });
})

.controller('meldingCtrl', function($scope) {

})

.controller('nieuweMeldingCtrl', function($scope) {

})
