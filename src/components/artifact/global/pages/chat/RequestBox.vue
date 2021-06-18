<template>
  <v-card>
    <v-card-text>
      <div class="request-box">
        <div class="request-box__date-picker">
          <v-date-picker
            class="pt-5"
            color="primary-light-1"
            @input="handleDateChange"
            full-width
            v-model="datePicker.value"
            flat
          ></v-date-picker>
        </div>
        <span v-if="hasTimeRange || isSold">
          <div v-if="!isSold" class="request-box__select">
            <v-select
              v-model="selectedTimeRange"
              @input="handleSelectedTimeRangeInput"
              :items="timeRanges"
              class="mt-5"
              :label="$t('chat_request_box_time_slot_label')"
              solo
            >
              <template v-slot:selection="{ item }">
                <span
                  >{{ $t("req_box_text_time_range") }} : {{ item.startTime }} -
                  {{ item.endTime }}</span
                >
              </template>
              <template v-slot:item="{ item }">
                <div>
                  <span
                    >{{ $t("req_box_text_time_range") }} :
                    {{ item.startTime }} - {{ item.endTime }}</span
                  >
                  <div style="color:red" v-if="item.bookedTimes.length">
                    {{ $t("req_box_text_already_text") }}:
                    <span v-for="(bookedTime, i) in item.bookedTimes" :key="i">
                      [ {{ bookedTime.start_time }} -
                      {{ bookedTime.end_time }} ]
                    </span>
                  </div>
                </div>
              </template>
            </v-select>
          </div>
          <!-- Already Booked -->
          <div v-if="selectedTimeRange && selectedBookedTimes.length">
            <div class="d-flex justify-center" style="color:red">
              {{ $t("req_box_text_already_text") }}
            </div>
            <div class="d-flex justify-center" style="color:red">
              <span v-for="(bookedTime, i) in selectedBookedTimes" :key="i">
                [ {{ bookedTime.start_time }} - {{ bookedTime.end_time }} ]
              </span>
            </div>
          </div>
          <div v-if="selectedTimeRange || isSold" class="request-box__text">
            <i18n path="chat_request_box_choose_time_text" tag="span">
              <template v-slot:session>{{ packageSession }}</template>
            </i18n>
          </div>

          <div
            v-if="selectedTimeRange || isSold"
            class="request-box__time mt-5"
          >
            <div class="request-box__start-time">
              <div>{{ $t("chat_request_time_title_start_time") }}</div>
              <a-time-picker
                v-model="startTime"
                :default-value="moment('00:00', 'HH:mm')"
                @change="handleStartTimeChange"
                format="HH:mm"
              />
            </div>
            <div class="request-box__end-time">
              <div>{{ $t("chat_request_time_title_end_time") }}</div>
              <a-time-picker
                v-model="endTime"
                disabled
                :default-value="moment('00:00', 'HH:mm')"
                format="HH:mm"
              />
            </div>
          </div>
          <div class="request-box__location">
            <div class="location">
              <div class="location__title">
                {{ $t("chat_request_box_location_title") }}
              </div>
              <div
                class="location__address d-flex justify-center"
                v-if="requestBoxLocation.selected"
              >
                {{ requestBoxLocation.selected.address }}
              </div>
              <div class="location__btn d-flex justify-center mt-5 mb-5">
                <v-btn
                  @click.stop="handleChooseLocationBtnClick"
                  depressed
                  x-small
                  >{{ $t("chat_request_box_location_choose_btn_label") }}</v-btn
                >
              </div>
            </div>
          </div>
          <div class="request-box__btn d-flex justify-center">
            <v-btn
              dark
              color="primary-light-1"
              depressed
              @click="handleRequestBookingBtnClick"
              >{{ $t("chat_request_box_booking_btn_label") }}</v-btn
            >
          </div>
        </span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        dark
        color="primary-light-1"
        text
        @click.stop="handleCancelBtnClick"
        >{{ $t("chat_req_box_cancel_btn_label") }}</v-btn
      >
    </v-card-actions>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.value" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar.value = false"
          >{{ $t("chat_request_box_btn_label_close") }}</v-btn
        >
      </template>
    </v-snackbar>
    <!-- ./Snackbar -->

    <!-- Location Dialog -->
    <v-dialog v-model="requestBoxLocation.dialog" max-width="500px">
      <request-box-location
        v-bind="requestBoxLocation.props"
        @submit="handleRequestBoxLocationSubmit"
        @cancel="handleRequestBoxLocationCancel"
      />
    </v-dialog>
    <!-- ./Location Dialog -->
  </v-card>
</template>

<script>
import moment from "moment";
import { coachGeographyApi, calenderApi, bookingTimeApi } from "@/api";
import RequestBoxLocation from "./RequestBoxLocation";

export default {
  components: {
    RequestBoxLocation
  },
  props: [
    "isOpen",
    "bookingId",
    "packageSession",
    "userId",
    "date",
    "isSold",
    "packageOwnerUserId",
    "packageBuyerUserId"
  ],
  data: () => ({
    datePicker: {
      value: null
    },
    selectedTimeRange: null,
    selectedBookedTimes: [],
    timeRanges: [],
    selectedLocation: null,
    locations: [],
    startTime: moment("00:00", "HH:mm"),
    endTime: moment("00:00", "HH:mm"),
    preStartTime: "",
    snackbar: {
      value: false,
      text: "",
      timeout: 2000
    },
    requestBoxLocation: {
      dialog: false,
      props: {
        locations: []
      },
      selected: {
        zip: "",
        city: "",
        address: "",
        long: "",
        lat: ""
      }
    }
  }),
  computed: {
    hasTimeRange() {
      return this.timeRanges.length > 0 ? true : false;
    }
  },
  watch: {
    isOpen(val) {
      console.log(val);
      if (val) {
        this.datePicker.value = new Date().toISOString().substr(0, 10);
      }
    },
    "locationDialog.value": function() {},
    startTime(val, preVal) {
      this.preStartTime = preVal;
      if (val) {
        this.endTime = moment(val).add(this.packageSession, "minute");
      } else {
        this.endTime = moment("00:00", "HH:mm");
      }
    },
    endTime(val) {
      if (!this.isSold) {
        let d = new Date();
        d.setHours(this.selectedTimeRange.endTime);
        d.setMinutes(0);
        if (val.format("HH:mm") > moment(d).format("HH:mm")) {
          this.snackbar.value = true;
          this.snackbar.text =
            "Start and end time have to be within the time range.";
          this.startTime = this.preStartTime;
        }
      }
    },
    selectedTimeRange() {}
  },
  created() {
    coachGeographyApi(this.$axios)
      .getLocations({
        userId: this.packageOwnerUserId
      })
      .then(({ data }) => {
        this.locations = data.locations;
        this.requestBoxLocation.props.locations = data.locations;
      });
  },
  methods: {
    moment,
    handleSelectedTimeRangeInput() {
      if (this.selectedTimeRange) {
        this.selectedBookedTimes = this.selectedTimeRange.bookedTimes;

        let s = new Date();
        s.setHours(this.selectedTimeRange.startTime);
        s.setMinutes(0);

        let e = new Date();
        e.setHours(this.selectedTimeRange.endTime);
        e.setMinutes(0);

        let sessionAddedTime = moment(s)
          .add(this.packageSession, "minute")
          .format("HH:mm");
        let endTimeLimit = moment(e).format("HH:mm");

        if (sessionAddedTime > endTimeLimit) {
          this.selectedTimeRange = 0;
          this.snackbar.value = true;
          this.snackbar.text =
            "Sorry, this time slot does not cover your package session time. Try another one.";
        } else {
          this.startTime = this.preStartTime;
          this.startTime = moment(s);
        }
      } else {
        this.startTime = moment("00:00", "HH:mm");
        this.endTime = moment("00:00", "HH:mm");
      }
    },
    handleRequestBoxLocationSubmit(location) {
      if (location) {
        this.requestBoxLocation.selected.address = location.address;
        this.requestBoxLocation.selected.city = location.city;
        this.requestBoxLocation.selected.zip = location.zip;
        this.requestBoxLocation.selected.long = location.long;
        this.requestBoxLocation.selected.lat = location.lat;
      }
      this.requestBoxLocation.dialog = false;
    },
    handleRequestBoxLocationCancel() {
      this.requestBoxLocation.dialog = false;
    },
    handleChooseLocationBtnClick() {
      this.requestBoxLocation.dialog = true;
    },
    handleStartTimeChange() {
      if(this.selectedTimeRange){
        let d = new Date();
        d.setHours(this.selectedTimeRange.startTime);
        d.setMinutes(0);
        if (moment(d).format("HH:mm") > this.startTime.format("HH:mm")) {
          this.startTime = this.preStartTime;
        }
      }
    },
    handleRequestBookingBtnClick() {
      let payload = {
        bookingId: this.bookingId,
        userId: this.userId,
        date: this.datePicker.value,
        startTime: this.startTime
          ? moment(this.startTime).format("HH:mm")
          : null,
        endTime: this.endTime ? moment(this.endTime).format("HH:mm") : null,
        zip: this.requestBoxLocation.selected.zip,
        city: this.requestBoxLocation.selected.city,
        address: this.requestBoxLocation.selected.address,
        long: this.requestBoxLocation.selected.long,
        lat: this.requestBoxLocation.selected.lat,
        timeRange: this.selectedTimeRange,
        packageSession: this.packageSession,
        isSoldPackageChoosing: this.isSold
      };
      bookingTimeApi(this.$axios)
        .store(payload)
        .then(({ data }) => {
          if (data.t_key) {
            this.$toast.success(data.t_key);
          } else {
            this.$toast.success(data.toastMessage);
          }

          if (data.newMessage) {
            this.$emit("new-message", data.newMessage);
          }
        })
        .catch(({ response }) => {
          let { data } = response;
          if (data.toastMessage) {
            this.$toast.error(data.toastMessage);
          }
        });
    },
    handleDateChange() {
      if (!this.isSold) {
        let params = {
          date: this.datePicker.value,
          userId: this.userId,
          session: this.packageSession
        };
        this.showLoading();
        this.timeRanges = [];
        this.selectedTimeRange = null;
        calenderApi(this.$axios)
          .getTimeRange(params)
          .then(({ data }) => {
            this.hideLoading();
            if (data.day.time_ranges) {
              this.timeRanges = [];
              data.day.time_ranges.forEach(item => {
                let time = {
                  startTime: item.start_time,
                  endTime: item.end_time,
                  bookedTimes: item.booked_times
                };
                this.timeRanges.push(time);
              });
            }
          })
          .catch(({ response }) => {
            this.hideLoading();
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          });
      }
    },
    handleCancelBtnClick() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss">
.request-box {
  .v-picker__title {
    display: none;
  }
  &__date-picker {
  }
  &__select {
    display: flex;
    justify-content: center;
  }

  .request-box__text {
    margin-top: 20px;
    font-family: $font-family;
    font-size: 16px;
    text-align: center;
    color: #15577c;
    border-radius: 20px;
  }
  &__time {
    display: flex;
    justify-content: center;
    .request-box__start-time {
    }
    .request-box__end-time {
    }
  }
  .location {
    &__title {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      font-family: $font-family;
      font-size: 16px;
      text-align: center;
      color: #15577c;
      border-radius: 20px;
    }
    &__select {
    }
  }
}
</style>
