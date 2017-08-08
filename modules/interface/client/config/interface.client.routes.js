(function () {
  'use strict';

  angular
    .module('interface.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    var roles = GetRoles('interface');

    $stateProvider
      .state('interface', {
        abstract: true,
        url: '/interface',
        template: '<ui-view/>'
      })
      .state('interface.view', {
        url: '/views',
        templateUrl: '/modules/interface/client/views/interface_list.client.view.html',
        controller: 'InterfaceController',
        controllerAs: 'vm',
        data: {
          roles: roles,
          pageTitle: 'Interface View'
        }
      })
      .state('interface.create', {
        url: '/create',
        templateUrl: '/modules/interface/client/views/interface_handling.client.view.html',
        controller: 'InterfaceController_Full',
        controllerAs: 'vm',
        data: {
          roles: roles,
          pageTitle: 'Interface Create'
        },
        resolve: { // Danh sách các công việc phải làm trước khi chạy
          interResolve: newInterface
        }
      })
      .state('interface.edit', {
        url: '/edit/:interfaceId',
        templateUrl: '/modules/interface/client/views/interface_handling.client.view.html',
        controller: 'InterfaceController_Full',
        controllerAs: 'vm',
        data: {
          roles: roles,
          pageTitle: 'Interface Edit'
        },
        resolve: {
          interResolve: getInterface
        }
      });

  }

  getInterface.$inject = ['$stateParams', 'InterfaceService'];

  function getInterface($stateParams, InterfaceService) {
    return InterfaceService.get({
      interfaceId: $stateParams.interfaceId
    }).$promise;
  }

  newInterface.$inject = ['InterfaceService'];

  function newInterface(InterfaceService) {
    return new InterfaceService();
  }

}());
