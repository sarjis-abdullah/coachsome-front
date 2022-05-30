export default function({ $auth }) {
  $auth.hasRole = givenRole => {
    let flag = false;
    let roles = $auth.user && $auth.user.roles && $auth.user.roles.length ? $auth.user.roles.map(item => item.name) : false;

    if (typeof givenRole === "string") {
      if (roles && roles.includes(givenRole)) {
        flag = true;
      }
    }

    if (Array.isArray(givenRole) && roles) {

      if (givenRole.some(item => roles.includes(item))) {
        flag = true;
      }

    }

    return flag;
  };
}
