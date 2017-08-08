(function () {
  'use strict';

  angular
    .module('book')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
	var role = GetRoles('book_view');
    menuService.addMenuItem('topbar', {
      title: 'Danh mục sách',
      state: 'book.list',
      roles: role
    });
  }
}());
