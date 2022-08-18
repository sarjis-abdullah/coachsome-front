<template>
  <v-app>
    <TopNav color="#15577C" :fixed="false" v-if="$vuetify.breakpoint.mdAndUp && !isAdmin">
      <template v-slot:sport-search>
        <span></span>
      </template>
    </TopNav>
    <admin-top-nav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp && isAdmin"></admin-top-nav>
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
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import TopNav from "@/components/layout/global/TopNav";
import AdminTopNav from "@/components/layout/admin/TopNav";
import { pathData } from "@/data";

export default {
  components: {
    GlobalHeader,
    TopNav,
    AdminTopNav,
    BottomNavigation
  },
  data() {
    return {};
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
  computed:{
    isAdmin() {
      if(this.$auth && this.$auth.loggedIn){
        return this.hasRole(['superadmin', 'admin', 'staff']);
      }else{
        return false;
      }
    },
  },
  mounted() {},
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
  }
};
</script>

<style lang="scss" >
body{
  // background: $body-bg;
}
.v-application{
  &--wrap{  
      background: #F7FAFC!important;
  }
    
}
</style>
