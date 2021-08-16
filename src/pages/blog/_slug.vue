<template>
  <div class="blog-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-list elevation="1">
            <v-list-item-group
              v-model="selectedCategory"
              color="primary-light-1"
            >
              <v-subheader>Category</v-subheader>
              <div
                v-for="(category, i) in categories"
                :key="i"
                @click="handleCategoryClick(category.translation)"
              >
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ category.translation }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="12">
              <v-card>
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>
                <v-card-text class="p-0">
                  <div class="bootstrap-wrapper">
                    <div v-html="post.published_content"></div>
                  </div>
                </v-card-text>
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

export default {
  head() {
    return {
      title: "Blog",
      titleTemplate: "Coachsome - %s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.title
        }
      ]
    };
  },
  async asyncData({ params, app, $axios }) {
    let categories = [];
    let post = {};

    const categoryRes = await pageBuilderApi($axios).getBlogCategory({
      locale: app.i18n.locale
    });
    categories = categoryRes.data.data.categories;

    const blogRes = await pageBuilderApi($axios).getBlogPost();
    if (blogRes.data.blog) {
      post = blogRes.data.blog.find(item => item.title == params.slug);
    }
    console.log(params, blogRes.data);

    return {
      categories,
      post,
      selectedCategory: null,
      title: params.slug
    };
  },
  methods: {
    data() {
      return {};
    },
    handleCategoryClick(category) {
      this.$router.push(this.localePath(`/blog?category=${category}`));
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  height: 100%;
  background: $body-bg;
  .bootstrap-wrapper::v-deep {
    @import "~bootstrap/dist/css/bootstrap.min";
  }
}
</style>
