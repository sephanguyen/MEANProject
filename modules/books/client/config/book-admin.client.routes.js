(function () {
  'use strict';
  angular
    .module('book.admin.routes')
    .config(routeConfig);
  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    var aclrole = GetRoles('book');
        $stateProvider
          .state('admin.book', {
            abstract: true,
            url: '/book',
            template: '<ui-view/>'
          })
          .state('admin.book.list', {
            url: '/list',
            templateUrl: '/modules/books/client/views/admin/list-book.client.view.html',
            controller: 'BookAdminListController',
            controllerAs: 'vm',
            data: {
              roles: aclrole
            }
          })
          .state('admin.book.create', {
            url: '/create',
            templateUrl: '/modules/books/client/views/admin/form-book.client.view.html',
            controller: 'BookAdminController',
            controllerAs: 'vm',
            data: {
              roles: aclrole
            },
            resolve: {
              bookResolve: newBook
            }
          })
          .state('admin.book.edit', {
            url: '/:bookId/edit',
            templateUrl: '/modules/books/client/views/admin/form-book.client.view.html',
            controller: 'BookAdminController',
            controllerAs: 'vm',
            data: {
              roles: aclrole
            },
            resolve: {
              bookResolve: getBook
            }
          });
  }

  getBook.$inject = ['$stateParams', 'BookService'];

  function getBook($stateParams, BookService) {
    return BookService.get({
      bookId: $stateParams.bookId
    }).$promise;
  }
  newBook.$inject = ['BookService'];

  function newBook(BookService) {
    return new BookService();
  }
}());
