(function () {
  'use strict';

  angular
    .module('aclmodule.admin')
    .controller('AclmodulesAdminListController', AclmodulesAdminListController);

  AclmodulesAdminListController.$inject = ['AclmodulesService'];

  function AclmodulesAdminListController(AclmodulesService) {
    var vm = this;

    vm.aclmodule = AclmodulesService.query();
  }
}());
