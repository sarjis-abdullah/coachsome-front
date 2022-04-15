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
          <v-row class="page-top-header-row body-bg">
            <v-col cols="12" class="justify-center body-bg">
                <v-list width="100%" color="transparent" class="py-0 my-0">
                    <v-list-item class="pl-0 ml-0">
                      <v-btn
                        icon
                        @click="handleBack"
                      >
                        <v-icon x-large color="#15577C">mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-list-item-content class="pl-1 py-0 my-0">
                        <v-list-item-title class="setting-title"
                          v-text="$t('setting_sec_notification_title')"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <!-- <v-list-item-action>
                        <router-link class="save-profile" to="" @click.native="saveProfile()">{{$t("btn_label_txt_save")}}</router-link>
                      </v-list-item-action> -->
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
                </v-switch>
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
import { coachSettingApi } from "@/api";
import { pathData } from "@/data";
export default {
  layout: "coach-no-drawer",

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
        console.log(data);
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
      let { data } = await coachSettingApi(this.$axios).get();
        console.log(data.notificationCategoryList);
      if (data.notificationCategoryList.length) {
        data.notificationCategoryList.forEach(item => {
          this.form.notifications.push(item);
        });
      }
      if (data.userSetting) {
        this.form.activeNotifications =
          data.userSetting.activeNotificationCategories;
      }

      console.log(data);
    },
    changeNotification() {
      let hasNotificaion = false;
      console.log(this.notificationType);

    //   this.notificationType.forEach(item => {
    //     if (item.id == notification.id) {
    //       hasNotificaion = true;
    //     }
    //   });
    //   if (hasNotificaion) {
    //     let index = this.form.activeNotifications.findIndex(
    //       item => item.id == notification.id
    //     );
    //     console.log(index);
    //     this.form.activeNotifications.splice(index, 1);
    //   } else {
    //     this.form.activeNotifications.push(notification);
    //   }
    }
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
