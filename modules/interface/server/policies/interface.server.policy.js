'use strict';

var config = require('../config/server.config'),
  acl = require('acl'),
  aclModel = require('mongoose').model(config.nameAclModel);

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Permissions
 */
exports.invokeRolesPolicies = function () {

  aclModel.findOne({ name: config.nameModule }).exec(function (err, aclmodule) {
    if (err) {
      return console.log('Lỗi ACL Model: ' + err.toString());
    } else if (!aclmodule) {
      return console.log('Không tìm thấy: ' + config.nameAclModel);
    }

    var roles = [];

    aclmodule.roles.forEach(function (role, index) {
      var a =
        {
          roles: [role.name],
          allows: [{
            resources: config.pathRoute,
            permissions: role.policies
          }, {
            resources: config.pathRoute + '/:' + config.param,
            permissions: role.policies
          }]
        };
      roles.push(a);
    });

    acl.allow(roles);

  });
};

/**
 * Check If Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an <module> is being processed and the current user created it then allow any manipulation
  //if (req.article && req.user && req.article.user && req.article.user.id === req.user.id) {
  //  return next();
  //}

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
