<template>
  <div class="explore-card">
    <v-card elevation="1" aspect-ratio="1" width="100%">
      <v-img
        clickable
        class="white--text align-end"
        aspect-ratio="1"
        :src="profileImage"
        @click="gotTo(userName)"
      >
        <v-card-title class="pl-2 pb-2 ">
          <v-btn
            v-if="badge.key == badgeData.TOP"
            class="white--text text-normal px-10"
            depressed
            color="#EDB041"
          >
            {{ $t(badge.tKey) }}
          </v-btn>
          <v-btn
            v-if="badge.key == badgeData.POPULAR"
            class="white--text text-normal px-10"
            depressed
            color="#9FAEC2"
          >
            {{ $t(badge.tKey) }}
          </v-btn>
          <v-btn
            v-if="badge.key == badgeData.TRENDING"
            class="white--text text-normal px-10"
            depressed
            color="#D87D54"
          >
            {{ $t(badge.tKey) }}
          </v-btn>
          <v-btn
            v-if="badge.key == badgeData.RISING"
            class="white--text text-normal px-10"
            depressed
            color="#49556A"
          >
            {{ $t(badge.tKey) }}
          </v-btn>
        </v-card-title>
      </v-img>
      <v-card-text>
        <div class="explore-card__content">
          <div class="d-flex flex-column">
            <div class="explore-card__name">{{ name }}</div>
            <div class="d-flex" v-if="countReview">
              <v-rating
                v-model="rating"
                readonly
                small
                dense
                half-increments
                background-color="rating"
                color="rating"
              ></v-rating>
              <span> ({{ countReview }}) </span>
            </div>
            <!-- <div class="explore-card__review"></div> -->
            <!-- <div class="explore-card__address text-ellipsis">{{ location }}</div> -->
            <div class="explore-card__category text-ellipsis">
              {{
                categories && categories.map(item => $t(item.t_key)).join(", ")
              }}
            </div>
          </div>
          <div class="mt-1">
            <span class="explore-card-price-prefix mr-3">
              {{ $t("marketplace_explore_card_price_prefix_txt") }}
            </span>
            <span class="explore-card__price">
              {{ currencyService.toCurrency(price) }}
            </span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { profileData, pathData, badgeData } from "@/data";
import { currencyService } from "@/services";

export default {
  props: {
    image: {
      type: String
    },
    name: {
      type: String
    },
    countReview: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    location: {
      type: String
    },
    price: {
      type: [Number, String]
    },
    categories: {
      type: Array
    },
    userName: {
      type: String
    },
    badge: {
      type: Object
    }
  },
  data() {
    return {
      currencyService,
      badgeData: { ...badgeData }
    };
  },
  methods: {
    gotTo(username) {
      window.open(
        this.localePath(pathData.pages.publicProfile(username)),
        "_blank"
      );
    },
    imageLoadError() {
      console.log("Image failed to load");
    }
  },
  computed: {
    profileImage() {
      return this.image ? this.image : profileData.PROFILE_DEFAULT_IMAGE;
    }
  }
};
</script>

<style lang="scss" scoped>
.explore-card {
  width: 100%;
  &__content {
    height: 90px;
  }
  .v-image {
    cursor: pointer;
  }
  .v-card {
    border-radius: 10px !important;
  }
  .v-image,
  .v-responsive__sizer {
    box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
    border-radius: 10px !important;
  }

  &__name {
    font-family: $font-family;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #000000;
  }
  &__review {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    color: #9faec2 !important;
  }
  &__address {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    color: #9faec2 !important;
  }
  &__price {
    @include h3;
    font-weight: bold;
    color: #1a202d;
  }
  &__rate {
    @include h5;
    color: #9faec2;
  }
  &__category {
    color: $primary;
    @include h6;
  }
  &-price-prefix {
    font-family: $font-family;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #9faec2;
  }
}
</style>
