var mongoose = require('mongoose');
var RoleModel = require('../models/roles.server.model');

var Acl = function Acl() {
	this.roles = {};
}

Acl.prototype.addRole  = function (roleName) {
	var _this = this;
	return new Promise(function(resolve, reject) {
		RoleModel.count({ name: roleName }, function(err, count) {
			if (count == 0) {
				_this.roles[roleName] = new RoleModel({
					name: roleName,
					ressources: []
				});

				_this.save(roleName, function () {
					resolve();
				});
			} else {
				reject("Role name already used");
			}
		});
	});
	
}


Acl.prototype.removeRole = function (roleName) {
	return new Promise(function(resolve, reject) {
		RoleModel.remove({ name: roleName}, function(err) {
			if(err) {
				reject(err);
			}
		})
	});
	//this.load();
};

Acl.prototype.addRessource = function (ressourceName) {
	var _this = this;
	return new Promise(function (resolve, reject) {
		RoleModel.count({ "ressources.name": ressourceName }, function (err, count) {
			if (count == 0) {
				for (var r in _this.roles) {
					_this.roles[r].ressources.push({ name: ressourceName, permissions: [] });
				}
				_this.save("", function () {
					resolve();
				});
			} else {
				reject("Ressource name already used");
			}
		});
	});
};

Acl.prototype.addRessourceForRoleName  = function (roleName, ressourceName) {
	var _this = this;
	return new Promise(function(resolve, reject) {
		RoleModel.find({name: roleName}).count({ "ressources.name": ressourceName }, function(err, count) {
			if (count == 0) {
				_this.roles[roleName].ressources.push({ name: ressourceName, permissions: [] });
				_this.save("", function () {
					resolve();
			});
			} else {
				reject("Ressource name already used");
			}
		});
	});
}

Acl.prototype.removeRessource = function(ressourceName) {
	var _this = this
	return new Promise(function(resolve, reject) {
		RoleModel.update({}, 
			{ $pullAll: { "ressources.name": { string: ressourceName } } },
			function (err) {
					reject(err);
			}
		);
	});
}

Acl.prototype.addPermission  = function (roleName, ressource, permissionName, state) {
	var _this = this;
	return new Promise(function(resolve, reject) {
		var ressourceID = findResourceIdByName(roleName, ressource, _this);
		var permissionID = findPermissionIdByRoleAndResource(roleName, ressourceID, permissionName, _this)
		if (ressourceID == undefined) {
			reject("No ressource found for this name");
		} else {
			RoleModel.aggregate([{$unwind: "$ressources"}, {$match: { "name": roleName, "ressources.name": ressource, 'ressources.permissions.name': permissionName } }], function (err, result) {
				if (result.length == 0) {
					_this.roles[roleName].ressources[ressourceID].permissions.push({ name: permissionName, allowed: state });		
					
				} else {
					_this.roles[roleName].ressources[ressourceID].permissions[permissionID].allowed = state;
				}
				_this.save("", function () {
						resolve();
					});
			});
		}
	});
	
}

Acl.prototype.removePermission = function (permissionName) {
	return new Promise(function(resolve, reject) {
		for (var i in this.roles) {

			var ressourcesLength = this.roles[i].ressources.length;

			for (var j = 0; j < ressourcesLength; j++) {

				var permissionsLenght = this.roles[i].ressources[j].permissions.length;

				for (var k = 0; k < permissionsLenght; k++) {

					if (this.roles[i].ressources[j].permissions[k].name == permissionName) {
						this.roles[i].ressources[j].permissions.splice(k, 1);
						console.log(this.roles);
						this.save("", function(err) {
									reject(err);
						});
					}
				}
			}
		}
	});
	
};

Acl.prototype.inherit = function (heir, parent, callback) {
	if (this.roles[heir].ressources != undefined && this.roles[parent].ressources != undefined) {
		this.roles[heir].ressources = this.roles[parent].ressources;
		this.save("", function () {
			if (callback)
				callback();
		});
	} else {
		if (this.roles[heir].ressources == undefined && this.roles[parent].ressources == undefined) {
			if (callback)
				callback("Parent and heir ressources are undefined");
		} else if (this.roles[heir].ressources == undefined) {
			if (callback)
				callback("Heir ressources are undefined");
		} else if (this.roles[parent].ressources == undefined) {
			if (callback)
				callback("Parent ressources are undefined");
		} else {
			if (callback)
				callback("Unknown error");
		}
	}
};

Acl.prototype.getRole = function (roleName, callback) {
	if (callback)
		callback();
	return this.roles[roleName];
};

Acl.prototype.getRessource = function (roleName, ressourceName, callback) {
	var ressourceID = findRessourceId(ressourceName, this);
	if (ressourceID != undefined) {
		if (callback)
			callback();
		return this.roles[roleName].ressources[ressourceID];
	} else {
		callback("No ressource found for this name")
	}
};

Acl.prototype.can = function (roleName, ressourceName, permissionName, callback) {
	var ressourceID = findRessourceId(ressourceName, this);
	var permissionsID = findPermissionId(ressourceName, permissionName, this);

	if (ressourceID == undefined && permissionsID == undefined) {
		if (callback)
			callback("No ressource and no permission found for these names");
	} else if (permissionsID == undefined) {
		if (callback)
			callback("No permission found for this name");
	} else {
		if (this.roles[roleName].ressources[ressourceID].permissions[permissionsID] != undefined) {
			if (callback)
				callback();
			return this.roles[roleName].ressources[ressourceID].permissions[permissionsID].allowed;
		} else {
			if (callback)
				callback("Undefined permission");
		}
	}
};

Acl.prototype.save = function (roleName, callback) {
	if (roleName != "") {
		this.roles[roleName].save(function () {
			if (callback)
				callback();
		});
	} else {
		var length = 0;
		for (var y in this.roles) {
			length++;
		}
		for (var i in this.roles) {
			this.roles[i].save();
			length--;
			if (length == 0) {
				if (callback)
					callback();
			}
		}
	}
};

Acl.prototype.load  = function () {
	var _this = this;
	return new Promise(function(resolve, reject) {
		RoleModel.find({}, function (err, elements) {
		for (var s in elements) {
				_this.roles[elements[s].name] = elements[s];
		}
		resolve();
		});
	});
	
}
module.exports = new Acl;

function findRessourceId(ressourceName, obj) {
	for (var i in obj.roles) {
		for (var j = 0; obj.roles[i].ressources.length > j; j++) {
			if (obj.roles[i].ressources[j].name == ressourceName) {
				return j;
			}
		}
	}
}

function findResourceIdByName(roleName, ressourceName, obj) {
    for (var j = 0; obj.roles[roleName].ressources.length > j; j++) {
		if (obj.roles[roleName].ressources[j].name == ressourceName) {
			return j;
		}
	}
}

function findPermissionIdByRoleAndResource(roleName, ressourceID, permissionName, obj) {
    for (var j = 0; obj.roles[roleName].ressources[ressourceID].permissions.length > j; j++) {
		if (obj.roles[roleName].ressources[ressourceID].permissions[j].name == permissionName) {
			return j;
		}
	}
}

function findPermissionId(ressourceName, permissionName, obj) {
	for (var i in obj.roles) {
		for (var j = 0; obj.roles[i].ressources.length > j; j++) {
			if (obj.roles[i].ressources[j].name == ressourceName) {
				for (var h = 0; h < obj.roles[i].ressources[j].permissions.length; h++) {
					if (obj.roles[i].ressources[j].permissions[h].name == permissionName) {
						return h;
					}
				}
			}
		}
	}
}