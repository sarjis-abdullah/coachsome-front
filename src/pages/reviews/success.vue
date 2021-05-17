<template>
  <v-container>
    <div class="review-success">
      <v-row class="mt-5" justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card flat height="500px">
            <v-card-text
              class="d-flex justify-center align-center"
              style="height: 100%;"
            >
              <div class="text-center">
                <div class="success-title">
                  {{ $t("base_review_success_title") }}
                </div>
                <v-btn
                  class="mt-3"
                  color="accent"
                  depressed
                  large
                  @click="handleSeeBtn"
                >
                  {{ $t("base_review_success_btn_label_see_review") }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { pathData } from "@/data";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    handleSeeBtn() {
      this.$router.push(
        this.localePath(
          pathData.pages.publicProfile(this.$route.query.userName)
        )
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.review-success {
  .success-title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
    /* or 110% */

    text-align: center;

    color: $primary-light-1;
  }
}
</style>
