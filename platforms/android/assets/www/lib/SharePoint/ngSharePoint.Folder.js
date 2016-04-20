(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngFolder', ['ngSecurity', 'ngFile', '$resource', '$q', function (ngSecurity, ngFile, $resource, $q) {

        var _ngFolder = {Folder: []};

        var API = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/Folder/:Deferred",
            {},//{ EndPoint: '', List: '', Item: '', Deferred: ''},
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

        var ngFolder = function () {
                var deferred = $q.defer();

                var self = this;

                if (ngSecurity.CurrentUser !== null) {
                    API.get({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id
                    }).$promise.then(
                        function (data) {
                            _ngFolder = data;
                            ngSecurity.CurrentFile = self;
                            self.Properties = _ngFolder;
                            deferred.resolve(self);
                        });
                }

                return deferred.promise;
            };

        return ngFolder;
    }]);

})();
