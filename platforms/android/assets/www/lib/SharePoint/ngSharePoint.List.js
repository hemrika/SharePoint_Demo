(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngList', ['ngSecurity', 'ngItem', '$resource', '$q', '$http', function (ngSecurity, ngItem, $resource, $q, $http) {

        var ngList = {};

        var _ngList = {
            "DefaultView": {
                "__deferred": {
                    "uri": "/DefaultView"
                }
            },
            "Fields": {
                "__deferred": {
                    "uri": "/Fields"
                }
            },
            "Forms": {
                "__deferred": {
                    "uri": "/Forms"
                }
            },
            "Items": {
                "__deferred": {
                    "uri": "/Items"
                }
            },
            "ParentWeb": {
                "__deferred": {
                    "uri": "/ParentWeb"
                }
            },
            "RootFolder": {
                "__deferred": {
                    "uri": "/RootFolder"
                }
            },
            "Views": {
                "__deferred": {
                    "uri": "/Views"
                }
            },
            "AllowContentTypes": true,
            "BaseTemplate": 104,
            "BaseType": 0,
            "Created": "",
            "Description": "",
            "EnableAttachments": true,
            "EnableFolderCreation": false,
            "Id": "",
            "ImageUrl": "",
            "ItemCount": 0,
            "Title": ""
        };

        var _listSOAP = $resource("https://:EndPoint/_vti_bin/Lists.asmx",
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

        /*
        var SOAPEnvelope = function (listId) {

            var Envelope = document.implementation.createDocument("", "soap:Envelope", null);
            Envelope.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
            Envelope.setAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
            Envelope.setAttribute('xmlns:soap', 'http://schemas.xmlsoap.org/soap/envelope/');

            var Body = Envelope.createElement('soap:Body');
            var UpdateListItems = Body.createElement('UpdateListItems');
            UpdateListItems.setAttribute('xmlns', 'http://schemas.microsoft.com/sharepoint/soap/');

            var listName = Body.createElement('listName');
            listName.value = listId;
            var updates = List.createElement('updates');
            listName.appendChild(updates);
            UpdateListItems.appendChild(listName);
            Body.appendChild(UpdateListItems);
            Envelope.appendChild(Body);

            return Envelope;

            //<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " _
            //& "xmlns:xsd='http://www.w3.org/2001/XMLSchema' " _
            //& "xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><UpdateListItems " _
            //& "xmlns='http://schemas.microsoft.com/sharepoint/soap/'><listName>" & strListNameOrGuid _
            //& "</listName><updates>" & strBatchXml & "</updates></UpdateListItems></soap:Body></soap:Envelope>"

        };
        */

        var _list = $resource("https://:EndPoint/_api/Web/Lists(':List')/:Deferred",
            {},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose'
                    }
                },
                save: {
                    method: 'POST',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept' : 'application/json;odata=verbose',
                        //'X-RequestDigest': FormDigestValue,
                        'Content-Type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        var Methods = $resource("https://:EndPoint/_api/Web/Lists/:Deferred",
            {},//{   EndPoint: '', List: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        ngList = function (identifier) {

            var deferred = $q.defer();

            /**
             * Are we Authenticated ?
             */
            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            //region Properties

            this.AllowContentTypes = function (value) {
                return angular.isDefined(value) ? (_ngList.AllowContentTypes = value) : _ngList.AllowContentTypes;
            };
            this.BaseTemplate = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseTemplate = value) : _ngList.BaseTemplate;
            };
            this.BaseType = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseType = value) : _ngList.BaseType;
            };
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngList.Created = value) : _ngList.Created;
            };
            this.Description = function (value) {
                return angular.isDefined(value) ? (_ngList.Description = value) : _ngList.Description;
            };
            this.EnableAttachments = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableAttachments = value) : _ngList.EnableAttachments;
            };
            this.EnableFolderCreation = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableFolderCreation = value) : _ngList.EnableFolderCreation;
            };
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngList.Id = value) : _ngList.Id;
            };
            this.ImageUrl = function (value) {
                return angular.isDefined(value) ? (_ngList.ImageUrl = value) : _ngList.ImageUrl;
            };
            this.ItemCount = function (value) {
                return angular.isDefined(value) ? (_ngList.ItemCount = value) : _ngList.ItemCount;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngList.Title = value) : _ngList.Title;
            };

            //endregion

            //region Deferred

            this.DefaultView = function () {
                var deferred = $q.defer();

                var Operator = _ngList.DefaultView.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.DefaultView.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.DefaultView.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Fields = function () {
                var deferred = $q.defer();

                var Operator = _ngList.Fields.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.Fields.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.Fields.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Forms = function () {
                var deferred = $q.defer();

                var Operator = _ngList.Forms.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.Forms.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.Forms.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Items = function (value) {


                if (angular.isDefined(value)) {
                    return new ngItem(value);
                }
                else {
                    var deferred = $q.defer();

                    var Operator = _ngList.Items.__deferred.uri.split('/').pop();
                    _list.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: _ngList.Id,
                        Deferred: Operator
                    }).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.Items.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.Items.__deferred;
                                deferred.resolve(data);
                            }
                        });

                    return deferred.promise;
                }
            };

            this.ParentWeb = function () {
                var deferred = $q.defer();

                var Operator = _ngList.ParentWeb.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.ParentWeb.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.ParentWeb.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.RootFolder = function () {
                var deferred = $q.defer();

                var Operator = _ngList.RootFolder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.RootFolder.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.RootFolder.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Views = function () {
                var deferred = $q.defer();

                var Operator = _ngList.Views.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngList.Views.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngList.Views.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            //endregion

            //region Methods

            this.ViewFields = function (value) {
                var deferred = $q.defer();

                var Operator = "Views(guid'"+value+"')/ViewFields";
                //var Operator = _ngList.Views.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.Items.results)) {
                                deferred.resolve(data.Items.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.GetView = function (value) {
                var deferred = $q.defer();

                var Operator = "GetView('" + value + "')";
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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

/*            this.Item = function(value) {

                if (angular.isDefined(value)) {
                    return new ngItem(value);
                }
                else {
                    return new ngItem().NewItem;
                }

            };

            //this.NewItem = function () {
            //    return ngItem();
            //};*/

            this.GetItemById = function (value) {

                return new ngItem(value);
                /*
                 var Operator = "GetItemById('" + value + "')";
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

            this.GetItems = function () {
                return new ngItem();
            };

            this.AddItem = function (value) {

                var deferred = $q.defer();

                /*
                 var Envelope = SOAPEnvelope(_ngList.Id);

                 //var doc = document.implementation.createDocument("","Batch", null);
                 var Batch = Envelope.createElement(Batch);
                 Batch.setAttribute('OnError','Continue');
                 var Method = doc.createElement('Method');
                 Method.setAttribute('ID', '1');
                 Method.setAttribute('Cmd','New');
                 var Id = Method.createElement('Field');
                 Id.setAttribute('Name', 'ID');
                 Id.value = 'New';

                 var Title = Method.createElement('Field');
                 Title.setAttribute('Name', 'Title');
                 Title.value = 'IDentity Client Runtime Library service';

                 Method.appendChild(Id);
                 Method.appendChild(Title);
                 Batch.appendChild(Method);
                 Envelope.appendChild(Batch);
                 */

                var Envelope = new Array("");
                Envelope.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
                Envelope.push('<soap:Body>');
                Envelope.push('<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">');
                Envelope.push('<listName>' + _ngList.Id + '</listName>');
                Envelope.push('<updates>');
                Envelope.push('<Batch OnError="Continue">');
                Envelope.push('<Method ID="1" Cmd="New">');
                Envelope.push('<Field Name="ID">New</Field>');
                Envelope.push('<Field Name="Title">IDentity Client Runtime Library service</Field>');
                Envelope.push('</Method>');
                Envelope.push('</Batch>');
                Envelope.push('</updates>');
                Envelope.push('</UpdateListItems>');
                Envelope.push('</soap:Body>');
                Envelope.push('</soap:Envelope>');

                //ngSecurity.UpdateContextInfo().then(function () {
                _listSOAP.New({ EndPoint: ngSecurity.Endpoint}, Envelope.join("").toString()).$promise.then(function (result) {
                    //console.log(result);
                    deferred.resolve(result);
                    //return result;
                    //console.log(result);
                });
                //});
                //var item = { __metadata: { type : 'SP.Data.CordovaListItem' }, Title: 'IDentity Client Runtime Library service' };
                /*
                 var item = {
                 '__metadata': {
                 'type': 'SP.CordovaListItem'
                 },
                 'Title' : 'IDentity Client Runtime Library service'
                 };
                 */

                //ngSecurity.UpdateContextInfo().then(function () {
                //FormDigestValue = ngSecurity.ContextInfo.FormDigestValue;
                //SecurityToken = ngSecurity.SecurityToken;
                //var message = JSON.stringify(item);
                /*
                 var url = "https://" + ngSecurity.Endpoint + "/_api/Web/Lists('" + _ngList.Id + "')/Items";
                 $http({
                 method: 'POST',
                 //withCredentials: false,
                 url: url,
                 data: item,
                 headers: {
                 'Accept' : 'application/json;odata=verbose',
                 'X-RequestDigest': FormDigestValue,
                 'Content-Type': 'application/json;odata=verbose'
                 }
                 }).success(function (data) {
                 deferred.resolve(data);
                 }).error(function () {
                 deferred.reject();
                 });
                 */
                /*
                 _list.save({
                 EndPoint: ngSecurity.Endpoint,
                 List: _ngList.Id, Deferred: 'Items'
                 }, item).$promise.then(function (result) {
                 //console.log(result);
                 deferred.resolve(result);
                 //return result;
                 //console.log(result);
                 });
                 */
                //});
                return deferred.promise;
            };

/*            this.DeleteItem = function (value) {

            };

            this.UpdateItem = function (value) {

            };*/

            //endregion

            //region Get List by GUID or by Title ( case sensitive )

            var self = this;

            var isGUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);


            if (isGUID) {
                if (identifier.toLowerCase() !== _ngList.Id.toLowerCase()) {
                    _list.get({EndPoint: ngSecurity.Endpoint, List: identifier}).$promise.then(
                        function (data) {
                            _ngList = data;
                            self.Properties = _ngList;
                            ngSecurity.CurrentList = self;
                            deferred.resolve(self);
                        });
                }
                else {
                    self.Properties = _ngList;
                    ngSecurity.CurrentList = self;
                    deferred.resolve(self);
                }
            }
            else {
                if (identifier !== _ngList.Title) {
                    Methods.get({
                        EndPoint: ngSecurity.Endpoint,
                        Deferred: "getbytitle('" + identifier + "')"
                    }).$promise.then(
                        function (data) {
                            _ngList = data;
                            self.Properties = _ngList;
                            ngSecurity.CurrentList = self;
                            deferred.resolve(self);
                        });
                }
                else {
                    self.Properties = _ngList;
                    ngSecurity.CurrentList = self;
                    deferred.resolve(self);
                }
            }

            //endregion

            return deferred.promise;
        };

        return ngList;
    }]);
})();
