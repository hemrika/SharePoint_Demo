angular.module('rapporteren.controllers', [])

.controller('meldingenCtrl', function($scope, $state, SharePoint) {

  //var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
  //if(SharePoint.Security.Authenticated) {
  //if(auth) {
      try
      {
        $scope.Web = SharePoint.CurrentWeb();

        if (SharePoint.CurrentWeb() !== null) {

          SharePoint.CurrentWeb().Lists('Meldingen').then(function (List) {
            $scope.Web.List = List;
          });
          /*
          if (SharePoint.CurrentList() === null) {
            SharePoint.CurrentWeb().Lists('Meldingen').then(function (List) {
              $scope.Web.List = List;
            });
          }
          else {
            $scope.Web.List = SharePoint.CurrentList();
          }
          */
          if (SharePoint.CurrentList() !== null) {
            SharePoint.CurrentList().Items().then(function (Items) {
              $scope.Web.List.Items = Items;
            });
          }
        }
      }
    catch(error)
    {
      console.log(error);
    }
  //}
  //else {
  //  $state.go('aanmelden', {}, {reload: true});
  //}
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
      //if(auth) {
      //  try {
      //    SharePoint.Web().then(function (Web) {
            //$scope.Web = Web;
      //      Web.Lists('Meldingen').then(function (List) {
              //$scope.Web.List = List;
      //      });
      //    });
      //  }
      //  catch(error)
      //  {
      //    console.log(error);
      //  }
      //}
    });
})

.controller('meldingCtrl', function($scope, $stateParams, $state, SharePoint) {

  //var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
  //if(SharePoint.Security.Authenticated) {
  //if(auth) {
    try {
      $scope.$on('$ionicView.enter', function () {
        SharePoint.Web().then(function (Web) {
          Web.Lists('Meldingen').then(function (List) {

            List.Items(1).then(function (Item) {
              console.log(Item);

              //var results = Item.Fields[1].Choices.results;
              $scope.Web = Web.Properties;
              $scope.Web.List = List.Properties;
              $scope.Web.List.Item = Item;
            });

          });
        });
      });
    }
    catch (error) {
      console.log(error);
    }
  //}
  //else {
  //  $state.go('aanmelden', {}, {reload: true});
  //}
})

.controller('nieuweMeldingCtrl', function($scope, $stateParams, $state, SharePoint) {
  //var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
  //if(SharePoint.Security.Authenticated) {
  //if(auth) {
    try
    {
      $scope.$on('$ionicView.enter', function() {
        SharePoint.Web().then(function (Web) {
          Web.Lists('Meldingen').then(function (List) {

             List.Items(-1).then(function(Item){
             //List.Items('New').then(function(Item){
             $scope.Web = Web.Properties;
             $scope.Web.List = List.Properties;
             $scope.Web.List.Item = Item;
             });
          });
        });
      });
    }
    catch(error)
    {
      console.log(error);
    }
  //}
  //else {
  //  $state.go('aanmelden', {}, {reload: true});
  //}
})
