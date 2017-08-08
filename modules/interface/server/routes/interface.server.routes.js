'use strict';

/**
 * Module dependencies
 */
var config = require('../config/server.config');
var policy = require('../policies/' + config.nameModule + '.server.policy');
var modules = require('../controllers/' + config.nameModule + '.server.controller');

module.exports = function (app) {

  // Collection routes
  app.route(config.pathRoute).all(policy.isAllowed)
    .get(modules.list)
    .post(modules.create);

  // Single routes
  app.route(config.pathRoute + '/:' + config.param).all(policy.isAllowed)
    .get(modules.read)
    .put(modules.update)
    .delete(modules.delete);

  // Finish by binding module middleware
  app.param(config.param, modules.byID);
};
