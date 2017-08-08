(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Chỉnh sửa hồ sơ',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Chỉnh sửa ảnh đại diện',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Thay đổi mật khẩu',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Quản lý tài khoản xã hội',
      state: 'settings.accounts'
    });
  }
}());
