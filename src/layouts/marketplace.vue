<template>
  <v-app>
    <TopNav color="primary">
      <template v-slot:sport-search>
        <span></span>
      </template>
    </TopNav>
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
  components: {
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

<style lang="scss" scoped>
body{
  background: $body-bg;
}
</style>
