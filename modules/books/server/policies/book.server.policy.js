'use strict';

/**
 * Module dependencies
 */
var acl = require('acl'),
  Aclmodules = require('mongoose').model('Aclmodules');
// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Book Permissions
 */
exports.invokeRolesPolicies = function () {

  Aclmodules.findOne({
    name: 'book'
  }).exec(function (err, aclmodule) {
    if (err) {
      return console.log('Loi');
    } else if (!aclmodule) {
      return console.log('khong tim thay aclmodule');
    }

    var arr = [];
    aclmodule.roles.forEach(function (value, index) {
      var a =
        {
          roles: [value.name],
          allows: [{
            resources: '/api/book',
            permissions: value.policies
          }, {
            resources: '/api/book/:bookId',
            permissions: value.policies
          }]
        };
      arr.push(a);
    });
    acl.allow(arr);
  });
};

/**
 * Check If Book Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  // If an book is being processed and the current user created it then allow any manipulation
  if (req.book && req.user && req.book.user && req.user.roles == 'admin') {
    return next();
  }

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
