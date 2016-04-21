(function () {
    'use strict';
    //test
    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngWeb', ['ngSecurity', 'ngList', '$resource', '$q', function (ngSecurity, ngList, $resource, $q) {

        var ngWeb = {};

        var _ngWeb = {
            "AllProperties": {
                "__deferred": {
                    "uri": "/AllProperties"
                }
            },
            "AvailableContentTypes": {
                "__deferred": {
                    "uri": "/AvailableContentTypes"
                }
            },
            "AvailableFields": {
                "__deferred": {
                    "uri": "/AvailableFields"
                }
            },
            "ContentTypes": {
                "__deferred": {
                    "uri": "/ContentTypes"
                }
            },
            "CurrentUser": {
                "__deferred": {
                    "uri": "/CurrentUser"
                }
            },
            "Features": {
                "__deferred": {
                    "uri": "/Features"
                }
            },
            "Fields": {
                "__deferred": {
                    "uri": "/Fields"
                }
            },
            "Folders": {
                "__deferred": {
                    "uri": "/Folders"
                }
            },
            "Lists": {
                "__deferred": {
                    "uri": "/Lists"
                }
            },
            "ListTemplates": {
                "__deferred": {
                    "uri": "/ListTemplates"
                }
            },
            "Navigation": {
                "__deferred": {
                    "uri": "/Navigation"
                }
            },
            "ParentWeb": {
                "__deferred": {
                    "uri": "/ParentWeb"
                }
            },
            "RegionalSettings": {
                "__deferred": {
                    "uri": "/RegionalSettings"
                }
            },
            "RootFolder": {
                "__deferred": {
                    "uri": "/RootFolder"
                }
            },
            "ThemeInfo": {
                "__deferred": {
                    "uri": "/ThemeInfo"
                }
            },
            "Webs": {
                "__deferred": {
                    "uri": "/Webs"
                }
            },
            "WebInfos": {
                "__deferred": {
                    "uri": "/WebInfos"
                }
            },
            "AllowRssFeeds": true,
            "AlternateCssUrl": "",
            "Configuration": 0,
            "Created": "",
            "CustomMasterUrl": "",
            "Description": "",
            "Id": "",
            "IsMultilingual": true,
            "Language": 1033,
            "LastItemModifiedDate": "",
            "MasterUrl": "",
            "ServerRelativeUrl": "",
            "SiteLogoUrl": "",
            "SyndicationEnabled": true,
            "Title": "",
            "UIVersion": 15,
            "UIVersionConfigurationEnabled": false,
            "Url": "",
            "WebTemplate": ""
        };

        var API = $resource('https://:EndPoint/_api/web/:Deferred',
            {},//{   EndPoint: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '@EndPoint', Deferred: '@Deferred'},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                  params: {EndPoint: '@EndPoint', Deferred: '@Deferred'},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                save: {
                    method: 'POST',
                  params: {EndPoint: '@EndPoint', Deferred: '@Deferred'},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        ngWeb = function (identifier) {

            var deferred = $q.defer();

            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            //region Properties

            /**
             *
             * @param value
             * @returns {boolean}
             * @constructor
             */
            this.AllowRssFeeds = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AllowRssFeeds = value) : _ngWeb.AllowRssFeeds;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.AlternateCssUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AlternateCssUrl = value) : _ngWeb.AlternateCssUrl;
            };
            /**
             *
             * @param value
             * @returns {number}
             * @constructor
             */
            this.Configuration = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Configuration = value) : _ngWeb.Configuration;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Created = value) : _ngWeb.Created;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.CustomMasterUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.CustomMasterUrl = value) : _ngWeb.CustomMasterUrl;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.Description = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Description = value) : _ngWeb.Description;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Id = value) : _ngWeb.Id;
            };
            /**
             *
             * @param value
             * @returns {boolean}
             * @constructor
             */
            this.IsMultilingual = function (value) {
                return angular.isDefined(value) ? (_ngWeb.IsMultilingual = value) : _ngWeb.IsMultilingual;
            };
            /**
             *
             * @param value
             * @returns {number}
             * @constructor
             */
            this.Language = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Language = value) : _ngWeb.Language;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.LastItemModifiedDate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.LastItemModifiedDate = value) : _ngWeb.LastItemModifiedDate;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.ServerRelativeUrl = value) : _ngWeb.ServerRelativeUrl;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.SiteLogoUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SiteLogoUrl = value) : _ngWeb.SiteLogoUrl;
            };
            /**
             *
             * @param value
             * @returns {boolean}
             * @constructor
             */
            this.SyndicationEnabled = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SyndicationEnabled = value) : _ngWeb.SyndicationEnabled;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
            };
            /**
             *
             * @param value
             * @returns {number}
             * @constructor
             */
            this.UIVersion = function (value) {
                return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.Url = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            };
            /**
             *
             * @param value
             * @returns {string}
             * @constructor
             */
            this.WebTemplate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.WebTemplate = value) : _ngWeb.WebTemplate;
            };

            //endregion

            //region Deferred

            this.AllProperties = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.AllProperties.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.AllProperties.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.AllProperties.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.AvailableFields = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.AvailableFields.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.AvailableFields.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.AvailableFields.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.CurrentUser = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.CurrentUser.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.CurrentUser.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.CurrentUser.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Lists = function (value) {

                if (angular.isDefined(value)) {
                    return new ngList(value);
                }
                else {

                    var deferred = $q.defer();

                    var Operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                            function (data) {
                                if (angular.isDefined(data.results)) {
                                    data.results.__deferred = _ngWeb.Lists.__deferred;
                                    deferred.resolve(data.results);
                                }
                                else {
                                    data.__deferred = _ngWeb.Lists.__deferred;
                                    deferred.resolve(data);
                                }
                            });
                    }
                    return deferred.promise;
                }
            };

            this.ParentWeb = function () {

                var deferred = $q.defer();

                var Operator = _ngWeb.ParentWeb.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.ParentWeb.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.ParentWeb.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.RegionalSettings = function () {

                var deferred = $q.defer();

                var Operator = _ngWeb.RegionalSettings.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.RegionalSettings.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.RegionalSettings.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.RootFolder = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.RootFolder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.RootFolder.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.RootFolder.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.ThemeInfo = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.ThemeInfo.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.ThemeInfo.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.ThemeInfo.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Webs = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.Webs.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.Webs.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.Webs.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.WebInfos = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.WebInfos.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngWeb.WebInfos.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngWeb.WebInfos.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            //endregion

            //region Methods
            /*
            this.GetList = function (value) {

                var deferred = $q.defer();

                var Operator = "getlist('" + value + "')";
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
            */
            this.GetUserById = function (int) {

                var deferred = $q.defer();

                var Operator = "getuserbyid(" + int + ")";
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint:ngSecurity.Endpoint, Deferred:Operator}).$promise.then(
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

            this.GetFileByServerRelativeUrl = function(url) {
                var deferred = $q.defer();

                var Operator = "GetFileByServerRelativeUrl('" + url + "')";///$value";
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

            //endregion

            //region Get Current Web

            var self = this;


            if(ngSecurity.CurrentWeb !== null) {
                self.Properties = _ngWeb;
                ngSecurity.CurrentWeb = self;
                deferred.resolve(self);
            }
            else {
                API.get({EndPoint:ngSecurity.Endpoint}).$promise.then(
                    function (data) {
                        _ngWeb = data;
                        self.Properties = _ngWeb;
                        ngSecurity.CurrentWeb = self;
                        deferred.resolve(self);
                    });
            }

            //endregion

            return deferred.promise;

        };

        ngWeb.List = ngList;

        return ngWeb;

    }]);
})();
