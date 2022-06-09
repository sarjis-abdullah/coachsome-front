<template>
  <v-app>
    <div class="cs-loading-wrapper" v-if="loading">
        <div class="cs-splash">
            <div class="v-cloak"></div>
        </div>
    </div>
    <div v-else>
      <TopNav color="primary" v-if="$vuetify.breakpoint.mdAndUp && !isAdmin" />
      <admin-top-nav v-if="$vuetify.breakpoint.mdAndUp &&  isAdmin"></admin-top-nav>
      <v-main>
        <client-only>
          <GlobalHeader />
        </client-only>
        <nuxt />
        <BottomNavigation v-if="$vuetify.breakpoint.smAndDown" />
      </v-main>
      <FrontFooter />
    </div>
  </v-app>
</template>

<script>
import FrontFooter from "@/components/layout/global/FrontFooter";
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
import AdminTopNav from "@/components/layout/admin/TopNav";
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import { pathData } from "@/data";

export default {
  middleWare: ["home"],
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  components: {
    FrontFooter,
    GlobalHeader,
    TopNav,
    BottomNavigation,
    AdminTopNav
  },
  data() {
    return {
      loading: this.$vuetify.breakpoint.smAndDown ? true : false,
    };
  },
  computed:{
    isAdmin() {
      if(this.$auth.loggedIn){
        return this.hasRole(["superadmin", "admin", "staff"]);
      }else{
        return false;
      }
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
  mounted() {
    setTimeout(function () { 
      this.loading  = false;
    }.bind(this), 300)
  },
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
  }
};
</script>
<style scoped>
  .v-cloak::before {
      content: url('~assets/images/logo-dark.svg');
  }
  .cs-loading-wrapper{
      position: relative;
      height: 100vh;
      background-color: white;
  }
  .cs-splash{
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
</style>
