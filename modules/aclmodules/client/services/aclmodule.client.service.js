(function () {
  'use strict';

  angular
    .module('aclmodule.services')
    .factory('AclmodulesService', AclmodulesService);

  AclmodulesService.$inject = ['$resource', '$log'];

  function AclmodulesService($resource, $log) {
    var Aclmodules = $resource('/api/acl/:aclId', { aclId: '@_id' }, {
      update: { method: 'PUT' }
    });

    angular.extend(Aclmodules.prototype, {
      createOrUpdate: function () {
        var aclmodule = this;
        return createOrUpdate(aclmodule);
      }
    });

    return Aclmodules;

    function createOrUpdate(aclmodule) {

      if (aclmodule._id) {
        return aclmodule.$update(onSuccess, onError);
      } else {
        return aclmodule.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(aclmodule) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
