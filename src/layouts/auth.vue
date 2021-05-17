<template>
  <v-app>
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
export default {
  middleware: ["guest"],
  components: {
    GlobalHeader
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
