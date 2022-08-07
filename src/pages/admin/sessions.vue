<template>
  <v-container fluid :class="{ 'px-10': $vuetify.breakpoint.mdAndUp }">
    <mobile-top-nav
      extraClass="body-bg-secondary"
      :headerText="$t('app_bar_booking_sessions')"
    >
      <template v-slot:goBack>
        <v-btn icon @click="handleBack">
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>

    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{ $t("app_bar_booking_sessions") }}</div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <v-card>
            <v-card-title>
              <v-row align="center" justify="space-between">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    single-line
                    solo
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="table.headers"
              :items="table.rows"
              :search="search"
              :loading="loading"
            >
              <template v-slot:item.dateAndTime="{ item }">
                <span v-html="item.dateAndTime"></span>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { pathData } from "@/data";
import MobileTopNav from "@/components/layout/global/MobileTopNav";
import moment from "moment";

export default {
  name: "AdminBookingSessions",
  layout: "admin",
  components: {
    MobileTopNav,
  },
  data() {
    return {
      search: "",
      loading: "",
      table: {
        headers: [
          {
            text: "Package ID",
            align: "start",
            filterable: false,
            value: "packageId"
          },
          { text: "Session ID", value: "sessionId" },
          { text: "Coach Name", value: "coachName" },
          { text: "Athlete Name", value: "athleteName" },
          { text: "Date And Time", value: "dateAndTime" },
          { text: "Location", value: "location" }
        ],
        rows: []
      }
    };
  },
  created() {
    this.getBookingSessions();
  },
  methods: {
    handleBack() {
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    async getBookingSessions() {
      this.loading = true;
      try {
          const res = await this.$axios.get("booking-sessions");
        let array = [];
        for (let i = 0; i < res.data.sessions.length; i++) {
          const item = res.data.sessions[i];
          item.athleteName = this.getUserName(item.packageBuyerUser);
          item.coachName = this.getUserName(item.packageOwnerUser);
          if (item?.bookingTimes?.length) {
            for (let j = 0; j < item.bookingTimes.length; j++) {
              const element = item.bookingTimes[j];

              const object = {
                ...item,
                sessionId: element.id,
                location: element?.location?.address,
                length: item.bookingTimes.length
              };
              let st,
                et = "";
              const { start_time, end_time } = element;
              let { calender_date } = element;
              if (calender_date) {
                calender_date = calender_date.split(" ")[0];
                st = moment(
                  calender_date + " " + start_time,
                  "DD-MMM-YYYY, HH.mm A"
                ).format("HH.mm A");
                et = moment(
                  calender_date + " " + end_time,
                  "DD-MMM-YYYY, HH.mm A"
                ).format("HH.mm A");
                object.dateAndTime = `<b>${calender_date}</b> ${st} to ${et}`;
              }
              array.push(object);
            }
          }
        }
        this.table.rows = array.filter(item=> {
            if (item.dateAndTime) {
                return item
            }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    getUserName({ first_name, last_name, full_name, email, user_name }) {
      if (full_name) {
        return full_name;
      } else if (first_name && last_name) {
        return first_name + " " + last_name;
      } else if (first_name) {
        return first_name;
      } else if (user_name) {
        return user_name;
      }
      return "Coachsome User (" + email + ")";
    }
  }
};
</script>
<style lang="scss" scoped>
.name-btn {
  .v-btn {
    text-transform: none;
    color: $primary-light-1;
  }
  .v-btn:before {
    display: none;
  }
}
</style>
