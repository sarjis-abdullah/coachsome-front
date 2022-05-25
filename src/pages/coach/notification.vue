<template>
<v-container fluid >
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('setting_sec_notification_title')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>
    <v-row
      justify="center"
      class="pt-5"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
      >
              <!-- Notification Section -->
          <v-row class="notification">
            <v-col cols="12" md="4">
              <div class="default--title pb-2">
                {{$t("pwa_email_notification")}}
              </div>
            </v-col>
            <v-col cols="12" class="px-0">
              <v-list class="body-bg">
               
                <v-list-item text >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-title class="default--sub-title">{{$t('pwa_system_message')}}</v-list-item-title>
                  </v-list-item-title>
                </v-list-item-content>
                  <v-list-item-icon>
                    <client-only>
                      <toggle-button
                        :value="notificationType.inboxMessage"
                        @input="handleSystemMessage"
                        :color="{ checked: '#5CC866', unchecked: '#EFEFEF' }"
                        :sync="true"
                        :font-size="12"
                        :width="60"
                        :height="30"
                      />
                    </client-only>
                  </v-list-item-icon>
              </v-list-item>
              </v-list>
               <!-- Profile Status -->
                <!-- <v-switch 
                    class="v-input--reverse v-input--expand" 
                    inset
                    color="primary-light-1"
                    dense
                    hide-details
                    v-model="notificationType.inboxMessage"
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
                >
                    <template #label >{{$t("athlete_settings_item_order_updates")}}</template>
                </v-switch>
                <v-switch 
                    class="v-input--reverse v-input--expand" 
                    inset
                    color="primary-light-1"
                    dense
                    hide-details
                    v-model="notificationType.buyerRequest"
                >
                    <template #label >Buyer Request</template>
                </v-switch>
                <v-switch 
                    class="v-input--reverse v-input--expand" 
                    inset
                    color="primary-light-1"
                    dense
                    hide-details
                    v-model="notificationType.bookingRequest"
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
                >
                    <template #label >{{$t("athlete_settings_item_my_acc")}}</template>
                </v-switch>
                <v-switch 
                    class="v-input--reverse v-input--expand" 
                    inset
                    color="primary-light-1"
                    dense
                    hide-details
                    v-model="notificationType.todo"
                    @change="changeNotification()"
                >
                    <template #label >{{$t("athlete_settings_item_todo")}}</template>
                </v-switch> -->
            </v-col>
            <!-- <v-col cols="12">
              <v-row v-for="(notification, i) in form.notifications" :key="i">
                <v-col cols="12" class="pb-0">
                  <v-switch
                    color="primary-light-1"
                    dense
                    hide-details
                    :input-value='notification.status'
                    :label="$t(notification.t_key)"
                    @change="changeNotification(notification)"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col> -->
          </v-row>
      </v-col>
    </v-row>
</v-container>
</template>
<script>
import { endpoint, coachSettingApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "coach-no-drawer",
  components:{MobileTopNav},
  data() {
    return {
        form: {
            notifications: [],
            activeNotifications: [],
        },
        notificationType: {
            id: null,
            inboxMessage: null,
            orderMessage: null,
            orderUpdate: null,
            buyerRequest: null,
            bookingRequest: null,
            account: null,
            todo: null
        },
    };
  },
  watch:{
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$router.push(this.localePath(pathData.coach.settings));
    }
  },
  created() {
    this.fetchSettings();
  },
  mounted() {},
  methods: {
    handleSystemMessage(value){
      this.notificationType.inboxMessage = value;
      this.changeNotification();
    },
    handleBack(){
        this.$router.push(this.localePath(pathData.coach.settings));
    },

    async handleSaveBtnClick() {
      try {
        let payload = {
          notificatonCategories: this.form.activeNotifications.map(
            item => item.id
          )
        };
        let { data } = await coachSettingApi(this.$axios).updateSetting(
          payload
        );
        // console.log(data);
        if (data.message) {
          this.$toast.success(data.message);
        }
      } catch (error) {
        let { data } = error.response;
        if (data.message) {
          this.$toast.error(data.message);
        }
      }
    },

    async fetchSettings() {
      // let { data } = await coachSettingApi(this.$axios).get();
      const { data } = await this.$axios.get(endpoint.COACH_SETTINGS_GET);
        console.log(data.notificationCategoryList);
      if (data.notificationCategoryList.length) {
        data.notificationCategoryList.forEach(item => {
          this.form.notifications.push(item);
        });
      }
      // if (data.userSetting) {
      //   this.form.activeNotifications =
      //     data.userSetting.activeNotificationCategories;
      // }

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

      console.log(data);
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
        let response = await coachSettingApi(this.$axios).updateSetting(
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
  }
};
</script>

<style lang="scss">
.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}

.setting-title{
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
