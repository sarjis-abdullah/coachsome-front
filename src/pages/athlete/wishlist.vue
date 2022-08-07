<template>
  <v-container fluid class="pt-0 mt-0" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">

    <!-- Mobile Header Start -->
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="'Wishlist'">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
    </mobile-top-nav>
    
    <!-- Desktop Header Start -->
    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{ 'Wishlist' }}</div>
      </v-col>
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {  ExerciseApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
  layout: "athlete",
  components: {
    MobileTopNav,
  },
  data() {
    return {
      previewMode: false,
      previewPage: false,
      exerciseInitialData: {
        categories : [],
        sports : [],
        lavels : [],
        tags : [],
        name : null,
        instructions : null,
        links : [],
        categoriesSelected : [],
        sportsSelected : [],
        lavelsSelected : [],
        tagsSelected : [],
        type : null,
        shareWithCoach: false,
        assets : [],
      },
      exerciseDialog: false,
      formValid: true,
      noExercise: false,
      exercisePreviewDialog: false,
      filterRequest: false,
      filter : {
        typeSytem: false,
        typeCustom: false,
        categoriesSelected: [],
        lavelsSelected: [],
        sportsSelected: [],
        withVideo: false,
      },
      exerciseData: null,
      exercises: [],
      isLoading: false,
      loadingLimit: 8,
      search: "",
      table: {
        headers: [
          {
            text: this.$i18n.t("thead_exercises"),
            align: "start",
            value: "assets",
            class: "exercise-table--header",
          },
          { text: this.$i18n.t("thead_category"), value: "category", class: "exercise-table--header" },
          { text: this.$i18n.t("thead_type"), value: "type", class: "exercise-table--header" },
          { text: this.$i18n.t("thead_action"), value: 'actions', sortable: false, filterable: false, class: "exercise-table--header" },
        ],
        rows: []
      },
    };
  },
  methods: {
    handleBack(){
      if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        this.$router.push(this.localePath(pathData.admin.profileMenu));
      }else if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }
    },
  }
};
</script>