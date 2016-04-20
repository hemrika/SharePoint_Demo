(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngUserProfile', ['ngSecurity', '$resource', '$q', '$http', function (ngSecurity, $resource, $q, $http) {

    var ngUserProfile;

    var _ngUserProfile = {

        "AccountName": "",
        "DirectReports": {
          "__metadata": {
            "type": "Collection(Edm.String)"
          },
          "results": []
        },
        "DisplayName": "",
        "Email": "",
        "ExtendedManagers": {
          "results": []
        },
        "ExtendedReports": {
          "results": [
            ""
          ]
        },
        "IsFollowed": false,
        "LatestPost": null,
        "Peers": {
          "results": []
        },
        "PersonalUrl": "",
        "PictureUrl": "",
        "Title": "",
        "UserProfileProperties": {
          "results": [
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "AccountName",
              "Value": "i:0#.f|membership|rutger.hemrika@blaud.com",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "FirstName",
              "Value": "Rutger",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "LastName",
              "Value": "Hemrika",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "PreferredName",
              "Value": "Rutger Hemrika",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "WorkPhone",
              "Value": "+31 645696209",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "Department",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "Title",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-JobTitle",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-Department",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "Manager",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "AboutMe",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "PictureURL",
              "Value": "https://duwboot-my.sharepoint.com:443/User%20Photos/Profielafbeeldingen/rutger_hemrika_blaud_com_MThumb.jpg",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "UserName",
              "Value": "rutger.hemrika@blaud.com",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "QuickLinks",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "WebSite",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-ClaimID",
              "Value": "rutger.hemrika@blaud.com",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-ClaimProviderID",
              "Value": "membership",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-ClaimProviderType",
              "Value": "Forms",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-UserPrincipalName",
              "Value": "rutger.hemrika@blaud.com",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "WorkEmail",
              "Value": "rutger.hemrika@blaud.com",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "CellPhone",
              "Value": "+31645696209",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "HomePhone",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "Office",
              "Value": "",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-Location",
              "Value": "Houten",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-Skills",
              "Value": "SharePoint|Cordova|HTML5|JavaScript",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-Birthday",
              "Value": "11-12-2000 00:00:00",
              "ValueType": "Edm.String"
            },
            {
              "__metadata": {
                "type": "SP.KeyValue"
              },
              "Key": "SPS-Interests",
              "Value": "",
              "ValueType": "Edm.String"
            }
          ]
        },
        "UserUrl": ""
    };

    var _UserProfile = $resource("https://:EndPoint/_api/sp.userprofiles.peoplemanager/:Deferred",
        {},
        {
          get: {
            method: 'GET',
            params: {EndPoint: '', Deferred: ''},
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose'
            }
          },
          deferred: {
            method: 'GET',
            params: {EndPoint: '', Deferred: ''},
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose'
            }
          }
        }
    );

    ngUserProfile = function (identifier) {

      var deferred = $q.defer();

      if (!ngSecurity.Authenticated) {
        deferred.reject("Not Authenticated");
      }

      //region Properties

      this.AccountName = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.AccountName = value) : _ngUserProfile.AccountName;
      };

      this.DirectReports = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.DirectReports = value) : _ngUserProfile.DirectReports;
      };

      this.DisplayName = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.DisplayName = value) : _ngUserProfile.DisplayName;
      };

      this.Email = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.Email = value) : _ngUserProfile.Email;
      };

      this.ExtendedManagers = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.ExtendedManagers = value) : _ngUserProfile.ExtendedManagers;
      };

      this.ExtendedReports = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.ExtendedReports = value) : _ngUserProfile.ExtendedReports;
      };

      this.IsFollowed = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.IsFollowed = value) : _ngUserProfile.IsFollowed;
      };

      this.LatestPost = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.LatestPost = value) : _ngUserProfile.LatestPost;
      };

      this.Peers = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.Peers = value) : _ngUserProfile.Peers;
      };

      this.PersonalUrl = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.PersonalUrl = value) : _ngUserProfile.PersonalUrl;
      };

      this.PictureUrl = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.PictureUrl = value) : _ngUserProfile.PictureUrl;
      };

      this.Title = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.Title = value) : _ngUserProfile.Title;
      };

      this.UserProfileProperties = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.UserProfileProperties = value) : _ngUserProfile.UserProfileProperties;
      };

      this.UserUrl = function (value) {
        return angular.isDefined(value) ? (_ngUserProfile.UserUrl = value) : _ngUserProfile.UserUrl;
      };

      //endregion

      //region Get Current Web

      var self = this;


      if(ngSecurity.CurrentUserProfile !== null) {
        self.Properties = _ngUserProfile;
        ngSecurity.CurrentUserProfile = self;
        deferred.resolve(self);
      }
      else {
        _UserProfile.get({
          EndPoint: ngSecurity.Endpoint,
          Deferred: 'getmyproperties'}
        ).$promise.then(
            function (data) {
              _ngUserProfile = data;
              self.Properties = _ngUserProfile;
              ngSecurity.CurrentUserProfile = self;
              deferred.resolve(self);
            });
      }

      //endregion

      return deferred.promise;
    };

    return ngUserProfile;
  }]);

})();
