<template>
  <v-app>
    <TopNav />
    <v-main class="body-bg">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TopNav from "@/components/layout/admin/TopNav";

export default {
  middleware: ["auth-admin"],
  components: {
    TopNav
  }
};
</script>
