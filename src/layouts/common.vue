<template>
  <v-app>
    <TopNav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp" />
    <AppDrawer
      v-if="$vuetify.breakpoint.mdAndUp" 
      :drawerItems="commonDrawerItems" 
      :isActive="statusActive" 
      @toggleActiveStatus="updateActiveStatus"
      @logOut="handleLogOut"
    />
    <v-main>
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
      <BottomNavigation v-if="$vuetify.breakpoint.smAndDown" />
    </v-main>
  </v-app>
</template>

<script>
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import { pathData } from "@/data";
import AppDrawer from '@/components/artifact/global/AppDrawer.vue';
import { clientBackDrawerApi } from "@/api";

export default {
  middleware: ["auth"],
  components: {
    TopNav,
    GlobalHeader,
    BottomNavigation,
    AppDrawer
  },
  data() {
    return {
      coachItems: [
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
                }
            ],
        },
        {
            key: "profile_status",
            t_key: "profile_status",
            url: null,
            hasSubItem: false,
            line: false,
            checker:true,
            item: false
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
      ],
      adminItems: [
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
      ],
      athleteItems: [
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
                },
                {
                    key: "packages",
                    t_key: "pwa_package_menu",
                    text: "packages",
                    url: null,
                    hasSubItem: false,
                    line: false,
                    checker:false,
                    item: true
                },
                {
                    key: "gallery",
                    t_key: "pwa_gallery_menu",
                    text: "gallery",
                    url: null,
                    hasSubItem: false,
                    line: false,
                    checker:false,
                    item: true
                },
                {
                    key: "geography",
                    t_key: "pwa_geography_menu",
                    text: "geography",
                    url: null,
                    hasSubItem: false,
                    line: false,
                    checker:false,
                    item: true
                },
                {
                    key: "calendar",
                    t_key: "dashboard_sidebar_availability_btn_label",
                    text: "calendar",
                    url: null,
                    hasSubItem: false,
                    line: false,
                    checker:false,
                    item: true
                },
                {
                    key: "reviews",
                    t_key: "pwa_reviews_menu",
                    text: "reviews",
                    url: null,
                    hasSubItem: false,
                    line: false,
                    checker:false,
                    item: true
                }
            ],
        },
        {
            key: "profile_status",
            t_key: "profile_status",
            url: null,
            hasSubItem: false,
            line: false,
            checker:true,
            item: false
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
      ],
    };
  },
  computed:{
    commonDrawerItems() {
      if(this.$auth.loggedIn){
        if(this.hasRole(["superadmin", "admin", "staff"])){
          return this.adminItems;
        }else if(this.hasRole(["coach"])){
          return this.coachItems;
        }else if(this.hasRole(["athlete"])){
          return this.athleteItems;
        }else{
          return [];
        }
      }else{
        return [];
      }
    },
    statusActive() {
      return this.$auth.user.is_active;
    },
  },
  created(){
    const currentRoute = this.$route.path;
    if(currentRoute == pathData.pages.home 
    || currentRoute == pathData.admin.dashboard 
    || currentRoute == pathData.coach.home 
    || currentRoute == pathData.athlete.home
    ){
      this.$store.dispatch("activeBottomNav", 0);
    }
    else if(currentRoute == pathData.pages.chat){
      this.$store.dispatch("activeBottomNav", 1);
    }
    else if(currentRoute == pathData.pages.coaches){
      this.$store.dispatch("activeBottomNav", 2);
    }
    else if(currentRoute == pathData.pages.login){
      this.$store.dispatch("activeBottomNav", 4);
    }
    else if(currentRoute == pathData.coach.bookings || currentRoute == pathData.athlete.bookings){
      this.$store.dispatch("activeBottomNav", 3);
    }
    else if(
    currentRoute == pathData.admin.profileMenu 
    || currentRoute == pathData.coach.profileMenu 
    || currentRoute == pathData.athlete.profileMenu){
      this.$store.dispatch("activeBottomNav", 4);
    }
  },
  mounted() {},
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
    updateActiveStatus(value){
      clientBackDrawerApi(this.$axios)
        .changeActiveStatus()
        .then(({ data }) => {
          this.statusActive = data.isActive;
          this.$store.dispatch("changeActiveStatus", data.isActive);
        })
        .catch(error => {
          if (error.response.data.status == "error") {
            this.$toast.error(error.response.data.message);
          }
        });
    },
    async handleLogOut(){
        await this.$auth.logout();
        this.$socket.emit("force_disconnect");
        this.$store.dispatch("setUser", null);
        if (!this.$auth.loggedIn) {
          this.$router.push(this.localePath(pathData.pages.home));
        }
    }
  }
};
</script>