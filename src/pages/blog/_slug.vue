<template>
  <div class="blog-page">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="12">
              <v-card class="post">
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>
                <v-img :src="post.featured_image" height="538"></v-img>
                <div class="px-5 pt-10 pb-10">
                  <div
                    :class="[
                      'post__title',
                      {
                        'post__title--md': $vuetify.breakpoint.mdAndUp,
                        'post__title--sm': $vuetify.breakpoint.smAndDown
                      }
                    ]"
                  >
                    {{ post.title }}
                  </div>
                  <div class="post__subtitle pt-5">
                    {{ moment(post.created_at).format("MMM Do YY") }}
                  </div>
                  <div class="post__subsubtitle pt-5">
                    Written by {{ post.author_name }}
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="pa-5">
                  <div class="bootstrap-wrapper">
                    <div v-html="post.published_content"></div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { pageBuilderApi } from "@/api";
import moment from "moment";
export default {
  head() {
    return {
      title: this.post ? this.post.title : "",
      titleTemplate: "Coachsome - %s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post ? this.post.short_description : ""
        }
      ]
    };
  },
  data() {
    return {};
  },
  async asyncData({ params, app, $axios }) {
    let post = {};
    try {
      const blogRes = await pageBuilderApi($axios).getBlogPost();
      if (blogRes.data.blog) {
        post = blogRes.data.blog.find(item => item.slug_url == params.slug);
        if (post) {
          const userResponse = await $axios.get(`/users/${post.author}`);
          if (userResponse.data.data) {
            post.authorName = userResponse.data.data.fullName;
          }
        }
      }
    } catch (error) {
      console.log(error)
    }

    return {
      post
    };
  },
  methods: {
    moment
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  height: 100%;
  background: $body-bg;
  .post {
    &__title {
      font-family: $font-family;
      font-style: normal;
      font-weight: bold;
      &--md {
        font-size: 56.9141px;
      }
      &--sm {
        font-size: 30px;
      }
      line-height: 78px;
      color: #2d3748;
    }
    &__subtitle {
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 22.7656px;
      line-height: 31px;
      color: #718096;
    }
    &__subsubtitle {
      font-family: $font-family;
      font-weight: bold;
      font-size: 22.7656px;
      line-height: 31px;
      color: #2d3748;
    }
  }

  .bootstrap-wrapper::v-deep {
    @import "~bootstrap/dist/css/bootstrap.min";
  }
}
</style>
