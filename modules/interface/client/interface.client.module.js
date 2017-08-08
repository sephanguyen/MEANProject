(function (app) {
  'use strict';

  app.registerModule('interface.services');
  app.registerModule('interface', ['core']);
  app.registerModule('interface.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
