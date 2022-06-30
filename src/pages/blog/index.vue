<template>
  <v-container fluid class="blog-page">
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('blog_feature_title')">
      <template v-slot:goBack>
        <v-btn
          icon
        >
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>
    <v-container fluid>
      <v-row class="feature-card pt-5 pb-5">
        <v-col cols="12" class="pb-0 feature-card__body d-flex justify-center">
          <div
            :class="[
              'feature-card__title',
              { 'feature-card__title--sm': $vuetify.breakpoint.smAndDown },
              { 'feature-card__title--md': $vuetify.breakpoint.mdAndUp }
            ]"
          >
            {{ $t("blog_feature_title") }}
          </div>
        </v-col>
        <v-col class="cols-12 feature-card__body d-flex justify-center pt-0">
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
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid style="background: white">
      <v-row>
        <v-col cols="12" md="3" v-if="blogData.length">
          <v-row>
            <v-col cols="12" md="3" class="d-none d-md-block"></v-col>
            <v-col cols="12" md="9"  class="d-none d-md-block">
              <v-card
                class="mx-auto category-card mt-5"
                tile
              >
                <v-list  nav class="body-bg px-5">
                  <v-subheader class="category-card--subtitle px-1 py-0 ma-0">{{$t("blog_categories")}}</v-subheader>
                  <v-list-item-group
                    v-model="selectedItem"
                    color="primary-light-1"
                    :mandatory="selectedItem!=5"
                    class="py-0 my-0"
                  >
                    <template>
                      <div
                        v-for="(item, i) in categoryData"
                        :key="item.parent_id"
                      >
                      <v-divider
                        v-if="i!=0"
                        :key="i"
                      ></v-divider>
                        <v-list-item  class="px-1 py-0 ma-0">
                          <v-list-item-content @click="showCategoryWised(item.parent_id)">
                            <v-list-item-title class="category-card--list-text">
                              {{ item.translation }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="12" class="d-md-none">
                <v-autocomplete
                  v-model="selectedCategory"
                  :items="categoryData"
                  item-value="parent_id"
                  item-text="translation"
                  :menu-props="{closeOnContentClick: true}"
                  @change="showCategoryWisedSm"
                  outlined
                  dense
                  autocomplete="off"
                  append-icon="expand_more"
                  color="#9FAEC2"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="9">
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
                    {{ moment(item.published_date).locale(localeData).format("MMM Do YY") }}
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
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  components: {
    MobileTopNav
  },
  head() {
    return {
      title: "Blog",
      titleTemplate: "Coachsome - %s"
    };
  },
  data() {
    return {
      selectedItem: 5,
      selectedCategory: 0,
    };
  },
  async asyncData({ query, app, $axios }) {
    let allPost = [];
    const { data } = await $axios.get("/tikcms/blog/list");
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
   async asyncData({ query, app, $axios }) {

        let categoryData = [];
        let allPost = [];
        let blogData = [];


        const category  = await $axios.get("/tikcms/category/translations/by/all/language/show");
        // const blog = await $axios.get("/tikcms/blog/list");
        const publishedBlogs = await $axios.get("/tikcms/blog/all/published/show");


        if (publishedBlogs.data.blog) {

          publishedBlogs.data.blog.map( blogList => {
            if(blogList.language == app.i18n.locale){
              blogData.push(blogList);
              allPost.push(blogList);
            }
          });
        }

        if (category.data.data) {
          let t_key = 'all_categories';
          if(app.i18n.locale == 'en'){t_key = 'All Categories';}
          else if(app.i18n.locale == 'da'){t_key = 'Alle kategorier';}
          else if(app.i18n.locale == 'sv'){t_key = 'Todas las categorias';}

          let defaultCategory = {
                                  'translation': t_key,
                                  'parent_id': 0
                                }

          categoryData.push(defaultCategory);
         
          category.data.data.map( categoryList => {

            if(categoryList.local == app.i18n.locale){

              if(categoryList.category){
                  categoryList.category.map( categoryItem => {
                    categoryData.push(categoryItem);
                  })
              }
            }
          });
        }

        // if (blog.data.data.list) {
        //   if (blog.data.data.list.hasOwnProperty(app.i18n.locale)) {
        //     allPost = blog.data.data.list[app.i18n.locale];

        //   } else {
        //     allPost = blog.data.data.list["en"];
        //   }
        // }

        return {
          allPost: allPost,
          blogData: blogData,
          categoryData: categoryData
        };
    },
  computed: {
    localeData(){
      return this.$i18n.locale;
    }
  },
  methods: {
    moment,
    handleReadMoreClick(title) {
      this.$router.push(this.localePath(`/blog/${title}`));
    },
    showCategoryWised(category){
      if(this.blogData){
        this.allPost = [];
        this.blogData.map( item => {
          if(item.category == category){
            this.allPost.push(item);
          }else if(category == 0){
            this.allPost.push(item);
          }
        });
      }
    },
    showCategoryWisedSm(){
      this.showCategoryWised(this.selectedCategory);
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
  .category-card{
    &--subtitle{
      font-family: $font-family!important;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 41px;
      color: $grey-700!important;
    }
    &--list-text{
      font-family: $font-family!important;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      color: $grey-700!important;
    }
  }
}
</style>
