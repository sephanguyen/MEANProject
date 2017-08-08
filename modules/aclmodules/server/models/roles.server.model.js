'use strict';

var mongoose = require('mongoose');


var PermissionSchema = new mongoose.Schema({
	name: String,
	allowed: {
		type: Boolean,
		default: false
	}
});

var RessourceSchema = new mongoose.Schema({
	name: String,
	permissions: [PermissionSchema]
});

var RoleSchema = new mongoose.Schema({
	name: String,
	ressources: [RessourceSchema]
});

var Role = mongoose.model('Role', RoleSchema);
module.exports = Role;