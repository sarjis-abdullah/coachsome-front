export default {
  // Auth
  AUTH_REGISTER: "/auth/register",
  
  MESSAGES_SEND: "/messages/send",
  
  // Public profile
  PUBLIC_PROFILE: username => `/publicProfile/${username}`,

  // Booking
  BOOKING_INITIATE: "/bookings",
  BOOKING_NOTIFY: "/payments/quickpay/notify",
  BOOKING_PAY_BY_QUICKPAY: "/payments/quickpay/pay",

  // Tikcms
  TIKCMS_GET_PAGE_BY_GROUP_NAME: "/tikcms/page/get/all/group/published/design",
  TIKCMS_GET_PAGE: "/tikcms/page/get/all/language/published/design"
};
