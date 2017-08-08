(function () {
  'use strict';

  angular
    .module('interface.services')
    .factory('InterfaceService', InterfaceService);

  InterfaceService.$inject = ['$resource', '$log'];

  function InterfaceService($resource, $log) {
    return $resource('/api/interface/:interfaceId', { interfaceId: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }

}());
