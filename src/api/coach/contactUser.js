export default axios => ({
  getAllContactUsers: (params) => axios.get("coach/contact-user" + params),
  resendInvitationMail: params => axios.get("coach/contact-user-resend-invitation" + params),
  removeContactUser: params => axios.delete("coach/contact-user/" + params),
  activateContactUser: payload => axios.post("coach/activate-contact-user", payload),
});
