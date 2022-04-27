<template>
  <v-app>
    <top-nav :theme="theme" :color="color" v-if="$vuetify.breakpoint.mdAndUp">
      <template v-slot:sport-search>
        <div></div>
      </template>
    </top-nav>
    <v-main class="pt-0">
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
      <BottomNavigation v-if="$vuetify.breakpoint.smAndDown" />
    </v-main>
    <FrontFooter />
  </v-app>
</template>

<script>
import FrontFooter from "@/components/layout/global/FrontFooter";
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
import BottomNavigation from "@/components/layout/global/BottomNavigation";
import { pathData } from "@/data";

export default {
  components: {
    FrontFooter,
    GlobalHeader,
    TopNav,
    BottomNavigation
  },
  data() {
    return {
      theme: "dark",
      color: "transparent"
    };
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
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {
    changeColor() {
      if (document.documentElement.scrollTop > 100) {
        this.theme = "dark";
        this.color = "primary";
      } else {
        this.theme = "dark";
        this.color = "transparent";
      }
    }
  }
};
</script>
