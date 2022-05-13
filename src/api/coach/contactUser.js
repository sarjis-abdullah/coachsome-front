export default axios => ({
  getAllContactUsers: (params) => axios.get("coach/contact-user" + params),
  resendInvitationMail: params => axios.get("coach/contact-user-resend-invitation" + params),
  removeContactUser: params => axios.delete("coach/contact-user/" + params),
  archive: payload => axios.post("contacts/archive", payload),
  unarchive: payload => axios.post("contacts/unarchive", payload),
  unread: payload => axios.post("contacts/unread", payload)
});
