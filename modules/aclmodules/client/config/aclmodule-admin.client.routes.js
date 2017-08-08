(function () {
  'use strict';
  angular
    .module('aclmodule.admin.routes')
    .config(routeConfig);
  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    $stateProvider
      .state('admin.aclmodule', {
        abstract: true,
        url: '/aclmodule',
        template: '<ui-view/>'
      })
      .state('admin.aclmodule.list', {
        url: '/list',
        templateUrl: '/modules/aclmodules/client/views/admin/list-aclmodule.client.view.html',
        controller: 'AclmodulesAdminListController',
        controllerAs: 'vm',
        data: {
          
        }
      })
      .state('admin.aclmodule.create', {
        url: '/create',
        templateUrl: '/modules/aclmodules/client/views/admin/form-aclmodule.client.view.html',
        controller: 'AclmodulesAdminController',
        controllerAs: 'vm',
        data: {
         
        },
        resolve: {
          aclmoduleResolve: newAclmodules
        }
      })
      .state('admin.aclmodule.edit', {
        url: '/:aclId/edit',
        templateUrl: '/modules/aclmodules/client/views/admin/form-aclmodule.client.view.html',
        controller: 'AclmodulesAdminController',
        controllerAs: 'vm',
        data: {
          
        },
        resolve: {
          aclmoduleResolve: getAclmodules
        }
      });
  }

  getAclmodules.$inject = ['$stateParams', 'AclmodulesService'];

  function getAclmodules($stateParams, AclmodulesService) {
    return AclmodulesService.get({
      aclId: $stateParams.aclId
    }).$promise;
  }
  newAclmodules.$inject = ['AclmodulesService'];

  function newAclmodules(AclmodulesService) {
    return new AclmodulesService();
  }
}());
