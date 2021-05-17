<template>
  <div class="profile-simple-card">
    <v-card>
      <v-card-text>
        <div class="card-container">
          <!-- Avatar -->
          <div class="card-avatar">
            <img :src="getImage" />
            <h4 class="card-avatar__name">{{ name }}</h4>
          </div>

          <!-- Info -->
          <!-- <div class="card-info">
            <div class="card-info__item">
              <v-rating
                readonly
                v-model="rating"
                background-color="orange lighten-3"
                color="orange"
                medium
              ></v-rating>
            </div>
            <div class="card-info__item pl-3">
              {{ rating_count }} {{ $t("text_reviews") }}
            </div>
            <div class="card-info__item pl-3">
              Svarer normalt på 7 min
            </div>
            <div class="card-info__item pl-3">
              Svarrate 100%
            </div>
          </div> -->
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { imageService } from "@/services";
export default {
  props: {
    name: String,
    image: String,
    rating: Number,
    rating_count: Number,
    tags: Array,
    categories: Array,
    fb_link: String,
    twitter_link: String,
    instagram_link: String,
  },
  computed: {
    getImage() {
      return this.image ? this.image : imageService.getDefaultProfileImage();
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.profile-simple-card {
  .card-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .v-card {
      background: #ffffff;
      box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
      border-radius: 10px;
    }

    .card-avatar {
      text-align: center;
      img {
        height: 137px;
        text-align: center;
        margin-top: -45px;
        box-shadow: 0px 2px 4px rgba(73, 85, 106, 0.15);
        border-radius: 10px;
      }
      &__name {
        font-family: $font-family;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
        text-transform: uppercase;
        color: $primary-light-1;
      }
      &__rating {
        text-align: center;
      }
    }

    .card-info {
      &__item {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #9faec2;
      }
    }
  }
}
</style>
