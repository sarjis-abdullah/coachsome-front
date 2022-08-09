<template>
  <div class="coach-booking-page">
    <v-container fluid class="pt-0 mt-0" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
      <mobile-top-nav extraClass="body-bg-secondary" actionClass="d-none" :headerText="$t('app_bar_dashboard_booking')">
        <template v-slot:goBack>
          <span></span>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <DesktopHeader :title="$t('app_bar_dashboard_booking')"/>

          <v-row align="center">
            <v-col cols="12" md="3" :class="{'pt-8' : !$vuetify.breakpoint.mdAndUp}">
              <v-select
                v-model="filterValue"
                color="primary-light-1"
                :items="filterItems"
                item-value="id"
                hide-details
                dense
                outlined
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
          <v-row v-for="(item, i) in activePackages" :key="i">
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
          <v-row>
            <v-col>
              <infinite-loading
                :identifier="infiniteId"
                @infinite="infiniteHandler"
              >
                <template slot="no-more">
                  <span></span>
                </template>
                <template slot="no-results" class="no-results">
                    <div class="no-results__title">{{$t("no_bookings_title")}}</div>
                    <div class="no-results__description">{{$t("no_bookings_description")}}</div>
                </template>
              </infinite-loading>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-date-picker
            class="d-none d-md-block"
            :first-day-of-week="1"
            v-model="date"
            full-width
            color="primary-light-1"
            flat
            :locale="getLocale"
          ></v-date-picker>
          <v-card class="mx-auto" flat tile>
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
    </v-container>
  </div>
</template>

<script>
import PurchasedCard from "@/components/card/PurchasedCard";
import { coachBookingTimeApi, coachBookingApi } from "@/api";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import DesktopHeader from '@/components/artifact/global/DesktopHeader'
import PurchasedCardMobile from '@/components/card/PurchasedCardMobile.vue';

export default {
  layout: "coach-no-drawer",
  components: {
    PurchasedCard,
    MobileTopNav,
    PurchasedCardMobile,
    DesktopHeader
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
      page: 1,
      infiniteId: +new Date(),
      date: new Date().toISOString().substr(0, 10),
      activePackages: [],
      bookingTimes: [],
      defaultActivePackage: {
        bookingId: null,
        title: ""
      }
    };
  },
  watch: {
    date: {
      handler: function(val) {
        let params = {
          date: val
        };
        coachBookingTimeApi(this.$axios)
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
      immediate: true
    },
    filterValue() {
      this.reloadInfiniteLoader();
    }
  },
  computed: {
    getLocale(){
      if (this.$i18n?.locale) {
        return this.$i18n.locale
      }
      return "en"
    }
  },
  created() {},
  methods: {
    reloadInfiniteLoader() {
      this.page = 1;
      this.activePackages = [];
      this.infiniteId += 1;
    },
    favouriteBtnClickHandle({ bookingId }) {
      let payload = { bookingId: bookingId };

      coachBookingApi(this.$axios)
        .changeFavourite(payload)
        .then(({ data }) => {
          let activePackage = this.activePackages.find(
            item => item.bookingId == bookingId
          );
          activePackage.isFavourite = data.isFavourite;
        })
        .catch(({ response }) => {
          if (response.data.message) {
            this.$toast.error(response.data.message);
          }
        });
    },
    sortActivePackges() {
      let favouriteStack = [];
      let generalStack = [];
      this.activePackages.forEach(item => {
        let newItem = { ...item };
        if (newItem.isFavourite == 1) {
          favouriteStack.push(newItem);
        } else {
          generalStack.push(newItem);
        }
      });
      this.activePackages = [];
      this.activePackages.push(...favouriteStack);
      this.activePackages.push(...generalStack);
    },
    infiniteHandler($state) {
      const filterItem = this.filterItems.find(
        item => item.id == this.filterValue
      );
      let params = {
        page: this.page,
        status: filterItem.key
      };
      coachBookingApi(this.$axios)
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
                isFavourite: item.isFavourite,
                orderKey: item.orderKey,
                readableDate: item.readableDate
              };
            });
            this.page += 1;
            this.activePackages.push(...purchasedPackages);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(({ response }) => {
          this.$toast.error(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.coach-booking-page {
  background: $body-bg;
  height: 100%;
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
