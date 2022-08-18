<template>
  <v-app>
    <TopNav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp && !isAdmin" />
    <admin-top-nav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp && isAdmin"></admin-top-nav>
    <v-main style="background: #f7fafc">
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
import AdminTopNav from "@/components/layout/admin/TopNav";
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import { pathData } from "@/data";

export default {
  middleware: ["auth"],
  components: {
    TopNav,
    AdminTopNav,
    GlobalHeader,
    BottomNavigation
  },
  data() {
    return {
       selectedContact : null,
       showNav: true,
    };
  },
  computed:{
    navStatus(){
      return this.$store.getters['chat/getNavOnChatStatus'];
    },
    isAdmin() {
      if(this.$auth && this.$auth.loggedIn){
        return this.hasRole(['superadmin', 'admin', 'staff']);
      }else{
        return false;
      }
    },
    showBottomNav (){
      if (this.$route?.query) {
        const { createGroupDialog } = this.$route.query
        if (createGroupDialog) {
          return false
        }
        return true
      }
      return true
    },
    conditionalBottomNav(){
      if (!this.showBottomNav) {
        return false
      }else if (this.$vuetify.breakpoint.smAndDown && !this.navStatus) {
        return true
      }
      return false
    }
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.selectedContact = this.$store.getters["chat/selectedContact"]
      }
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
  // mounted() {
  //   // Tawk Api exist in static directory
  //   // Only chat page do not effect
  //   Tawk_API.onLoad = function() {
  //     Tawk_API.hideWidget();
  //   };
  //   if (Tawk_API.showWidget) {
  //     Tawk_API.hideWidget();
  //   }
  // },
  // destroyed() {
  //   console.log('chat layout');
  //   if (Tawk_API.hideWidget) {
  //     Tawk_API.showWidget();
  //   }
  // },
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
  }
};
</script>
