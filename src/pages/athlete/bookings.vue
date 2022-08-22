<template>
  <div class="athlete-bookings">
    <v-container fluid >
      <mobile-top-nav extraClass="body-bg-secondary" actionClass="d-none" :headerText="$t('app_bar_dashboard_booking')">
        <template v-slot:goBack>
          <span></span>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('app_bar_dashboard_booking')"></desktop-top-nav>
      <v-row justify="center" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="3" :class="{'pt-8' : !$vuetify.breakpoint.mdAndUp}">
              <v-select
                v-model="filterValue"
                color="primary-light-1"
                :items="filterItems"
                item-value="id"
                append-icon="expand_more"
                hide-details
                outlined
                dense
                @change="getBooking"
              >
                <template v-slot:selection="{ item }">
                  {{ $t(item.t_key) }}
                </template>
                <template v-slot:item="{ item, on, attrs }">
                  <v-list-item v-bind="attrs" v-on="on" link>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $t(item.t_key) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row v-for="(item, i) in purchasedPackages" :key="i">
            <v-col>
              <purchased-card-mobile
                v-if="$vuetify.breakpoint.xsOnly"
                v-bind="item"
                @click-favourite-btn="favouriteBtnClickHandle"
              ></purchased-card-mobile>

              <purchased-card
                v-else
                v-bind="item"
                @click-favourite-btn="favouriteBtnClickHandle"
              ></purchased-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="12"
              class="text-center"
              v-if="purchasedPackages.length < 1"
            >
              <!-- <span class="caption">
                {{ $t("athlete_booking_not_found_anything") }}
              </span> -->
                <template class="no-results">
                    <div class="no-results__title">{{$t("no_bookings_title")}}</div>
                    <div class="no-results__description">{{$t("no_bookings_description")}}</div>
                </template>
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
                v-if="false"
                color="primary-light-1"
                @click="showMoreBtnHandle"
              >
                {{ $t("athlete_booking_btn_label_text_show_more") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-date-picker
            class="d-none d-md-block"
            v-model="date"
            :first-day-of-week="1"
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

      <v-row v-if="false" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
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
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import PurchasedCardMobile from '@/components/card/PurchasedCardMobile.vue';
import DesktopHeader from '@/components/artifact/global/DesktopHeader';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';
import {athleteBookingApi,athleteBookingTimeApi,athleteSearchValueApi} from "@/api";

export default {
  layout: "athlete",
  components: {
    PurchasedCard,
    NewsCard,
    MobileTopNav,
    PurchasedCardMobile,
    DesktopHeader,
    DesktopTopNav
  },
  data() {
    return {
      filterValue: 2,
      filterItems: [
        {
          id: 1,
          title: "All",
          key: "all",
          t_key: "coach_booking_filter_item_key_all",
          icon: "mdi-square-outline"
        },
        {
          id: 2,
          title: "Active",
          key: "active",
          t_key: "coach_booking_filter_item_key_active",
          icon: "mdi-square-outline"
        },
        {
          id: 3,
          title: "Past",
          key: "past",
          t_key: "coach_booking_filter_item_key_past",
          icon: "mdi-square-outline"
        }
      ],
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
    this.getBooking();
  },
  methods: {
    getBooking() {
      const filterItem = this.filterItems.find(
        item => item.id == this.filterValue
      );
      athleteBookingApi(this.$axios)
        .getBookingInformation({ status: filterItem.key })
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
                isFavourite: item.isFavourite,
                orderKey: item.orderKey,
                readableDate: item.readableDate
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
  height: 100%;
  background: $body-bg;
}
.no-results{
  &__title{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    text-transform: capitalize;
    color: #49556A;
  }
  &__description{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #9FAEC2;
    margin-top: 5px;
  }
}
</style>
