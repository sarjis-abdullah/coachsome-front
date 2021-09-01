export default {
  pages: {
    afterRegister: "/after-register",
    afterConfirmationMailClicked: "/after-mail-confirmation",
    about: "/about",
    booking: "/booking",
    bookingNew: "/packages/:packageId",
    bookingPackage: id => "/packages/" + id,
    blog: "/blog",
    blogCategory: "/blogs/categories/{id}",
    blogPost: "/posts/{title}",
    baseReviews: "/reviews",
    baseReviewAction: username => "/" + username + "/review",
    baseReviewSuccess: "/reviews/success",
    chat: {
      name:"chat",
      path:"/chat"
    },
    cookiePolicy: "/cookie-policy",
    emailVerification: "/email-verification",
    forgotPassword: "/password-forget",
    faq: "/faq",
    home: "/",
    homeOld: "/front",
    howItWork: "/how-it-works",
    login: "/login",
    marketplace: {
      name: "marketplace",
      path: "/marketplace"
    },
    price: "/price",
    passwordReset: "/password-reset",
    publicProfile: username => "/" + username,
    policy: "/privacy-policy",
    refundPolicy: "/refund-policy",
    register: "/register",
    redirect: "/redirect",
    terms: "/terms-of-use"
  },
  coach: {
    dashboard: "/coach/dashboard",
    imageAndVideo: "/coach/gallery",
    availability: "/coach/availability",
    geography: "/coach/geography",
    reviews: "/coach/reviews",
    packages: "/coach/packages",
    profile: "/coach/profile",
    editProfile: "/coach/profile/edit",
    help: "/coach/help",
    services: "/coach/services",
    settings: "/coach/settings",
    showProfile: "/coach/profile/show",
    earnings: "/coach/earning",
    balanceEarnings: "/coach/balance-earnings",
    verification: "/coach/verification",
    bookings: "/coach/bookings",
    payoutInformation: "/coach/payout-info"
  },
  admin: {
    login: "/admin/login",
    translation: "/admin/translation",
    dashboard: "/admin/dashboard",
    userList: "/admin/users",
    userLog: "/admin/logs",
    pendingCustomer: "/admin/pending-customer",
    payoutRequest: "/admin/payout-request",
    orderList: "/admin/orders",
    pageBuilder: "/admin/page-builder",
    grapesJs: "/admin/grapes-js"
  },
  athlete: {
    editProfile: "/athlete/edit-profile",
    login: "/athlete/login",
    register: "/athlete/register",
    bookings: "/athlete/bookings"
  }
};
