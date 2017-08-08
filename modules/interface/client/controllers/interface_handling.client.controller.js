(function () {
  'use strict';

  angular
    .module('interface')
    .controller('InterfaceController_Full', InterfaceController_Full);

  InterfaceController_Full.$inject = ['$scope', '$state', '$window', 'interResolve', 'Authentication', 'Notification'];

  function InterfaceController_Full($scope, $state, $window, inter, Authentication, Notification) {
    var vm = this;

    vm.inter = inter;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing interface
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.inter.$remove(function () {
          $state.go('interface.view');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Interface deleted successfully!' });
        });
      }
    }

    // Save interface
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.interForm');
        return false;
      }

      // Create a new interface, or update the current instance
      var update = 'updated';
      if (vm.inter._id) {
        vm.inter.$update(successCallback, errorCallback);
      } else {
        vm.inter.$save(successCallback, errorCallback);
        update = 'created';
      }

      function successCallback(res) {
        $state.go('interface.view'); // Should we send the User to the list or the updated interface's view?
        var send = '<i class="glyphicon glyphicon-ok"></i> Interface ' + update + ' successfully!';
        Notification.success({ message: send });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Interface create error!' });
      }
    }
  }
}());
