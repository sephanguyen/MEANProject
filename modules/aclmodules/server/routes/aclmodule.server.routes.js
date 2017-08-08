'use strict';

/**
 * Module dependencies
 */
var aclPolicy = require('../policies/aclmodule.server.policy'),
  aclmodule = require('../controllers/aclmodule.server.controller');

module.exports = function (app) {

  app.route('/api/acl').all(aclPolicy.isAllowed)
    .get(aclmodule.list)
    .post(aclmodule.create);

  app.route('/api/acl/:aclId').all(aclPolicy.isAllowed)
    .get(aclmodule.read)
    .put(aclmodule.update)
    .delete(aclmodule.delete);

  app.route('/api/Aclmodule').all(aclPolicy.isAllowed)
    .get(aclmodule.list)
    .post(aclmodule.create);

  app.route('/api/Aclmodule/:aclmoduleName').all(aclPolicy.isAllowed)
    .get(aclmodule.read)
    .put(aclmodule.update)
    .delete(aclmodule.delete);

  app.param('aclId', aclmodule.aclById);
  app.param('aclmoduleName', aclmodule.aclByName);
};
