'use strict';

/**
 * Module dependencies
 */

var myAcl = require('../lib/acl');
var    _ = require('lodash');
var mongoose = require('mongoose');
var RolesModule = mongoose.model('Role');


  // Using the memory backend

/**
 * Invoke Aclmodules Permissions
 */
exports.invokeRolesPolicies = function () {
 
  
};



/**
 * Check If Aclmodules Policy Allows
 */
exports.isAllowed = function (req, res, next) {

   myAcl.load().then(function() {
      return myAcl.addRole("master");
    }).then(function() {
      return myAcl.addRessourceForRoleName("master", "api/acl");
    }).then(function() {
      return myAcl.addPermission("master", "api/acl", "get", true);
    }).then(function() {
      return myAcl.addRessourceForRoleName("master", "/api/Aclmodule/:aclmoduleName");
    }).then(function() {
      return myAcl.addPermission("master", "/api/Aclmodule/:aclmoduleName", "put", false);
    }).catch(function(err) {
    console.log(err);
  });
    
    /**
  myAcl.load(function() {
    myAcl.addRole develop", function (err) {
			if (err) {
				console.log(err);
			}
			done();
		});
    myAcl.addRessourceForRoleName("develop", "api/acl", function (err) {
			if (err) {
				console.log(err);
			}
			done();
		});
    myAcl.addPermission("develop", "api/acl", "get", true, function (err) {
			if (err) {
				console.log(err);
			}
			done();
		});
  })
*/

  var roles = (req.user) ? req.user.roles : ['guest'];
  // If an aclmodule is being processed and the current user created it then allow any manipulation
  if (req.aclmodule && req.user && req.aclmodule.user && req.user.roles == 'admin') {
    return next();
  }
  
  myAcl.load().then(function() {
    let isAllowed = myAcl.can(roles, req.route.path, req.method.toLowerCase(), function (err) {});
    if (isAllowed) {
      return next();
    } else {
      return res.status(403).json({
             message: 'User is not authorized'
         });
    }
  });
    
    

  

  // Check for user roles
   // acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
   //   if (err) {
      // An authorization error occurred
   //     return res.status(500).send('Unexpected authorization error');
   //   } else {
   //     if (isAllowed) {
        // Access granted! Invoke next middleware
    //      return next();
    //    } else {
    //      return res.status(403).json({
      //      message: 'User is not authorized'
     //     });
    //    }
  //    }
  //  });
};
