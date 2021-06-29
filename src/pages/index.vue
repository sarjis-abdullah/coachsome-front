<template>
  <div class="home-page">
    <v-container fluid class="px-0 pt-0">
      <!-- hero -->
      <section class="hero-section">
        <div class="hero-section__bg">
          <v-img
            min-width="100%"
            height="100%"
            :src="require('@/assets/images/home/hero.jpg')"
            :lazy-src="require('@/assets/images/home/hero.jpg')"
            class="grey lighten-2"
          >
          </v-img>
        </div>
        <div class="hero-section__content">
          <div>
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="8">
                <v-card color="transparent" elevation="0">
                  <v-card-text
                    class="d-flex flex-column justify-center align-center"
                  >
                    <div
                      :class="[
                        'big-title',
                        {
                          'big-title--sm': $vuetify.breakpoint.smAndDown,
                          'big-title--md': $vuetify.breakpoint.mdAndUp
                        }
                      ]"
                    >
                      {{ $t("front_sec_title_find_the_right_coach") }}
                    </div>
                    <div
                      :class="[
                        'big-subtitle',
                        {
                          'big-subtitle--sm': $vuetify.breakpoint.smAndDown,
                          'big-subtitle--md': $vuetify.breakpoint.mdAndUp
                        }
                      ]"
                    >
                      {{ $t("home_txt_big_subtitle") }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" no-gutters>
              <v-col cols="11" md="6">
                <SportSearch
                  :items="categoryList"
                  @on-item-select="
                    goToMarketPlaceAndSearchByQueryParamCategoryName
                  "
                ></SportSearch>
                <v-card color="transparent" elevation="0">
                  <v-card-text>
                    <div
                      :class="[
                        'category',
                        {
                          'category--md': $vuetify.breakpoint.mdAndUp,
                          'category--sm': $vuetify.breakpoint.smAndDown
                        }
                      ]"
                    >
                      <div class="category__title mr-2">
                        {{ $t("front_txt_poppular") }}
                      </div>
                      <div class="d-flex mt-md-0 mt-4">
                        <div v-for="(item, i) in popularCategories" :key="i">
                          <v-btn
                            color="white"
                            depressed
                            rounded
                            small
                            class="text-capitalize category__item mr-2"
                            @click.stop="
                              goToMarketPlaceAndSearchByCategoryId(item)
                            "
                            >{{ $t(item.t_key) }}</v-btn
                          >
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
                <client-only>
                  <div
                    :class="[
                      'coachsome-rating d-flex justify-center flex-wrap align-center',
                      {
                        'coachsome-rating--md': $vuetify.breakpoint.mdAndUp,
                        'coachsome-rating--sm': $vuetify.breakpoint.smAndDown
                      }
                    ]"
                  >
                    <v-btn
                      v-on:click="handleReviewTextClick"
                      color="transparent"
                      depressed
                    >
                      <v-rating
                        readonly
                        :value="overallRating"
                        background-color="rating"
                        color="rating"
                        medium
                        half-increments
                      ></v-rating>
                    </v-btn>
                    <div class="coachsome-rating__text">
                      <v-btn
                        text
                        class="text-normal white--text"
                        @click="handleReviewTextClick"
                      >
                        {{ totalReviewerCount }}
                        {{ $t("front_page_reviews_text") }}
                      </v-btn>
                    </div>
                  </div>
                </client-only>
              </v-col>
            </v-row>
          </div>
        </div>
      </section>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col>
          <!-- Company Logos -->
          <client-only>
            <v-row>
              <v-col cols="12">
                <v-row justify="center" class="logos-swiper pt-5 pb-10">
                  <v-col cols="10" md="9">
                    <div class="trusted-text text-center">
                      {{ $t("front_page_txt_trusted_by") }}
                    </div>
                    <swiper
                      class="swiper"
                      :options="{
                        slidesPerView: 1,
                        spaceBetween: 10,
                        direction: 'horizontal',
                        loop: true,

                        navigation: {
                          nextEl: '.swiper-button-next',
                          prevEl: '.swiper-button-prev'
                        },

                        autoplay: {
                          delay: 100000,
                          disableOnInteraction: false
                        },
                        breakpoints: {
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 30
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            autoplay: {
                              delay: 3000
                            }
                          },
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            loop: true,
                            autoplay: {
                              delay: 3000,
                              disableOnInteraction: false
                            }
                          },
                          320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                            loop: true,
                            autoplay: {
                              delay: 3000
                            }
                          }
                        }
                      }"
                    >
                      <swiper-slide class="d-flex justify-center">
                        <div class="logo-slide">
                          <img
                            class="mr-2"
                            src="@/assets/images/home/logos/dif.svg"
                          />
                        </div>
                      </swiper-slide>
                      <swiper-slide class="d-flex justify-center">
                        <div class="logo-slide">
                          <img src="@/assets/images/home/logos/smart-box.svg" />
                        </div>
                      </swiper-slide>
                      <swiper-slide class="d-flex justify-center">
                        <div class="logo-slide">
                          <img
                            src="@/assets/images/home/logos/body-store.svg"
                          />
                        </div>
                      </swiper-slide>

                      <swiper-slide class="d-flex justify-center">
                        <div class="logo-slide">
                          <img src="@/assets/images/home/logos/text-mate.png" />
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                      <div
                        class="swiper-button-prev"
                        slot="button-prev"
                        v-if="$vuetify.breakpoint.smAndDown"
                      ></div>
                      <div
                        class="swiper-button-next"
                        slot="button-next"
                        v-if="$vuetify.breakpoint.smAndDown"
                      ></div>
                    </swiper>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </client-only>

          <!-- how-it-works -->
          <v-row>
            <v-col cols="12">
              <div class="how-it-works">
                <div class="how-it-works__details">
                  <div class="details">
                    <div class="details__title">
                      <v-row justify="center">
                        <v-col cols="12" md="12">
                          <div
                            :class="[
                              'section-title',
                              {
                                'section-title--sm':
                                  $vuetify.breakpoint.smAndDown,
                                'section-title--md': $vuetify.breakpoint.mdAndUp
                              }
                            ]"
                          >
                            {{ $t("front_sec_how_it_work_header_titile") }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <div class="details__description">
                      <v-row justify="center">
                        <v-col cols="12" md="5">
                          {{ $t("front_sec_how_it_work_header_desc") }}
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
                <div class="how-it-works__cards">
                  <div class="how-card mt-10">
                    <div class="how-card__icon">
                      <img src="@/assets/images/home/search.svg" alt />
                    </div>
                    <div class="how-card__title">
                      {{
                        $t(
                          "front_sec_how_it_work_card_title_explore_marketplace"
                        )
                      }}
                    </div>
                    <div class="how-card__description">
                      {{
                        $t(
                          "front_sec_how_it_work_card_desc_explore_marketplace"
                        )
                      }}
                    </div>
                  </div>
                  <div class="how-card mt-10">
                    <div class="how-card__icon">
                      <img src="@/assets/images/home/calendar-check.svg" alt />
                    </div>
                    <div class="how-card__title">
                      {{
                        $t("front_sec_how_it_work_card_title_make_your_booking")
                      }}
                    </div>
                    <div class="how-card__description">
                      {{
                        $t("front_sec_how_it_work_card_desc_make_your_booking")
                      }}
                    </div>
                  </div>
                  <div class="how-card mt-10">
                    <div class="how-card__icon">
                      <img src="@/assets/images/home/rock-hand.svg" alt />
                    </div>
                    <div class="how-card__title">
                      {{ $t("front_sec_how_it_work_card_meet_up") }}
                    </div>
                    <div class="how-card__description">
                      {{ $t("front_sec_how_it_work_card_desc_meet_up") }}
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- sport location search -->
          <v-row class="sport-location-search" justify="center">
            <v-col cols="10">
              <v-row>
                <v-col cols="12">
                  <div class="sport-location-search__title text-center">
                    <div
                      :class="[
                        'section-title',
                        {
                          'section-title--sm': $vuetify.breakpoint.smAndDown,
                          'section-title--md': $vuetify.breakpoint.mdAndUp
                        }
                      ]"
                    >
                      {{ $t("front_sec_title_explore_the_marketplace") }}
                    </div>
                  </div>
                </v-col>
              </v-row>

              <!-- Sport Swiper -->
              <!-- <client-only> -->
              <v-row justify="center">
                <v-col cols="12" md="10">
                  <v-card elevation="0" color="transparent">
                    <v-card-title>
                      <v-spacer> </v-spacer>
                      <v-btn
                        small
                        color="primary-light-1"
                        plain
                        class="d-none d-md-flex d-lg-flex text-normal btn--see-all pa-0"
                        @click="goToMarketPlace"
                        >{{ $t("btn_label_see_all") }}</v-btn
                      >
                    </v-card-title>
                    <v-card-text>
                      <swiper :options="swiperOption">
                        <swiper-slide
                          v-for="(category, i) in categories"
                          :key="i"
                          class="d-flex justify-center"
                        >
                          <v-card
                            width="250"
                            tile
                            height="250"
                            class="marketplace-card clickable"
                            @click.stop="
                              goToMarketPlaceAndSearchByCategoryId(category)
                            "
                          >
                            <v-img
                              height="100%"
                              class="white--text align-center text-center pa-0 ma-0"
                              :src="category.image"
                            >
                              <v-card-text class="pa-0">
                                <div class="marketplace-card__text">
                                  {{ $t(category.t_key) }}
                                </div>
                              </v-card-text>
                            </v-img>
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-card>
                        </swiper-slide>
                        <div
                          class="swiper-button-prev"
                          slot="button-prev"
                          v-show="$vuetify.breakpoint.mdAndUp"
                        ></div>
                        <div
                          class="swiper-button-next"
                          slot="button-next"
                          v-show="$vuetify.breakpoint.mdAndUp"
                        ></div>
                      </swiper>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  class="text-center d-sm-flex d-xs-flex d-md-none"
                >
                  <v-row justify="center">
                    <v-col cols="8">
                      <v-btn
                        large
                        dark
                        block
                        depressed
                        color="#9FAEC2"
                        class="text-normal btn--see-all-mobile"
                        @click="goToMarketPlace"
                        >{{ $t("btn_label_see_all") }}</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- </client-only> -->

              <!-- Location Swiper -->
              <client-only>
                <v-row justify="center" class="mt-10">
                  <v-col cols="12" md="10">
                    <v-row>
                      <v-col class="pa-0">
                        <v-card elevation="0" color="transparent">
                          <v-card-title>
                            <v-spacer> </v-spacer>
                            <v-btn
                              x-small
                              color="primary-light-1"
                              plain
                              class="d-none d-md-flex d-lg-flex  text-normal btn--see-all pa-0"
                              @click.stop="goToMarketPlace"
                              >{{ $t("btn_label_see_all") }}</v-btn
                            >
                          </v-card-title>
                          <v-card-text>
                            <swiper :options="swiperOption">
                              <swiper-slide
                                class="d-flex justify-center"
                                v-for="(item, i) in cities"
                                :key="i"
                              >
                                <v-card
                                  width="250"
                                  height="250"
                                  tile
                                  class="marketplace-card clickable"
                                  @click.stop="
                                    goToMarketPlaceAndSearchByCityName(item)
                                  "
                                >
                                  <v-img
                                    height="100%"
                                    width="100%"
                                    class="white--text align-center text-center pa-0 ma-0"
                                    :src="
                                      require('@/assets/images/home/' +
                                        item.image)
                                    "
                                  >
                                    <v-card-text class="pa-0">
                                      <div class="marketplace-card__text">
                                        {{ $t(item.t_key) }}
                                      </div>
                                    </v-card-text>
                                  </v-img>
                                  <template v-slot:placeholder>
                                    <v-row
                                      class="fill-height ma-0"
                                      align="center"
                                      justify="center"
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                      ></v-progress-circular>
                                    </v-row>
                                  </template>
                                </v-card>
                              </swiper-slide>
                              <div
                                class="swiper-button-prev"
                                slot="button-prev"
                                v-show="$vuetify.breakpoint.mdAndUp"
                              ></div>
                              <div
                                class="swiper-button-next"
                                slot="button-next"
                                v-show="$vuetify.breakpoint.mdAndUp"
                              ></div>
                            </swiper>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-center d-sm-flex d-xs-flex d-md-none"
                  >
                    <v-row justify="center">
                      <v-col cols="8">
                        <v-btn
                          large
                          dark
                          block
                          depressed
                          color="#9FAEC2"
                          class="text-normal btn--see-all-mobile"
                          @click="goToMarketPlace"
                          >{{ $t("btn_label_see_all") }}</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </client-only>
            </v-col>
          </v-row>

          <!-- become a coach -->
          <v-row class="become-a-coach">
            <v-col cols="12" md="6" class="">
              <v-row>
                <v-col>
                  <div class="become-a-coach__title">
                    <div
                      :class="[
                        'section-title',
                        {
                          'section-title--sm': $vuetify.breakpoint.smAndDown,
                          'section-title--md': $vuetify.breakpoint.mdAndUp
                        }
                      ]"
                    >
                      {{ $t("front_sec_become_a_coach_header_title") }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="d-flex">
                    <img
                      class="mt-1"
                      width="20px"
                      height="20px"
                      src="@/assets/images/home/check-circle.png"
                    />
                    <div>
                      <div class="become-coach__title ml-2">
                        {{
                          $t("front_sec_become_a_coach_card_title_tool_u_need")
                        }}
                      </div>
                      <div class="become-coach__description ml-2">
                        {{
                          $t("front_sec_become_a_coach_card_desc_tool_u_need")
                        }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="d-flex">
                    <img
                      class="mt-1"
                      width="20px"
                      height="20px"
                      src="@/assets/images/home/check-circle.png"
                    />
                    <div>
                      <div class="become-coach__title ml-2">
                        {{
                          $t("front_sec_become_a_coach_card_title_help_athlete")
                        }}
                      </div>
                      <div class="become-coach__description ml-2">
                        {{
                          $t("front_sec_become_a_coach_card_desc_help_athlete")
                        }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="d-flex">
                    <img
                      class="mt-1"
                      width="20px"
                      height="20px"
                      src="@/assets/images/home/check-circle.png"
                    />
                    <div>
                      <div class="become-coach__title ml-2">
                        {{ $t("front_sec_become_a_coach_card_title_guide") }}
                      </div>
                      <div class="become-coach__description ml-2">
                        {{ $t("front_sec_become_a_coach_card_desc_guide") }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    class="text-normal"
                    color="accent"
                    x-large
                    depressed
                    @click.stop="goToRegister"
                    >{{ $t("front_btn_label_start_coaching") }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="px-0 py-0 my-0 d-none d-md-flex d-lg-flex"
              align-self="end"
            >
              <div class="become-coach-img">
                <div class="become-coach-img__content">
                  <img
                    style="width: 100%;"
                    src="@/assets/images/home/become-coach-img.png"
                  />
                </div>
                <div class="become-coach-img__overlay">
                  <div class="overlay">
                    <div class="overlay__text">
                      {{ $t("front_overlay_text_we_cover_all_sports") }}
                    </div>
                    <img
                      style="width: 90%;"
                      class="overlay__img"
                      src="@/assets/images/home/become-coach-overlay.png"
                    />
                  </div>
                </div>
                <div class="become-coach-img__bg">
                  <img
                    style="width: 90%;"
                    src="@/assets/images/home/become-coach-bg.png"
                  />
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Explore Coach -->
          <client-only>
            <v-row class="explore-our-coach" justify="center">
              <v-col cols="12" md="10">
                <v-row>
                  <v-col cols="12" class="text-center">
                    <div class="explore-our-coach__title">
                      <div
                        :class="[
                          'section-title',
                          {
                            'section-title--sm': $vuetify.breakpoint.smAndDown,
                            'section-title--md': $vuetify.breakpoint.mdAndUp
                          }
                        ]"
                      >
                        {{ $t("front_sec_explore_coach_header_title") }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="filter-title text-center text-md-left">
                      {{ $t("front_sec_explore_coach_filter_title_text") }}
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-tabs
                      show-arrows
                      color="#6F8098"
                      v-model="exploreCoach.tab"
                      background-color="transparent"
                      slider-color="#FF633F"
                      no-animation
                    >
                      <v-tab
                        class="text-normal"
                        @change="tabChanged(item)"
                        v-for="item in exploreCoach.tabs"
                        :key="item.key"
                        >{{ $t(item.t_key) }}</v-tab
                      >
                    </v-tabs>
                    <v-tabs-items
                      v-model="exploreCoach.tab"
                      class="mt-12"
                      v-if="$vuetify.breakpoint.mdAndUp"
                    >
                      <v-tab-item
                        v-for="item in exploreCoach.tabs"
                        :key="item.key"
                      >
                        <v-row
                          class="explore-our-coach__tab mb-5"
                          justify="center"
                          justify-md="start"
                        >
                          <v-col
                            v-for="(coach, coachIndex) in exploreCoach.coaches"
                            :key="coachIndex"
                            cols="8"
                            md="3"
                          >
                            <explore-card v-bind="coach"></explore-card>
                          </v-col>
                        </v-row>
                      </v-tab-item>
                    </v-tabs-items>

                    <v-row
                      class="mt-5 mb-5"
                      justify="center"
                      v-if="$vuetify.breakpoint.smAndDown"
                    >
                      <v-col cols="10">
                        <div class="simple-swiper">
                          <div class="simple-swiper-button-prev">
                            <v-btn fab small>
                              <v-icon>
                                mdi-chevron-left
                              </v-icon>
                            </v-btn>
                          </div>
                          <swiper
                            :options="{
                              navigation: {
                                nextEl: '.simple-swiper-button-next',
                                prevEl: '.simple-swiper-button-prev'
                              }
                            }"
                          >
                            <swiper-slide
                              v-for="(coach,
                              coachIndex) in exploreCoach.coaches"
                              :key="coachIndex"
                            >
                              <explore-card v-bind="coach"></explore-card>
                            </swiper-slide>
                          </swiper>
                          <div class="simple-swiper-button-next">
                            <v-btn fab small>
                              <v-icon>
                                mdi-chevron-right
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </client-only>

          <!-- Simple Banner alternte for small device -->
          <v-row
            class="my-10 text-center d-sm-flex d-xs-flex d-md-none"
            justify="center"
            align="center"
          >
            <v-col cols="11">
              <v-btn
                class="text-normal"
                color="accent"
                block
                x-large
                depressed
                @click.stop="goToMarketPlace"
                >{{ $t("front_banner_btn_label_txt") }}</v-btn
              >
            </v-col>
          </v-row>

          <!-- Simple Banner -->
          <v-row justify="center" class="text-center d-none d-md-flex">
            <v-col cols="10">
              <div
                class="simple-banner d-flex flex-column justify-center"
                :style="{
                  backgroundImage:
                    'url(' +
                    require('@/assets/images/home/simple-banner.jpg') +
                    ')',
                  backgroundSize: 'cover'
                }"
              >
                <div :style="{ width: '60%', textAlign: 'center' }">
                  <div class="simple-banner__title">
                    {{ $t("front_banner_big_text") }}
                  </div>
                  <div class="simple-banner__btn mt-2">
                    <button @click.stop="goToMarketPlace">
                      {{ $t("front_banner_btn_label_txt") }}
                    </button>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SportSearch from "@/components/artifact/global/pages/home/SportSearch";
import { pathData } from "@/data";
import { frontHomeApi, marketPlaceApi } from "@/api";
import ExploreCard from "@/components/card/ExploreCard";

export default {
  layout: "home",
  components: {
    SportSearch,
    ExploreCard
  },
  head() {
    return {
      title: this.$i18n.t("front_sec_title_find_the_right_coach"),
      titleTemplate: "Coachsome - %s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$i18n.t("front_sec_how_it_work_header_desc")
        }
      ]
    };
  },
  data() {
    return {
      sportSearch: {
        categories: []
      },
      popular: {
        categories: [],
        isLoading: false
      },
      companyRating: {
        overallRating: 0,
        totalReviewerCount: 0,
        isLoading: false
      },
      isLoading: true,
      totalRatingCount: 0,
      exploreCoach: {
        tab: null,
        tabs: [
          // {
          //   text: "All",
          //   key: "all",
          //   t_key: "txt_all"
          // },
          {
            text: "Most Popular",
            key: "most_poppular",
            t_key: "txt_most_poppular"
          },
          {
            text: "Basketball",
            key: "basketball",
            t_key: "cat_basketball"
          },
          {
            text: "Fitness",
            key: "fitness",
            t_key: "cat_fitness"
          },
          {
            text: "Mental Coaching",
            key: "mental_coaching",
            t_key: "cat_mental_coaching"
          },
          {
            text: "Soccer",
            key: "soccer",
            t_key: "cat_soccer"
          },
          {
            text: "Handball",
            key: "handball",
            t_key: "cat_handball"
          }
        ],
        coaches: [],
        progressBar: false,
        filter: {
          type: "All",
          currentPage: 1,
          infiniteId: +new Date()
        }
      },
      slideCategories: [],
      cities: [],
      popularSportCategories: [],
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1024: {
            effect: "slide",
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: false
          },
          768: {
            // slidesPerView: 3,
            // spaceBetween: 30,
          },
          640: {
            // slidesPerView: 3,
            // spaceBetween: 20,
            // centeredSlides: true,
            // coverflowEffect: {
            //   rotate: 50,
            //   stretch: 0,
            //   depth: 100,
            //   modifier: 1,
            //   slideShadows: true,
            // },
          },
          320: {
            // slidesPerView: 3,
            // spaceBetween: 0,
          }
        }
      },
      searchBar: ""
    };
  },
  computed: {},
  async asyncData({ $axios, i18n }) {
    const { data } = await frontHomeApi($axios).getInitialData({});
    let categoryList = [];
    if (data.categoryList.length > 0) {
      for (const item of data.categoryList) {
        categoryList.push({
          id: item.id,
          name: i18n.t(item.t_key),
          t_key: item.t_key,
          image: ""
        });
      }
    }

    return {
      overallRating: data.overallRating,
      totalReviewerCount: data.totalReviewerCount,
      categories: data.categories,
      categoryList: categoryList,
      popularCategories: data.popularCategories,
      cities: data.cities
    };
  },
  created() {
    this.getCoach();
  },
  methods: {
    handleReviewTextClick() {
      this.$router.push(this.localePath(pathData.pages.baseReviews));
    },
    getCoach() {
      marketPlaceApi(this.$axios)
        .get({
          type: this.exploreCoach.filter.type,
          perPage: 8,
          countryCode: "DK"
        })
        .then(({ data }) => {
          this.exploreCoach.coaches = data.coaches.map(item => {
            return {
              name: item.name,
              image: item.image ? item.image : null,
              countReview: item.countReview,
              rating: item.rating,
              countReview: item.countReview,
              location:
                item.locations && item.locations.length > 0
                  ? item.locations[0].zip + " " + item.locations[0].city
                  : "",
              price: item.price,
              categories: item.categories,
              userName: item.userName
            };
          });
        })
        .then(() => {});
    },
    gotTo(userName) {
      let routeData = this.$router.push(
        this.localePath(pathData.pages.publicProfile(userName))
      );
      window.open(routeData.href, "_blank");
    },
    tabChanged(item) {
      this.exploreCoach.filter.type = item.key;
      this.getCoach();
    },

    goToMarketPlaceAndSearchByCityName(city) {
      this.$router.push({
        path: this.localePath(pathData.pages.marketplace),
        query: { cityName: city.name.toString() }
      });
    },
    goToMarketPlaceAndSearchByCategoryId(category) {
      if (category) {
        let name = this.$i18n
          .t(category.t_key)
          .toLowerCase()
          .split(" ")
          .join("+");

        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name }) +
            "/" +
            name
        );
      } else {
        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name })
        );
      }
    },
    goToMarketPlaceAndSearchByQueryParamCategoryName(searchInputVal) {
      let category = this.categoryList.find(item => item.id == searchInputVal);
      if (category) {
        let name = this.$i18n
          .t(category.t_key)
          .toLowerCase()
          .split(" ")
          .join("+");

        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name }) +
            "/" +
            name
        );
      } else {
        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name })
        );
      }
    },
    goToMarketPlace() {
      this.$router.push(
        this.localePath({ name: pathData.pages.marketplace.name })
      );
    },
    goToRegister() {
      this.$router.push(this.localePath(pathData.pages.register));
    }
  }
};
</script>

<style lang="scss">
.home-page {
  .simple-swiper {
    position: relative;
    &-button-next {
      right: -20px;
      left: auto;
      position: absolute;
      top: 45%;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-button-prev {
      left: -20px;
      right: auto;
      position: absolute;
      top: 45%;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .section-title {
    font-family: $font-family;
    font-weight: 800;
    &--sm {
      font-size: 25px;
    }
    &--md {
      font-size: 36px;
    }
  }

  .clickable {
    cursor: pointer;
  }

  .btn--see-all-mobile {
    border-radius: 8px;
    .v-btn__content {
      font-family: $font-family;
      font-weight: 800;
      font-size: 24px;
    }
  }

  .hero-section {
    height: 100vh;
    width: 100%;
    position: relative;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    &__bg {
      height: 100vh;
      width: 100%;
      z-index: 0;
      position: absolute;
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
    }
  }

  .sport-search {
    margin-top: 10px;
  }

  .big-title {
    font-family: $font-family;
    text-align: center;
    font-weight: 800;
    line-height: 127.1%;
    color: #ffffff;
    z-index: 1;
    &--md {
      // margin-top: 150px;
      font-size: 48px;
    }
    &--sm {
      // margin-top: 50px;
      font-size: 30px;
    }
  }
  .big-subtitle {
    font-family: $font-family;
    text-align: center;
    font-weight: 600;
    font-size: 17px;
    line-height: 127.1%;
    color: #ffffff;
    margin-top: 20px;
    z-index: 1;
    &--md {
      // margin-top: 150px;
      // font-size: 30px;
    }
    &--sm {
      // margin-top: 50px;
      // font-size: 20px;
    }
  }

  .category {
    margin-top: 20px;
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
    }
    &__item {
      font-family: $font-family;
      font-size: 12px;
      color: #6f8098;
    }
    &--md {
      display: flex;
      justify-content: center;
    }
    &--sm {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  /* how-it-works*/
  .how-it-works {
    padding-top: 100px;
    padding-bottom: 200px;
    &__details {
      .details {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &__title {
          font-family: $font-family;
          padding-bottom: 20px;
          text-align: center;
          color: $primary-light-1;
        }
        &__description {
          font-family: $font-family;
          font-size: 18px;
          text-align: center;
          color: #2c3749;
        }
      }
    }
    &__cards {
      padding-top: 100px;
      display: flex;
      flex: 1 1 0px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .how-card {
      text-align: center;
      &__icon {
        img {
          width: 45px;
          height: 45px;
          margin-bottom: 20px;
        }
      }
      &__title {
        font-family: $font-family;
        font-weight: 800;
        font-size: 24px;
        text-align: center;
        color: $primary-light-1;
        margin-bottom: 20px;
      }
      &__description {
        max-width: 400px;
        font-family: $font-family;
        font-size: 18px;
        text-align: center;
        color: #2c3749;
        padding-left: 3px;
        padding-right: 3px;
      }
    }
  }

  /* sport location search */
  .sport-location-search {
    padding-bottom: 50px;
    background: #f7fafc;
    box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
    .btn--see-all {
      font-family: $font-family;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #49556a;
    }
    &__title {
      font-family: $font-family;
      text-align: center;
      color: $primary-light-1;
    }
    .marketplace-card {
      box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
      border-radius: 10px;
      .v-card__text {
        background: rgba(21, 87, 124, 0.6);
      }
      &__text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 67px;
        font-family: $font-family;
        font-weight: 800;
        font-size: 24px;
        word-wrap: normal;
        line-height: 33px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #f7fafc;
      }
    }
  }

  /* become a coach */
  .become-a-coach {
    background: $body-bg;
    padding-left: 20px;
    padding-top: 50px;
    padding-bottom: 12px;
    margin-bottom: 0;
    min-height: 650px;
    .become-a-coach__title {
      font-family: $font-family;
      font-weight: 800;
      font-size: 48px;
      line-height: 127.1%;
      color: $primary-light-1;
    }
    .become-coach {
      &__title {
        font-family: $font-family;
        font-weight: bold;
        font-size: 20px;
        color: #6f8098;
      }
      &__description {
        font-family: $font-family;
        font-weight: normal;
        font-size: 18px;
        color: #6f8098;
      }
    }
    .become-coach-img {
      position: relative;
      text-align: right;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      &__bg {
        position: relative;
        width: 100%;
        right: 0;
        z-index: 0;
        bottom: 0;
      }
      &__content {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: 0;
        img {
          width: 100%;
        }
      }
      &__overlay {
        position: absolute;
        z-index: 2;
        bottom: 0;
        right: 0;
        .overlay {
          position: relative;
          &__text {
            position: absolute;
            z-index: 3;
            right: 30px;
            bottom: 50px;
            font-family: $font-family;
            font-weight: 600;
            font-size: 36px;
            color: #fcfdfe;
          }
          &__img {
            width: 90%;
          }
        }
      }
    }
  }

  /* explore our coach */
  .explore-our-coach {
    background: #f7fafc;
    /* Shadow-4 */
    box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
    .v-tab {
      font-family: $font-family;
      font-weight: normal;
      font-size: 18px;
      line-height: 127.1%;
      color: #6f8098;
    }
    .tab-card {
      background: #f7fafc;
    }
    &__tab {
      background: #f7fafc;
    }
    .v-window-item {
      background: #f7fafc;
    }
    .filter-title {
      font-family: $font-family;
      font-weight: 600;
      font-size: 18px;
      color: #49556a;
    }
    &__title {
      line-height: 127.1%;
      text-align: center;
      color: $primary-light-1;
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }

  .coachsome-rating {
    &__text {
      font-family: $font-family;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      color: #fff;
    }
  }
  .company-logos {
    margin-bottom: 50px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    &__logo {
    }
  }

  .trusted-text {
    font-family: $font-family;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: rgba(0, 0, 0, 0.3);
  }

  /* simple banner */
  .simple-banner {
    margin-top: 100px;
    margin-bottom: 100px;
    min-height: 300px;
    width: 100%;
    box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
    border-radius: 16px;
    background: red;
    object-fit: cover;
    padding-left: 50px;
    &__title {
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 48px;
      line-height: 56px;
      color: #fcfdfe;
    }
    &__btn {
      button {
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: 2em;
        border-radius: 8px;
        text-align: center;
        background: white;
        padding-left: 20px;
        padding-right: 20px;
        color: $primary-light-1;
      }
      button:focus {
        outline: 0;
      }
    }
  }

  .logos-swiper {
    background: rgba(196, 196, 196, 0.1);
  }
  .logo-slide {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    width: 130px;
    img {
      width: 100%;
    }
  }
  .swiper-slide {
    display: inline-flex;
    width: auto;
  }
}
</style>
