<template>
  <div class="review-page">
    <v-container fluid >
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('review_page_title')">
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

      <span class="page-container">
          <v-row class="d-none d-md-block">
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("review_page_title") }}</div>
            </v-col>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("coach_review_title_review_score") }}
              </div>
              <div class="section-description text-justify">
                {{ $t("coach_review_description_total_review_received_txt") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="12">
                  <div class="d-flex align-center mt-2 flex-wrap">
                    <div class="total-review">
                      {{ baseReview.totalCount }}
                      {{ $t("coach_review_txt_reviews") }}
                    </div>
                    <div class="d-flex align-center ml-0 ml-sm-5 mt-1 mt-sm-0">
                      <v-rating
                        v-model="baseReview.overallStarRating"
                        background-color="rating"
                        color="rating"
                        dense
                        readonly
                        half-increments
                        hover
                        size="18"
                      ></v-rating>
                      <span class="overall-rating ml-2">
                        {{ baseReview.overallStarRating }}
                      </span>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="8">
                  <div class="slider">
                    <div class="slider__title">
                      {{ $t("coach_review_star_five") }}
                    </div>
                    <v-slider
                      class="slider__rating"
                      :value="baseReview.slider.fiveStar"
                      :max="baseReview.max"
                      :min="baseReview.min"
                      color="accent"
                      thumb-color="transparent"
                      hide-details
                      readonly
                      track-color="white"
                    ></v-slider>
                    <div class="slider__value">
                      ({{ baseReview.slider.fiveStar }})
                    </div>
                  </div>
                  <div class="slider">
                    <div class="slider__title">
                      {{ $t("coach_review_star_four") }}
                    </div>
                    <v-slider
                      class="slider__rating"
                      :value="baseReview.slider.fourStar"
                      :max="baseReview.max"
                      :min="baseReview.min"
                      color="accent"
                      thumb-color="transparent"
                      hide-details
                      readonly
                      track-color="white"
                    ></v-slider>
                    <div class="slider__value">
                      ({{ baseReview.slider.fourStar }})
                    </div>
                  </div>
                  <div class="slider">
                    <div class="slider__title">
                      {{ $t("coach_review_star_three") }}
                    </div>
                    <v-slider
                      class="slider__rating"
                      :value="baseReview.slider.threeStar"
                      :max="baseReview.max"
                      :min="baseReview.min"
                      color="accent"
                      thumb-color="transparent"
                      hide-details
                      readonly
                      track-color="white"
                    ></v-slider>
                    <div class="slider__value">
                      ({{ baseReview.slider.threeStar }})
                    </div>
                  </div>
                  <div class="slider">
                    <div class="slider__title">
                      {{ $t("coach_review_star_two") }}
                    </div>
                    <v-slider
                      class="slider__rating"
                      :value="baseReview.slider.twoStar"
                      :max="baseReview.max"
                      :min="baseReview.min"
                      color="accent"
                      thumb-color="transparent"
                      hide-details
                      readonly
                      track-color="white"
                    ></v-slider>
                    <div class="slider__value">
                      ({{ baseReview.slider.twoStar }})
                    </div>
                  </div>
                  <div class="slider">
                    <div class="slider__title">
                      {{ $t("coach_review_star_one") }}
                    </div>
                    <v-slider
                      class="slider__rating"
                      :value="baseReview.slider.oneStar"
                      :max="baseReview.max"
                      :min="baseReview.min"
                      color="accent"
                      thumb-color="transparent"
                      hide-details
                      readonly
                      track-color="white"
                    ></v-slider>
                    <div class="slider__value">
                      ({{ baseReview.slider.oneStar }})
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("coach_review_section_title_request_review") }}
              </div>
              <div class="section-description text-justify">
                {{ $t("coach_review_section_description_request_review") }}
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center">
                <v-btn
                  block
                  depressed
                  color="accent"
                  class="text--black"
                  @click="baseReview.requestDialog = true"
                >
                  {{ $t("coach_review_btn_label_request_a_review") }}
                </v-btn>
                <a :href="reviewLinkUrl" class="share-link" ref="mylink"  @click.prevent="copyUrl">
                  {{$t("pwa_share_review_link")}}
                </a>
              </div>
            </v-col>
          </v-row>

          <!-- Base Review request dialog -->
          <v-dialog
            class="request-card"
            v-model="baseReview.requestDialog"
            max-width="600"
          >
            <v-card>
              <v-card-title class="headline">
                <v-spacer></v-spacer>
                <v-btn x-small icon @click="baseReview.requestDialog = false">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col class="pt-0" cols="12" md="4">
                    <div class="section-title pb-2">
                      {{ $t("coach_review_dialog_title_request_reviews") }}
                    </div>
                    <div class="section-description text-justify">
                      {{ $t("coach_review_request_dialog_desc") }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <div class="field-title">
                      {{ $t("coach_review_text_email_address") }}
                    </div>
                    <v-form ref="form" v-model="baseReview.valid" lazy-validation>
                      <div
                        v-for="(item, i) in baseReview.elements"
                        :key="i"
                        class="d-flex"
                      >
                        <v-text-field
                          v-model="item.email"
                          :rules="item.emailRules"
                          placeholder="example@email.com"
                          solo
                          dense
                        ></v-text-field>
                        <v-btn icon v-if="baseReview.elements.length > 1">
                          <v-icon @click="handleRemoveBtnClick(i)" small
                            >mdi-close</v-icon
                          >
                        </v-btn>
                      </div>
                      <div
                        class="d-flex justify-space-between align-center mt-3 flex-wrap"
                      >
                        <v-btn
                        block
                          @click="handleAddMoreBtnClick"
                          text
                          class="text-normal"
                        >
                          {{ $t("coach_review_btn_label_add_more") }}
                        </v-btn>
                        <div class="mr-9 mt-4 mt-md-0">
                          <v-btn
                          block
                            :loading="baseReview.isRequestLoading"
                            depressed
                            class="white--text"
                            color="primary-light-1"
                            @click="makeRequest"
                          >
                            {{ $t("coach_review_btn_label_send_req") }}
                          </v-btn>
                        </div>
                      </div>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Base Review request dialog -->

          <v-row class="mt-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("review_section_title_fa_review") }}
              </div>
              <div class="section-description text-justify">
                {{ $t("review_section_desc_fa_review") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="6">
                  <client-only>
                    <v-facebook-login
                      v-model="facebookLogin"
                      app-id="730811284065741"
                      version="v5.0"
                      @sdk-init="initFB"
                      @login="fbLogin"
                      :login-options="{ scope: 'manage_pages,pages_show_list' }"
                      style="width:100%"
                    >
                      <template #login>
                        <span>{{ $t("button_label_fa_review") }}</span>
                      </template>
                      <template #logout>
                        <span>
                          {{ $t("coach_review_btn_label_sign_out") }}
                        </span>
                      </template>
                    </v-facebook-login>
                  </client-only>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="section-description text-md-justify">
                    {{ $t("review_helper_text_fa_btn") }}
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-btn
                    large 
                    block
                    :loading="isUpdateBtnloading"
                    :disabled="!facebookLogin.connected"
                    @click="updateReview"
                    >{{ $t("btn_label_update_review") }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("review_title_imported_review") }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4" v-for="(reviewer, i) in reviewers" :key="i">
              <review-card v-bind="reviewer"></review-card>
            </v-col>
          </v-row>
          <!-- <v-row class="d-sm-flex d-xs-flex d-lg-none">
            <v-col cols="12" class="mx-0 px-0">
              <client-back-footer class="px-0 py-0" />
            </v-col>
          </v-row> -->
        </span>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import VFacebookLogin from "vue-facebook-login-component";
import ReviewCard from "@/components/card/ReviewCard";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import { reviewApi, baseReviewApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "coach",
  components: {
    VFacebookLogin,
    ReviewCard,
    ClientBackFooter,
    MobileTopNav
  },
  data() {
    return {
      baseReview: {
        valid: true,
        requestDialog: false,
        isRequestLoading: false,
        defaultElement: {
          email: "",
          emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
          ]
        },
        elements: [
          {
            email: "",
            emailRules: [
              v => !!v || "E-mail is required",
              v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ]
          }
        ],
        totalCount: 0,
        overallStarRating: 0,
        max: 0,
        min: 0,
        slider: {
          fiveStar: 0,
          fourStar: 0,
          threeStar: 0,
          twoStar: 0,
          oneStar: 0
        }
      },
      isUpdateBtnloading: false,
      facebookLogin: { connected: false },
      rating: 0,
      fbSdkInstance: null,
      reviewers: []
    };
  },
  computed:{
    reviewLinkUrl(){
       return this.localePath(pathData.pages.baseReviewAction(this.$auth.user.user_name));
    }
  },
  created() {
    reviewApi(this.$axios)
      .getReviews()
      .then(response => {
        this.reviewers = response.data.reviewers;
      })
      .catch(() => {});

    baseReviewApi(this.$axios)
      .getBaseReview({})
      .then(({ data }) => {
        this.baseReview.overallStarRating = data.overallRating;
        this.baseReview.totalCount = data.reviewerCount;
        this.baseReview.max = data.reviewerAnalysis.maxReviewer;
        this.baseReview.slider.oneStar = data.reviewerAnalysis.reviewer.oneStar;
        this.baseReview.slider.twoStar = data.reviewerAnalysis.reviewer.twoStar;
        this.baseReview.slider.threeStar =
          data.reviewerAnalysis.reviewer.threeStar;
        this.baseReview.slider.fourStar =
          data.reviewerAnalysis.reviewer.fourStar;
        this.baseReview.slider.fiveStar =
          data.reviewerAnalysis.reviewer.fiveStar;
      });
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.coach.editMenu));
    },
    copyUrl() {
      var Url = this.$refs.mylink;
      navigator.clipboard.writeText(Url);
      this.$toast.success(this.$i18n.t("pwa_review_link_copy"));
    },
    makeRequest() {
      if (this.$refs.form.validate()) {
        this.baseReview.isRequestLoading = true;
        baseReviewApi(this.$axios)
          .makeRequest(this.baseReview.elements.map(item => item.email))
          .then(() => {
            this.$toast.success(
              this.$i18n.t(
                "coach_review_success_message_email_was_sent_successfully"
              )
            );
            this.baseReview.requestDialog = false;
          })
          .catch(() => {})
          .finally(() => {
            this.baseReview.isRequestLoading = false;
          });
      }
    },
    handleAddMoreBtnClick() {
      this.baseReview.elements.push({ ...this.baseReview.defaultElement });
    },
    handleRemoveBtnClick(i) {
      this.baseReview.elements.splice(i, 1);
    },
    refreshPageProgress() {
      this.$store.dispatch("pageProgress/refresh");
    },
    setReviewProgress(val) {
      this.$store.dispatch("pageProgress/setReviewProgress", val);
    },
    updateReview() {
      this.isUpdateBtnloading = true;
      this.fbSdkInstance.FB.api(
        "/me",
        { fields: "accounts{access_token}" },
        meUriresponse => {
          let reviewUrl =
            "https://graph.facebook.com/" +
            meUriresponse.accounts.data[0].id +
            "/ratings?fields=overall_star_rating,rating,created_time,reviewer,recommendation_type,review_text&access_token=" +
            meUriresponse.accounts.data[0].access_token;
          let reviewOverAllRatting =
            "https://graph.facebook.com/" +
            meUriresponse.accounts.data[0].id +
            "/?fields=overall_star_rating,rating_count&access_token=" +
            meUriresponse.accounts.data[0].access_token;

          this.reviewers = [];

          axios.get(reviewOverAllRatting).then(reviewOverAllRattingResponse => {
            axios.get(reviewUrl).then(reviewsResponse => {
              // console.log(reviewsResponse);

              let promises = [];
              reviewsResponse.data.data.forEach(reviewsItem => {
                let reviewerId = reviewsItem.reviewer
                  ? reviewsItem.reviewer.id
                  : "";
                let pictureUrl =
                  "https://graph.facebook.com/v3.3/" +
                  reviewerId +
                  "/picture?redirect=false&access_token=" +
                  meUriresponse.accounts.data[0].access_token;

                promises.push(
                  axios
                    .get(pictureUrl)
                    .then(pictureResponse => {
                      this.reviewers.push({
                        title: reviewsItem.reviewer
                          ? reviewsItem.reviewer.name
                          : "",
                        description: reviewsItem.review_text,
                        rating:
                          reviewsItem.recommendation_type == "positive" ? 5 : 0,
                        image: pictureResponse.data.data.url
                      });
                    })
                    .catch(() => {
                      this.reviewers.push({
                        title: reviewsItem.reviewer
                          ? reviewsItem.reviewer.name
                          : "",
                        description: reviewsItem.review_text,
                        rating:
                          reviewsItem.recommendation_type == "positive" ? 5 : 0,
                        image: null
                      });
                    })
                );

                Promise.all(promises)
                  .then(() => {
                    let payload = {
                      provider: "facebook",
                      access_token: meUriresponse.accounts.data[0].access_token,
                      page_id: meUriresponse.accounts.data[0].id,
                      overall_star_rating:
                        reviewOverAllRattingResponse.data.overall_star_rating,
                      rating_count:
                        reviewOverAllRattingResponse.data.rating_count,
                      reviewers: this.reviewers
                    };
                    reviewApi(this.$axios)
                      .storeReviews(payload)
                      .then(() => {
                        this.refreshPageProgress();
                        this.isUpdateBtnloading = false;
                      })
                      .catch(() => {});
                  })
                  .then(() => {
                    if (!this.reviewers.length) {
                      this.$toast.error("No review found");
                    }
                  });
              });
            });
          });
        }
      );
    },
    fbLogin() {
      console.log("login");
    },
    initFB(sdkInstance) {
      this.fbSdkInstance = sdkInstance;
    },
    login() {
      // loginWithFacebook();
    },
    getJSON(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    }
  }
};
</script>

<style lang="scss">
.review-page {
  background: $body-bg;
  height: 100%;
  .request-card {
    .add-more-btn {
      font-family: $font-family;
      font-weight: normal;
      font-size: 14px;
    }
    .add-more-btn:hover {
      color: red;
      cursor: pointer;
    }
  }
  .share-link {
    font-family: $font-family;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: $primary-light-1;
  }
  .overall-rating {
    font-family: $font-family;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: #edb041;
  }
  .total-review {
    font-family: $font-family;
    font-weight: bold;
    font-size: 18px;
    line-height: 15px;
    color: $primary-light-1;
  }
  .slider {
    display: flex;
    align-items: center;
    justify-content: space-around;
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 14px;
      line-height: 15px;
      color: $primary-light-1;
    }
    &__rating {
      margin-left: 10px;
      margin-right: 10px;
    }
    &__value {
      width: 20%;
      font-family: $font-family;
      font-weight: normal;
      font-size: 14px;
      line-height: 15px;
      color: $primary-light-1;
    }
  }
  .v-btn .rounded-icon {
    border-radius: 50px !important;
  }

  .v-slider--horizontal .v-slider__track-container {
    height: 15px;
  }

  .v-slider .v-slider__track-background {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .v-slider .v-slider__track-fill {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .card-review {
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
    border-radius: 10px;
    &__name {
      text-decoration: none;
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: $primary-light-1;
    }

    &__comment {
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #49556a;
    }

    &__view-more {
      float: right;
      text-decoration: none;
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #6f8098;
    }
  }
}
  .share-link {
    font-family: $font-family;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: $primary-light-1;
  }
</style>
