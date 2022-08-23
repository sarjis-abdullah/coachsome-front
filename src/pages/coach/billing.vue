<template>
  <v-container fluid>
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('setting_label_billing')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>
    <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('setting_label_billing')"></desktop-top-nav>
    
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="9"
        lg="9"
        xs="12"
      >

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  layout: "coach",
  components: {
    MobileTopNav,
    DesktopTopNav
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.coach.settings));
    }
  }
};
</script>


<style scoped lang="scss"></style>