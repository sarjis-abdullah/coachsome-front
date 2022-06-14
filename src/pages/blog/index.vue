<template>
  <div class="blog-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-card
            min-height="422"
            class="feature-card ma-0"
            color="#F7FAFC"
            flat
          >
            <div
              :class="[
                'feature-card__body',
                { 'feature-card__body--sm': $vuetify.breakpoint.smAndDown },
                { 'feature-card__body--md': $vuetify.breakpoint.mdAndUp }
              ]"
            >
              <div
                :class="[
                  'feature-card__title',
                  { 'feature-card__title--sm': $vuetify.breakpoint.smAndDown },
                  { 'feature-card__title--md': $vuetify.breakpoint.mdAndUp }
                ]"
              >
                {{ $t("blog_feature_title") }}
              </div>
              <div
                :class="[
                  'feature-card__description',
                  {
                    'feature-card__description--sm':
                      $vuetify.breakpoint.smAndDown
                  },
                  {
                    'feature-card__description--md': $vuetify.breakpoint.mdAndUp
                  }
                ]"
              >
                {{ $t("blog_feature_description") }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="max-width: 1110px;">
      <v-row>
        <v-col cols="12" md="4" v-for="(item, i) in allPost" :key="i">
          <v-card
            @click.stop="handleReadMoreClick(item.slug_url)"
            class="post-card mx-auto rounded-lg mt-5"
            max-width="370"
          >
            <v-img :src="item.featured_image" height="200"></v-img>

            <v-card-title>
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle style="min-height: 200px!important;">
              {{ item.short_description }}
            </v-card-subtitle>

            <v-card-actions>
              <div class="caption font-weight-light ml-2">
                {{ moment(item.created_at).format("MMM Do YY") }}
              </div>
              <v-spacer></v-spacer>
              <v-btn
                color="#2D3748"
                class="text-normal"
                text
                @click.stop="handleReadMoreClick(item.slug_url)"
              >
                {{ $t("blog_txt_read_more") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";

export default {
  head() {
    return {
      title: "Blog",
      titleTemplate: "Coachsome - %s"
    };
  },
  async asyncData({ query, app, $axios }) {
    let allPost = [];
    const { data } = await $axios.get("/tikcms/blog/list");
    // console.log(data);
    if (data.data.list) {
      if (data.data.list.hasOwnProperty(app.i18n.locale)) {
        allPost = data.data.list[app.i18n.locale];
      } else {
        allPost = data.data.list["en"];
      }
    }

    return {
      allPost: allPost
    };
  },
  methods: {
    moment,
    handleReadMoreClick(title) {
      this.$router.push(this.localePath(`/blog/${title}`));
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  height: 100%;
  .feature-card {
    position: relative;
    height: 100%;
    .feature-card__body {
      &--md {
        position: absolute;
        top: 40%;
        left: 10%;
      }
      &--sm {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .feature-card__title {
        font-family: $font-family;
        font-weight: bold;
        font-size: 75.8854px;
        color: #000000;
        &--md {
          font-size: 75.8854px;
        }
        &--sm {
          font-size: 40.8854px;
        }
      }
      .feature-card__description {
        font-family: $font-family;
        font-weight: normal;
        font-size: 37.9427px;
        line-height: 52px;
        color: #4a5568;
        &--md {
          font-size: 37.9427px;
        }
        &--sm {
          font-size: 15.9427px;
        }
      }
    }
  }

  .post-card {
    .v-image {
      cursor: pointer;
    }
  }
}
</style>
