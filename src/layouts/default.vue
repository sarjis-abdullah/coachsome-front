<template>
  <v-app>
    <TopNav color="primary" />
    <v-main>
      <client-only>
        <GlobalHeader />
      </client-only>
      <nuxt />
    </v-main>
    <FrontFooter />
  </v-app>
</template>

<script>
import FrontFooter from "@/components/layout/global/FrontFooter";
import GlobalHeader from "@/components/layout/global/GlobalHeader";
import TopNav from "@/components/layout/global/TopNav";
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  components: {
    FrontFooter,
    GlobalHeader,
    TopNav
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
