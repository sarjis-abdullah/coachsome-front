<template>
<v-container fluid grid-list-md text-xs-center class="d-flex">
    <v-row
      justify="center"
    >
      <v-col
        cols="11"
        sm="8"
        md="6"
        lg="4"
        xs="11"
      >
        <v-row class="page-top-header-row">
            <v-col cols="12" class="justify-center page-top-header-column px-0 mx-0">
                <v-list width="100%" color="transparent" class="py-0 my-0">
                    <v-list-item class="pl-0 ml-0">
                      <v-btn
                        icon
                        @click="handleBack"
                      >
                        <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-list-item-content class="pl-1 py-0 my-0">
                        <v-list-item-title class="common-top-page-title"
                          v-text="$t('setting_sec_notification_title')"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </v-list>
                <div class="line"></div>
            </v-col>
          </v-row>



        <!-- Notification Section -->
        <v-row class="notification">
          <v-col cols="12" md="4">
            <div class="section-title pb-2" style="text-transform: uppercase">
              {{$t("pwa_via_email")}}
            </div>
          </v-col>
          <v-col cols="12" class="mb-5">
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.inboxMessage"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_inbox_message")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.orderMessage"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_order_message")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.orderUpdate"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_order_updates")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.bookingChange"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_booking_change")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.bookingRequest"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_booking_req")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.account"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_my_acc")}}</template>
              </v-switch>
              <v-switch 
                  class="v-input--reverse v-input--expand" 
                  inset
                  color="primary-light-1"
                  dense
                  hide-details
                  v-model="notificationType.marketting"
                  @change="changeNotification()"
              >
                  <template #label >{{$t("athlete_settings_item_todo")}}</template>
              </v-switch>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</v-container>
</template>
<script>
import { endpoint, athleteSettingApi } from "../../api";
import { pathData, settingValueData } from "@/data";
export default {
  layout: "athlete",
  components: {},
  data() {
    return {
      settingValueData,
      notificationType: {
        id: null,
        inboxMessage: false,
        orderMessage: false,
        orderUpdate: false,
        bookingRequest: false,
        bookingChange: false,
        account: false,
        marketting: false
      },
    };
  },
  watch: {
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$router.push(this.localePath(pathData.athlete.settings));
    }
  },
  computed: {
    redirectLink(){
      return this.localePath(pathData.athlete.settings);
    }
  },
  created() {},
  mounted() {
    this.getAthleteSetting();
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.athlete.settings));
    },
    async changeNotification() {
      let payload = {
          id: this.notificationType.id,
          inboxMessage: this.notificationType.inboxMessage == true ? 1 : 0,
          orderMessage: this.notificationType.orderMessage == true ? 1 : 0,
          orderUpdate: this.notificationType.orderUpdate == true ? 1 : 0,
          bookingRequest: this.notificationType.bookingRequest == true ? 1 : 0,
          bookingChange: this.notificationType.bookingChange == true ? 1 : 0,
          account: this.notificationType.account == true ? 1 : 0,
          marketting: this.notificationType.marketting == true ? 1 : 0
        };

      try {
        let response = await athleteSettingApi(this.$axios).updateSetting(
          payload
        );
        if (response.status == 200) {
          this.$toast.success("Notification has been updated successfully!");
        }
      } catch (error) {
        let response = error.response;
        if (response.message) {
          this.$toast.error(response.message);
        }
      }
    },
    async getAthleteSetting() {
      try {
        const { data } = await this.$axios.get(endpoint.ATHLETE_SETTINGS_GET);
        if (data.data) {
          this.notificationType.id = data.data.id;
          this.notificationType.inboxMessage = data.data.inboxMessage == 1 ? true : false;
          this.notificationType.orderMessage = data.data.orderMessage  == 1 ? true : false;
          this.notificationType.orderUpdate = data.data.orderUpdate  == 1 ? true : false;
          this.notificationType.bookingRequest = data.data.bookingRequest  == 1 ? true : false;
          this.notificationType.bookingChange = data.data.bookingChange  == 1 ? true : false;
          this.notificationType.account = data.data.account  == 1 ? true : false;
          this.notificationType.marketting = data.data.marketting  == 1 ? true : false;
        }
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
  }
};
</script>

<style lang="scss">
  .notification-title{
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
 
.notification-type{
    display: flex;
    justify-content: space-between;
}

.v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
  .v-application--is-ltr & {
    .v-input--selection-controls__input {
      margin-right: 0;
      margin-left: 8px;
    }
  }
  .v-application--is-rtl & {
    .v-input--selection-controls__input {
      margin-left: 0;
      margin-right: 8px;
    }
  }
}
.v-input--expand .v-input__slot {
  // justify-content: space-between;
  .v-label {
    display: block;
    flex: 1;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;

    color: #15577C;
  }
}
</style>
