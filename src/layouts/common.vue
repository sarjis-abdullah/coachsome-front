<template>
  <v-app>
    <TopNav color="primary" />
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
import TopNav from "@/components/layout/global/TopNav";
export default {
  middleware: ["authenticated"],
  components: {
    TopNav,
    GlobalHeader
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
