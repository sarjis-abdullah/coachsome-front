<template>
  <v-app>
    <v-main class="body-bg">
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
      <bottom-navigation v-if="$vuetify.breakpoint.smAndDown && showNav"></bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
import BottomNavigation from '@/components/layout/global/BottomNavigation.vue';
import { pathData } from "@/data";
import mixpanelService from '@/services/mixpanelService'
export default {
  components: {
    TopNav,
    GlobalHeader,
    BottomNavigation
  },
  data() {
    return {
      showNav: false,
    };
  },
  created(){
    const currentRoute = this.$route.path;
    if(currentRoute == pathData.pages.home 
    || currentRoute == pathData.admin.dashboard 
    // || currentRoute == pathData.coach.home 
    // || currentRoute == pathData.athlete.home
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

    if(process.browser){
      if(this.$route.query.payment_status && this.$route.query.payment_status == "paid"){
        this.showNav =  true;
      }else if(this.$route.query.status && this.$route.query.status == "success"){
        this.showNav = true;
      }else{
        this.showNav = false;
      }
    }
  },
  methods: {}
};
</script>