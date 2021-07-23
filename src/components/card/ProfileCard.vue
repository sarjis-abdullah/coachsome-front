<template>
  <!-- Profile Card -->
  <div class="profile-card">
    <v-card>
      <v-card-text class="text-xs-center">
        <div class="profile-card__top">
          <div class="profile-card__social-icons">
            <!-- <v-btn text icon color="pink" v-if="fb_link" small :href="fb_link" target="_blank">
              <v-icon color="#CAD5E1">fab fa-facebook-f</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              color="#CAD5E1"
              v-if="twitter_link"
              samll
              :href="twitter_link"
              target="_blank"
            >
              <v-icon>fab fa-twitter</v-icon>
            </v-btn>
            <v-btn
              text
              icon
              color="#CAD5E1"
              samll
              v-if="instagram_link"
              :href="instagram_link"
              target="_blank"
            >
              <v-icon>fab fa-instagram</v-icon>
            </v-btn> -->
          </div>
          <div class="profile-card__avatar">
            <single-image-lightbox :src="image" :title="name" :badge-key="badgeKey"/>
          </div>
          <div class="profile-card__empty-place"></div>
        </div>

        <div class="profile-card__middle mt-5">
          <h4 class="profile-card__name">{{ name }}</h4>
          <div v-if="rating_count">
            <div class="profile-card__rating">
              <v-rating
                readonly
                v-model="rating"
                background-color="rating"
                color="rating"
                medium
                half-increments
              ></v-rating>
            </div>
            <div class="profile-card__review-info">
              {{ rating_count }} {{ $t("text_reviews") }}
            </div>
          </div>
        </div>
        <div class="profile-card__bottom">
          <div class="profile-card__category d-flex justify-center flex-wrap">
            <span class="primary--text font-weight-bold">{{
              categories.map(item => $t(item.t_key)).join(", ")
            }}</span>
          </div>
          <div class="profile-card__tag">
            <v-row>
              <v-col class="text-center">
                <span v-for="(item, i) in tags.slice(0, 3)" :key="i">
                  <v-chip class="mx-2 mb-2" small>{{ item.name }}</v-chip>
                  <v-dialog
                    v-model="tagDialog"
                    max-width="600px"
                    v-if="tags.length > 3 && i == 2"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip
                        small
                        color="transparent"
                        v-bind="attrs"
                        v-on="on"
                        @click="handleTagMoreBtnClick"
                        >+ {{ tags.length - 3 }}
                      </v-chip>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">
                          {{ $t("profile_card_tag_title") }}
                        </span>
                      </v-card-title>
                      <v-card-text>
                        <span
                          v-for="(item, i) in tags.slice(2, tags.length - 1)"
                          :key="i"
                        >
                          <v-chip class="mx-2 mb-2" small>{{
                            item.name
                          }}</v-chip>
                        </span>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary-light-1"
                          text
                          @click="tagDialog = false"
                          small
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </span>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
  <!-- Profile Card -->
</template>

<script>
import SingleImageLightbox from "@/components/lightbox/SingleImageLightbox";
export default {
  components: {
    SingleImageLightbox
  },
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
    badgeKey: String
  },
  data() {
    return {
      tagDialog: false,
      settings: {
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 3
      }
    };
  },
  mounted() {},
  methods: {
    handleTagMoreBtnClick() {}
  }
};
</script>

<style lang="scss">
.profile-card {
  .v-slide-group__content {
    justify-content: center;
  }
  .v-card {
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
    border-radius: 10px;
  }

  &__top {
    display: flex;

    * {
      flex: 1;
    }
  }
  &__avatar img {
    width: 100%;
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
  &__middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__review-info {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #9faec2;
  }
  &__bottom {
    margin-top: 19px;
  }
  &__category-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__tag {
    display: flex;
    justify-content: center;
  }
}
</style>
