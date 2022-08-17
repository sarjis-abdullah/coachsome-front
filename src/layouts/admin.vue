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
    <v-main class="body-bg">
      <nuxt />
      <!-- to hide from promo code create -->
      <!-- <BottomNavigation v-if="$vuetify.breakpoint.smAndDown && showBottomNav" /> --> 
      <BottomNavigation v-if="$vuetify.breakpoint.smAndDown" />
    </v-main>
  </v-app>
</template>

<script>
import TopNav from "@/components/layout/admin/TopNav";
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import { pathData } from "@/data";
import AppDrawer from '@/components/artifact/global/AppDrawer.vue';
import { clientBackDrawerApi } from "@/api";

export default {
  name: "AdminLayout",
  middleware: ["auth-admin"],
  components: {
    TopNav,
    BottomNavigation,
    AppDrawer
  },
  data() {
    return {
      statusActive: false,
      items: [
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
    };
  },
  computed: {
    showBottomNav (){
      if (this.$route?.query?.promoCodeDialog) {
        return false
      }
      return true
    }
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
  methods: {
    updateActiveStatus(data){
      clientBackDrawerApi(this.$axios)
        .changeActiveStatus()
        .then(() => {
          this.statusActive = data;
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
