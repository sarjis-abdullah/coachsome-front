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
  middleware: ["auth"],
  components: {
    TopNav,
    GlobalHeader
  },
  data() {
    return {
      socket: null
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({ name: "main" });
    this.socket.on("new_message", data => {
      console.log(data);
    });
  },
  methods: {}
};
</script>
