(function () {
  'use strict';

  angular
    .module('interface')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    var roles = GetRoles('interface');

      menuService.addMenuItem('topbar', {
        title: 'Interface',
        state: 'interface.view',
        position: 3,
        roles: roles
      });

  }
}());
