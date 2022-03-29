<template>
  <div class="review-action">
    <v-container>
      <v-snackbar v-model="snackbar.value" :multi-line="snackbar.multiLine">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar.value = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-row justify="center" align="center" class="mt-5">
        <v-col cols="12" md="6" v-if="isShowingNotFound">
          <NotFound />
        </v-col>
      </v-row>
      <v-row justify="center" align="center" v-if="isShowingMainContent">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text class="px-10 pt-8 pb-15">
              <div>
                <v-avatar v-if="profile.image">
                  <img :src="profile.image" alt="profile image" />
                </v-avatar>
                <v-avatar
                  v-if="!profile.image"
                  color="primary-light-1"
                  size="56"
                >
                  {{ profile.nameAvatar }}
                </v-avatar>
                <div class="top">
                  <div class="top__title">
                    <i18n path="base_review_title_give_a_review">
                      <template v-slot:name>
                        <span>{{ profile.name }}</span>
                      </template>
                    </i18n>
                  </div>
                  <div class="top__description">
                    <i18n path="base_review_desc_give_a_review">
                      <template v-slot:name>
                        <span>{{ profile.name }}</span>
                      </template>
                    </i18n>
                  </div>
                </div>
                <div class="medium">
                  <div class="medium__title">
                    <i18n path="base_review_title_how_would_you_rate">
                      <template v-slot:name>
                        <span>{{ profile.name }}</span>
                      </template>
                    </i18n>
                  </div>
                  <div class="medium__rating">
                    <v-rating
                      style="padding-left:-11px; margin-left: -11px;"
                      v-model="rating"
                      color="rating"
                      background-color="rating"
                      hover
                      medium
                    ></v-rating>
                  </div>
                </div>
                <div class="bottom">
                  <div class="bottom__title">
                    {{ $t("base_review_title_write_your_review") }}
                  </div>
                  <div class="bottom__text-area">
                    <v-textarea
                      v-model="reviewText"
                      solo
                      :label="$t('base_review_placeholder_texarea')"
                    ></v-textarea>
                  </div>
                </div>
              </div>
              <v-btn
                color="#EDB041"
                class="white--text"
                :disabled="isSubmitBtnDisabled"
                block
                :loading="isLoading"
                @click="handleSubmitBtnClick"
              >
                {{ $t("base_review_bnt_label_submit_review") }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NotFound from "@/components/errors/NotFound";
import { baseReviewApi } from "@/api";
import { pathData } from "@/data";

export default {
  layout: "common",
  components: {
    NotFound
  },
  data() {
    return {
      isLoading: false,
      isShowingNotFound: true,
      snackbar: {
        multiLine: true,
        value: false,
        text: `I'm a multi-line snackbar.`
      },
      profile: {
        image: "",
        nameAvatar: "",
        name: ""
      },
      rating: 0,
      reviewText: ""
    };
  },
  computed: {
    isShowingMainContent() {
      return !this.isShowingNotFound;
    },
    isSubmitBtnDisabled() {
      return !this.reviewText || !this.rating;
    }
  },
  created() {
    if(process.browser && this.$auth.user.user_name == this.$route.params.username){
      this.$toast.error(this.$i18n.t("self_review_error"));
      this.$router.push(this.localePath(pathData.pages.home));
    }
    baseReviewApi(this.$axios)
      .getProfileInfo({
        userName: this.$route.params.username
      })
      .then(({ data }) => {
        this.isShowingNotFound = false;
        this.profile.name = data.profileName;
        this.profile.image = data.profileImage;
        this.profile.nameAvatar = data.nameAvatar;
        console.log(data);
      })
      .catch(() => {});
  },
  methods: {
    handleSubmitBtnClick() {
      if (!this.rating) {
        this.snackbar.value = true;
        this.snackbar.text = "Give a rating for the the coach.";
      }

      if (!this.reviewText) {
        this.snackbar.value = true;
        this.snackbar.text = "Please put a comment.";
      }

      if (this.reviewText && this.rating) {
        this.isLoading = true;
        baseReviewApi(this.$axios)
          .store({
            userName: this.$route.params.username,
            rating: this.rating,
            text: this.reviewText
          })
          .then(() => {
            this.$router.push({
              path: pathData.pages.baseReviewSuccess,
              query: { userName: this.$route.params.username }
            });
          })
          .catch(({ response }) => {
            this.$toast.error(response.data.message);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss">
.review-action {
  background: $body-bg;
  height: 100%;
  .v-text-field .v-label {
    overflow: visible;
    text-overflow: auto;
    white-space: normal;
  }
  .top {
    margin-top: 10px;
    margin-bottom: 10px;
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 20px;
      line-height: 22px;
      color: $primary-light-1;
    }
    &__description {
      margin-top: 5px;
      font-family: $font-family;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: $primary-light-1;
    }
  }
  .medium {
    margin-top: 10px;
    &__title {
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      display: flex;
      align-items: center;

      color: $primary-light-1;
    }
    &__rating {
    }
  }

  .bottom {
    margin-top: 10px;
    &__title {
      margin-bottom: 5px;
      font-family: $font-family;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: $primary-light-1;
    }
  }
}
</style>
