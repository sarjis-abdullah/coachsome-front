<template>
  <div class="public-profile">
    <v-container>
      <v-row justify="center">
        <v-col md="10" cols="12">
          <!-- Profile and Travel -->
          <v-row justify="center">
            <v-col cols="12" md="6" class="mt-10">
              <profile-card v-bind="profileCard"></profile-card>
            </v-col>
            <v-col cols="12" md="6" class="mt-10">
              <div class="map-card">
                <v-card>
                  <v-card-text class="px-0 py-0">
                    <div>
                      <div
                        id="map"
                        class="map"
                        :style="{
                          height: mapHeight
                        }"
                      ></div>
                      <div class="map-card__title" v-if="travelCard.farAway">
                        <div v-if="travelCard.isOfferOnlyOnline">
                          {{ $t("geography_distance_online_offer_only") }}
                        </div>
                        <div v-else>
                          {{ $t("profile_content_map_title") }}
                          {{ travelCard.farAway }}
                          {{ travelCard.unit }}
                        </div>
                      </div>
                    </div>
                    <v-list-item class="grow py-0">
                      <v-list-item-content>
                        <div>{{ $t("text_got_a_question") }}</div>
                      </v-list-item-content>
                      <v-spacer></v-spacer>
                      <v-list-item-action>
                        <v-btn
                          class="blue-grey--text"
                          dark
                          small
                          depressed
                          color="#E1E8F1"
                          @click.stop="contactBtnHandle"
                          >{{ $t("text_message") }}
                          {{ profileCard.name }}</v-btn
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <!-- Service -->
          <v-row v-if="services.length > 0">
            <v-col cols="12">
              <div class="section-title">
                {{ $t("public_profile_section_services") }}
              </div>
            </v-col>
            <v-col cols="12" md="6" v-for="(service, i) in services" :key="i">
              <service-card v-bind="service">
                <template v-slot:book-now-btn>
                  <v-btn color="accent" @click.stop="handleBooking(service)">
                    {{ $t("btn_label_book_now") }}
                  </v-btn>
                </template>
                <template v-slot:description="{ text }">
                  <client-only>
                    <read-more
                      :more-str="$t('btn_label_read_more')"
                      :text="text"
                      link="#"
                      :less-str="$t('btn_label_read_less')"
                      :max-chars="500"
                    ></read-more>
                  </client-only>
                </template>
              </service-card>
            </v-col>
          </v-row>

          <!-- More about and fact -->
          <v-row justify="center">
            <v-col cols="12" md="6" v-if="moreAbout">
              <v-row>
                <v-col cols="12">
                  <div class="section-title">
                    {{ $t("public_profile_section_more_about") }}
                    {{ profileCard.name }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-text>
                      <client-only>
                        <read-more
                          :more-str="$t('btn_label_view_more')"
                          :text="moreAbout"
                          link="#"
                          :less-str="$t('general_label_read_less')"
                          :max-chars="1000"
                        ></read-more>
                      </client-only>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <div class="section-title">{{ $t("text_facts") }}</div>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-text>
                      <div class="title primary-light-1--text">
                        {{ $t("profile_language_title") }}
                      </div>

                      <!-- Language -->
                      <v-row v-if="languageList">
                        <v-col cols="12">
                          <div class="d-flex">
                            <v-icon color="green" small
                              >mdi-chat-outline</v-icon
                            >
                            <span class="ml-5">
                              {{ languageList }}
                            </span>
                          </div>
                        </v-col>
                      </v-row>

                      <!-- Validation -->
                      <div class="title primary-light-1--text">
                        {{ $t("text_validate") }}
                      </div>
                      <v-row>
                        <!-- Google -->
                        <v-col cols="12" v-if="verification.google">
                          <div class="d-flex">
                            <v-icon
                              small
                              v-if="verification.google"
                              color="green"
                              >mdi-check-circle-outlin</v-icon
                            >
                            <v-icon
                              small
                              v-if="!verification.google"
                              color="red"
                              >mdi-cancel</v-icon
                            >
                            <span class="ml-5">{{
                              $t("profile_content_facts_google")
                            }}</span>
                          </div>
                        </v-col>

                        <!-- Facebook -->
                        <v-col cols="12" v-if="verification.facebook">
                          <div class="d-flex">
                            <v-icon
                              small
                              v-if="verification.facebook"
                              color="green"
                              >mdi-check-circle-outlin</v-icon
                            >
                            <v-icon
                              small
                              v-if="!verification.facebook"
                              color="red"
                              >mdi-cancel</v-icon
                            >
                            <span class="ml-5">
                              {{ $t("profile_content_facts_fb_conn") }}
                            </span>
                          </div>
                        </v-col>

                        <!-- Gmail -->
                        <v-col cols="12" v-if="verification.gmail">
                          <div class="d-flex">
                            <v-icon
                              small
                              v-if="verification.gmail"
                              color="green"
                              >mdi-check-circle-outline</v-icon
                            >
                            <v-icon
                              small
                              v-if="!verification.gmail"
                              color="error"
                              >mdi-cancel</v-icon
                            >
                            <span class="ml-5">
                              {{ $t("profile_content_email") }}
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Images -->
          <v-row justify="center" v-if="gallery.links.length > 0">
            <v-col cols="12" md="12" class="mt-10" :gutter="0">
              <v-row>
                <v-col cols="12">
                  <div class="section-title">
                    {{ $t("public_profile_section_images") }}
                  </div>
                </v-col>
                <v-col>
                  <client-only>
                    <template v-slot:placeholder>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                      ></v-skeleton-loader>
                    </template>
                    <darkbox-gallery :gallery="gallery.links"></darkbox-gallery>
                  </client-only>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Reviews -->
          <v-row>
            <v-col>
              <v-row v-if="reviewers.length > 0">
                <v-col
                  cols="12"
                  class="d-flex justify-space-between align-center"
                >
                  <div class="section-title">
                    {{ $t("public_profile_section_reviews") }}
                  </div>
                  <v-btn
                    color="accent"
                    class="white--text text-normal"
                    depressed
                    @click.stop="handleReviewBtnClick"
                  >
                    {{ $t("public_profile_btn_label_give_a_review") }}
                  </v-btn>
                </v-col>
                <v-col
                  class="mb-5"
                  cols="12"
                  md="6"
                  v-for="(reviewer, i) in reviewers"
                  :key="i"
                >
                  <review-card v-bind="reviewer"></review-card>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col class="text-center mb-5">
                  <v-btn
                    color="accent"
                    class="white--text text-normal"
                    depressed
                    @click.stop="handleReviewBtnClick"
                  >
                    {{ $t("public_profile_btn_label_give_a_review") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Question Box Dialog -->
          <v-dialog v-model="questionBox.dialog" max-width="500px" attach>
            <v-card>
              <v-card-text>
                <div class="question-box">
                  <div class="question-box__header">
                    <div class="question-box-title">
                      {{ $t("public_profile_ques_box_title") }}
                      {{ profileCard.name }}
                    </div>
                  </div>
                  <div class="question-box__body">
                    <div class="question-box-label">
                      {{ $t("public_profile_question_box_text_area_label") }}
                    </div>
                    <div class="question-box-text-area">
                      <v-textarea
                        v-model="questionBox.question"
                        solo
                        :label="
                          $t('public_profile_label_text_area_question_box')
                        "
                      ></v-textarea>
                    </div>
                  </div>
                  <div class="question-box__footer">
                    <div class="question-box-btn">
                      <v-btn
                        color="primary-light-1"
                        :disabled="questionBox.question.length < 1"
                        dark
                        depressed
                        @click="questionSendBtnHandle"
                      >
                        {{ $t("public_profile_ques_box_btn_label_send") }}
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Question Box Dialog -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProfileCard from "@/components/card/ProfileCard";
import ServiceCard from "@/components/card/ServiceCard";
import ReviewCard from "@/components/card/ReviewCard";
import BookingRequest from "@/components/artifact/global/BookingRequest";
import { bookingHelper, storageHelper, seoHelper } from "@/helper";
import { profileData, pathData } from "@/data";
import { profileApi, messageApi } from "@/api";

import DarkboxGallery from "@/components/darkbox/Gallery";
export default {
  head() {
    return {
      title: this.$i18n.t("profile_page_meta_title", {
        firstname: this.userInfo.firstName,
        lastname: this.userInfo.lastName,
        sport:
          this.profileCard.categories.length &&
          this.profileCard.categories.map(item =>
            this.$i18n.t(item.t_key).toLowerCase()
          )[0]
      }),
      titleTemplate: "%s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.removeTags(this.moreAbout)
        },
        ...seoHelper.createSocialMeta({
          title: this.profileCard.name,
          description: this.removeTags(this.moreAbout),
          image: this.profileCard.landscapeImage
        })
      ],
      link: []
    };
  },
  props: {
    userName: String
  },
  components: {
    DarkboxGallery,
    ProfileCard,
    ServiceCard,
    ReviewCard,
    BookingRequest
  },
  data() {
    return {
      questionBox: {
        dialog: false,
        question: ""
      },
      bookingRequest: {
        dialog: false,
        coachInfo: null,
        service: null
      },
      descriptionMaxChar: 0
    };
  },
  computed: {
    showLoadMoreBtn() {
      return (
        this.gallery.links.length > 0 &&
        this.gallery.loadingLimit < this.gallery.links.length
      );
    },
    languageList() {
      return this.languages
        ? this.languages.map(item => this.$i18n.t(item.t_key)).join(", ")
        : "";
    },
    mapHeight() {
      if (this.$vuetify.breakpoint.name == "xl") {
        return "300px";
      } else if (this.$vuetify.breakpoint.name == "lg") {
        return "219px";
      } else if (this.$vuetify.breakpoint.name == "md") {
        return "208px";
      } else {
        return "300px";
      }
    }
  },
  watch: {
    "questionBox.dialog": function() {
      this.questionBox.question = "";
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await profileApi($axios).getProfileInformation(
        params.username
      );

      let profileCard = {
        name: "",
        image: "",
        rating: 0,
        rating_count: 0,
        tags: [],
        categories: [],
        fb_link: "",
        twitter_link: "",
        instagram_link: ""
      };

      let userInfo = {
        id: null,
        email: null,
        userName: null,
        firstName: "",
        lastName: ""
      };

      let gallery = {
        loadMoreBtnLoading: false,
        loadingLimit: 8,
        links: []
      };

      let travelCard = {
        map: null,
        farAway: null,
        isOfferOnlyOnline: true,
        unit: "",
        locationList: []
      };

      let verification = {
        google: false,
        mobile: false,
        facebook: false,
        gmail: false
      };

      let languages = [];
      let reviewers = [];
      let services = [];
      let moreAbout = "";

      // Profile Info
      if (data.profile_info) {
        profileCard.name = data.profile_info.profile_name;
        profileCard.image =
          data.profile_info.image || profileData.PROFILE_DEFAULT_IMAGE;
        profileCard.landscapeImage =
          data.profile_info.landscapeImage || profileData.PROFILE_DEFAULT_IMAGE;
        profileCard.fb_link = data.profile_info.fb_link;
        profileCard.twitter_link = data.profile_info.twitter_link;
        profileCard.instagram_link = data.profile_info.instagram_link;
        profileCard.tags = data.profile_info.tags;
        profileCard.categories = data.profile_info.categories;
        moreAbout = data.profile_info.more_about;
      }

      if (data.profile_info.languages) {
        languages = data.profile_info.languages;
      }

      // Reviews
      if (data.rating_info) {
        profileCard.rating = data.rating_info.rating;
        profileCard.rating_count = data.rating_info.rating_count;
        reviewers = data.rating_info.reviewers;
      }

      // User info
      if (userInfo) {
        userInfo.id = data.user_info.id;
        userInfo.email = data.user_info.email;
        userInfo.userName = data.user_info.userName;
        userInfo.firstName = data.user_info.firstName;
        userInfo.lastName = data.user_info.lastName;
      }

      // Services
      if (data.packages) {
        services = data.packages.map(item => {
          return {
            id: item.id,
            title: item.details.title,
            description: item.details.description,
            session: item.details.session,
            categoryId: item.category.id,
            timePerSession: item.details.time_per_session,
            category: item.category,
            originalPrice: item.originalPrice,
            salePrice: item.salePrice,
            attendeesMin: item.details.attendees_min,
            attendeesMax: item.details.attendees_max,
            discount: item.details.discount
          };
        });
      }

      // Masonry links
      if (data.links) {
        gallery.links = data.links;
      }

      // Location
      if (data.locations.length > 0) {
        travelCard.locationList = data.locations;
      }

      // Travel distance
      if (data.distance) {
        travelCard.farAway = data.distance.far_away;
        travelCard.isOfferOnlyOnline = data.distance.is_offer_only_online;
        travelCard.unit = data.distance.unit;
      }

      // Travel distance
      if (data.verification) {
        verification.google = data.verification.google;
        verification.facebook = data.verification.facebook;
        verification.gmail = data.verification.gmail;
      }

      return {
        profileCard,
        languages,
        moreAbout,
        reviewers,
        userInfo,
        services,
        gallery,
        travelCard,
        verification
      };
    } catch (res) {
      error({ statusCode: 422, message: "Coach not found" });
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
    handleReviewBtnClick() {
      if (this.$auth.loggedIn) {
        this.$router.push(
          this.localePath(
            pathData.pages.baseReviewAction(this.$route.params.username)
          )
        );
      } else {
        this.$router.push(this.localePath(pathData.pages.login));
      }
    },
    questionSendBtnHandle() {
      let payload = {
        userId: this.userInfo.id,
        message: this.questionBox.question
      };
      messageApi(this.$axios)
        .sendMessage(payload)
        .then(() => {
          this.$toast.success("Your question is sent successfully.");
          this.questionBox.dialog = false;
        })
        .catch(({ response }) => {
          response.data.message && this.$toast.error(response.data.message);
        });
    },
    contactBtnHandle() {
      if (!this.$auth.loggedIn) {
        this.$router.push(pathData.pages.register);
        let questionBox = {
          userId: this.userInfo.id,
          userName: this.userInfo.userName,
          isUserAuthenticatedAtTheTimeOfCreating: false
        };
        storageHelper.set("question_box", questionBox);
      } else {
        this.questionBox.dialog = true;
      }
    },
    handleService(service = null) {
      this.bookingRequest.dialog = true;
      this.bookingRequest.service = service;
      this.bookingRequest.coachInfo = this.profileCard;
    },
    handleBooking(service = null) {
      bookingHelper.removeBookingInfoFromStorage();
      this.$router.push(
        this.localePath(pathData.pages.bookingPackage(service.id))
      );
    },
    initMap() {
      if (this.travelCard.map != undefined) {
        this.map.remove();
      }
      let center = {
        long: 9.5018,
        lat: 56.2639
      };

      this.travelCard.map = window.L.map("map", {
        // [lat, long]
        center: [center.lat, center.long],
        zoom: 6
      });

      window.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(this.travelCard.map);

      this.travelCard.locationList.forEach(item => {
        window.L.marker([item.lat, item.long])
          .addTo(this.travelCard.map)
          // .bindPopup(item.address)
          .openPopup();
      });
    }
  }
};
</script>

<style lang="scss">
.public-profile {
  background: $body-bg;
  #map {
    z-index: 0;
  }

  .map-card {
    &__title {
      opacity: 0.7;
      background: #6f8098;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      color: #f7fafc;
    }
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

  .question-box {
    &__header {
      padding: 18px 0px;
      .question-box-title {
        font-family: $font-family;
        font-size: 18px;
        line-height: 25px;
        text-transform: uppercase;
        color: #15577c;
      }
    }
    &__body {
      .question-box-label {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #15577c;
      }
      .question-box-text-area {
        margin-top: 2px;
      }
    }
    &__footer {
      padding-bottom: 18px;
    }
  }
}
</style>
