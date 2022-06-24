<template>
  <v-container fluid class="blog-page">
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="post.title">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>

    <div :class="{'px-5' : !$vuetify.breakpoint.smAndDown}">
        <v-row justify="center">
          <v-col cols="12" md="9" sm="12">
            <v-row>
              <v-col cols="12" md="12" sm="12" :class="{'pa-0' : $vuetify.breakpoint.smAndDown}">
                <v-card class="post body-bg" :class="{'post__box-shadow' : !$vuetify.breakpoint.smAndDown}" elevation="0">
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>
                  <v-img :src="post.featured_image" height="538"></v-img>
                  <div :class="{'pa-5' : $vuetify.breakpoint.smAndDown, 'pa-10' : !$vuetify.breakpoint.smAndDown}">
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
                      {{ moment(post.published_date).locale(localeData).format("MMM Do YY") }}
                    </div>
                    <div class="post__subsubtitle pt-5">
                      {{$t("blog_written_by")}} -  {{ post.author_name }}
                    </div>
                  </div>
                  <v-divider></v-divider>
                  <div :class="{'pa-5' : $vuetify.breakpoint.smAndDown, 'pa-10' : !$vuetify.breakpoint.smAndDown}">
                    <div class="bootstrap-wrapper">
                      <div v-html="post.published_content"></div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
    </div>
  </v-container>
</template>

<script>
import { pageBuilderApi } from "@/api";
import moment from "moment";
import { seoHelper } from "@/helper";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import { pathData } from "@/data";

export default {
  components: {MobileTopNav},
  head() {
    return {
      title: this.post ? this.post.title : "",
      titleTemplate: "Coachsome - %s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post ? this.post.short_description : ""
        },
         ...seoHelper.createSocialMeta({
          title: this.post ? this.post.title : "",
          description: this.post ? this.post.short_description : "",
          image: this.post ? this.post.featured_image : ""
        })
      ]
    };
  },
  data() {
    return {
      authorName: "",
    };
  },
  computed: {
    localeData(){
      return this.$i18n.locale;
    }
  },
  async asyncData({ params, app, $axios }) {
    let post = {};
    try {
      const blogRes = await $axios.get("/tikcms/blog/all/published/show");
      if (blogRes.data.blog) {
        post = blogRes.data.blog.find(item => item.slug_url == params.slug);
      }
    } catch (error) {
      console.log(error)
    }

    return {
      post
    };
  },
  methods: {
    moment,
    handleBack(){
      this.$router.push(this.localePath(pathData.pages.blog));
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  height: 100%;
  background: $body-bg;
  .post {
    &__box-shadow{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important;
    }
    &__title {
      font-family: $font-family;
      font-style: normal;
      font-weight: bold;
      &--md {
        font-size: 40px;
        line-height: 58px;
      }
      &--sm {
        font-size: 30px;
        line-height: 43px;
      }
      
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
      font-size: 18px;
      line-height: 31px;
      color: #2d3748;
    }
  }

  .bootstrap-wrapper::v-deep {
    @import "~bootstrap/dist/css/bootstrap.min";
  }
}
</style>
