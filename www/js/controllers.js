angular.module('rapporteren.controllers', [])

.controller('WelkomCtrl', function($scope, SharePoint, $ionicLoading, $interval, $ionicAnalytics) {

    //$scope.Timer = null;

    $scope.$on('$ionicView.enter', function() {

        var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;

        $scope.Authenticated = auth;

        /*
        Ophalen();

        $scope.Timer = $interval(function () {
            Ophalen();
        }, 30000);
        */
    });

    $scope.$on('$ionicView.leave',function(){
        /*
        //Cancel the Timer.
        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
        */
    });

    /*
    Ophalen = function() {
        var auth = (SharePoint.Security.CurrentUser !== null) ? true : false;

        $scope.Authenticated = auth;
        if(auth) {
            SharePoint.Web().then(function (Web) {
                Web.Lists('Meldingen').then(function (List) {
                    $scope.Web = Web.Properties;
                    $scope.Web.List = List.Properties;
                });

            });
        };
    };
    */

})

.controller('AanmeldenCtrl', function($scope, $state, SharePoint, $cordovaPreferences, $ionicLoading, $ionicAnalytics) {

  $scope.loginData = {};

    $cordovaPreferences.fetch('username', 'loginData')
        .success(function(value) {
            $scope.loginData.username = value;
        })
        .error(function(error) {
            //alert("Error: " + error);
        })

    $cordovaPreferences.fetch('password', 'loginData')
        .success(function(value) {
            $scope.loginData.password = value;
        })
        .error(function(error) {
            //alert("Error: " + error);
        })

  $scope.Authenticate = function () {

      try {
          var domain = SharePoint.Security.Endpoint;

          //$cordovaProgress.showSimple(true);
          $ionicLoading.show({
              template: '<ion-spinner class="light"></ion-spinner><br/><span>Authenticeren...</span>'
          });

          $scope.MessageHide = true;
          $scope.Message = 'Nothing yet...';

          SharePoint.Security.SetConfiguration($scope.loginData.username, $scope.loginData.password, domain).then(function () {

              SharePoint.Security.Authenticate().then(function () {
                  $scope.Authenticated = (SharePoint.Security.CurrentUser !== null) ? true : false;
                  //if(SharePoint.Security.Authenticated) {
                  if ($scope.Authenticated) {
                      $scope.Message = 'Succes, moving on...';

                      $cordovaPreferences.store('username', $scope.loginData.username, 'loginData')
                          .success(function (un) {
                              $cordovaPreferences.store('password', $scope.loginData.password, 'loginData')
                                  .success(function (pw) {
                                      //$cordovaProgress.hide();
                                      $ionicLoading.hide();
                                      //$state.go('Welkom', {}, {reload: true});
                                  })
                          })
                          .error(function (error) {
                              //$cordovaProgress.hide();
                              $ionicLoading.hide();
                              //alert("Error: " + error);
                          })
                      $state.go('Welkom', {}, {reload: true});
                  }
                  else {
                      $ionicLoading.hide();
                      $scope.Message = 'Aanmelden mislukt, controleer uw gegevens en probeer opnieuw.';
                      $scope.MessageHide = false;
                  }
              });

          });
      }
      catch (error) {
          $ionicLoading.hide();
          $state.go('Welkom', {}, {reload: true});
          console.log(error);
      }
  };
})

.controller('MeldingenCtrl', function($scope, $state, SharePoint, $ionicLoading, $interval, $ionicAnalytics) {

    $scope.Timer = null;

    $scope.goBack = function(){
        $state.go('Welkom', {}, {reload: true});
    }

    try {
        $scope.$on('$ionicView.enter', function () {
            $ionicLoading.show({
                template: '<ion-spinner class="light"></ion-spinner><br/><span>Ophalen Meldingen...</span>',
                noBackdrop: false
            });

            SharePoint.Web().then(function (Web) {
                Web.Lists('Meldingen').then(function (List) {

                    List.Items().then(function (Items) {
                        //console.log(Items);

                        //var results = Item.Fields[1].Choices.results;
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Items = Items;
                        $ionicLoading.hide();
                    });

                });
            });

            $scope.Timer = $interval(function () {
                Refresh();
            }, 30000);
        });

        $scope.$on('$ionicView.leave',function(){
            //Cancel the Timer.
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        });

        $scope.doRefresh = function(){
            Refresh();
        };

        Refresh = function() {
            $ionicLoading.show({
                template: '<ion-spinner class="light"></ion-spinner><br/><span>Ophalen Meldingen...</span>',
                noBackdrop: false
            });

            SharePoint.Web().then(function (Web) {
                Web.Lists('Meldingen').then(function (List) {

                    List.Items().then(function (Items) {
                        //console.log(Items);

                        //var results = Item.Fields[1].Choices.results;
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;

                        Items.forEach(function(item, idx, theItems) {
                            item.Fields.forEach(function (field, index, theFields) {
                                //theItems[idx].theFields[index].ReadOnlyField = true;

                                if (field.FieldTypeKind === 4 && angular.isDefined(field.Value)) {
                                    field.Value = new Date(field.Value);
                                }
                            });
                        });
                        $scope.Web.List.Items = Items;
                        $ionicLoading.hide();
                    });

                });
            });
        };
    }
    catch (error) {
        $ionicLoading.hide();
        console.log(error);
    }
})

.controller('MeldingCtrl', function($scope, $stateParams, $state, SharePoint, $ionicModal, $ionicLoading, $ionicAnalytics) {

    //region File Modal

    $ionicModal.fromTemplateUrl('file-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(file) {
        $scope.ModalFile = file;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.ModalFile = undefined;
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    //endregion

    try {
      $scope.$on('$ionicView.enter', function () {
          //$cordovaProgress.showSimple(true);
          $ionicLoading.show({
              template: '<ion-spinner class="light"></ion-spinner><br/><span>Ophalen Melding...</span>'
          });

          $scope.bijlage = {};
          $scope.bijlage.een = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};
          $scope.bijlage.twee = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};
          $scope.bijlage.drie = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};

          SharePoint.Web().then(function (Web) {
              Web.Lists('Meldingen').then(function (List) {

                  var id = -1;
                  if (angular.isDefined($stateParams.ItemId)) {
                      id = $stateParams.ItemId;
                  };

                  List.Items(id).then(function (Item) {
                      $scope.Web = Web.Properties;
                      $scope.Web.List = List.Properties;

                      Item.Fields.forEach(function(field, index, theFields) {
                          theFields[index].ReadOnlyField = true;

                          if(field.FieldTypeKind === 4 && angular.isDefined(field.Value)){
                              field.Value = new Date(field.Value);
                          }
                      });

                      $scope.Web.List.Item = Item;
                      $scope.Web.List.Item.Files = [];

                      $ionicLoading.hide();

                      if(id > 0) {
                          var d = new Date();

                          Item.GetAttachmentCollection().then(function (Attachments) {

                              if (Array.isArray(Attachments.Attachment)) {

                                  Attachments.Attachment.forEach(function (Attachment, index) {

                                      if (Attachment.includes('bijlage_een.png')) {
                                          $scope.bijlage.een.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                          $scope.bijlage.een.org = Attachment.valueOf();
                                      }

                                      if (Attachment.includes('bijlage_twee.png')) {
                                          $scope.bijlage.twee.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                          $scope.bijlage.twee.org = Attachment.valueOf();
                                      }

                                      if (Attachment.includes('bijlage_drie.png')) {
                                          $scope.bijlage.drie.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                          $scope.bijlage.drie.org = Attachment.valueOf();
                                      }
                                  });
                              }
                              else {
                                  if (Attachments.Attachment.includes('bijlage_een.png')) {
                                      $scope.bijlage.een.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                      $scope.bijlage.een.org = Attachments.Attachment.valueOf();
                                  }

                                  if (Attachments.Attachment.includes('bijlage_twee.png')) {
                                      $scope.bijlage.twee.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                      $scope.bijlage.twee.org = Attachments.Attachment.valueOf();
                                  }

                                  if (Attachments.Attachment.includes('bijlage_drie.png')) {
                                      $scope.bijlage.drie.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                      $scope.bijlage.drie.org = Attachments.Attachment.valueOf();
                                  }
                              }
                          });
                      }
                      /*
                      Item.GetAttachmentCollection().then(function(Attachments){

                          var d=new Date();

                          if(Array.isArray(Attachments.Attachment)) {
                              //$scope.Web.List.Item.Files = Attachments.Attachment;//[];
                              Attachments.Attachment.forEach(function (Attachment, index) {
                                  //console.log(Attachment);
                                  $scope.Web.List.Item.Files.push(Attachment.valueOf()+"?t="+d.getTime());
                              });
                          }
                          else {
                              $scope.Web.List.Item.Files.push(Attachments.Attachment.valueOf()+"?t="+d.getTime());
                          }
                      });
                      */

                      /*
                      Item.AttachmentFiles().then(function (Files) {

                          var Web_ServerRelativeUrl = Web.Properties.ServerRelativeUrl;
                          $ionicLoading.hide();

                          $scope.Web.List.Item.Files = [];

                          Files.forEach(function (file) {
                              var File_ServerRelativeUrl = file.ServerRelativeUrl;
                              File_ServerRelativeUrl = File_ServerRelativeUrl.replace(Web_ServerRelativeUrl, '');
                              file.WebRelativeUrl = File_ServerRelativeUrl;
                              $scope.Web.List.Item.Files.push(file);
                              $ionicLoading.hide();
                          });
                      });
                      */
                  });
              });
          });
      });
    }
    catch (error) {
        $ionicLoading.hide();
      console.log(error);
    }


})

.controller('MeldingBewerkenCtrl', function($scope, $stateParams, $state, SharePoint, $cordovaCamera, $ionicLoading, $ionicAnalytics) {

    try {
        $scope.$on('$ionicView.enter', function () {
            //$cordovaProgress.showSimple(true);
            $ionicLoading.show({
                template: '<ion-spinner class="light"></ion-spinner><br/><span>Opmaken Melding Formulier...</span>'
            });

            $scope.bijlage = {};
            $scope.bijlage.een = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};
            $scope.bijlage.twee = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};
            $scope.bijlage.drie = {'bsixfour': undefined, 'uri': 'img/camera.png', 'org': undefined};

            SharePoint.Web().then(function (Web) {
                Web.Lists('Meldingen').then(function (List) {

                    var id = -1;
                    if (angular.isDefined($stateParams.ItemId)) {
                        id = $stateParams.ItemId;
                    };

                    List.Items(id).then(function (Item) {
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;

                        Item.Fields.forEach(function (field, index, theFields) {
                            if (field.FieldTypeKind === 4 && angular.isDefined(field.Value)) {
                                field.Value = new Date(field.Value);
                            }
                        });

                        $scope.Web.List.Item = Item;

                        $ionicLoading.hide();

                        if(id > 0) {

                            var d = new Date();

                            Item.GetAttachmentCollection().then(function (Attachments) {

                                if (Array.isArray(Attachments.Attachment)) {

                                    Attachments.Attachment.forEach(function (Attachment, index) {

                                        if (Attachment.includes('bijlage_een.png')) {
                                            $scope.bijlage.een.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                            $scope.bijlage.een.org = Attachment.valueOf();
                                        }

                                        if (Attachment.includes('bijlage_twee.png')) {
                                            $scope.bijlage.twee.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                            $scope.bijlage.twee.org = Attachment.valueOf();
                                        }

                                        if (Attachment.includes('bijlage_drie.png')) {
                                            $scope.bijlage.drie.uri = Attachment.valueOf() + "?t=" + d.getTime();
                                            $scope.bijlage.drie.org = Attachment.valueOf();
                                        }
                                    });
                                }
                                else {
                                    if (Attachments.Attachment.includes('bijlage_een.png')) {
                                        $scope.bijlage.een.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                        $scope.bijlage.een.org = Attachments.Attachment.valueOf();
                                    }

                                    if (Attachments.Attachment.includes('bijlage_twee.png')) {
                                        $scope.bijlage.twee.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                        $scope.bijlage.twee.org = Attachments.Attachment.valueOf();
                                    }

                                    if (Attachments.Attachment.includes('bijlage_drie.png')) {
                                        $scope.bijlage.drie.uri = Attachments.Attachment.valueOf() + "?t=" + d.getTime();
                                        $scope.bijlage.drie.org = Attachments.Attachment.valueOf();
                                    }
                                }
                            });
                        }
                    });
                });
            });
        });
    }
    catch (error) {
        $ionicLoading.hide();
        console.log(error);
    }

    $scope.Opslaan = function (Item) {
        try {
            //$cordovaProgress.showSimple(true);
            $ionicLoading.show({
                template: '<ion-spinner class="light"></ion-spinner><br/><span>Opslaan Melding...</span>'
            });
            Item.Save().then(function (Item) {

                if ($scope.bijlage.een.bsixfour != undefined) {
                    if (angular.isDefined($scope.bijlage.een.org)) {
                        Item.DeleteFile($scope.bijlage.een.org).then(function () {
                            Item.AddFile('bijlage_een.png', $scope.bijlage.een.bsixfour).then(function (file) {
                            });
                        });
                    }
                    else {
                        Item.AddFile('bijlage_een.png', $scope.bijlage.een.bsixfour).then(function (file) {
                        });
                    }
                }

                if ($scope.bijlage.twee.bsixfour != undefined) {
                    if (angular.isDefined($scope.bijlage.twee.org)) {
                        Item.DeleteFile($scope.bijlage.twee.org).then(function () {
                            Item.AddFile('bijlage_twee.png', $scope.bijlage.twee.bsixfour).then(function (file) {
                            });
                        });
                    }
                    else {
                        Item.AddFile('bijlage_twee.png', $scope.bijlage.twee.bsixfour).then(function (file) {
                        });
                    }
                }

                if ($scope.bijlage.drie.bsixfour != undefined) {
                    if (angular.isDefined($scope.bijlage.drie.org)) {
                        Item.DeleteFile($scope.bijlage.drie.org).then(function () {
                            Item.AddFile('bijlage_drie.png', $scope.bijlage.drie.bsixfour).then(function (file) {
                            });
                        });
                    }
                    else {
                        Item.AddFile('bijlage_drie.png', $scope.bijlage.drie.bsixfour).then(function (file) {
                        });
                    }
                }

                $scope.Web.List.Item = Item;
                $ionicLoading.hide();
                $state.go('Meldingen', {}, {reload: true});
            });

            $ionicLoading.hide();
        }
        catch (error) {
            $ionicLoading.hide();
            console.log(error);
        }
    }

    $scope.takePhoto = function (name) {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            if (name == 'een') {
                $scope.bijlage.een.bsixfour = imageData;
                $scope.bijlage.een.uri = "data:image/png;base64," + imageData;
                //{'bsixfour': imageData, 'uri': "data:image/png;base64," + imageData};
            }
            if (name == 'twee') {
                $scope.bijlage.twee.bsixfour = imageData;
                $scope.bijlage.twee.uri = "data:image/png;base64," + imageData;
                //{'bsixfour': imageData, 'uri': "data:image/png;base64," + imageData};
            }
            if (name == 'drie') {
                $scope.bijlage.drie.bsixfour = imageData;
                $scope.bijlage.drie.uri = "data:image/png;base64," + imageData;
                //{'bsixfour': imageData, 'uri': "data:image/png;base64," + imageData};
            }
        }, function (err) {
            console.log(err);
            // An error occured. Show a message to the user
        });
    }
})
