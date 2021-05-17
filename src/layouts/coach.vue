<template>
  <v-app>
    <TopNav color="primary" />
    <CoachDrawer />
    <v-main>
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import CoachDrawer from "@/components/layout/coach/CoachDrawer";
import TopNav from "@/components/layout/global/TopNav";
export default {
  middleware: ["auth-coach"],
  components: {
    TopNav,
    GlobalHeader,
    CoachDrawer
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
