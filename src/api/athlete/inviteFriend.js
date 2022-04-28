export default axios => ({
  inviteFriend: payload => {
    return axios.post("invite-friend", payload);
  }
});
