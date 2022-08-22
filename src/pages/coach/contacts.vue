<template>
<div class="coach-contact-page">
  <v-container fluid>
    <!-- Mobile Nav -->
    <template v-if="$route && $route.query && !$route.query.contactForm">
      <span class="hidden-md-and-up">
        <mobile-top-nav
        extraClass="body-bg-secondary mb-0"
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
            alt="contacts-package"
            class="pr-2 cursor-pointer"
            @click="toggleContactForm"
          />
        </template>
      </mobile-top-nav>
      </span>
    </template>
     <desktop-top-nav extraClass="body-bg-secondary pt-5" :headerText="$t('app_bar_coach_contacts_page')" ></desktop-top-nav>
    <!-- Desktop Nav -->
    <!-- <template>
      <span
        class="hidden-md-and-down view-profile__wrapper"
        :class="{ 'page-container': !$vuetify.breakpoint.xsOnly }"
      >
        <v-row class="d-none d-md-block">
          <v-col cols="12" class="pb-0">
            <div class="page-title font-color-1">
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
    </template> -->
    <CoachContacts />
  </v-container>
</div>
</template>

<script>
import MobileTopNav from "@/components/layout/global/MobileTopNav";
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';
import CoachContacts from "@/components/contacts/CoachContacts";
import { pathData } from "@/data";
export default {
  layout: "coach",
  head() {
    return {
      title: "Contacts"
    };
  },
  components: {
    MobileTopNav,
    CoachContacts,
    DesktopTopNav
  },
  methods: {
    handleBack() {
      this.$router.push(this.localePath(pathData.coach.profileMenu));
    },
    toggleContactForm() {
      this.$router.push(this.localePath(pathData.coach.coachContacts + '?contactForm=1'))
    },
  }
};
</script>

<style lang="scss" scoped>
.coach-edit-profile-page {
  background: $body-bg;
  height: 100%;
  .page-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 34px;
  }
}
</style>
