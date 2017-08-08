(function () {
  'use strict';

  angular
    .module('book')
    .controller('BookController', BookController);

  BookController.$inject = ['$scope', 'bookResolve', 'Authentication', '$state'];

  function BookController($scope, book, Authentication, $state) {
    var vm = this;
    $scope.$state = $state;
    vm.book = book;
    vm.authentication = Authentication;
  }
}());
