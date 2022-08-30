<template>
  <div class="coach-booking-page">
    <v-container fluid>
      <mobile-top-nav extraClass="body-bg-secondary" actionClass="d-none" :headerText="$t('pwa_home')">
        <template v-slot:goBack>
          <span></span>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>

      <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_home')"></desktop-top-nav>

      <v-row class="px-3">
        <v-col cols="12" md="3" v-for="item in topItems" :key="item.key">
          <template>
            <v-card class="dashboard-card">
              <v-card-text>
                <header class="coach-dashboard-item-title">
                  {{item.key}}
                </header>
                <div class="coach-dashboard-item-text">
                  {{item.value}}
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-col>
      </v-row>
      
      <v-row
        class="pt-4 px-3"
        :class="!bookingTimes.length && 'd-flex justify-center pt-md-16'"
      >
        <v-col
          cols="12"
          sm="11"
          md="6"
          lg="6"
          xs="12"
          class="mb-10"
        >
      <v-row align="center">
        <v-col cols="12" class="py-0 my-0">
          <v-card class="mx-auto" :flat="!bookingTimes.length" :class="!bookingTimes.length && 'booking-card'">
            <div v-if="bookingTimes.length > 0 && bookingTimes[0]" class="pt-4 pl-6 home-sub-title">
                {{ $t("pwa_upcoming_sessions") }}
            </div>
            <v-scroll-y-transition mode="out-in">
              
              <v-list v-if="bookingTimes.length > 0 && bookingTimes[0]" elevation="0" class="body-bg" style="background: #F7FAFC!important">
                <template>
                  <div v-for="(bookingTime, i) in bookingTimes" :key="i" >
                    <session-card :show="i < bookingTimes.length - 1" v-bind="bookingTime" class="my-2"></session-card>
                  </div>
                </template>
              </v-list>
              <div v-else class="body-bg no-session d-flex justify-center mt-10" style="background: #F7FAFC!important">
                  <span>{{$t("no_upcoming")}} <br/> {{$t("text_session")}}</span>
              </div>
            </v-scroll-y-transition>
          </v-card>
        </v-col>
      </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SessionCard from "@/components/card/SessionCard";
import { coachBookingTimeApi } from "@/api";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';
import moment from "moment";
export default {
  layout: "coach",
  components: {
    SessionCard,
    MobileTopNav,
    DesktopTopNav
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      bookingTimes: [],
      topItems: []
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
                if(item.status == "Accepted"){
                    return {
                      bookingTimeId: item.bookingTimeId,
                      date: item.date,
                      time: item.time,
                      profileName: item.profileName,
                      profileImage: item.profileImage,
                      profileAvatarName: item.profileAvatarName,
                      status: item.status,
                      address: item.address,
                      isCoachToCoach: item.isCoachToCoach,
                      city: item.city,
                      zip: item.zip
                    };
                }
                
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
    }
  },
  computed: {
    query() {
      let startDate = moment().subtract(5, "month")
      let endDate = moment()
      startDate = startDate.format("YYYY-MM-DD"),
      endDate = endDate.format("YYYY-MM-DD")
      return `?startDate=${startDate}&endDate=${endDate}` 
    }
  },
  created () {
    this.$axios.get("admin/dashboard" + this.query).then((result) => {
      if (result?.data?.data) {
        this.topItems = [{
            key: "Packages sold",
            value: result.data.data.packageSold || 0
          },
          {
            key: "Sessions completed",
            value: result.data.data.sessionCompleted || 0
          },
          {
            key: "Contacts",
            value: result.data.data.users || 0
          },
          {
            key: "Total volume (DKK)",
            value: result.data.data.totalProfit || 0
          },
        ]
      }
      return Promise.resolve(result)
    }).catch((err) => {
      return Promise.reject(err)
    });
  },
};
</script>

<style lang="scss" scoped>
.bookings-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;
}

.coach-booking-page {
  background: $body-bg;
  height: 100%;
}

.home-sub-title{
    font-family: $font-family;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-transform: capitalize;
    color: #1A202D;
}
.no-session{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    text-transform: capitalize;
    color: #9FAEC2;
}
.coach-dashboard-item-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
}
.coach-dashboard-item-text {
  font-weight: 600;
  font-size: 40px;
  line-height: 54px;
}

.dashboard-card {
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.booking-card {
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
