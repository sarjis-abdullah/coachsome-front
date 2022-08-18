import { pathData } from "@/data";

const athleteItems = [
    {
        key: "home",
        t_key: "pwa_home",
        icon: require('@/assets/img/svg-icons/new/home.svg'),
        text: "home",
        url: pathData.athlete.home,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "package",
        t_key: "pwa_edit_profile",
        icon: require('@/assets/img/svg-icons/new/edit.svg'),
        text: "Packages",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "home",
                t_key: "profile_info",
                text: "home",
                url: pathData.athlete.editProfile,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            }
        ],
    },
    {
        key: "bookings",
        t_key: "app_bar_dashboard_booking",
        icon: require('@/assets/img/svg-icons/new/calendar-alt.svg'),
        text: "bookings",
        url: pathData.athlete.bookings,
        hasSubItem: false,
        line: false,
        checker:false, 
        item: true
    },
    {
        key: "wishlist",
        t_key: "wishlist_page_title",
        icon: require('@/assets/img/svg-icons/new/gift.svg'),
        text: "wishlist",
        url: pathData.athlete.wishList,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "payment",
        t_key: "pwa_payment_menu",
        icon: require('@/assets/img/svg-icons/new/credit-card.svg'),
        text: "payment",
        url: pathData.athlete.payments,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "line",
        t_key: "line",
        text: "line",
        hasSubItem: false,
        line: true,
        checker:false,
        item: false
    },
    {
        key: "settings",
        t_key: "dropdown_item_settings",
        icon: require('@/assets/img/svg-icons/new/setting.svg'),
        text: "settings",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "account",
                t_key: "setting_label_acc",
                text: "account",
                url: pathData.athlete.account,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "notifications",
                t_key: "setting_sec_notification_title",
                text: "notifications",
                url: pathData.athlete.notification,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "security",
                t_key: "athlete_settings_tab_security",
                text: "security",
                url: pathData.pages.security,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
        ],
    },
  ];
const coachItems = [
    {
        key: "home",
        t_key: "pwa_home",
        icon: require('@/assets/img/svg-icons/new/home.svg'),
        text: "home",
        url: pathData.coach.home,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "package",
        t_key: "pwa_edit_profile",
        icon: require('@/assets/img/svg-icons/new/edit.svg'),
        text: "Packages",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "home",
                t_key: "profile_info",
                text: "home",
                url: pathData.coach.editProfile,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "packages",
                t_key: "pwa_package_menu",
                text: "packages",
                url: pathData.coach.packages,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "gallery",
                t_key: "pwa_gallery_menu",
                text: "gallery",
                url: pathData.coach.imageAndVideo,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "geography",
                t_key: "pwa_geography_menu",
                text: "geography",
                url: pathData.coach.geography,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "calendar",
                t_key: "dashboard_sidebar_availability_btn_label",
                text: "calendar",
                url: pathData.coach.availability,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "reviews",
                t_key: "pwa_reviews_menu",
                text: "reviews",
                url: pathData.coach.reviews,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
              key: "profile status",
              t_key: "edit_profile_status",
              text: "profile status",
              url: null,
              hasSubItem: false,
              line: false,
              checker:true,
              item: true
            }
        ],
    },
    {
        key: "bookings",
        t_key: "app_bar_dashboard_booking",
        icon: require('@/assets/img/svg-icons/new/calendar-alt.svg'),
        text: "bookings",
        url: pathData.coach.bookings,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "contacts",
        t_key: "app_bar_coach_contacts_page",
        icon: require('@/assets/img/svg-icons/new/contact-card.svg'),
        text: "contacts",
        url: pathData.coach.coachContacts,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "exercises",
        t_key: "dropdown_item_exercises",
        icon: require('@/assets/img/svg-icons/new/exercise.svg'),
        text: "exercises",
        url: pathData.pages.exercises,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "earnings",
        t_key: "pwa_profile_earnings",
        icon: require('@/assets/img/svg-icons/new/bag-euro.svg'),
        text: "earnings",
        url: pathData.coach.balanceEarnings,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "payout",
        t_key: "pwa_payout_menu",
        icon: require('@/assets/img/svg-icons/new/bank.svg'),
        text: "payout",
        url: pathData.coach.payoutInformation,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "line",
        t_key: "line",
        text: "line",
        hasSubItem: false,
        line: true,
        checker:false,
        item: false
    },
    {
        key: "settings",
        t_key: "dropdown_item_settings",
        icon: require('@/assets/img/svg-icons/new/setting.svg'),
        text: "settings",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "account",
                t_key: "setting_label_acc",
                text: "account",
                url: pathData.coach.account,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "notifications",
                t_key: "setting_sec_notification_title",
                text: "notifications",
                url: pathData.coach.notification,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "security",
                t_key: "athlete_settings_tab_security",
                text: "security",
                url: pathData.pages.security,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
        ],
    },
  ];
const adminItems = [
    {
      key: "dashboard",
      t_key: "text_dashboard",
      icon: require('@/assets/img/svg-icons/new/home.svg'),
      text: "dashboard",
      url: pathData.admin.dashboard,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "user",
      t_key: "pwa_user_list",
      icon: require('@/assets/img/svg-icons/new/user-icon.svg'),
      text: "user",
      url: pathData.admin.userList,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "orders",
      t_key: "pwa_order_list",
      icon: require('@/assets/img/svg-icons/new/basket-plus.svg'),
      text: "orders",
      url: pathData.admin.orderList,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "sessions",
      t_key: "app_bar_booking_sessions",
      icon: require('@/assets/img/svg-icons/new/sessions.svg'),
      text: "sessions",
      url: pathData.admin.bookingSessions,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
        key: "exercises",
        t_key: "dropdown_item_exercises",
        icon: require('@/assets/img/svg-icons/new/exercise.svg'),
        text: "exercises",
        url: pathData.pages.exercises,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
      key: "promo codes",
      t_key: "pwa_promo_codes",
      icon: require('@/assets/img/svg-icons/new/special-discount.svg'),
      text: "promo codes",
      url: pathData.admin.promos,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "payout",
      t_key: "pwa_payout_request",
      icon: require('@/assets/img/svg-icons/new/bank.svg'),
      text: "payout",
      url: pathData.admin.payoutRequest,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "translation",
      t_key: "dropdown_item_translation",
      icon: require('@/assets/img/svg-icons/new/type-square.svg'),
      text: "translation",
      url: pathData.admin.translation,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
    {
      key: "logs",
      t_key: "dropdown_item_logs",
      icon: require('@/assets/img/svg-icons/new/books-pencil.svg'),
      text: "logs",
      url: pathData.admin.userLog,
      hasSubItem: false,
      line: false,
      checker:false,
      item: true
    },
  ];


export default {
    athleteItems : athleteItems,
    coachItems : coachItems,
    adminItems : adminItems,
};