<template>
  <div class="coach-booking-page">
    <v-container>
      <mobile-top-nav extraClass="body-bg-secondary" actionClass="d-none" :headerText="$t('pwa_home')">
        <template v-slot:goBack>
          <span></span>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <v-row
        align="center"
        justify="center"
        class="pt-8"
      >
        <v-col
          cols="11"
          sm="8"
          md="6"
          lg="4"
          xs="11"
          class="mb-10"
        >
      <v-row justify="center">
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="12">
              <span class="home-sub-title">
                {{ $t("pwa_upcoming_sessions") }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="py-0 my-0">
          <v-card class="mx-auto" flat tile>
            <v-scroll-y-transition mode="out-in">
              
              <v-list v-if="bookingTimes.length > 0 && bookingTimes[0]" elevation="0" class="body-bg" style="background: #ecf2f7!important">
                <template>
                  <div v-for="(bookingTime, i) in bookingTimes" :key="i" >
                    <session-card v-bind="bookingTime" class="my-2"></session-card>
                  </div>
                </template>
              </v-list>
              <div v-else class="body-bg no-session d-flex justify-center mt-10" style="background: #ecf2f7!important">
                  <span>No upcoming <br/> sessions</span>
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
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "coach-no-drawer",
  components: {
    SessionCard,
    MobileTopNav
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      bookingTimes: []
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
    font-size: 20px;
    line-height: 27px;
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
</style>
