<template>
  <v-footer class="footer" color="primary" :fixed="fixed">
    <v-card class="footer-card" flat>
      <v-row>
        <v-col cols="12" md="5" class="pl-10">
          <v-row>
            <v-col cols="12" md="4">
              <div class="list">
                <div class="list__title">
                  {{ $t("footer_text_coachsome_aps") }}
                </div>
                <div class="list__item">
                  <router-link :to="uri.price">
                    {{ $t("footer_url_label_pricing") }}
                  </router-link>
                </div>
                <div class="list__item" v-show="false">
                  <router-link to="/">Support</router-link>
                </div>
                <div class="list__item">
                  <router-link :to="uri.about">
                    {{ $t("global_url_about_us") }}
                  </router-link>
                </div>
                <div class="list__item" v-show="false">
                  <router-link to="/">Presses</router-link>
                </div>
                <div class="list__item" v-show="false">
                  <router-link to="/">Job</router-link>
                </div>
                <div class="list__item">
                  <div class="list__separator"></div>
                </div>
                <div class="list__item">
                  <router-link :to="uri.terms">
                    {{ $t("global_url_terms_of_use") }}
                  </router-link>
                </div>
                <div class="list__item">
                  <router-link :to="uri.policy">
                    {{ $t("global_url_privacy_policy") }}
                  </router-link>
                </div>
                <div class="list__item">
                  <router-link :to="uri.cookiePolicy">
                    {{ $t("footer_url_link_cookie_policy") }}
                  </router-link>
                </div>
                <div class="list__item">
                  <router-link :to="uri.refundPolicy">
                    {{ $t("footer_link_fefund_policy") }}
                  </router-link>
                </div>
                <div class="list__item">
                  <router-link :to="uri.faq">
                    {{ $t("global_url_faq") }}
                  </router-link>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4" v-show="false">
              <div class="list">
                <div class="list__title">Explore</div>
                <div class="list__item" v-show="false">
                  <router-link to="/">City</router-link>
                </div>
                <div class="list__item" v-show="false">
                  <router-link to="/">Sport</router-link>
                </div>
                <div class="list__item" v-show="false">
                  <div class="list__separator"></div>
                </div>
                <div class="list__item">
                  <router-link :to="uri.howItWorks">How it works</router-link>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="list">
                <div class="list__title">
                  {{ $t("footer_list_title_more_fun") }}
                </div>
                <!-- <div class="list__item">
                  <router-link to="/">Invite friend</router-link>
                </div>
                <div class="list__item">
                  <router-link to="/">News</router-link>
                </div> -->
                <div class="list__item">
                  <span style="cursor:pointer;" @click="handleBlogBtnClick">
                    {{ $t("footer_link_fefund_blog") }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2">
          <div class="payment-method d-flex justify-center mt-5">
            <div class="payment-method__item">
              <router-link text to="#">
                <img
                  style="height: 35px;"
                  :src="require('@/assets/images/footer/mastercard.svg')"
                  alt="logo"
                />
              </router-link>
            </div>
            <div class="payment-method__item ml-2">
              <router-link text to="#">
                <img
                  style="height: 35px;"
                  :src="require('@/assets/images/footer/visa.svg')"
                  alt="logo"
                />
              </router-link>
            </div>
            <div class="payment-method__item ml-2">
              <router-link text to="#">
                <img
                  style="height: 35px;"
                  :src="require('@/assets/images/footer/mobilepay.svg')"
                  alt="logo"
                />
              </router-link>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-row>
            <v-col>
              <div class="list text-right pr-10">
                <div class="list__title text-uppercase">
                  {{ $t("footer_txt_contact_us") }}
                </div>
                <div class="list__item">Århusvej 201</div>
                <div class="list__item">8464 Galten</div>
                <div class="list__item">Denmark</div>
                <div class="list__item">
                  <a href="mailto:info@coachsome.com">info@coachsome.com</a>
                </div>
                <div class="list__item">
                  <a href="tel:+4550186028">+45 50 18 60 28</a>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="bottom-line">
        <v-col class="text-center" cols="12" md="4"></v-col>
        <v-col class="text-center" cols="12" md="4">
          <div class="text-copyright">
            <i18n path="footer_copyright_text" tag="span">
              <template v-slot:year>
                <span>{{ currentYear }}</span>
              </template>
            </i18n>
          </div>
        </v-col>
        <v-col class="text-center text-md-right" cols="12" md="4">
          <div class="mr-md-10">
            <span>
              <v-btn
                text
                icon
                color="#6F8098"
                target="_blank"
                href="https://www.facebook.com/coachsome/"
              >
                <v-icon>fab fa-facebook</v-icon>
              </v-btn>
            </span>
            <span class="ml-5">
              <v-btn
                text
                icon
                color="#6F8098"
                target="_blank"
                href="https://www.instagram.com/coachsome.dk/"
              >
                <v-icon>fab fa-instagram</v-icon>
              </v-btn>
            </span>
            <span class="ml-5">
              <v-btn
                text
                icon
                color="#6F8098"
                target="_blank"
                href="https://twitter.com/coachsome"
              >
                <v-icon>fab fa-twitter</v-icon>
              </v-btn>
            </span>
            <span class="ml-5">
              <v-btn
                text
                icon
                color="#6F8098"
                target="_blank"
                href="https://www.linkedin.com/company/coachsome/"
              >
                <v-icon>fab fa-linkedin</v-icon>
              </v-btn>
            </span>
            <span class="ml-5">
              <v-btn
                text
                icon
                color="#6F8098"
                target="_blank"
                href="https://www.youtube.com/channel/UCb9W2G7hOsxt68GYVZjzzVA"
              >
                <v-icon>fab fa-youtube</v-icon>
              </v-btn>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
import { pathData } from "@/data";
export default {
  props: ["fixed"],
  components: {},
  data() {
    return {
      footer: {
        show: true
      },
      uri: {
        price: pathData.pages.price,
        howItWorks: pathData.pages.howItWork,
        about: pathData.pages.about,
        login: pathData.pages.login,
        register: pathData.pages.register,
        policy: pathData.pages.policy,
        cookiePolicy: pathData.pages.cookiePolicy,
        terms: pathData.pages.terms,
        faq: pathData.pages.faq,
        refundPolicy: pathData.pages.refundPolicy,
        blog: pathData.pages.blog
      },
      currentYear: new Date().getFullYear()
    };
  },
  computed: {},
  methods: {
    handleBlogBtnClick() {
      let win = window.open("https://blog.coachsome.com", "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  &-card {
    width: 100%;
    height: 100%;
    background: $primary;
    padding-top: 40px;
    height: auto;
    .bottom-line {
      padding-top: 20px;
    }
    .list {
      &__title {
        @include h3;
        color: $grey-400;
        margin-bottom: 15px;
      }
      &__item {
        color: $grey-100;
        @include h5;
        line-height: 151.3%;

        a {
          line-height: 151.3%;

          color: $grey-100;
          text-decoration: none;
          @include h5;
        }
      }
      &__separator {
        background: $grey-600;
        width: 50px;
        height: 2px;
        line-height: 151.3%;
        margin-top: 17px;
        margin-bottom: 17px;
      }
    }

    &__top {
      background: $primary;
      padding: 100px 60px 0 60px;
    }
    &__bottom {
      &-footer {
        background: $grey-800;
      }
    }
    .text-copyright {
      @include h5;
      color: $grey-500;
    }
  }
}
</style>
