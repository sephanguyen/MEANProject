(function (app) {
  'use strict';

  app.registerModule('aclmodule', ['core']);
  app.registerModule('aclmodule.admin', ['core.admin']);
  app.registerModule('aclmodule.admin.routes', ['core.admin.routes']);
  app.registerModule('aclmodule.services');
  app.registerModule('aclmodule.routes', ['ui.router', 'core.routes', 'aclmodule.services']);
}(ApplicationConfiguration));
