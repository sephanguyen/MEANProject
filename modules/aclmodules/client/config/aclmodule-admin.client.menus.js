(function () {
  'use strict';

  // Configuring the Aclmodules Admin module
  angular
    .module('aclmodule.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {

    Menus.addMenuItem('topbar', {
      title: 'Quản lý module',
      state: 'admin.aclmodule',
      type: 'dropdown',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'admin.aclmodule', {
      title: 'Danh mục module',
      state: 'admin.aclmodule.list'
    });

    Menus.addSubMenuItem('topbar', 'admin.aclmodule', {
      title: 'Thêm module',
      state: 'admin.aclmodule.create'
    });

  }
}());
