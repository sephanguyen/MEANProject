(function () {
  'use strict';

  angular
    .module('book')
    .controller('BookListController', BookListController);

  BookListController.$inject = ['BookService'];

  function BookListController(BookService) {
    var vm = this;
    vm.book = BookService.query();
  }
}());
