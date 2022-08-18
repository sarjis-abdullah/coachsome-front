<template>
  <v-app>
    <TopNav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp" />
    <AppDrawer
      v-if="$vuetify.breakpoint.mdAndUp" 
      :drawerItems="items" 
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
  middleware: ["auth-athlete"],
  components: {
    TopNav,
    GlobalHeader,
    BottomNavigation,
    AppDrawer
  },
  data() {
    return {
      items: [
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
      ],
    };
  },
  computed:{
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
