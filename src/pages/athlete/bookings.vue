<template>
  <div class="athlete-bookings">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="7">
          <v-row>
            <v-col cols="5" md="5">
              <div class="section-title">
                {{
                  $t("athlete_booking_search_value_txt_purchased_package_title")
                }}
              </div>
            </v-col>
          </v-row>

          <v-row v-for="(item, i) in purchasedPackages" :key="i">
            <v-col>
              <purchased-card
                @click-favourite-btn="favouriteBtnClickHandle"
                v-bind="item"
              ></purchased-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="12"
              class="text-center"
              v-if="purchasedPackages.length < 1"
            >
              <span class="caption">
                {{ $t("athlete_booking_not_found_anything") }}
              </span>
            </v-col>
            <v-col
              cols="12"
              class="text-center"
              v-if="!isHideShowMoreBtnLoading"
            >
              <v-btn
                x-small
                depressed
                outlined
                :loading="showMoreLoading"
                v-if="showMoreBtn"
                color="primary-light-1"
                @click="showMoreBtnHandle"
              >
                {{ $t("athlete_booking_btn_label_text_show_more") }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="section-title">
                {{ $t("section_title_recent_search") }}
              </div>
            </v-col>

            <v-col cols="12" v-if="searchValue.today.length > 0">
              <div class="section-sub-title">
                {{ $t("athlete_booking_search_value_txt_today") }}
              </div>
              <v-row>
                <v-col cols="8">
                  <v-btn
                    v-for="(item, i) in searchValue.today"
                    :key="i"
                    x-small
                    color="primary-light-2"
                    rounded
                    dark
                    class="mr-2"
                  >
                    {{ $t(item.t_key) }}
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn x-small color="primary" @click="goToMarketplace">
                    {{ $t("btn_label_search_again") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-if="searchValue.yesterday.length > 0">
              <div class="section-sub-title">{{ $t("text_yesterday") }}</div>
              <v-row>
                <v-col cols="8">
                  <v-btn
                    v-for="(item, i) in searchValue.yesterday"
                    :key="i"
                    x-small
                    color="primary-light-2"
                    rounded
                    dark
                    class="mr-2"
                  >
                    {{ $t(item.t_key) }}
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn x-small color="primary" @click="goToMarketplace">
                    {{ $t("btn_label_search_again") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-if="searchValue.week.length > 0">
              <div class="section-sub-title">{{ $t("text_week_ago") }}</div>
              <v-row>
                <v-col cols="8">
                  <v-btn
                    v-for="(item, i) in searchValue.week"
                    :key="i"
                    x-small
                    color="primary-light-2"
                    rounded
                    dark
                    class="mr-2"
                  >
                    {{ $t(item.t_key) }}
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn x-small color="primary" @click="goToMarketplace">
                    {{ $t("btn_label_search_again") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-if="searchValue.later.length > 0">
              <div class="section-sub-title">{{ $t("text_later") }}</div>
              <v-row>
                <v-col cols="8">
                  <v-btn
                    v-for="(item, i) in searchValue.later"
                    :key="i"
                    x-small
                    color="primary-light-2"
                    rounded
                    dark
                    class="mr-2"
                  >
                    {{ $t(item.t_key) }}
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn x-small color="primary" @click="goToMarketplace">
                    {{ $t("btn_label_search_again") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-date-picker
            v-model="date"
            full-width
            color="primary-light-1"
          ></v-date-picker>
          <v-card class="mx-auto" flat>
            <v-scroll-y-transition mode="out-in">
              <v-list v-if="bookingTimes.length > 0" elevation="0">
                <template>
                  <div v-for="(bookingTime, i) in bookingTimes" :key="i">
                    <v-list-item>
                      <v-list-item-content>
                        <v-row>
                          <v-col cols="4" class="text-uppercase">
                            <div>
                              {{ bookingTime.date }}
                            </div>
                            <div>
                              {{ bookingTime.time }}
                            </div>
                          </v-col>
                          <v-col cols="4" class="text-center">
                            <v-icon
                              v-if="bookingTime.isCoachToCoach"
                              color="primary-light-1"
                              >star_border</v-icon
                            >
                            <v-btn
                              v-if="bookingTime.status == 'Pending'"
                              color="orange"
                              dark
                              x-small
                              rounded
                              depressed
                            >
                              {{ $t("btn_label_pending") }}
                            </v-btn>
                            <v-btn
                              v-if="bookingTime.status == 'Accepted'"
                              color="primary-light-2"
                              dark
                              x-small
                              rounded
                              depressed
                            >
                              {{ $t("btn_label_confirmed") }}
                            </v-btn>
                          </v-col>
                          <v-col cols="4">
                            <div class="location text-uppercase">
                              {{ bookingTime.profileName }}
                              <br />@{{
                                bookingTime.city + " " + bookingTime.zip
                              }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </div>
                </template>
              </v-list>
            </v-scroll-y-transition>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="false">
        <v-col class="text-center">
          <div class="section-title">
            {{ $t("booking_section_title_news") }}
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="false">
        <v-col cols="12" md="5" v-for="item in 2" :key="item">
          <news-card></news-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PurchasedCard from "@/components/card/PurchasedCard";
import NewsCard from "@/components/card/NewsCard";
import { pathData } from "@/data";
import {
  athleteBookingApi,
  athleteBookingTimeApi,
  athleteSearchValueApi
} from "@/api";

export default {
  layout: "athlete",
  components: {
    PurchasedCard,
    NewsCard
  },
  data() {
    return {
      isHideShowMoreBtnLoading: false,
      showMoreLoading: false,
      showMoreBtn: false,
      page: 1,
      bookingTimes: [],
      date: new Date().toISOString().substr(0, 10),
      purchasedPackages: [],
      defaultActivePackage: {
        bookingId: null,
        title: ""
      },
      coaches: [],
      searchValue: {
        today: [],
        yesterday: [],
        week: [],
        later: []
      }
    };
  },
  watch: {
    date: function(val) {
      this.fetchTimeSlots(val);
    },
    purchasedPackages: {
      handler: function(val) {
        if (!val.length) {
          this.showMoreBtn = false;
        } else {
          this.showMoreBtn = true;
        }
      },
      deep: true
    }
  },
  created() {
    athleteBookingApi(this.$axios)
      .getBookingInformation()
      .then(({ data }) => {
        if (data.purchasedPackages) {
          this.purchasedPackages = data.purchasedPackages.map(item => {
            return {
              bookingId: item.bookingId,
              packageOwnerUserId: item.packageOwnerUserId,
              packageBuyerUserId: item.packageBuyerUserId,
              leftSession: item.leftSession,
              packageTitle: item.packageTitle,
              packageDescription: item.packageDescription,
              profileAvatarName: item.profileAvatarName,
              profileImage: item.profileImage,
              profileName: item.profileName,
              totalSession: item.totalSession,
              status: item.status,
              date: item.date,
              isSold: item.isSold,
              isFavourite: item.isFavourite
            };
          });
          this.fetchTimeSlots(this.date);
          this.fetchSearchValues();
        }
      })
      .catch(error => {
        if (error) {
          this.$toast.error(error.response.data.message);
        }
      });
  },
  methods: {
    goToMarketplace() {
      this.$router.push(this.localePath(pathData.pages.marketplace));
    },
    fetchSearchValues() {
      let params = {
        type: "category"
      };
      athleteSearchValueApi(this.$axios)
        .getSearchValues(params)
        .then(({ data }) => {
          if (data.searchValues) {
            this.searchValue.today = data.searchValues.today;
            this.searchValue.tomorrow = data.searchValues.tomorrow;
            this.searchValue.week = data.searchValues.week;
            this.searchValue.later = data.searchValues.later;
          }
        });
    },
    fetchTimeSlots(date) {
      let params = {
        date: date
      };
      athleteBookingTimeApi(this.$axios)
        .getBookingTimes(params)
        .then(({ data }) => {
          if (data.bookingTimes) {
            this.bookingTimes = data.bookingTimes.map(item => {
              return {
                bookingTimeId: item.bookingTimeId,
                date: item.date,
                time: item.time,
                profileName: item.profileName,
                status: item.status,
                address: item.address,
                isCoachToCoach: item.isCoachToCoach,
                city: item.city,
                zip: item.zip
              };
            });
          }
        })
        .catch(({ response }) => {
          if (response.data.message) {
            this.$toast.error(response.data.message);
          }
        });
    },
    showMoreBtnHandle() {
      let params = {
        page: ++this.page
      };
      this.showMoreLoading = true;
      athleteBookingApi(this.$axios)
        .getBookingInformation(params)
        .then(({ data }) => {
          if (data.purchasedPackages.length) {
            let purchasedPackages = data.purchasedPackages.map(item => {
              return {
                bookingId: item.bookingId,
                packageOwnerUserId: item.packageOwnerUserId,
                packageBuyerUserId: item.packageBuyerUserId,
                leftSession: item.leftSession,
                packageTitle: item.packageTitle,
                packageDescription: item.packageDescription,
                profileAvatarName: item.profileAvatarName,
                profileImage: item.profileImage,
                profileName: item.profileName,
                totalSession: item.totalSession,
                status: item.status,
                date: item.date,
                isSold: item.isSold,
                isFavourite: item.isFavourite
              };
            });
            this.page += 1;
            this.purchasedPackages.push(...purchasedPackages);
            this.showMoreLoading = false;
          } else {
            this.showMoreLoading = false;
            this.isHideShowMoreBtnLoading = true;
          }
        })
        .catch(({ response }) => {
          this.$toast.error(response.data.message);
        });
    },
    favouriteBtnClickHandle({ bookingId }) {
      let payload = { bookingId: bookingId };

      athleteBookingApi(this.$axios)
        .changeFavourite(payload)
        .then(({ data }) => {
          let purchasedPackage = this.purchasedPackages.find(
            item => item.bookingId == bookingId
          );
          purchasedPackage.isFavourite = data.isFavourite;
        })
        .catch(({ response }) => {
          if (response.data.message) {
            this.$toast.error(response.data.message);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.athlete-bookings {
  background: $body-bg;
}
</style>
