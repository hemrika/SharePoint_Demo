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
                $scope.Web = Web.Properties;
                $scope.Web.List = List.Properties;
                $scope.Web.List.Item = Item.Properties;
                Item.AttachmentFiles().then(function(Files){
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

.controller('nieuweMeldingCtrl', function($scope, $stateParams, $state, SharePoint, $cordovaCamera) {

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

    $scope.OpslaanFoto = function (Item, Naam, bsixfour) {

        Item.AddFile(Naam, bsixfour).then(function (file) {
            console.log(file);
            //SharePoint.GetFileByServerRelativeUrl(SharePoint.ServerRelativeUrl() + "/" + file).then(function(data){
                //bsixfour = btoa(data);
                //$scope.bsixfour = SharePoint.Url()+ data.ServerRelativeUrl;
                //console.log(data);
            //});
        });
    }

    $scope.takePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.bsixfour = imageData;
            $scope.imgURI = "data:image/png;base64," + imageData;
        }, function (err) {
            console.log(err);
            // An error occured. Show a message to the user
        });
    }

    $scope.choosePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.bsixfour = imageData;
            $scope.imgURI = "data:image/png;base64," + imageData;
        }, function (err) {
            console.log(err);
            // An error occured. Show a message to the user
        });
    }

    $scope.bsixfour = "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMENFM0Y3NTYxMjA2ODExODIyQTlEMzMyRUNGODRFQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozM0UwMjU3NEEyNzExMUU1QTY3N0RFQkEwRTQ0MzlFNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozM0UwMjU3M0EyNzExMUU1QTY3N0RFQkEwRTQ0MzlFNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzMWQzMjRmLWIzMDItNDlkZS1hNzIyLTJkYWYxNjhhOWMzNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMENFM0Y3NTYxMjA2ODExODIyQTlEMzMyRUNGODRFQiIvPiA8L3Jk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";
    $scope.imgURI = "data:image/png;base64," + $scope.bsixfour;
})
