(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Quản lý người dùng',
      state: 'admin.users',
      type: 'dropdown',
      roles: ['admin']
    });

    menuService.addSubMenuItem('topbar', 'admin.users', {
      title: 'Danh sách người dùng',
      state: 'admin.users.list'
    });
  }
}());
