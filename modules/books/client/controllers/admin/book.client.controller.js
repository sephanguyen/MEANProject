(function () {
  'use strict';

  angular
    .module('book.admin')
    .controller('BookAdminController', BookAdminController);

  BookAdminController.$inject = ['$scope', '$state', '$window', 'bookResolve', 'Authentication', 'Notification'];

  function BookAdminController($scope, $state, $window, book, Authentication, Notification) {
    var vm = this;
    vm.book = book;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing book
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.book.$remove(function() {
          $state.go('admin.book.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> book deleted successfully!' });
        });
      }
    }

    // Save book
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      // Create a new book, or update the current instance
      vm.book.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.book.list'); // should we send the User to the list or the updated book's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> book saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> book save error!' });
      }
    }
  }
}());
