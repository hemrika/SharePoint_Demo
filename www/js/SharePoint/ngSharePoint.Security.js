(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngSecurity', ['$timeout', '$http', '$resource', '$q', '$rootScope', function ($timeout, $http, $resource, $q, $rootScope) {

        //region Properties

        /**
         *
         * @type {null}
         * @private
         */
        var _Username = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Password = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Endpoint = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Hostname = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _SignInUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _ContextInfoUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentUserUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _IdCrlUrl = null;

        /**
         * WWW-Authenticate
         * Bearer realm : fbb85d4b-b9cc-445f-8b90-a2ea555b2841
         * client_id : 00000003-0000-0ff1-ce00-000000000000 0000000c-0000-0000-c000-000000000000
         * trusted_issuers : 00000003-0000-0ff1-ce00-000000000000 00000001-0000-0000-c000-000000000000
         * authorization_uri : https://login.windows.net/common/oauth2/authorize
         */

        /**
         *
         * @type {null}
         * @private
         */
        var _SitesAsmx = null;

        var _GetContextWebThemeData = null;
        /**
         *
         * @type {boolean}
         * @private
         */
        var _UseContextInfo = true;
        /**
         *
         * @type {null}
         * @private
         */
        var _SecurityToken = null;

        /**
         *
         * @type {{FormDigestTimeoutSeconds: string, FormDigestValue: null, LibraryVersion: string, SiteFullUrl: string, SupportedSchemaVersions: string, WebFullUrl: string}}
         * @private
         */
        var _ContextInfo = {
            "FormDigestTimeoutSeconds": "",
            "FormDigestValue": null,
            "LibraryVersion": "",
            "SiteFullUrl": "",
            "SupportedSchemaVersions": "",
            "WebFullUrl": ""
        };

        var _Realm = {
            "State": 0,
            "UserState": 0,
            "Login": "",
            "NameSpaceType": "",
            "FederationBrandName": "",
            "TenantBrandingURL": ""
        };

        var _Branding = {
            "Locale": "",
            "BannerLogo": "",
            "Illustration": "",
            "TileLogo": ""
        };
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentUserProfile = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentUser = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentWeb = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentList = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentItem = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentFile = null;

        /**
         *
         * @type {null}
         * @private
         */
        var _PostQueryUrl = null;

        //endregion

        var XMLtoJSON = function () {
            return new X2JS();
        };

        /**
         *
         * @param username
         * @param password
         * @param endpoint
         * @returns {*}
         * @constructor
         */
        var Configure = function (username, password, endpoint) {

            var deferred = $q.defer();

            _Username = username;
            _Password = password;
            _Endpoint = endpoint;

            Security.Endpoint = endpoint;

            var location = document.createElement("a");
            location.href = "https://" + endpoint;
            _Hostname = location.hostname;

            _SignInUrl = 'https://' + _Hostname + '/_forms/default.aspx?wa=wsignin1.0';
            _ContextInfoUrl = 'https://' + endpoint + '/_api/ContextInfo';
            _CurrentUserUrl = 'https://' + endpoint + '/_api/web/CurrentUser';
            _IdCrlUrl = 'https://' + endpoint + '/_vti_bin/idcrl.svc/';
            _PostQueryUrl = 'https://' + endpoint + '/_api/search/postquery';
            _SitesAsmx = 'https://' + endpoint + '/_vti_bin/sites.asmx';
            _GetContextWebThemeData = 'https://' + endpoint + '_api/SP.Web.GetContextWebThemeData';
            deferred.resolve();

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        var Authenticate = function () {

            var deferred = $q.defer();

            var location = document.createElement("a");
            location.href = "https://" + Security.Endpoint;
            _Hostname = location.hostname;

            GetBearerRealm().then(function(bearer){
                //console.log(bearer);
            });

            GetUserRealm().then(function (realm) {
                //console.log(realm);
                _Realm = realm;
                Security.Realm = _Realm;
                GetBranding().then( function (branding) {
                    //console.log(branding);
                    _Branding = branding;
                    Security.Branding = _Branding;
                });
            });

            GetRemoteSecurityToken().then(function (token) {
                //console.log(token);
                _SecurityToken = angular.element(angular.element.parseXML(token)).find("BinarySecurityToken").text();
                Security.SecurityToken = _SecurityToken;
                $rootScope.SecurityToken = _SecurityToken;
                //console.log(_SecurityToken);
                GetSecurityCookie().then(function (cookie) {
                    //console.log(cookie);
                    GetCurrentUser().then(function (user) {
                        //console.log(user);
                        _CurrentUser = user;
                        Security.CurrentUser = _CurrentUser;
                        Authenticated = true;
                        _UseContextInfo = false;
                        Security.UseContextInfo = false;
                        GetContextInfoService().then(function(contextinfo){
                            _ContextInfo = contextinfo;
                            Security.ContextInfo = _ContextInfo;
                            deferred.resolve();
                        });
                    }); //GetCurrentUser
                }); //GetSecurityCookie
            }); //GetRemoteSecurityToken

            return deferred.promise;
        };

        /**
         * TODO runtime var validation based on CurrentUser and/or ContecxtInfo
         * @type {boolean}
         */
        var Authenticated = true;//(_CurrentUser !== null) ? true : false;

      /**
         *
         * @type {{}}
         */
        var Security = {};

        Security.SetConfiguration = Configure;
        Security.UpdateContextInfo = UpdateContextInfo;
        Security.Authenticate = Authenticate;
        Security.Authenticated = Authenticated;
        Security.GetBearerRealm = GetBearerRealm;
        Security.Endpoint = _Endpoint;
        Security.Hostname = _Hostname;
        Security.ContextInfo = _ContextInfo;
        Security.CurrentUserProfile = _CurrentUserProfile;
        Security.CurrentUser = _CurrentUser;
        Security.CurrentWeb = _CurrentWeb;
        Security.CurrentList = _CurrentList;
        Security.CurrentItem = _CurrentItem;
        Security.CurrentFile = _CurrentFile;
        Security.SecurityToken = _SecurityToken;
        Security.Realm = _Realm;
        Security.Branding = _Branding;
        Security.UseContextInfo = _UseContextInfo;
        Security.XMLtoJSON = XMLtoJSON;
        return Security;

        //region XML Tokens

        /**
         * @return {string}
         */
        function SecurityTokenService() {

            var rst = new Array("");
            rst.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">');
            //Header
            rst.push('<s:Header>');
            rst.push('<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>');
            rst.push('<a:ReplyTo>');
            rst.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
            rst.push('</a:ReplyTo>');
            rst.push('<a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>');
            rst.push('<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
            rst.push('<o:UsernameToken>');
            rst.push('<o:Username>' + _Username + '</o:Username>');
            rst.push('<o:Password>' + _Password + '</o:Password>');
            rst.push('</o:UsernameToken>');
            rst.push('</o:Security>');
            rst.push('</s:Header>');
            //Body
            rst.push('<s:Body>');
            rst.push('<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">');
            rst.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
            rst.push('<a:EndpointReference>');
            rst.push('<a:Address>' + _Hostname + '</a:Address>');
            //rst.push('<a:Address>urn:federation:MicrosoftOnline</a:Address>');
            rst.push('</a:EndpointReference>');
            rst.push('</wsp:AppliesTo>');
            rst.push('<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>');
            //rst.push('<t:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</t:KeyType>');
            rst.push('<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>');
            rst.push('<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>');
            rst.push('</t:RequestSecurityToken>');
            rst.push('</s:Body>');
            rst.push('</s:Envelope>');
            return rst.join("").toString();
            //};
        }

        /**
         * @return {string}
         */
        function RemoteSecurityToken () {
            var rst = new Array("");
            rst.push('<?xml version="1.0" encoding="UTF-8"?>');
            rst.push('<S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust">');
            //Header
            rst.push('<S:Header>');
            rst.push('<wsa:Action S:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</wsa:Action>');
            rst.push('<wsa:To S:mustUnderstand="1">https://login.microsoftonline.com/rst2.srf</wsa:To>');
            rst.push('<ps:AuthInfo xmlns:ps="http://schemas.microsoft.com/LiveID/SoapServices/v1" Id="PPAuthInfo">');
            rst.push('<ps:BinaryVersion>5</ps:BinaryVersion>');
            rst.push('<ps:HostingApp>Managed IDCRL</ps:HostingApp>');
            rst.push('</ps:AuthInfo>');
            rst.push('<wsse:Security>');
            rst.push('<wsse:UsernameToken wsu:Id="user">');
            rst.push('<wsse:Username>' + _Username + '</wsse:Username>');
            rst.push('<wsse:Password>' + _Password + '</wsse:Password>');
            rst.push('</wsse:UsernameToken>');
            /*
             rst.push('<wsu:Timestamp Id="Timestamp">');
             rst.push('<wsu:Created>$(([DateTime]::UtcNow.ToString("o")))</wsu:Created>');
             rst.push('<wsu:Expires>$(([DateTime]::UtcNow.AddDays(1).ToString("o")))</wsu:Expires>');
             rst.push('</wsu:Timestamp>');
             */
            rst.push('</wsse:Security>');
            rst.push('</S:Header>');
            //Body
            rst.push('<S:Body>');
            rst.push('<wst:RequestSecurityToken xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust" Id="RST0">');
            rst.push('<wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType>');
            rst.push('<wsp:AppliesTo>');
            rst.push('<wsa:EndpointReference>');
            rst.push('<wsa:Address>sharepoint.com</wsa:Address>');
            //rst.push('<wsa:Address>' + _Hostname + '</wsa:Address>');
            rst.push('</wsa:EndpointReference>');
            rst.push('</wsp:AppliesTo>');
            rst.push('<wsp:PolicyReference URI="MBI"></wsp:PolicyReference>');
            rst.push('</wst:RequestSecurityToken>');
            rst.push('</S:Body>');
            rst.push('</S:Envelope>');
            return rst.join("").toString();
        }

        /**
         *
         * @returns {string}
         */
        function oAuthToken(){

            var rst = new Array("");
            /*
            xmlString.append("<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" ");
            xmlString.append("xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"  ");
            xmlString.append("xmlns:saml=\"urn:oasis:names:tc:SAML:1.0:assertion\"  ");
            xmlString.append("xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"  ");
            xmlString.append("xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"  ");
            xmlString.append("xmlns:wsa=\"http://www.w3.org/2005/08/addressing\"  ");
            xmlString.append("xmlns:wssc=\"http://schemas.xmlsoap.org/ws/2005/02/sc\"  ");
            xmlString.append("xmlns:wst=\"http://schemas.xmlsoap.org/ws/2005/02/trust\"> ");
            xmlString.append("<s:Header> ");
            xmlString.append("<wsa:Action s:mustUnderstand=\"1\">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</wsa:Action> ");
            xmlString.append("<wsa:To s:mustUnderstand=\"1\">" + ourOAuthService + "</wsa:To> ");
            xmlString.append("<wsa:MessageID>").append(UUID.randomUUID().toString()).append("</wsa:MessageID> ");
            xmlString.append("<ps:AuthInfo xmlns:ps=\"http://schemas.microsoft.com/Passport/SoapServices/PPCRL\" Id=\"PPAuthInfo\"> ");
            xmlString.append("<ps:HostingApp>Managed IDCRL</ps:HostingApp> ");
            xmlString.append("<ps:BinaryVersion>6</ps:BinaryVersion> ");
            xmlString.append("<ps:UIVersion>1</ps:UIVersion> ");
            xmlString.append("<ps:Cookies></ps:Cookies> ");
            xmlString.append("<ps:RequestParams>AQAAAAIAAABsYwQAAAAxMDMz</ps:RequestParams> ");
            xmlString.append("</ps:AuthInfo> ");
            xmlString.append("<wsse:Security> ");
            xmlString.append("<wsse:UsernameToken wsu:Id=\"user\"> ");
            xmlString.append("<wsse:Username>").append(USERNAME).append("</wsse:Username> ");
            xmlString.append("<wsse:Password>").append(PASSWORD).append("</wsse:Password> ");
            xmlString.append("</wsse:UsernameToken> ");
            xmlString.append("<wsu:Timestamp Id=\"Timestamp\"> ");
            xmlString.append("<wsu:Created>" + getTimeString(0) + "</wsu:Created> ");
            xmlString.append("<wsu:Expires>" + getTimeString(10) + "</wsu:Expires> ");
            xmlString.append("</wsu:Timestamp> ");
            xmlString.append("</wsse:Security> ");
            xmlString.append("</s:Header> ");
            xmlString.append("<s:Body> ");
            xmlString.append("<wst:RequestSecurityToken Id=\"RST0\"> ");
            xmlString.append("<wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType> ");
            xmlString.append("<wsp:AppliesTo> ");
            xmlString.append("<wsa:EndpointReference> ");
            xmlString.append("<wsa:Address>urn:federation:MicrosoftOnline</wsa:Address> ");
            xmlString.append("</wsa:EndpointReference> ");
            xmlString.append("</wsp:AppliesTo> ");
            xmlString.append("<wst:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</wst:KeyType> ");
            xmlString.append("</wst:RequestSecurityToken> ");
            xmlString.append("</s:Body> ");
            xmlString.append("</s:Envelope> ");
            */
            return rst.join("").toString();
        }

        /**
         * @return {string}
         */
        function FormDigestInformationToken() {
            var fdit = new Array("");
            fdit.push('<?xml version="1.0" encoding="utf-8"?>');
            fdit.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
            fdit.push('<soap:Body>');
            fdit.push('<GetUpdatedFormDigestInformation xmlns="http://schemas.microsoft.com/sharepoint/soap/" />');
            fdit.push('</soap:Body>');
            fdit.push('</soap:Envelope>');
            return fdit.join("").toString();
        }

        //endregion

        //region MetaData

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetBearerRealm() {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                //async: true,
                url: "https://"+_Hostname+"/_vti_bin/client.svc/",
                withCredentials: false,
                headers: {
                    "Authorization": "Bearer",
                    "Accept": "application/json;odata=verbose",
                    "Access-Control-Allow-Headers": "WWW-Authenticate"
                }
            }).then(function (response) {
                var bearer = response.headers()['WWW-Authenticate'];
                deferred.resolve(bearer);
            }, function(response) {
                var bearer = response.headers()['WWW-Authenticate'];
                deferred.resolve(bearer);
                //$scope.data = response.data || "Request failed";
                //$scope.status = response.status;
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetUserRealm() {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                withCredentials: false,
                url: "https://login.microsoftonline.com/GetUserRealm.srf?xml=0&login=" + _Username,
                headers: {
                    "Accept": "application/json;odata=verbose"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetBranding() {
            var deferred = $q.defer();

            if (_Realm === null || _Realm.TenantBrandingURL === null) {
                deferred.reject();
            }

            $http({
                method: 'GET',
                withCredentials: false,
                url: _Realm.TenantBrandingURL.valueOf(),
                headers: {
                    "Accept": "application/json;odata=verbose"
                    //"Content-Type": "application/json;odata=verbose"
                }
            }).success(function (data) {
                var branding = data;
                //var branding = JSON.parse(data)[0];
                deferred.resolve(branding);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function GetContextWebThemeData() {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                //withCredentials: false,
                url: _GetContextWebThemeData,
                headers: {
                    "Accept": "application/json;odata=verbose"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        //endregion


        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetSecurityTokenService() {
            var deferred = $q.defer();
            var message = SecurityTokenService();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/extSTS.srf',
                data: message,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    'Content-Type': 'application/soap+xml; charset=utf-8'
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetRemoteSecurityToken() {
            var deferred = $q.defer();
            var message = RemoteSecurityToken();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/rst2.srf',
                data: message,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    'Content-Type': 'application/soap+xml; charset=utf-8'
                }
            }).success(function (data) {
                //var SPOIDCRL = $cookies.get('SPOIDCRL');
                //$cookies.put('FedAuth', SPOIDCRL);

                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetRemoteLogin(){
            var deferred = $q.defer();
            var message = RemoteSecurityToken();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/login.srf',
                data: message,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    'Content-Type': 'application/soap+xml; charset=utf-8'
                }
            }).success(function (data) {
                //var SPOIDCRL = $cookies.get('SPOIDCRL');
                //$cookies.put('FedAuth', SPOIDCRL);

                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /*
        //https://login.windows.net/common/oauth2/authorize
        //https://login.live.com/oauth20_authorize.srf
        function oAuthAuthorize(){
            var deferred = $q.defer();

            return deferred.promise;
        }
        //https://login.live.com/oauth20_token.srf
        function oAuthToken() {
            var deferred = $q.defer();

            return deferred.promise;
        }
        function oAuthRefresh(){
            var deferred = $q.defer();

            return deferred.promise;
        }
        //https://login.live.com/oauth20_logout.srf
        function oAuthLogout(){
            var deferred = $q.defer();

            return deferred.promise;
        }
        */

        //IDentity Client Runtime Library service
        /**
         *
         * @returns {*}
         * @constructor
         */
        function  GetSecurityCookie() {
            var deferred = $q.defer();

            $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ _SecurityToken;

            $http({
                method: 'GET',
                url: _IdCrlUrl,
                //withCredentials: false,
                //cache: false,
                headers: {
                    //"Accept": "application/json;odata=verbose",
                    //'Content-Type' : 'text/plain',//'application/x-www-form-urlencoded',
                    //'Authorization' : 'BPOSIDCRL '+ _SecurityToken
                }
            }).success(function (data) {

                //var SPOIDCRL = $cookies.get('SPOIDCRL');
                //$cookies.put('FedAuth', SPOIDCRL);
                //delete $http.defaults.headers.common.Authorization;// = undefined;
                deferred.resolve(data);
            }).error(function () {
                //delete $http.defaults.headers.common.Authorization;// = undefined;
                deferred.reject();
            });
            //$http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ _SecurityToken;
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetHttpCookies() {
            var deferred = $q.defer();

            if (_SecurityToken.length === 0) {
                deferred.reject();
            }
            else {
                $http({
                    method: 'POST',
                    //withCredentials: true,
                    url: _SignInUrl,
                    data: _SecurityToken,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'//,
                        //Accept: "application/json;odata=verbose"
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetCurrentUser() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                withCredentials: false,
                url: _CurrentUserUrl,
                headers: {
                    Accept: "application/json;odata=verbose"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetContextInfo() {

            var deferred = $q.defer();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            var message = FormDigestInformationToken();

            $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ _SecurityToken;
            $http.defaults.headers.common['X-FORMS_BASED_AUTH_ACCEPTED'] = 'f';
            //$http.defaults.headers.common.Origin = _ContextInfoUrl;
            $http({
                url: _ContextInfoUrl,
                method: "POST",
                withCredentials: false,
                data: message,
                headers: {
                    'Accept': 'application/json;odata=verbose',//;charset=utf-8",
                    //'Content-Type': 'text/plain'
                    'Content-Type': 'application/json;odata=verbose'//;charset="utf-8"'//'text/xml; charset="utf-8"'
                }
            }).success(function (response) {

                if(response !== "") {
                    var ContextInfo = _ContextInfo;
                    if (angular.isDefined(response.GetContextWebInformation)) {
                        ContextInfo = response.GetContextWebInformation;
                    }
                    else {
                        ContextInfo = response;
                    }

                    _ContextInfo = ContextInfo;
                    Security.ContextInfo = _ContextInfo;
                    $rootScope.FormDigestValue = ContextInfo.FormDigestValue;
                    delete $http.defaults.headers.common.Authorization;// = undefined;
                    deferred.resolve(ContextInfo);
                }
                else {
                    deferred.resolve(response);
                }
            }, function (response) {
                //console.log("Cannot get digestValue.");
                delete $http.defaults.headers.common.Authorization;// = undefined;
                deferred.reject();
            });
            return deferred.promise;
        }


        function GetContextInfoService()
        {
            var deferred = $q.defer();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            var message = FormDigestInformationToken();

            $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ _SecurityToken;
            $http.defaults.headers.common['X-FORMS_BASED_AUTH_ACCEPTED'] = 'f';
            //$http.defaults.headers.common.Origin = _ContextInfoUrl;
            $http({
                url: _SitesAsmx,
                method: "POST",
                withCredentials: false,
                data: message,
                headers: {
                    'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigestInformation',
                    'X-RequestForceAuthentication': 'true',
                    'Content-Type': 'text/xml; charset="utf-8"'
                }
            }).success(function (response) {

                var ContextInfo = _ContextInfo;

                ContextInfo.FormDigestTimeoutSeconds = angular.element(angular.element.parseXML(response)).find("TimeoutSeconds").text();
                ContextInfo.FormDigestValue = angular.element(angular.element.parseXML(response)).find("DigestValue").text();
                ContextInfo.WebFullUrl = angular.element(angular.element.parseXML(response)).find("WebFullUrl").text();
                ContextInfo.LibraryVersion = angular.element(angular.element.parseXML(response)).find("LibraryVersion").text();
                //ContextInfo.SiteFullUrl = angular.element(angular.element.parseXML(response)).find("SiteFullUrl").text();
                ContextInfo.SupportedSchemaVersions = angular.element(angular.element.parseXML(response)).find("SupportedSchemaVersions").text();

                _ContextInfo = ContextInfo;
                Security.ContextInfo = _ContextInfo;
                $rootScope.FormDigestValue = ContextInfo.FormDigestValue;
                delete $http.defaults.headers.common.Authorization;// = undefined;
                deferred.resolve(ContextInfo);
            }, function (response) {
                //console.log("Cannot get digestValue.");
                delete $http.defaults.headers.common.Authorization;// = undefined;
                deferred.reject();
            });
            return deferred.promise;
        }

        function UpdateContextInfo() {

            var deferred = $q.defer();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            var message = FormDigestInformationToken();

            if(_UseContextInfo) {
                $http.defaults.headers.common['X-FORMS_BASED_AUTH_ACCEPTED'] = 'f';
                $http({
                    url: _ContextInfoUrl,
                    method: "POST",
                    withCredentials: false,
                    data: message,
                    headers: {
                        'Accept': "application/json;odata=verbose",
                        'Content-Type': 'application/json;odata=verbose'//'text/xml; charset="utf-8"'
                    }
                }).success(function (response) {

                    var ContextInfo = _ContextInfo;
                    if (angular.isDefined(response.GetContextWebInformation)) {
                        ContextInfo = response.GetContextWebInformation;
                    }
                    else {
                        ContextInfo = response;
                    }
                    _ContextInfo = ContextInfo;
                    Security.ContextInfo = _ContextInfo;
                    $rootScope.FormDigestValue = ContextInfo.FormDigestValue;
                    delete $http.defaults.headers.common.Authorization;// = undefined;
                    //setTimeout(function () {
                    //   UpdateContextInfo();
                    //}
                    //, _ContextInfo.FormDigestTimeoutSeconds);

                    deferred.resolve(_ContextInfo);
                }, function (response) {
                    delete $http.defaults.headers.common.Authorization;// = undefined;
                    deferred.reject();
                });
            }
            else {
                $http.defaults.headers.common['X-FORMS_BASED_AUTH_ACCEPTED'] = 'f';
                $http({
                    url: _SitesAsmx,
                    method: "POST",
                    withCredentials: true,
                    data: message,
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigestInformation',
                        'X-RequestForceAuthentication': 'true',
                        'Content-Type': 'text/xml; charset="utf-8"'
                    }
                }).success(function (response) {

                    var ContextInfo = _ContextInfo;

                    ContextInfo.FormDigestTimeoutSeconds = angular.element(angular.element.parseXML(response)).find("TimeoutSeconds").text();
                    ContextInfo.FormDigestValue = angular.element(angular.element.parseXML(response)).find("DigestValue").text();
                    ContextInfo.WebFullUrl = angular.element(angular.element.parseXML(response)).find("WebFullUrl").text();
                    ContextInfo.LibraryVersion = angular.element(angular.element.parseXML(response)).find("LibraryVersion").text();
                    //ContextInfo.SiteFullUrl = angular.element(angular.element.parseXML(response)).find("SiteFullUrl").text();
                    ContextInfo.SupportedSchemaVersions = angular.element(angular.element.parseXML(response)).find("SupportedSchemaVersions").text();

                    _ContextInfo = ContextInfo;
                    Security.ContextInfo = _ContextInfo;
                    $rootScope.FormDigestValue = ContextInfo.FormDigestValue;
                    delete $http.defaults.headers.common.Authorization;// = undefined;
                    deferred.resolve(ContextInfo);
                }, function (response) {
                    //console.log("Cannot get digestValue.");
                    delete $http.defaults.headers.common.Authorization;// = undefined;
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetPostQuery() {

            var deferred = $q.defer();

            $http({

                url: _PostQueryUrl,
                method: "POST",
                //withCredentials: false,
                data: null,
                headers: {
                    //'X-FORMS_BASED_AUTH_ACCEPTED' : 'f',
                    //'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose'
                }
            }).success(function (response) {
                //Security.ContextInfo = response.data;
                deferred.resolve(response);
                //validated(Security.ContextInfo.FormDigestValue);
            }, function (response) {
                //console.log("Cannot get digestValue.");
                deferred.reject();
            });
            return deferred.promise;


        }
    }]);

})();