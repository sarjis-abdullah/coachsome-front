<template>
  <v-container fluid style="background: #F7FAFC; padding-bottom:100vh">
    <!-- Mobile Nav -->
    <mobile-top-nav
      extraClass="body-bg-secondary"
      :headerText="$t('app_bar_coach_contacts_page')"
    >
      <template v-slot:goBack>
        <v-btn icon @click="handleBack">
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <img
            :src="require('@/assets/img/svg-icons/add-circle.svg')"
            alt="contacts-package cursor-pointer"
            class="pr-2"
            @click="$router.push('/coach/contacts?contactForm=1')"
          />
      </template>
    </mobile-top-nav>
    <!-- Desktop Nav -->
    <span
      class=" view-profile__wrapper"
      :class="{ 'page-container': !$vuetify.breakpoint.xsOnly }"
    >
      <v-row class="d-none d-md-block">
        <v-col cols="12" class="pb-0">
          <div class="page-title">
            {{ $t("app_bar_coach_contacts_page") }}
          </div>
        </v-col>
      </v-row>
      <v-row class="d-none d-md-block">
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>
    </span>
    <CoachContacts/>
  </v-container>
</template>

<script>
import MobileTopNav from "@/components/layout/global/MobileTopNav";
import CoachContacts from "@/components/contacts/CoachContacts";
export default {
  layout: "coach-no-drawer",
  components: {
    MobileTopNav,
    CoachContacts
  },
  methods: {
    handleBack() {
      this.$router.replace("/")
    }
  }
};
</script>

<style scoped>
.page-title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 34px;
}
</style>
