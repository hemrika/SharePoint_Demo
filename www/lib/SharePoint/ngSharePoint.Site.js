(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngSite', ['ngSecurity', 'ngWeb', '$resource', '$q', function (ngSecurity, ngWeb, $resource, $q) {

        var ngSite = {};

        var _ngSite = {
            "CompatibilityLevel": 15,
            "Id": "",
            "PrimaryUri": "",
            "ReadOnly": false,
            "RequiredDesignerVersion": "15.0.0.0",
            "ServerRelativeUrl": "/",
            "Url": "",
            "Features": {
                "__deferred": {
                    "uri": "/Features"
                }
            },
            "RootWeb": {
                "__deferred": {
                    "uri": "/RootWeb"
                }
            }
        };

        var API = $resource('https://:EndPoint/_api/Site/:Deferred',
            {},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        ngSite = function (value) {

            var deferred = $q.defer();

            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            this.CompatibilityLevel = function (value) {
                return angular.isDefined(value) ? (_ngSite.CompatibilityLevel = value) : _ngSite.CompatibilityLevel;
            };
            this.PrimaryUri = function (value) {
                return angular.isDefined(value) ? (_ngSite.PrimaryUri = value) : _ngSite.PrimaryUri;
            };
            this.ReadOnly = function (value) {
                return angular.isDefined(value) ? (_ngSite.ReadOnly = value) : _ngSite.ReadOnly;
            };
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngSite.ServerRelativeUrl = value) : _ngSite.ServerRelativeUrl;
            };
            this.Url = function (value) {
                return angular.isDefined(value) ? (_ngSite.Url = value) : _ngSite.Url;
            };
            this.Features = function () {
                var deferred = $q.defer();

                var Operator = _ngSite.Features.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.RootWeb = function () {

                return new ngWeb();
                /*
                 var deferred = $q.defer();

                 var Operator = _ngSite.RootWeb.__deferred.uri.split('/').pop();
                 if (ngSecurity.CurrentUser !== null) {
                 API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                 function (data) {
                 if (angular.isDefined(data.results)) {
                 deferred.resolve(data.results);
                 }
                 else {
                 deferred.resolve(data);
                 }
                 });
                 }
                 return deferred.promise;
                 */
            };

            var self = this;

            if (ngSecurity.CurrentSite !== null) {
                self.Properties = _ngSite;
                ngSecurity.CurrentSite = self;
                deferred.resolve(self);
            }
            else {
                API.get({EndPoint: ngSecurity.Endpoint}).$promise.then(
                    function (data) {
                        _ngSite = data;
                        self.Properties = _ngWeb;
                        ngSecurity.CurrentSite = self;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;
        };

        ngSite.Web = ngWeb;

        return ngSite;
    }]);
})();
