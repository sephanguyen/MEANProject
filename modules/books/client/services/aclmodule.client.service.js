(function () {
  'use strict';

  angular
    .module('book.services')
    .factory('AclmoduleService', AclmoduleService);

  AclmoduleService.$inject = ['$resource', '$log'];

  function AclmoduleService($resource, $log) {
    var Aclmodule = $resource('/api/Aclmodule/:aclmoduleName', {
      aclmoduleName: '@name'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Aclmodule;
  }
}());
