
export default {
  getAvatarName(user) {
    if(user && user.first_name && user.last_name){
        return (
            user.first_name.substring(0, 1) +
            user.last_name.substring(0, 1)
          );
    } else {
      return "";
    }
  },
};
