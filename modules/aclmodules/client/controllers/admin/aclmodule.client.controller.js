(function () {
  'use strict';

  angular
    .module('aclmodule.admin')
    .controller('AclmodulesAdminController', AclmodulesAdminController);

  AclmodulesAdminController.$inject = ['$scope', '$state', '$window', 'aclmoduleResolve', 'Authentication', 'Notification'];

  function AclmodulesAdminController($scope, $state, $window, aclmodule, Authentication, Notification) {
    var vm = this;
    vm.aclmodule = aclmodule;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing aclmodule
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.aclmodule.$remove(function () {
          $state.go('admin.aclmodule.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> aclmodule deleted successfully!' });
        });
      }
    }

    // Save aclmodule
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aclmoduleForm');
        return false;
      }

      // Create a new aclmodule, or update the current instance
      vm.aclmodule.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.aclmodule.list'); // should we send the User to the list or the updated aclmodule's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> aclmodule saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> aclmodule save error!' });
      }

    }

    vm.clickRemove = function (index) {
      if (index > -1) {
        vm.aclmodule.roles.splice(index, 1);
      }
    };

    vm.clickAdd = addRole;

    function addRole(isClick) {
      var role_new = {

        name: '',
        policies: [
          'get'
        ]

      };
      if (!vm.aclmodule.roles) {
        vm.aclmodule.roles = [];
        if (!isClick) {
          vm.aclmodule.roles.push(role_new);
        }
      }
      if (isClick) {
        vm.aclmodule.roles.push(role_new);
      }

    }
    addRole(false);
  }
}());
