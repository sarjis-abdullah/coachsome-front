<template>
  <v-app>
    <TopNav color="primary" v-if="$vuetify.breakpoint.mdAndUp" />
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

export default {
  middleware: ["auth-athlete"],
  components: {
    TopNav,
    GlobalHeader,
    BottomNavigation
  },
  created(){
    const currentRoute = this.$route.path;
    if(currentRoute == pathData.athlete.settings
    ){
      this.$store.dispatch("activeBottomNav", 0);
    }
  },
};
</script>
