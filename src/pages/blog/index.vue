<template>
  <div class="blog-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-list elevation="1">
            <v-list-item-group
              v-model="selectedCategory"
              mandatory
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
          <v-row v-for="(item, i) in blogPostList" :key="i">
            <v-col cols="12" md="12">
              <v-card>
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>
                <v-img height="250" :src="item.featured_image"></v-img>
                <v-card-title>
                  {{ item.title }}
                </v-card-title>

                <v-card-text>
                  <div>
                    {{ item.short_description }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary-light-1"
                    text
                    x-small
                    @click="handleReadMoreClick(item.title)"
                  >
                    Read more
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="blogPostList.length == 0">
            <v-col cols="12">
              <v-card elevation="1">
                <v-card-text>No post add yet</v-card-text>
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
    };
  },
  async asyncData({ query, app, $axios }) {
    const categoryRes = await pageBuilderApi($axios).getBlogCategory({
      locale: app.i18n.locale
    });

    let categories = [];
    let blogPostList = [];

    if (categoryRes.data.data.categories) {
      categories = categoryRes.data.data.categories;
      if (categories) {
        const blogRes = await pageBuilderApi($axios).getBlogByCategory({
          category: query.category ? query.category : categories[0].translation
        });

        if (blogRes.data.data) {
          blogPostList = blogRes.data.data;
        }
      }
    }

    return {
      categories,
      blogPostList,
      selectedCategory: null
    };
  },
  methods: {
    async handleCategoryClick(category) {
      const blogRes = await pageBuilderApi(this.$axios).getBlogByCategory({
        category
      });

      if (blogRes.data.data) {
        this.blogPostList = blogRes.data.data;
      }
    },
    handleReadMoreClick(title) {
      this.$router.push(this.localePath(`/blog/${title}`));
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  height: 100%;
  background: $body-bg;
}
</style>
