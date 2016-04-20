angular.module('rapporteren.controllers', [])

.controller('welkomCtrl', function($scope, SharePoint) {

    $scope.$on('$ionicView.enter', function() {
        //$scope.Authenticated = SharePoint.Security.Authenticated;

        var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;
        $scope.Authenticated = auth;
    });
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

.controller('meldingenCtrl', function($scope, $state, SharePoint) {

    try {
        $scope.$on('$ionicView.enter', function () {
            SharePoint.Web().then(function (Web) {
                Web.Lists('Meldingen').then(function (List) {

                    List.Items().then(function (Items) {
                        console.log(Items);

                        //var results = Item.Fields[1].Choices.results;
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Items = Items;
                    });

                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
})
.controller('meldingCtrl', function($scope, $stateParams, $state, SharePoint) {

    console.log($stateParams.ItemId);
    //console.log($state);
    try {
      $scope.$on('$ionicView.enter', function () {
        SharePoint.Web().then(function (Web) {
          Web.Lists('Meldingen').then(function (List) {

            List.Items($stateParams.ItemId).then(function (Item) {

                Item.AttachmentFiles().then(function(Files){
                    $scope.Web = Web.Properties;
                    $scope.Web.List = List.Properties;
                    $scope.Web.List.Item = Item;
                    $scope.Web.List.Item.Files = Files;
                });
            });
          });
        });
      });
    }
    catch (error) {
      console.log(error);
    }
})

.controller('nieuweMeldingCtrl', function($scope, $stateParams, $state, SharePoint) {

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

    $scope.Opslaan = function (Item) {
        "use strict";
        Item.Save().then(function (Item){
            $scope.Web.List.Item = Item;
        });
    }

    $scope.Toevoegen = function (Item, Naam, bsixfour) {

        Item.AddFile("rutgerhemrika.jpg", bsixfour).then(function (file) {
            SharePoint.GetFileByServerRelativeUrl(SharePoint.ServerRelativeUrl() + "/" + file).then(function(data){
                //bsixfour = btoa(data);
                //$scope.bsixfour = SharePoint.Url()+ data.ServerRelativeUrl;
                //console.log(data);
            });
        });
    }
})
