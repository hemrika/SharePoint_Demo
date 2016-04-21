(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngItem', ['ngSecurity', 'ngFile', /*'ngFolder',*/ '$timeout', '$http', '$resource', '$q', function (ngSecurity, ngFile, /*ngFolder,*/ $timeout, $http, $resource, $q) {

        var ngItem = {};

        var _ngItem = {
            "__metadata": {
                "type": "type':SP.listnameListItem"
            },
            "AttachmentFiles": {
                "__deferred": {
                    "uri": "/AttachmentFiles"
                }
            },
            "ContentType": {
                "__deferred": {
                    "uri": "/ContentType"
                }
            },
            "FieldValuesAsHtml": {
                "__deferred": {
                    "uri": "/FieldValuesAsHtml"
                }
            },
            "FieldValuesAsText": {
                "__deferred": {
                    "uri": "/FieldValuesAsText"
                }
            },
            "FieldValuesForEdit": {
                "__deferred": {
                    "uri": "/FieldValuesForEdit"
                }
            },
            "File": {
                "__deferred": {
                    "uri": "/File"
                }
            },
            "Folder": {
                "__deferred": {
                    "uri": "/Folder"
                }
            },
            "ParentList": {
                "__deferred": {
                    "uri": "/ParentList"
                }
            },
            "FileSystemObjectType": 0,
            "Id": 1,
            "ContentTypeId": "",
            "Title": "",
            "Modified": "",
            "Created": "",
            "Attachments": false,
            "GUID": ""
        };

        var _SOAP = $resource("https://:EndPoint/_vti_bin/Lists.asmx",
            {},
            {
                New: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                },
                Update: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                },
                Delete: {
                    method: 'POST',
                    params: {EndPoint: ''},
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    }
                }
            }
        );

        var _item = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/:Deferred",
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

        var _items = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items",
            {},//{ EndPoint: '', List: '', Item: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        ngItem = function (identifier) {

            var deferred = $q.defer();

            /**
             * Are we Authenticated ?
             */
            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            //region Properties

            this.FileSystemObjectType = function (value) {
                return angular.isDefined(value) ? (_ngItem.FileSystemObjectType = value) : _ngItem.FileSystemObjectType;
            };
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngItem.Id = value) : _ngItem.Id;
            };
            this.ContentTypeId = function (value) {
                return angular.isDefined(value) ? (_ngItem.ContentTypeId = value) : _ngItem.ContentTypeId;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngItem.Title = value) : _ngItem.Title;
            };
            this.Modified = function (value) {
                return angular.isDefined(value) ? (_ngItem.Modified = value) : _ngItem.Modified;
            };
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.Attachments = function (value) {
                return angular.isDefined(value) ? (_ngItem.Attachments = value) : _ngItem.Attachments;
            };

            this.GUID = function () {
                return angular.isDefined(value) ? (_ngItem.GUID = value) : _ngItem.GUID;
            };

            //endregion

            //region Deferred

            this.AttachmentFiles = function (value) {

                if (angular.isDefined(value)) {
                    return new ngFile(value);
                }
                else {

                    var deferred = $q.defer();

                    var Operator = _ngItem.AttachmentFiles.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        _item.deferred({
                            EndPoint: ngSecurity.Endpoint,
                            List: ngSecurity.CurrentList.Properties.Id,
                            Item: _ngItem.Id,
                            Deferred: Operator
                        }).$promise.then(
                            function (data) {
                                if (angular.isDefined(data.results)) {
                                    data.results.__deferred = _ngItem.AttachmentFiles.__deferred;
                                    deferred.resolve(data.results);
                                }
                                else {
                                    data.__deferred = _ngItem.AttachmentFiles.__deferred;
                                    deferred.resolve(data);
                                }
                            });
                    }
                    return deferred.promise;
                }
            };

            this.ContentType = function () {
                var Operator = _ngItem.ContentType.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id(),
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.ContentType.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.ContentType.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.FieldValuesAsHtml = function () {
                var Operator = _ngItem.FieldValuesAsHtml.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: _ngList.Id,
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.FieldValuesAsHtml.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.FieldValuesAsHtml.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.FieldValuesAsText = function () {
                var Operator = _ngItem.FieldValuesAsText.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id(),
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.FieldValuesAsText.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.FieldValuesAsText.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.FieldValuesForEdit = function () {
                var Operator = _ngItem.FieldValuesForEdit.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id(),
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.FieldValuesForEdit.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.FieldValuesForEdit.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Files = function (value) {

                if (angular.isDefined(value)) {
                    return new ngFile(value);
                }
                else {

                }
                //return new ngFile();
                /*
                 var Operator = _ngList.File.__deferred.uri.split('/').pop();
                 if (ngSecurity.CurrentUser !== null) {
                 API.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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

            this.Folder = function () {

                var Operator = _ngItem.Folder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id(),
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.Folder.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.Folder.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.ParentList = function () {
                var Operator = _ngItem.ParentList.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id(),
                        Item: _ngItem.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngItem.ParentList.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngItem.ParentList.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            //endregion

            //region Methods

            this.Update = function () {

                if (this.Properties.Id < 0) {
                    this.Save();
                }
                else {
                    var deferred = $q.defer();

                    /*
                     var url = "https://"+ngSecurity.Endpoint+"/_api/Web/Lists(guid'"+ngSecurity.CurrentList.Properties.Id+"')/Items";

                     var item = {
                     '__metadata': {
                     'type': 'SP.Data.CordovaListItem'
                     },
                     'Title' : 'IDentity Client Runtime Library service'
                     };

                     //angular.element.cors = true;

                     var settings = {
                     "async": true,
                     //"crossDomain": true,
                     "url": url,
                     "method": "POST",
                     "headers": {
                     "authorization": "BPOSIDCRL "+ ngSecurity.SecurityToken,
                     //"origin": "file//*",
                     "content-type": "application/json;odata=verbose",
                     "accept": "application/json;odata=verbose",
                     "x-requestdigest": ngSecurity.ContextInfo.FormDigestValue
                     },
                     "data": JSON.stringify(item)
                     }

                     angular.element.ajax(settings).done(function (response) {
                     console.log(response);
                     deferred.resolve(response);
                     });
                     */

                    var Envelope = new Array("");
                    Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                    Envelope.push('<soap:Body>');
                    Envelope.push('<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                    Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                    Envelope.push('<updates>');
                    Envelope.push('<Batch OnError="Continue">');
                    Envelope.push('<Method ID="1" Cmd="Update">');
                    Envelope.push('<Field Name="ID">' + this.Properties.Id + '</Field>');
                    var self = this;
                    self.Fields.forEach(function (field) {
                        if (field.Value !== self.Properties[field.EntityPropertyName]) {
                            Envelope.push('<Field Name="' + field.EntityPropertyName + '">' + field.Value + '</Field>');
                        }
                        //console.log(field);
                    });

                    //Envelope.push('<Field Name="ID">New</Field>');
                    //Envelope.push('<Field Name="Title">IDentity Client Runtime Library service</Field>');
                    Envelope.push('</Method>');
                    Envelope.push('</Batch>');
                    Envelope.push('</updates>');
                    Envelope.push('</UpdateListItems>');
                    Envelope.push('</soap:Body>');
                    Envelope.push('</soap:Envelope>');

                    var url = "https://" + ngSecurity.Endpoint + "/_vti_bin/Lists.asmx";

                    var req = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                            'Content-Type': 'text/xml; charset="UTF-8"'
                        },
                        data: Envelope.join("").toString()
                    };

                    $http.defaults.headers.common.Authorization = 'BPOSIDCRL ' + ngSecurity.SecurityToken;

                    $http(req).then(function (result) {
                        //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                        //console.log(result.toString());
                        //var jsonObj = XMLtoJSON.xml_str2json(result.data);
                        var jsonObj2 = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                        var ErrorCode = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorCode.valueOf();

                        if (ErrorCode.indexOf("0x00000000") === -1) {
                            var ErrorText = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorText.valueOf();
                            deferred.reject(ErrorText);
                        }
                        else {
                            var ows_row = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.row;

                            self.Fields.forEach(function (field) {
                                console.log(field.EntityPropertyName);
                                if ((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_" + field.EntityPropertyName]))) {
                                    self[field.EntityPropertyName] = ows_row["_ows_" + field.EntityPropertyName];
                                }

                            });
                            deferred.resolve(self);
                        }

                        //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                        //deferred.resolve(result.data);
                    });

                    return deferred.promise;
                }
            };

            this.Delete = function () {

                var deferred = $q.defer();

                var Envelope = new Array("");
                Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                Envelope.push('<soap:Body>');
                Envelope.push('<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                Envelope.push('<updates>');
                Envelope.push('<Batch OnError="Continue">');
                Envelope.push('<Method ID="1" Cmd="Delete">');
                Envelope.push('<Field Name="ID">' + this.Properties.Id + '</Field>');
                /*
                 var self = this;
                 self.Fields.forEach(function(field) {
                 if(field.Value !== self.Properties[field.EntityPropertyName]) {
                 Envelope.push('<Field Name="' + field.EntityPropertyName + '">' + field.Value + '</Field>');
                 }
                 //console.log(field);
                 });
                 */
                //Envelope.push('<Field Name="ID">New</Field>');
                //Envelope.push('<Field Name="Title">IDentity Client Runtime Library service</Field>');
                Envelope.push('</Method>');
                Envelope.push('</Batch>');
                Envelope.push('</updates>');
                Envelope.push('</UpdateListItems>');
                Envelope.push('</soap:Body>');
                Envelope.push('</soap:Envelope>');

                var url = "https://" + ngSecurity.Endpoint + "/_vti_bin/Lists.asmx";

                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                        'Content-Type': 'text/xml; charset="UTF-8"'
                    },
                    data: Envelope.join("").toString()
                };

                $http.defaults.headers.common.Authorization = 'BPOSIDCRL ' + ngSecurity.SecurityToken;

                $http(req).then(function (result) {
                    //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                    //console.log(result.toString());
                    //var jsonObj = XMLtoJSON.xml_str2json(result.data);
                    var jsonObj2 = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                    var ErrorCode = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorCode.valueOf();

                    if (ErrorCode.indexOf("0x00000000") === -1) {
                        var ErrorText = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorText.valueOf();
                        deferred.reject(ErrorText);
                    }
                    else {
                        var ows_row = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.row;

                        self.Fields.forEach(function (field) {
                            console.log(field.EntityPropertyName);
                            if ((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_" + field.EntityPropertyName]))) {
                                self[field.EntityPropertyName] = ows_row["_ows_" + field.EntityPropertyName];
                            }

                        });
                        deferred.resolve(self);
                    }

                    //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                    //deferred.resolve(result.data);
                });

                return deferred.promise;
            };

            this.Save = function () {

                if (this.Properties.Id > 0) {
                    this.Update();
                }
                else {
                    var deferred = $q.defer();

                    var Envelope = new Array("");
                    Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                    Envelope.push('<soap:Body>');
                    Envelope.push('<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                    Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                    Envelope.push('<updates>');
                    Envelope.push('<Batch OnError="Continue">');
                    Envelope.push('<Method ID="1" Cmd="New">');
                    Envelope.push('<Field Name="ID">New</Field>');
                    var self = this;
                    self.Fields.forEach(function (field) {
                        if (field.Value !== self.Properties[field.EntityPropertyName]) {
                            Envelope.push('<Field Name="' + field.EntityPropertyName + '">' + field.Value + '</Field>');
                        }
                        //console.log(field);
                    });

                    //Envelope.push('<Field Name="ID">New</Field>');
                    //Envelope.push('<Field Name="Title">IDentity Client Runtime Library service</Field>');
                    Envelope.push('</Method>');
                    Envelope.push('</Batch>');
                    Envelope.push('</updates>');
                    Envelope.push('</UpdateListItems>');
                    Envelope.push('</soap:Body>');
                    Envelope.push('</soap:Envelope>');

                    var url = "https://" + ngSecurity.Endpoint + "/_vti_bin/Lists.asmx";

                    var req = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems',
                            'Content-Type': 'text/xml; charset="UTF-8"'
                        },
                        data: Envelope.join("").toString()
                    };

                    $http.defaults.headers.common.Authorization = 'BPOSIDCRL ' + ngSecurity.SecurityToken;

                    $http(req).then(function (result) {
                        //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                        //console.log(result.toString());
                        //var jsonObj = XMLtoJSON.xml_str2json(result.data);
                        var jsonObj2 = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                        var ErrorCode = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorCode.valueOf();

                        if (ErrorCode.indexOf("0x00000000") === -1) {
                            var ErrorText = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.ErrorText.valueOf();
                            deferred.reject(ErrorText);
                        }
                        else {
                            var ows_row = jsonObj2.Envelope.Body.UpdateListItemsResponse.UpdateListItemsResult.Results.Result.row;

                            self.Fields.forEach(function (field) {
                                console.log(field.EntityPropertyName);
                                if ((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_" + field.EntityPropertyName]))) {
                                    self[field.EntityPropertyName] = ows_row["_ows_" + field.EntityPropertyName];
                                }

                            });
                            deferred.resolve(self);
                        }

                        //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                        //deferred.resolve(result.data);
                    });
                }

                return deferred.promise;
            };

            this.AddFile = function (name, value) {

                var deferred = $q.defer();

                var Envelope = new Array("");
                Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                Envelope.push('<soap:Body>');
                Envelope.push('<AddAttachment xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                Envelope.push('<listName>{' + ngSecurity.CurrentList.Properties.Id + '}</listName>');
                Envelope.push('<listItemID>' + ngSecurity.CurrentItem.Properties.Id + '</listItemID>');
                var self = this;
                Envelope.push('<fileName>' + name + '</fileName>');
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
                        //'Content-Type' : "application/soap+xml; charset=utf-8"
                    },
                    data: Envelope.join("").toString()
                };

                $http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ ngSecurity.SecurityToken;

                $http(req).then(function(result){
                    //_SOAP.Update({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                    //console.log(result.toString());
                    var jsonObj = ngSecurity.XMLtoJSON().xml_str2json(result.data);
                    var ErrorCode = "0x00000000";
                    var ErrorText = "";

                    if(angular.isDefined(jsonObj.Envelope.Body.Fault)){
                        ErrorCode = jsonObj.Envelope.Body.Fault.detail.errorcode.toString();
                    }

                    if(ErrorCode.indexOf("0x00000000") === -1) {
                        ErrorText = jsonObj.Envelope.Body.Fault.detail.errorstring.toString()
                        deferred.reject(ErrorText);}
                    else {
                        var attachment = jsonObj.Envelope.Body.AddAttachmentResponse.AddAttachmentResult;

                        /*
                         self.Fields.forEach(function(field) {
                         console.log(field.EntityPropertyName);
                         if((angular.isDefined(self[field.EntityPropertyName])) && (angular.isDefined(ows_row["_ows_"+field.EntityPropertyName])) ){
                         self[field.EntityPropertyName] = ows_row["_ows_"+field.EntityPropertyName];
                         }

                         });
                         */
                        deferred.resolve(attachment);
                    }

                    //var results = angular.element(angular.element.parseXML(result)).find("Results").text();
                    //deferred.resolve(result.data);
                });

                return deferred.promise;
            };
            //endregion

            //region Get ListItem by GUID or by Title ( case sensitive )

            var self = this;

            //Is there a usable Identifier and determine if it is a existing or new Item that is requested.
            var isId = false;
            var isExisting = false;
            if ( angular.isDefined(identifier)) {
                isId = /^\d+$/.test(identifier);
                isExisting = (identifier > 0);
            }

            //Check if the previous requested item
            if(ngSecurity.CurrentItem !== null) {
                if (isId) {
                    //Only when currentItem Id is not the requested Id, update _ngItem;
                    if (ngSecurity.CurrentItem.Id !== identifier) {

                        if(isExisting) {
                            _item.deferred({
                                EndPoint: ngSecurity.Endpoint,
                                List: ngSecurity.CurrentList.Properties.Id,
                                Item: identifier
                            }).$promise.then(
                                function (data) {
                                    _ngItem = data;
                                });
                        }
                        else {
                            //Indicates a new Item
                            _ngItem.Id = identifier;
                        }
                    }
                }
            }
            else {
                //Newly not previously requested Item should be requested from SharePoint
                if (isId && isExisting) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Properties.Id,
                        Item: identifier
                    }).$promise.then(
                        function (data) {
                            _ngItem = data;
                        });
                }
                else {
                    //Indicates a new Item
                    _ngItem.Id = identifier;
                }
            }

            //All properties should be loaded now.
            self.Properties = _ngItem;

            //region Fields

            var FormFields = [];

            //var ViewFields = [];

            try {
                ngSecurity.CurrentList.DefaultView().then(function(View){

                    ngSecurity.CurrentList.ViewFields(View.Id).then(function(viewfields){

                        ngSecurity.CurrentList.Fields().then(function (fields) {

                            fields.forEach(function (field) {
                                if(field.EntityPropertyName === "LinkTitle" || field.EntityPropertyName === "Title"){
                                    var title_idx = viewfields.indexOf("LinkTitle");
                                    if(title_idx !== -1 && field.EntityPropertyName === "Title") {
                                        FormFields.splice(title_idx, 0, field);
                                        //FormFields.push(field);
                                    }
                                }
                                else {
                                    var idx = viewfields.indexOf(field.EntityPropertyName);
                                    if (idx !== -1) {
                                        FormFields.splice(idx, 0, field);
                                        //FormFields.push(field);
                                    }
                                }
                            });
                        });

                    });
                });

                /*
                ngSecurity.CurrentList.Fields().then(function (fields) {

                    fields.forEach(function (field) {


                        //if ((!field.Hidden && !field.ReadOnlyField) || (!field.Hidden && field.ReadOnlyField)) { //|| field.Required) {
                            if (isExisting) {
                                field.Value = _ngItem[field.EntityPropertyName];
                            }
                            FormFields.push(field);
                        //}
                        ///console.log(field);
                    });

                });
                */
            }
            catch(ex) {
                console.log(ex);
            }

            self.Fields = FormFields;

            //endregion

            ngSecurity.CurrentItem = self;
            deferred.resolve(self);
            //endregion

            return deferred.promise;
        };

        return ngItem;
    }]);
})();