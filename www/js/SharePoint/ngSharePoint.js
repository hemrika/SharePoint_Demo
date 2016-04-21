(function () {
    'use strict';

    angular.module('ngSharePoint', ['ngResource'])

        .factory('SharePoint', ['ngSecurity', 'ngUserProfile', 'ngSite', 'ngWeb', function (ngSecurity, ngUserProfile, ngSite, ngWeb) {

            var EndPoint = function (value) {

                if (angular.isDefined(value)) { ngSecurity.Endpoint = value; }
                return ngSecurity.EndPoint;
            };

            var CurrentUser = function () {
                return ngSecurity.CurrentUser;
            };

            var CurrentUserProfile = function () {
                return ngSecurity.CurrentUserProfile;
            };

            var CurrentWeb = function () {
                return ngSecurity.CurrentWeb;
            };

            var CurrentList = function () {
                return ngSecurity.CurrentList;
            };

            var CurrentItem = function () {
                return ngSecurity.CurrentItem;
            };

            var CurrentFile = function () {
                return ngSecurity.CurrentFile;
            };

            var SharePoint = {};

            //var ngSharePoint = {
            SharePoint.Security = ngSecurity;
            SharePoint.Site = ngSite;
            SharePoint.Web = ngWeb;
            SharePoint.UserProfile = ngUserProfile;
            SharePoint.EndPoint = EndPoint;
            SharePoint.CurrentUserProfile = CurrentUserProfile;
            SharePoint.CurrentUser = CurrentUser;
            SharePoint.CurrentWeb = CurrentWeb;
            SharePoint.CurrentList = CurrentList;
            SharePoint.CurrentItem = CurrentItem;
            SharePoint.CurrentFile = CurrentFile;
            //SharePoint.XMLtoJSON = XMLtoJSON;
            return SharePoint;

        }])

        //.factory('XMLtoJSON', [ function () {
        //    return new X2JS();
        //}])

        .factory('SharePointInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            return {
                response: function (response) {
                    var deferred = $q.defer();
                    if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
                        response.data = response.data.d ? response.data.d : response.data;
                    }

                    deferred.resolve(response);
                    return deferred.promise;
                },
                request: function (request) {

                    //request.headers.Origin = '*';
                    delete request.headers['X-Requested-With'];
                    //request.headers['Access-Control-Allow-Origin'] = 'file://*';
                    //request.headers['Origin'] = 'file://*';
                    if (request.method.toLowerCase() === "post" && angular.isDefined($rootScope.FormDigestValue)) {
                        request.headers['X-RequestDigest'] = $rootScope.FormDigestValue;

                        request.url = decodeURIComponent(request.url);
                    }
                    if (request.headers.Accept === "application/json;odata=verbose") {
                        request.url = decodeURIComponent(request.url);
                    }

                    //if (request.method.toLowerCase() === "get" && request.url.toLocaleLowerCase().endsWith('_vti_bin/idcrl.svc/')) {
                    //    request.headers['Authorization'] = $rootScope.SecurityToken;
                    //}
                    /*
                    if(request.method.toLowerCase() === "options" && request.url.toLocaleLowerCase().endsWith('contextinfo')) {
                            request.skip();
                    }
                    //console.log(SharePoint.Security.ContextInfo.FormDigestTimeoutSeconds);
                    */
                    return request;

                }
            };
        }])

        .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['self'], 'https://*.sharepoint.com/**');
            $sceDelegateProvider.resourceUrlWhitelist(['self'], 'file://*');
        }])

        .config(['$compileProvider', function ($compileProvider) {

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|callto|tel|file|ghttps?|ms-appx|ms-appx-web|x-wmapp0|ms-drive-to|ms-windows-store|bingmaps|google.navigation):/);
            // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|ms-appx-web|x-wmapp0):|data:image\//);
        }
        ])

/*       .config(function($templateRequestProvider){
            $templateRequestProvider.httpOptions({
                headers:{Origin:'*'}
            });
        })*/

        .config(['$httpProvider', '$sceProvider', function ( $httpProvider, $sceProvider){
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            //delete $httpProvider.defaults.headers.common['Accept-Encoding'];
            //delete $httpProvider.defaults.headers.common['Accept-Language'];
            $httpProvider.defaults.withCredentials = false;

            $httpProvider.defaults.headers.common = {Accept: "application/json, text/plain, */*"};
            //$httpProvider.defaults.headers.common = {Accept: "*/*"};
            //$httpProvider.defaults.headers.common = {Origin: "file://*"};
            $httpProvider.defaults.headers.post = {"Content-Type": "application/json;charset=utf-8"};

            //var transformResponse = angular.isArray($httpProvider.defaults.transformResponse) ? $httpProvider.defaults.transformResponse : [$httpProvider.defaults.transformResponse];
            //$httpProvider.defaults.transformResponse = transformResponse.concat(transform);

            $httpProvider.interceptors.push('SharePointInterceptor');

            //$sceProvider.enabled(false);

        }]);
})();
