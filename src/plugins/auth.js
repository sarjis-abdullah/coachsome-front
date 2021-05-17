export default function({ $auth }) {
  $auth.hasRole = givenRole => {
    let flag = false;
    let roles = $auth.user.roles.map(item => item.name);

    if (typeof givenRole === "string") {
      if (roles.includes(givenRole)) {
        flag = true;
      }
    }

    if (Array.isArray(givenRole)) {
      if (givenRole.some(item => roles.includes(item))) {
        flag = true;
      }
    }

    return flag;
  };
}
