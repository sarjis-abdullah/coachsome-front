<template>
  <div class="card-review">
    <div class="card-review__header">
      <div class="d-flex align-center">
        <div>
          <v-avatar class="mr-2">
            <img alt="Avatar" :src="avatarImage" />
          </v-avatar>
        </div>
        <div class="d-md-flex">
          <div class="card-review-title">
            {{ title || $t("profile_card_title_default_txt") }}
          </div>
          <div class="px-md-5 px-0" v-if="reviewee" :style="{ color: '#6F8098' }">
            {{ $t("review_txt_review") }}
          </div>
          <div v-if="reviewee">
            <v-btn
              class="text-normal px-0"
              height="auto"
              color="primary-light-1"
              text
              @click="handleRevieweeBtnClick(reviewee.userName)"
            >
              {{ reviewee.profileName }}
            </v-btn>
          </div>
        </div>
      </div>
      <div class="card-review__date">
        {{ date }}
      </div>
    </div>
    <div class="card-review__body">
      <v-rating
        class="my-2"
        v-model="rating"
        readonly
        background-color="rating"
        color="rating"
        dense
        half-increments
        hover
        size="12"
      ></v-rating>
      <div class="card-review-comment">
        <client-only>
          <read-more
            :more-str="$t('btn_label_view_more')"
            :text="description"
            link="#"
            :less-str="$t('general_label_read_less')"
            :max-chars="maxChars"
          ></read-more>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { profileData, pathData } from "@/data";
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "Unknown"
    },
    description: null,
    image: null,
    rating: null,
    maxChars: {
      type: Number,
      default: 100
    },
    date: {
      type: String
    },
    reviewee: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      avatarImage: "",
      readMore: false
    };
  },
  created() {
    this.assignImage();
  },
  methods: {
    handleRevieweeBtnClick(username) {
      window.open(
        this.localePath(pathData.pages.publicProfile(username)),
        "_blank"
      );
    },
    assignImage() {
      this.avatarImage = profileData.PROFILE_DEFAULT_IMAGE;
      if (this.image) {
        fetch(this.image, { method: "HEAD" })
          .then(res => {
            if (res.ok) {
              this.avatarImage = this.image;
            }
          })
          .catch(() => {
            this.avatarImage = this.image;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-review {
  box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
  border-radius: 10px;
  background: #ffffff;
  padding-top: 15px;
  padding-left: 21px;
  padding-right: 21px;
  padding-bottom: 45px;
  &__date {
    font-family: $font-family;
    font-size: 10px;
    line-height: 14px;
    text-align: right;
    margin-top: 33px;
    color: #6f8098;
  }
  &__header {
    justify-content: space-between;

    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
  }
  &__body {
  }

  &-view-more {
    float: right;
    text-decoration: none;
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #6f8098;
  }

  &-title {
    text-decoration: none;
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: $primary-light-1;
  }

  &-comment {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #49556a;
  }
}
</style>
