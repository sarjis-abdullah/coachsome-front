<template>
  <div class="cookie-dialog">
    <v-dialog v-model="dialog" persistent max-width="600" scrollable>
      <v-card class="cookie" color="#F7FAFC">
        <v-card-text>
          <div class="cookie__title">
            {{ $t("header_cookie_title") }}
          </div>
          <div class="cookie__description">
            <i18n
              path="header_cookie_initial_description"
              tag="p"
              v-if="isShowInitialDescription"
            >
              <template v-slot:cookiePolicy>
                <a
                  :href="cookiePolicyPath"
                  style="color:#6EB5CB;  text-decoration-line: underline;"
                  >Cookie Policy</a
                >
              </template>
              <template v-slot:privacyPolicy>
                <a
                  :href="privacyPolicyPath"
                  style="color:#6EB5CB;  text-decoration-line: underline;"
                  >Privacy Policy</a
                >
              </template>
            </i18n>
            <div v-if="isShowRejectDescription">
              {{ $t("header_cookie_description_does_not_work_without_cookie") }}
            </div>
          </div>
          <div class=" mt-10 ">
            <v-row justify="center">
              <v-col cols="12" md="6" :order="$vuetify.breakpoint.mdAndUp ? 1 : 2">
                <v-btn
                  color="#C44130"
                  depressed
                  dark
                  block
                  @click="handleRejectAllBtnClick"
                  class="text-capitalize"
                >
                  {{ $t("header_cookie_btn_label_reject_all") }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" :order="$vuetify.breakpoint.mdAndUp ? 2 : 1">
                <v-btn
                  color="#6ECB72"
                  depressed
                  dark
                  block
                  @click="handleAcceptAllBtnClick"
                  class="text-capitalize"
                >
                  {{ $t("header_cookie_btn_label_accept_all") }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { pathData } from "@/data";
export default {
  props: {
    open: {
      type: Boolean
    }
  },
  data() {
    return {
      dialog: false,
      cookiePolicyPath: pathData.pages.cookiePolicy,
      privacyPolicyPath: pathData.pages.policy,
      isReject: false
    };
  },
  computed: {
    isShowRejectDescription() {
      return this.isReject;
    },
    isShowInitialDescription() {
      return !this.isReject;
    }
  },
  watch: {
    open: {
      immediate: true,
      handler: function(val) {
        this.dialog = val;
      }
    }
  },
  methods: {
    handleRejectAllBtnClick() {
      // this.isReject = true;
      localStorage.setItem("cookie:accept", "false");
      this.dialog = false;
    },
    handleAcceptAllBtnClick() {
      localStorage.setItem("cookie:accept", "true");
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-dialog {
  border-radius: 32px !important;
  background: red;
}
.cookie-dialog {
}
.cookie {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 70px;
  &__title {
    margin-top: 25px;
    word-wrap: break-word;
    font-family: $font-family;
    font-weight: bold;
    font-size: 20px;
    line-height: 149.7%;
    // text-transform: uppercase;
    margin-bottom: 25px;
    color: $primary-light-1;
  }
  &__description {
    font-family: $font-family;
    font-weight: normal;
    font-size: 14px;
    line-height: 149.7%;
    // text-transform: uppercase;
    color: #2c3749;
  }
}
</style>
