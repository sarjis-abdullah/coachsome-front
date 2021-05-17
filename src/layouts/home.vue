<template>
  <v-app>
    <top-nav :theme="theme" :color="color">
      <template v-slot:sport-search>
        <div></div>
      </template>
    </top-nav>
    <v-main class="pt-0">
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
  components: {
    FrontFooter,
    GlobalHeader,
    TopNav,
  },
  data() {
    return {
      theme: "dark",
      color: "transparent"
    };
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
