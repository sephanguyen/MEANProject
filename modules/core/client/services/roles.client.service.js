
GetRoles = function (nameModule) {
  var roles = [];
  $.ajax({
    dataType: 'json',
    url: '/api/Aclmodule/' + nameModule,
    success: function (data) {

      data.roles.forEach(function (role) {
        roles.push(role.name);
      });
    }
  });

  return roles;
};