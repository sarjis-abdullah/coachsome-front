/**
 * Here we follow some pattern for naming key
 * key = resource-name + method name
 * Method name follow BREAD strategy
 * Browse -> GET
 * Read -> GET
 * Edit -> PUT
 * Append -> POST
 * Delete -> DELETE
 */

export default {
  // group message
  GROUP_MESSAGES_GET: "/group-messages",
  GROUP_MESSAGES_POST: "/group-messages",
  GROUP_MESSAGES_ATTACHMENT_POST: "/group-messages/attachment",

  // messages
  MESSAGES_GET: "/messages",
  MESSAGES_POST: "/messages",
  MESSAGES_ATTACHMENT_POST: "/messages/attachment",
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
  GROUP_INVITATIONS_GROUP_ID_POST: id => `/group-invitations/groups/${id}`,
  GROUPS_ID_CHANGE_TOPIC_PUT: id => `/groups/${id}/change-topic`,
  GROUPS_ID_SAVE_IMAGE_POST: id => `/groups/${id}/save-image`,

  // marketplaces
  MARKETPLACE_SEARCHES: "/marketplace-searches",

  // athlete
  ATHLETE_SETTINGS_RESET_EMAIL_PUT: "/athlete/settings/reset-email",
  ATHLETE_SETTINGS_RESET_PASSWORD_PUT: "/athlete/settings/reset-password",
  ATHLETE_SETTINGS_GET: "/athlete/settings",
  ATHLETE_SETTINGS_PUT: id => `/athlete/settings/${id}`,

  // Coach
  COACH_SETTINGS_GET: "/coach/settings",
  COACH_NOTIFICATIONS_SETTINGS_GET: "/coach/settings/notifications",

  // accounts
  ACCOUNTS_DELETE: "/accounts/delete",

  // verifications
  VERIFICATIONS_EMAIL_VERIFY_POST: "/verifications/email-verify",
  VERIFICATIONS_FACEBOOK_VERIFY_POST: "/verifications/facebook-verify",
  VERIFICATIONS_GOOGLE_VERIFY_POST: "/verifications/google-verify",
  VERIFICATIONS_TWITTER_VERIFY_POST: "/verifications/twitter-verify",

  // securities
  SECURITIES_GET: "/securities",

  // gift-cards
  GIFT_CARDS_PAY_POST: "/gift-cards/pay",
  GIFT_CARDS_ID_DOWNLOAD_GET: id => `/gift-cards/${id}/download`,
  GIFT_CARDS_ORDERS_ID: id => `/gift-cards/orders/${id}`,

  // gift-transactions
  GIFT_TRANSACTIONS_POST: "/gift-transactions",
  GIFT_BALANCES_GET: "/gift-balances",

  // payment-cards
  PAYMENT_CARDS_GET: "/payment-cards",
  PAYMENT_CARDS_POST: "/payment-cards",
  PAYMENT_CARDS_CANCEL_POST: "/payment-cards/cancel",

  //Profile-switching
  SWITCH_INFO: "/auth/switchInfo",
};
