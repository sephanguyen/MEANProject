(function () {
  'use strict';

  // Configuring the Books Admin module
  angular
    .module('book.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'AclmoduleService'];

  function menuConfig(Menus, AclmoduleService) {

		var aclmodule = GetRoles('book');
		  Menus.addMenuItem('topbar', {
			title: 'Quản lý sách',
			state: 'admin.book',
			type: 'dropdown',
			roles: aclmodule
		  });

		  Menus.addSubMenuItem('topbar', 'admin.book', {
			title: 'Danh mục sách',
			state: 'admin.book.list',
			roles: aclmodule
		  });

		  Menus.addSubMenuItem('topbar', 'admin.book', {
			title: 'Thêm sách',
			state: 'admin.book.create',
			roles: aclmodule
		  });
  }
}());
