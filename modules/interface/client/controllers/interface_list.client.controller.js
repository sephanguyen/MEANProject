(function () {
  'use strict';

  angular
    .module('interface')
    .controller('InterfaceController', InterfaceController);

  InterfaceController.$inject = ['$scope', 'InterfaceService'];

  function InterfaceController($scope, InterfaceService) {
    var vm = this;
    vm.quy = 'ePlatform Solution';
    vm.inter = InterfaceService.query();
    $scope.myData = 'Hello world!';
  }
}());
