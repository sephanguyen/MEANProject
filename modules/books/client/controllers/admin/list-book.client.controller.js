(function () {
  'use strict';

  angular
    .module('book.admin')
    .controller('BookAdminListController', BookAdminListController);

  BookAdminListController.$inject = ['BookService'];

  function BookAdminListController(BookService) {
    var vm = this;

    vm.book = BookService.query();
  }
}());
