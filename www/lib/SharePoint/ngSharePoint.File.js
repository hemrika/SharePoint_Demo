(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngFile', ['ngSecurity', '$timeout', '$http', '$resource', '$q', function (ngSecurity, $timeout, $http, $resource, $q) {

        var ngFile = {};

        var _ngFile = {
            "Author": {
                "__deferred": {
                    "uri": "/Author"
                }
            },
            "CheckedOutByUser": {
                "__deferred": {
                    "uri": "/CheckedOutByUser"
                }
            },
            "ListItemAllFields": {
                "__deferred": {
                    "uri": "/ListItemAllFields"
                }
            },
            "ModifiedBy": {
                "__deferred": {
                    "uri": "/ModifiedBy"
                }
            },
            "Properties": {
                "__deferred": {
                    "uri": "/Properties"
                }
            },
            "Versions": {
                "__deferred": {
                    "uri": "/Versions"
                }
            },
            "CheckInComment": "",
            "CheckOutType": 2,
            "Exists": true,
            "Length": "", //"20705",
            "Level": 1,
            "LinkingUrl": "", //https://duwboot.sharepoint.com/sites/BLAUD/Gedeelde  documenten/1. Algemeen/Inventarisatie klantgegevens.docx?d=w73c80a9758f14ed79f6df7099046940a",
            "MajorVersion": 7,
            "MinorVersion": 0,
            "Name": "",//"Inventarisatie klantgegevens.docx",
            "ServerRelativeUrl": "",// "/sites/BLAUD/Gedeelde  documenten/1. Algemeen/Inventarisatie klantgegevens.docx",
            "TimeCreated": "",
            "TimeLastModified": "",
            "Title": "",
            "UniqueId": ""
        };

        var API = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/File/:Deferred",
            {},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        var _SOAP = $resource("https://:EndPoint/_vti_bin/Lists.asmx",
            {},
            {
                New: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/AddAttachment',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                },
                /*Update: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                },*/
                Delete: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/DeleteAttachment',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                }
            }
            );

        ngFile = function (identifier) {

            var deferred = $q.defer();

            /**
             * Are we Authenticated ?
             */
            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            //region Properties

            this.CheckInComment = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckInComment = value) : _ngFile.CheckInComment;
            };

            this.CheckOutType = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckOutType = value) : _ngFile.CheckOutType;
            };
            this.Exists = function (value) {
                return angular.isDefined(value) ? (_ngFile.Exists = value) : _ngFile.Exists;
            };
            this.Length = function (value) {
                return angular.isDefined(value) ? (_ngFile.Length = value) : _ngFile.Length;
            };
            this.CheckInComment = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckInComment = value) : _ngFile.CheckInComment;
            };
            this.Level = function (value) {
                return angular.isDefined(value) ? (_ngFile.Level = value) : _ngFile.Level;
            };
            this.LinkingUrl = function (value) {
                return angular.isDefined(value) ? (_ngFile.LinkingUrl = value) : _ngFile.LinkingUrl;
            };
            this.MajorVersion = function (value) {
                return angular.isDefined(value) ? (_ngFile.MajorVersion = value) : _ngFile.MajorVersion;
            };
            this.MinorVersion = function (value) {
                return angular.isDefined(value) ? (_ngFile.MinorVersion = value) : _ngFile.MinorVersion;
            };
            this.Name = function (value) {
                return angular.isDefined(value) ? (_ngFile.Name = value) : _ngFile.Name;
            };
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngFile.ServerRelativeUrl = value) : _ngFile.ServerRelativeUrl;
            };
            this.TimeCreated = function (value) {
                return angular.isDefined(value) ? (_ngFile.TimeCreated = value) : _ngFile.TimeCreated;
            };
            this.TimeLastModified = function (value) {
                return angular.isDefined(value) ? (_ngFile.TimeLastModified = value) : _ngFile.TimeLastModified;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngFile.Title = value) : _ngFile.Title;
            };
            this.UniqueId = function (value) {
                return angular.isDefined(value) ? (_ngFile.UniqueId = value) : _ngFile.UniqueId;
            };
            //endregion

            //region Deferred

            this.Author = function () {
                var Operator = _ngFile.Author.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
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

            this.CheckedOutByUser = function () {
                var Operator = _ngFile.CheckedOutByUser.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
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

            this.ListItemAllFields = function () {
                var Operator = _ngList.ListItemAllFields.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
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

            this.ModifiedBy = function () {
                var Operator = _ngList.ModifiedBy.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
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

            this.Properties = function () {
                var Operator = _ngList.Properties.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
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

            this.Versions = function () {
                var Operator = _ngList.Versions.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
            };

            this.value = function () {
                var Operator = "$value";
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
            };

            //endregion

            //region Methods

            this.Delete = function() {

                var deferred = $q.defer();

                var Envelope = new Array("");
                Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                Envelope.push('<soap:Body>');
                Envelope.push('<DeleteAttachment xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                Envelope.push('<listItemID>{' + ngSecurity.CurrentItem.Properties.Id + '}</listItemID>');
                var self = this;
                Envelope.push('<url>' + self.ServerRelativeUrl + '</url>');
                Envelope.push('</DeleteAttachment>');
                Envelope.push('</soap:Body>');
                Envelope.push('</soap:Envelope>');

                var url = "https://"+ngSecurity.Endpoint+"/_vti_bin/Lists.asmx";

                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/DeleteAttachment',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    },
                    data: Envelope.join("").toString()
                };

                $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ ngSecurity.SecurityToken;

                $http(req).then(function(result){
                    //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                    //console.log(result.toString());
                    //var jsonObj = XMLtoJSON.xml_str2json(result.data);
                    var jsonObj2 = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                    var ErrorCode = jsonObj2.Envelope.Body.DeleteAttachmentResponse.DeleteAttachmentResult.Results.Result.ErrorCode.valueOf();

                    if(ErrorCode.indexOf("0x00000000") === -1) {
                        var ErrorText = jsonObj2.Envelope.Body.DeleteAttachmentResponse.DeleteAttachmentResult.Results.Result.ErrorText.valueOf();
                        deferred.reject(ErrorText);}
                    else {
                        var ows_row = jsonObj2.Envelope.Body.DeleteAttachmentResponse.DeleteAttachmentResult.Results.Result.row;

                        /*
                        self.Fields.forEach(function(field) {
                            console.log(field.EntityPropertyName);
                            if((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_"+field.EntityPropertyName])) ){
                                self[field.EntityPropertyName] = ows_row["_ows_"+field.EntityPropertyName];
                            }

                        });
                        */
                        deferred.resolve(self);
                    }

                    //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                    //deferred.resolve(result.data);
                });

                return deferred.promise;
            };

            this.Add = function(value) {

                var deferred = $q.defer();

                var Envelope = new Array("");
                Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                Envelope.push('<soap:Body>');
                Envelope.push('<AddAttachment xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                Envelope.push('<listItemID>{' + ngSecurity.CurrentItem.Properties.Id + '}</listItemID>');
                var self = this;
                Envelope.push('<fileName>' + self.Name + '</fileName>');
                Envelope.push('<attachment>' + value + '</attachment>');
                Envelope.push('</AddAttachment>');
                Envelope.push('</soap:Body>');
                Envelope.push('</soap:Envelope>');

                var url = "https://"+ngSecurity.Endpoint+"/_vti_bin/Lists.asmx";

                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/AddAttachment',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    },
                    data: Envelope.join("").toString()
                };

                $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ ngSecurity.SecurityToken;

                $http(req).then(function(result){
                    //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                    //console.log(result.toString());
                    //var jsonObj = XMLtoJSON.xml_str2json(result.data);
                    var jsonObj2 = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                    var ErrorCode = jsonObj2.Envelope.Body.AddAttachmentResponse.AddAttachmentResult.Results.Result.ErrorCode.valueOf();

                    if(ErrorCode.indexOf("0x00000000") === -1) {
                        var ErrorText = jsonObj2.Envelope.Body.AddAttachmentResponse.AddAttachmentResult.Results.Result.ErrorText.valueOf();
                        deferred.reject(ErrorText);}
                    else {
                        var ows_row = jsonObj2.Envelope.Body.AddAttachmentResponse.AddAttachmentResult.Results.Result.row;

                        /*
                        self.Fields.forEach(function(field) {
                            console.log(field.EntityPropertyName);
                            if((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_"+field.EntityPropertyName])) ){
                                self[field.EntityPropertyName] = ows_row["_ows_"+field.EntityPropertyName];
                            }

                        });
                        */
                        deferred.resolve(self);
                    }

                    //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                    //deferred.resolve(result.data);
                });

                return deferred.promise;
            };

            //endregion

            var self = this;

            if ( angular.isDefined(identifier)) {
            }
            //if (ngSecurity.CurrentUser !== null) {
                API.get({
                    EndPoint: ngSecurity.Endpoint,
                    List: ngSecurity.CurrentList.Id,
                    Item: ngSecurity.CurrentItem.Id
                }).$promise.then(
                    function (data) {
                        _ngFile = data;
                        ngSecurity.CurrentFile = self;
                        self.Properties = _ngFile;
                        deferred.resolve(self);
                    });
            //}

            return deferred.promise;

        };

        return ngFile;
    }]);

})();
