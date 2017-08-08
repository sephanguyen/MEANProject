(function () {
  'use strict';

  angular
    .module('book.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('book', {
        abstract: true,
        url: '/book',
        template: '<ui-view/>'
      })
      .state('book.list', {
        url: '',
        templateUrl: '/modules/books/client/views/list-book.client.view.html',
        controller: 'BookListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Book List'
        }
      })
      .state('book.view', {
        url: '/:bookId',
        templateUrl: '/modules/books/client/views/view-book.client.view.html',
        controller: 'BookController',
        controllerAs: 'vm',
        resolve: {
          bookResolve: getBook
        },
        data: {
          pageTitle: 'Book {{ bookResolve.title }}'
        }
      });
  }

  getBook.$inject = ['$stateParams', 'BookService'];

  function getBook($stateParams, BookService) {
    return BookService.get({
      bookId: $stateParams.bookId
    }).$promise;
  }
}());
