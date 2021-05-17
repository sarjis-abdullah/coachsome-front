<template>
  <div class="coach-drawer">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.smAndUp"
      app
      color="primary"
      fixed
    >
      <client-only>
        <v-list dark dense>
          <template v-for="(item, i) in drawerItems">
            <v-list-item :key="i" :to="item.url" link>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col cols="6">{{ $t(item.t_key) }}</v-col>
                    <v-col cols="6" class="text-right">
                      <span
                        v-if="isProgressShowing && item.key == 'profile'"
                        :class="profileProgressColorValue"
                        >{{ profileProgress }} %</span
                      >
                      <span
                        v-if="isProgressShowing && item.key == 'package'"
                        :class="packageProgressColorValue"
                        >{{ packageProgress }} %</span
                      >
                      <span
                        v-if="isProgressShowing && item.key == 'gallery'"
                        :class="geographyProgressColorValue"
                        >{{ imageAndVideoProgress }} %</span
                      >
                      <span
                        v-if="isProgressShowing && item.key == 'geography'"
                        :class="imageAndVideoProgressColorValue"
                        >{{ geographyProgress }} %</span
                      >
                      <span
                        v-if="isProgressShowing && item.key == 'availability'"
                        :class="availabilityProgressColorValue"
                        >{{ availabilityProgress }} %</span
                      >
                      <span
                        v-if="isProgressShowing && item.key == 'review'"
                        :class="reviewProgressColorValue"
                        >{{ reviewProgress }} %</span
                      >
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template>
            <!-- View Profile -->
            <v-list-item text>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    block
                    color="white"
                    light
                    target="_blank"
                    :href="profileUrl"
                    >{{ $t("dashboard_sidebar_view_profile_btn_label") }}</v-btn
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Activity status button -->
            <v-list-item text>
              <v-list-item-content>
                <v-list-item-title>
                  <client-only>
                    <toggle-button
                      :value="isActive"
                      @input="handleActivityStatus"
                      :color="{ checked: '#4bb543', unchecked: '#b5b5b5' }"
                      :sync="true"
                      :font-size="12"
                      :width="75"
                      :height="22"
                      :labels="{
                        checked: $t('btn_label_active'),
                        unchecked: $t('btn_label_inactive')
                      }"
                    />
                  </client-only>
                  <!-- <v-switch
                  class="ml-5"
                  color="success"
                  @click.stop="handleActivityStatus"
                  v-model="activityStatus.value"
                  :label="activityStatus.value ? $t('btn_label_active') : $t('btn_label_inactive')"
                ></v-switch>-->
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Switched Button -->
            <v-list-item text v-if="isSwitchedUser">
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn @click="revertUser" block outlined color="blue" light
                    >Switch to own user</v-btn
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </client-only>
      <!-- Dialog -->
      <v-dialog v-model="activityStatus.dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">{{
            $t("attention_headline_text")
          }}</v-card-title>
          <v-card-text v-html="$t('attention_content_list')"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="primary-light-1"
              text
              @click="activityStatus.dialog = false"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { clientBackDrawerApi, impersonateAdminApi } from "@/api";
import { pathData } from "@/data";

export default {
  components: {},
  data: () => ({
    drawer: null,
    activityStatus: { value: false, dialog: false, loading: false },
    progressStatus: {
      profile: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      },
      package: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      },
      gallery: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      },
      availability: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      },
      geography: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      },
      review: {
        value: true,
        lowest: false,
        low: false,
        medium: false,
        high: false
      }
    },
    drawerItems: [
      {
        key: "profile",
        t_key: "dashboard_sidebar_profile_btn_lable",
        text: "profile",
        progressing: 0,
        url: pathData.coach.editProfile
      },
      {
        key: "package",
        t_key: "dashboard_sidebar_package_btn_label",
        text: "Packages",
        progressing: 0,
        url: pathData.coach.packages
      },
      {
        key: "gallery",
        t_key: "dashboard_sidebar_img_video_btn_label",
        text: "Image & Video",
        progressing: 0,
        url: pathData.coach.imageAndVideo
      },
      {
        key: "geography",
        t_key: "dashboard_sidebar_geography_btn_label",
        text: "Geography",
        progressing: 0,
        url: pathData.coach.geography
      },
      {
        key: "availability",
        t_key: "dashboard_sidebar_availability_btn_label",
        text: "Availability",
        progressing: 0,
        url: pathData.coach.availability
      },
      {
        key: "review",
        t_key: "dashboard_sidebar_review_btn_label",
        text: "Reviews",
        progressing: 0,
        url: pathData.coach.reviews
      }
    ],
    colorClass: {
      high: "progress-color--high",
      medium: "progress-color--medium",
      low: "progress-color--low",
      lowest: "progress-color--lowest"
    }
  }),
  computed: {
    profileUrl() {
      return process.client
        ? window.location.origin + "/" + this.$auth.user.user_name
        : "";
    },
    isDrawerOpen() {
      return this.$store.getters.isOpenClientBackDrawer;
    },
    isActive() {
      return this.$auth.user.is_active;
    },
    profileProgress() {
      return this.$store.getters["pageProgress/getProfileProgress"];
    },
    packageProgress() {
      return this.$store.getters["pageProgress/getPackageProgress"];
    },
    geographyProgress() {
      return this.$store.getters["pageProgress/getGeographyProgress"];
    },
    imageAndVideoProgress() {
      return this.$store.getters["pageProgress/getImageAndVideoProgress"];
    },
    availabilityProgress() {
      return this.$store.getters["pageProgress/getAvailabilityProgress"];
    },
    reviewProgress() {
      return this.$store.getters["pageProgress/getReviewProgress"];
    },
    totalProgressStatusSum() {
      return (
        this.$store.getters["pageProgress/getProfileProgress"] +
        this.$store.getters["pageProgress/getPackageProgress"] +
        this.$store.getters["pageProgress/getGeographyProgress"] +
        this.$store.getters["pageProgress/getImageAndVideoProgress"] +
        this.$store.getters["pageProgress/getAvailabilityProgress"] +
        this.$store.getters["pageProgress/getReviewProgress"]
      );
    },
    isProgressShowing() {
      return (
        this.$store.getters["pageProgress/getProfileProgress"] +
          this.$store.getters["pageProgress/getPackageProgress"] +
          this.$store.getters["pageProgress/getGeographyProgress"] +
          this.$store.getters["pageProgress/getImageAndVideoProgress"] +
          this.$store.getters["pageProgress/getAvailabilityProgress"] +
          this.$store.getters["pageProgress/getReviewProgress"] !=
        600
      );
    },

    // We choose four color value
    // high
    // medium
    // low
    // lowest
    profileProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getProfileProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    packageProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getPackageProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    geographyProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getGeographyProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    imageAndVideoProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getImageAndVideoProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    availabilityProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getAvailabilityProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    reviewProgressColorValue() {
      const progressValue = this.$store.getters[
        "pageProgress/getReviewProgress"
      ];
      return this.getColorClassValueByProgressValue(progressValue);
    },
    isSwitchedUser() {
      return this.$auth.user.is_switched;
    }
  },
  watch: {
    drawer: function(val) {
      this.$store.dispatch("setClientBackDrawer", val);
    },
    isDrawerOpen: function(val) {
      this.drawer = val;
    },
    isActive: function(val) {
      this.activityStatus.value = val;
    },
    profileProgress: function(val) {
      this.handleProgressStatusProperty("profile", val);
    },
    packageProgress: function(val) {
      this.handleProgressStatusProperty("package", val);
    },
    geographyProgress: function(val) {
      this.handleProgressStatusProperty("geography", val);
    },
    imageAndVideoProgress: function(val) {
      this.handleProgressStatusProperty("gallery", val);
    },
    availabilityProgress: function(val) {
      this.handleProgressStatusProperty("availability", val);
    },
    reviewProgress: function(val) {
      this.handleProgressStatusProperty("review", val);
    },
    totalProgressStatusSum: function(val) {
      if (val == 600) {
        this.progressStatus.profile.value = false;
        this.progressStatus.package.value = false;
        this.progressStatus.gallery.value = false;
        this.progressStatus.geography.value = false;
        this.progressStatus.availability.value = false;
        this.progressStatus.review.value = false;
      } else {
        this.progressStatus.profile.value = true;
        this.progressStatus.package.value = true;
        this.progressStatus.gallery.value = true;
        this.progressStatus.geography.value = true;
        this.progressStatus.availability.value = true;
        this.progressStatus.review.value = true;
      }
    }
  },
  created() {
    this.getInitialData();
  },
  mounted() {
    this.$root.$on("toggle-back-drawer", () => {
      this.drawer = !this.drawer;
    });
  },
  methods: {
    getColorClassValueByProgressValue(progressValue) {
      let value = "";
      if (progressValue < 33 && progressValue >= 0) {
        value = this.colorClass.high;
      } else if (progressValue > 33 && progressValue <= 50) {
        value = this.colorClass.medium;
      } else if (progressValue > 51 && progressValue <= 75) {
        value = this.colorClass.low;
      } else if (progressValue > 75 && progressValue <= 100) {
        value = this.colorClass.lowest;
      }
      return value;
    },
    refreshPageProgress() {
      this.$store.dispatch("pageProgress/refresh");
    },
    handleActivityStatus() {
      clientBackDrawerApi(this.$axios)
        .changeActiveStatus()
        .then(() => {
          this.refreshPageProgress();
        })
        .catch(error => {
          if (error.response.data.status == "error") {
            this.activityStatus.dialog = true;
          }
        });
    },
    revertUser() {
      impersonateAdminApi(this.$axios)
        .revert()
        .then(({ data }) => {
          this.$store.dispatch("logout");
          this.$store.dispatch("login", data.accessToken);
          this.$store.dispatch("setUser", data.user);
          if (this.$auth.hasRole(["coach"])) {
            this.$router.push(this.localePath(pathData.coach.editProfile));
          } else if (this.$auth.hasRole(["athlete"])) {
            this.$router.push(this.localePath(pathData.athlete.editProfile));
          } else {
            this.$router.push(this.localePath(pathData.admin.dashboard));
          }
        })
        .catch(() => {});
    },
    getInitialData() {
      clientBackDrawerApi(this.$axios)
        .getBackendDrawerInitialData()
        .then(({ data }) => {
          this.setProfileProgress(data.progress.profile);
          this.setPackageProgress(data.progress.package);
          this.setImageAndVideoProgress(data.progress.imageAndVideo);
          this.setGeographyProgress(data.progress.geography);
          this.setAvailabilityProgress(data.progress.availability);
          this.setReviewProgress(data.progress.review);

          this.drawerItems[0].progressing = this.profileProgress;
          this.drawerItems[1].progressing = this.packageProgress;
          this.drawerItems[2].progressing = this.imageAndVideoProgress;
          this.drawerItems[3].progressing = this.geographyProgress;
          this.drawerItems[4].progressing = this.availabilityProgress;
          this.drawerItems[5].progressing = this.reviewProgress;
          this.$store.dispatch("changeActiveStatus", data.isActive);
        });
    },
    currentPath() {
      return this.$route.path;
    },
    setProfileProgress(val) {
      this.$store.dispatch("pageProgress/setProfileProgress", val);
    },
    setPackageProgress(val) {
      this.$store.dispatch("pageProgress/setPackageProgress", val);
    },
    setImageAndVideoProgress(val) {
      this.$store.dispatch("pageProgress/setImageAndVideoProgress", val);
    },
    setGeographyProgress(val) {
      this.$store.dispatch("pageProgress/setGeographyProgress", val);
    },
    setAvailabilityProgress(val) {
      this.$store.dispatch("pageProgress/setAvailabilityProgress", val);
    },
    setReviewProgress(val) {
      this.$store.dispatch("pageProgress/setReviewProgress", val);
    },
    handleProgressStatusProperty(propertyName, val) {
      if (val == 0) {
        this.progressStatus[propertyName].lowest = true;
        this.progressStatus[propertyName].low = false;
        this.progressStatus[propertyName].medium = false;
        this.progressStatus[propertyName].high = false;
      }

      if (val < 50 && val > 0) {
        this.progressStatus[propertyName].lowest = false;
        this.progressStatus[propertyName].low = true;
        this.progressStatus[propertyName].medium = false;
        this.progressStatus[propertyName].high = false;
      }

      if (val >= 50) {
        this.progressStatus[propertyName].lowest = false;
        this.progressStatus[propertyName].low = false;
        this.progressStatus[propertyName].medium = true;
        this.progressStatus[propertyName].high = false;
      }

      if (val == 100) {
        this.progressStatus[propertyName].lowest = false;
        this.progressStatus[propertyName].low = false;
        this.progressStatus[propertyName].medium = false;
        this.progressStatus[propertyName].high = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coach-drawer {
  .progress {
    color: $grey-600;
    font-family: $font-family;
  }

  .v-list-item--active .progress--active {
    color: #67b16a !important;
    font-family: $font-family;
  }

  .progress-color--lowest {
    color: #98b6d3 !important;
  }

  .progress-color--low {
    color: #cad5e1 !important;
  }

  .progress-color--medium {
    color: #9faec2 !important;
  }

  .progress-color--high {
    color: #49556a !important;
  }
}
</style>
