import { roleConfig } from "@/config";
export default {
  isAuthUserRole: function(givenRoles = []) {
    let isAuthUserRole = false;
    let user = null;
    if (user) {
      if (user.roles.length > 0) {
        let roles = user.roles.map(item => item.name);
        if (givenRoles.some(item => roles.includes(item))) {
          isAuthUserRole = true;
        }
      }
    }
    return isAuthUserRole;
  },
  hasAnyRole: function () {
    let hasRole = false
    let user = null;
    if (user) {
      if (user.roles && user.roles.length > 0) {
        hasRole = true;
      }
    }
    return hasRole
  },
  getRoleNameSuperadmin: function() {
    return roleConfig.role.superAdmin;
  },
  getRoleNameAdmin: function() {
    return roleConfig.role.admin;
  },
  getRoleNameCoach: function() {
    return roleConfig.role.coach;
  },
  getRoleNameAthlete: function() {
    return roleConfig.role.athlete;
  },
  getRoleNameStaff: function() {
    return roleConfig.role.staff;
  },
  getClientRole: function() {
    return roleConfig.client;
  },
  getAdminRole: function() {
    return roleConfig.admin;
  }
};
