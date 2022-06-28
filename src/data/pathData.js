export default {
    pages: {
        afterRegister: "/after-register",
        afterConfirmationMailClicked: "/after-mail-confirmation",
        about: "/about",
        booking: "/booking",
        advisoryBoard: "/advisory-board",
        bookingNew: "/packages/:packageId",
        bookingPackage: id => "/packages/" + id,
        blog: "/blog",
        blogCategory: "/blogs/categories/{id}",
        blogPost: "/posts/{title}",
        baseReviews: "/reviews",
        baseReviewAction: username => "/" + username + "/review",
        baseReviewSuccess: "/reviews/success",
        coaches: "/coaches",
        chat: {
            name: "chat",
            path: "/chat"
        },
        chatScreen: {
            name: "chatScreen",
            path: "/chat-screen"
        },
        cookiePolicy: "/cookie-policy",
        emailVerification: "/email-verification",
        forgotPassword: "/password-forget",
        faq: "/faq",
        gift: "/gift",
        giftCheckout: "/gift/checkout",
        home: "/",
        homeOld: "/front",
        howItWork: "/how-it-works",
        login: "/login",
        marketplace: {
            name: "marketplace",
            path: "/marketplace"
        },
        price: "/price",
        resetOTPValidation: "/password-reset-otp-validation",
        passwordReset: "/password-reset",
        publicProfile: username => "/" + username,
        policy: "/privacy-policy",
        refundPolicy: "/refund-policy",
        redirect: "/redirect",
        terms: "/terms-of-use",
        emailLogin: "/login-with-email",
        postEmailLogin: "/post-login-with-email",
        otpValidation: "/otp-validation",
        register: "/register",
        getStarted: "/get-started",
        getStarted: "/select-role",
        language: "/language",
        currency: "/currency",
        security: "/security",
        becomeACoach: "/become-a-coach",
        exercises: "/exercises",
    },
    coach: {
        dashboard: "/coach/dashboard",
        imageAndVideo: "/coach/gallery",
        availability: "/coach/availability",
        geography: "/coach/geography",
        reviews: "/coach/reviews",
        packages: "/coach/packages",
        profile: "/coach/profile",
        editMenu: "/coach/profile/edit-menu",
        editProfile: "/coach/profile/edit",
        help: "/coach/help",
        services: "/coach/services",
        settings: "/coach/settings",
        showProfile: "/coach/profile/show",
        earnings: "/coach/earning",
        balanceEarnings: "/coach/balance-earnings",
        verification: "/coach/verification",
        bookings: "/coach/bookings",
        payoutInformation: "/coach/payout-info",
        account: "/coach/account",
        profileMenu: "/coach/profile-menu",
        notification: "/coach/notification",
        home: "/coach/home",
        inviteYourFriends: "/coach/invite-your-friends",
        coachContacts: "/coach/contacts",
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
        grapesJs: "/admin/grapes-js",
        promos: "/admin/promos",
        trackingCodes: code => `/admin/tracking-codes/${code}`,
        profileMenu: "/admin/profile-menu",
        bookingSessions: "/admin/sessions",
    },
    athlete: {
        editProfile: "/athlete/edit-profile",
        login: "/athlete/login",
        register: "/athlete/register",
        bookings: "/athlete/bookings",
        settings: "/athlete/settings",
        account: "/athlete/account",
        payments: "/athlete/payments",
        profileMenu: "/athlete/profile-menu",
        notification: "/athlete/notification",
        home: "/athlete/home",
        inviteYourFriends: "/athlete/invite-your-friends",
    }
};