<template>
  <v-app>
    <div class="cs-loading-wrapper" v-if="loading">
        <div class="cs-splash">
            <div class="v-cloak"></div>
        </div>
    </div>
    <div v-else>
      <TopNav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp && !isAdmin" />
      <admin-top-nav color="#15577C" v-if="$vuetify.breakpoint.mdAndUp &&  isAdmin"></admin-top-nav>
      <!-- <AppDrawer
        v-if="$vuetify.breakpoint.mdAndUp && isLoggedIn" 
        :drawerItems="commonDrawerItems" 
        :isActive="statusActive" 
        @toggleActiveStatus="updateActiveStatus"
        @logOut="handleLogOut"
      /> -->
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
import AppDrawer from '@/components/artifact/global/AppDrawer.vue';
import { drawerItems , clientBackDrawerApi } from "@/api";

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
    AdminTopNav,
    AppDrawer
  },
  data() {
    return {
      loading: this.$vuetify.breakpoint.smAndDown ? true : false,
      coachItems: drawerItems.coachItems,
      adminItems: drawerItems.adminItems,
      athleteItems: drawerItems.athleteItems,
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
    isLoggedIn() {
      return this.$auth.loggedIn;
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
