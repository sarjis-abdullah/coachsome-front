/**
 * Here we follow some pattern for naming key
 * key = resource-name + method name
 * Method name follow BREAD strategy
 * B = Browse -> GET
 * R = Read -> GET
 * E = Edit -> PUT
 * A = Append -> POST
 * D = Delete -> DELETE
 */

export default {
  // group message
  GROUP_MESSAGES_GET: "/group-messages",
  GROUP_MESSAGES_POST: "/group-messages",

  // messages
  MESSAGES_GET: "/messages",
  MESSAGES_POST: "/messages",
  MESSAGES_ID_GET: id => `/messages/${id}`,
  MESSAGES_ID_EDIT: id => `/messages/${id}`,
  MESSAGES_ID_DELETE: id => `/messages/${id}`,
  MESSAGES_NEW_COUNT_GET: "/messages/newCount",

  // chat setting
  CHAT_SETTINGS_GET: "/chatSettings",
  CHAT_SETTINGS_ENTER_PRESS_POST: "/chatSettings/enterPress",

  // contacts
  CONTACTS_GET: "/contacts",
  CONTACTS_ARCHIVE_POST: "/contacts/archive",
  CONTACTS_UNARCHIVE_POST: "/contacts/unarchive",
  CONTACTS_UNREAD_POST: "/contacts/unread",
  CONTACTS_PRIVATE_USERS_GET: "/contacts/private-users",

  // group
  GROUPS_POST: "/groups",
  GROUP_INVITATIONS_POST: "/group-invitations",
  GROUP_INVITATIONS_VERIFY_POST: "/group-invitations/verify",
  GROUP_INVITATIONS_PRIVATE_USERS_GET: "/group-invitations/private-users",
  GROUP_INVITATIONS_GROUP_ID_POST: id=> `/group-invitations/groups/${id}`
};
