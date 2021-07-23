<template>
  <div class="base-reviews">
    <v-container>
      <v-row justify="center" class="mt-8">
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <div class="top-title mb-5">
                {{ $t("base_review_list_top_title") }}
              </div>
              <div class="top-description">
                {{ $t("base_review_list_description") }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-10 pb-0" cols="12">
              <div class="d-flex align-center">
                <v-rating
                  v-model="overallRating"
                  size="20"
                  readonly
                  background-color="rating"
                  color="rating"
                  half-increments
                ></v-rating>
                <span class="overall-rating ml-2 mr-4">{{
                  overallRating
                }}</span>
                <span class="total-rating"
                  >{{ totalReviewerCount }}
                  {{ $t("base_review_list_txt_review_given") }}
                </span>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>
          <v-row v-if="reviewers.length > 0" justify="center" class="mb-5">
            <v-col
              class="mb-5"
              cols="12"
              v-for="(reviewer, i) in reviewers"
              :key="i"
            >
              <review-card v-bind="reviewer"></review-card>
            </v-col>
            <infinite-loading @infinite="infiniteHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ReviewCard from "@/components/card/ReviewCard";

import { baseReviewApi } from "@/api";

export default {
  components: {
    ReviewCard
  },
  data() {
    return {
      page: 1,
      totalReviewerCount: 0,
      overallRating: 0,
      reviewers: []
    };
  },
  mounted() {
    this.infiniteHandler();
  },
  methods: {
    infiniteHandler($state) {
      baseReviewApi(this.$axios)
        .all({ page: this.page })
        .then(({ data }) => {
          this.overallRating = data.overallRating;
          this.totalReviewerCount = data.totalReviewerCount;
          if (data.reviewers.length) {
            this.page += 1;
            this.reviewers.push(...data.reviewers);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.base-reviews {
  background: $body-bg;
  height: 100%;
  .top-title {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 41px;
    text-align: center;
    color: #15577c;
  }
  .top-description {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #6f8098;
  }
  .total-rating {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #15577c;
  }
  .overall-rating {
    font-family: $font-family;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: #edb041;
  }
}
</style>
