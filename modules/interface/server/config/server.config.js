'use strict';

/**
 * Module dependencies
 */

/**
 * Module init function.
 */
module.exports = function (app, db) {

};

// Name Module is also name of Collection db
module.exports.nameModule = 'interface';

module.exports.pathRoute = '/api/' + module.exports.nameModule;

module.exports.param = module.exports.nameModule + 'Id';

module.exports.nameAclModel = 'Aclmodules';