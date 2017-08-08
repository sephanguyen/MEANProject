(function (app) {
  'use strict';
  app.registerModule('book.services');
  app.registerModule('book', ['core']);
  app.registerModule('book.admin', ['core.admin']);
  app.registerModule('book.admin.routes', ['core.admin.routes']);

  app.registerModule('book.routes', ['ui.router', 'core.routes', 'book.services']);
}(ApplicationConfiguration));
