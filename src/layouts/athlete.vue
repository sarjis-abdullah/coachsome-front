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
import { drawerItems, clientBackDrawerApi } from "@/api";

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
      items: drawerItems.athleteItems,
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
