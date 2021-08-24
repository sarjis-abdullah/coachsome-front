<template>
  <div class="chat-screen" ref="chatScreen">
    <div class="my-10" v-for="(message, i) in messages" :key="i">
      <!-- Text Message -->
      <div v-if="message.type == 'text'">
        <TextMessage :message="{ ...message }" />
      </div>

      <!-- Structure message -->
      <div
        v-if="message.type == 'structure'"
        class="chat-screen__structure-message"
      >
        <!-- Big text -->
        <span
          v-if="message.content.key == 'big_text'"
          class="d-flex justify-center"
        >
          <div class="big-text">{{ message.content.text }}</div>
        </span>

        <!-- Buy package message -->
        <span
          v-if="message.content.key == 'buy_package'"
          class="d-flex justify-center"
        >
          <div class="booking-package">
            <div class="booking-package__title">
              <div class="text-left">
                <span v-if="message.content.orderKey"
                  >#{{ message.content.orderKey }}</span
                >
              </div>
              <span v-if="message.content.packageTitle">{{
                " " + message.content.packageTitle
              }}</span>
            </div>
            <div class="booking-package__description">
              <span
                v-if="message.content.amount && message.content.currencyCode"
              >
                <i18n
                  path="chat_booking_package_message_description"
                  tag="span"
                >
                  <template v-slot:amount>
                    <span>{{
                      currencyService.toCurrency(message.content.amount)
                    }}</span>
                  </template>
                  <template v-slot:session>
                    <span>{{ message.content.session }}</span>
                  </template>
                </i18n>
              </span>
            </div>
            <div class="booking-package__buyer-name mt-5">
              {{ message.content.buyerName }}
            </div>
            <div
              class="booking-package__buyer-text"
              v-if="message.content.buyerText"
            >
              {{ message.content.buyerText }}
            </div>
            <div
              class="booking-package__actions d-flex justify-space-between mt-10"
            >
              <div class="quick-booking-tag">Quick Booking</div>
              <div>
                <div v-if="message.content.status == 'Accepted'" class="mr-2">
                  <v-icon dark small color="green">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <span style="color:white;">
                    {{ $t("chat_screen_btn_label_accepted") }}
                  </span>
                </div>
                <div v-if="message.content.status == 'Declined'" class="mr-2">
                  <v-icon dark small color="red"> mdi-minus-circle </v-icon>
                  <span style="color:white;">
                    {{ $t("chat_screen_btn_label_declined") }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </span>

        <!-- Package accepted message -->
        <span
          v-if="message.content.key == 'accepted_package_booking'"
          class="d-flex justify-center"
        >
          <div class="big-text">
            <i18n path="chat_chat_screen_package_accepted_message" tag="span">
              <template v-slot:key>
                <span>{{
                  message.content.orderSnapshot
                    ? message.content.orderSnapshot.key
                    : ""
                }}</span>
              </template>
            </i18n>
          </div>
          <!-- Tracking Pixel -->
          <img
            v-if="trackingPixel.status && i == messages.length - 1"
            :src="
              `https://makeinfluence.com/p?bid=7e4d005a-5ca9-11eb-8c81-02d6cc0d2b4c&value=${trackingPixel.salePrice}&uid=${trackingPixel.orderKey}`
            "
          />
          <!-- Tracking Pixel -->
        </span>

        <!-- Package declined message  -->
        <span
          v-if="message.content.key == 'declined_package_booking'"
          class="d-flex justify-center"
        >
          <div class="big-text">
            <i18n
              path="chat_chat_screen_booking_package_declinde_message"
              tag="span"
            >
              <template v-slot:key>
                <span>{{
                  message.content.orderSnapshot
                    ? message.content.orderSnapshot.key
                    : ""
                }}</span>
              </template>
            </i18n>
          </div>
        </span>

        <!-- Booking time declined message  -->
        <span
          v-if="message.content.key == 'declined_booking_time'"
          class="d-flex justify-center"
        >
          <div class="big-text">
            <i18n
              path="chat_chat_screen_booking_time_declinde_message"
              tag="span"
            >
              <template v-slot:id>
                <span>{{
                  message.content.bookingTimeSnapshot
                    ? message.content.bookingTimeSnapshot.id
                    : ""
                }}</span>
              </template>
            </i18n>
          </div>
        </span>

        <!-- Booking time accepted message  -->
        <span
          v-if="message.content.key == 'accepted_booking_time'"
          class="d-flex justify-center"
        >
          <div class="big-text">
            <i18n
              path="chat_chat_screen_booking_time_accepted_message"
              tag="span"
            >
              <template v-slot:id>
                <span>{{
                  message.content.bookingTimeSnapshot
                    ? message.content.bookingTimeSnapshot.id
                    : ""
                }}</span>
              </template>
            </i18n>
          </div>
        </span>

        <!-- Booking time -->
        <span
          v-if="message.content.key == 'booking_time'"
          class="d-flex justify-center"
        >
          <div class="booking-time">
            <div class="booking-time__header">
              <div class="booking-time__title">
                {{
                  $t("chat_message_booking_time_title_booking_request") +
                    " " +
                    message.content.bookingTimeId
                }}
              </div>
            </div>
            <div class="booking-time__body">
              <div class="booking-time__content">
                <div class="booking-time-date">{{ message.content.date }}</div>
                <div class="time-slot-and-booking-info-wrapper">
                  <!-- Hide timeslot because of it is unnecessary -->
                  <!-- <div class="time-slot" v-if="message.content.timeSlot">
                    {{ $t("chat_chat_screen_text_time_slot") }}
                    <br />
                    {{ message.content.timeSlot.startTime }}
                    -
                    {{ message.content.timeSlot.endTime }}
                  </div> -->
                  <div
                    class="booking-info d-flex flex-column justify-center align-center"
                  >
                    <div class="booking-info__request-time">
                      {{ $t("chat_chat_screen_text_request_time") }}
                      <br />
                      {{ message.content.startTime }}
                      -
                      {{ message.content.endTime }}
                    </div>
                    <div
                      v-if="message.content.bookingLocation"
                      class="booking-info__location"
                    >
                      @{{ message.content.bookingLocation.address }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="message.content.packageSnapshot"
                class="booking-time__actions d-flex justify-end mt-2"
              >
                <div
                  v-if="
                    message.content.requesterToUserId == authUserId &&
                      message.content.status == 'Pending'
                  "
                >
                  <v-btn
                    class="mr-2"
                    depressed
                    text
                    x-small
                    @click.stop="bookingTimeRequestDeclineBtnHandle(message)"
                    color="primary-light-1"
                    >{{ $t("chat_chat_screen_btn_label_decline") }}</v-btn
                  >
                  <v-btn
                    depressed
                    dark
                    x-small
                    @click.stop="bookingTimeRequestAcceptBtnHandle(message)"
                    color="primary-light-1"
                    >{{ $t("chat_chat_screen_btn_label_accept") }}</v-btn
                  >
                </div>
                <div v-if="message.content.status == 'Accepted'" class="mr-2">
                  <v-icon dark small color="green">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <span style="color:white;">
                    {{ $t("chat_screen_btn_label_accepted") }}
                  </span>
                </div>
                <div v-if="message.content.status == 'Declined'" class="mr-2">
                  <v-icon dark small color="red"> mdi-minus-circle </v-icon>
                  <span style="color:white;">
                    {{ $t("chat_screen_btn_label_declined") }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </span>

        <!-- Booking Package -->
        <span
          v-if="message.content.key == 'booking_package'"
          class="d-flex justify-center"
        >
          <div class="booking-package">
            <div class="booking-package__title">
              <div class="text-left">
                <span v-if="message.content.orderKey"
                  >#{{ message.content.orderKey }}</span
                >
              </div>
              <span v-if="message.content.packageTitle">{{
                " " + message.content.packageTitle
              }}</span>
            </div>
            <div class="booking-package__description">
              <span
                v-if="message.content.amount && message.content.currencyCode"
              >
                <i18n
                  path="chat_booking_package_message_description"
                  tag="span"
                >
                  <template v-slot:amount>
                    <span>{{
                      currencyService.toCurrency(message.content.amount)
                    }}</span>
                  </template>
                  <template v-slot:session>
                    <span>{{ message.content.session }}</span>
                  </template>
                </i18n>
              </span>
            </div>
            <div class="booking-package__buyer-name mt-5">
              {{ message.content.buyerName }}
            </div>
            <div
              class="booking-package__buyer-text"
              v-if="message.content.buyerText"
            >
              {{ message.content.buyerText }}
            </div>
            <div
              v-if="message.content.packageSnapshot"
              class="booking-package__actions d-flex justify-end mt-10"
            >
              <div
                v-if="
                  message.content.packageSnapshot.user_id == authUserId &&
                    message.content.status == 'Pending'
                "
              >
                <v-btn
                  class="mr-2"
                  depressed
                  text
                  x-small
                  @click.stop="bookingPackageRequestDeclineBtnHandle(message)"
                  color="primary-light-1"
                  >{{ $t("chat_chat_screen_btn_label_decline") }}</v-btn
                >
                <v-btn
                  depressed
                  dark
                  x-small
                  @click.stop="bookingPackageRequestAcceptBtnHandle(message)"
                  color="primary-light-1"
                  >{{ $t("chat_chat_screen_btn_label_accept") }}</v-btn
                >
              </div>
              <div v-if="message.content.status == 'Accepted'" class="mr-2">
                <v-icon dark small color="green">
                  mdi-checkbox-marked-circle
                </v-icon>
                <span style="color:white;">
                  {{ $t("chat_screen_btn_label_accepted") }}
                </span>
              </div>
              <div v-if="message.content.status == 'Declined'" class="mr-2">
                <v-icon dark small color="red"> mdi-minus-circle </v-icon>
                <span style="color:white;">
                  {{ $t("chat_screen_btn_label_declined") }}
                </span>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingTimeApi, bookingApi } from "@/api";
import { currencyService } from "@/services";
import TextMessage from "./messages/TextMessage";

export default {
  components: { TextMessage },
  data: () => ({
    currencyService,
    trackingPixel: {
      status: false,
      salePrice: null,
      orderKey: null
    },
    socket: null
  }),
  computed: {
    messages() {
      return this.$store.getters["chat/messages"];
    },
    selectedContactUser() {
      return this.$store.getters["chat/selectedContactUser"];
    },
    isCoach() {
      return this.hasRole(["coach"]);
    },
    isAthlete() {
      return this.hasRole(["athlete"]);
    },
    authUserId() {
      return this.$auth.user.id;
    }
  },
  watch: {
    messages() {
      setTimeout(this.updateScroll, 0);
    }
  },
  created() {},
  mounted() {},
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
    updateScroll() {
      if (process.client) {
        this.$refs.chatScreen.scrollTop = this.$refs.chatScreen.scrollHeight;
      }
    },
    sendMessageToChatServer(payload) {
      this.$socket.emit("private_message_send", {
        senderUserId: payload.senderUserId,
        receiverUserId: payload.receiverUserId,
        message: payload.message
      });
    },
    bookingTimeRequestDeclineBtnHandle(message) {
      let payload = {
        userId: this.selectedContactUser.id,
        messageId: message.id,
        bookingTimeId: message.content.bookingTimeId,
        action: "decline"
      };
      bookingTimeApi(this.$axios)
        .changeStatus(payload)
        .then(({ data }) => {
          if (data.toastMessage) {
            this.$toast.success(data.toastMessage);
          }

          if (data.newMessage) {
            let messageItem = {
              type: data.newMessage.type,
              content: data.newMessage.content
            };
            this.$store.dispatch("chat/pushMessage", messageItem);
            this.sendMessageToChatServer({
              senderUserId: this.$auth.user.id,
              receiverUserId: this.selectedContactUser.id,
              message: messageItem
            });
          }

          if (data.messages) {
            this.$store.dispatch("chat/setMessages", data.messages);
          }
        })
        .catch(({ response }) => {
          if (response.data.t_key) {
            this.$toast.error(this.$i18n.t(response.data.t_key));
          }
        });
    },
    bookingTimeRequestAcceptBtnHandle(message) {
      let payload = {
        userId: this.selectedContactUser.id,
        messageId: message.id,
        bookingTimeId: message.content.bookingTimeId,
        action: "accept"
      };
      bookingTimeApi(this.$axios)
        .changeStatus(payload)
        .then(({ data }) => {
          if (data.toastMessage) {
            this.$toast.success(data.toastMessage);
          }

          if (data.trackingPixel && data.trackingPixel.status == true) {
            this.trackingPixel.status = true;
            this.trackingPixel.orderKey = data.trackingPixel.orderKey;
            this.trackingPixel.salePrice = data.trackingPixel.salePrice;
          }

          if (data.newMessage) {
            let messageItem = {
              type: data.newMessage.type,
              content: data.newMessage.content
            };
            this.$store.dispatch("chat/pushMessage", messageItem);
            this.sendMessageToChatServer({
              senderUserId: this.$auth.user.id,
              receiverUserId: this.selectedContactUser.id,
              message: messageItem
            });
          }

          if (data.messages) {
            this.$store.dispatch("chat/setMessages", data.messages);
          }
        })
        .catch(({ response }) => {
          if (response.data.toastMessage) {
            this.$toast.error(response.data.toastMessage);
          }
        });
    },
    bookingPackageRequestDeclineBtnHandle(message) {
      let payload = {
        bookingId: message.content.bookingId,
        action: "decline"
      };
      bookingApi(this.$axios)
        .changeStatus(payload)
        .then(({ data }) => {
          if (data.successCode) {
            this.showMessage(data.successCode);
          } else {
            this.$toast.success(data.message);
          }

          if (data.newMessage) {
            let messageItem = {
              type: data.newMessage.type,
              content: data.newMessage.content
            };
            this.$store.dispatch("chat/pushMessage", messageItem);
            this.sendMessageToChatServer({
              senderUserId: this.$auth.user.id,
              receiverUserId: this.selectedContactUser.id,
              message: messageItem
            });
          }

          if (data.messages) {
            this.$store.dispatch("chat/setMessages", data.messages);
          }
        })
        .catch(error => {
          if (error.response.data.erroCode) {
            this.showMessage(error.response.data.erroCode);
          } else {
            this.$toast.error(error.response.data.message);
          }
        });
    },
    bookingPackageRequestAcceptBtnHandle(message) {
      // Before accepting a package there sould have no renderring tracking pixel
      this.trackingPixel.status = false;
      this.trackingPixel.orderKey = "";
      this.trackingPixel.salePrice = 0.0;

      let payload = {
        bookingId: message.content.bookingId,
        action: "accept"
      };
      bookingApi(this.$axios)
        .changeStatus(payload)
        .then(({ data }) => {
          if (data.successCode) {
            this.showMessage(data.successCode);
          } else {
            this.$toast.success(data.message);
          }

          // Tracking pixel render after package acceptance completed
          if (data.trackingPixel && data.trackingPixel.status == true) {
            this.trackingPixel.status = true;
            this.trackingPixel.orderKey = data.trackingPixel.orderKey;
            this.trackingPixel.salePrice = data.trackingPixel.salePrice;
          }

          if (data.newMessage) {
            let messageItem = {
              type: data.newMessage.type,
              content: data.newMessage.content
            };
            this.$store.dispatch("chat/pushMessage", messageItem);

            this.sendMessageToChatServer({
              senderUserId: this.$auth.user.id,
              receiverUserId: this.selectedContactUser.id,
              message: messageItem
            });
          }

          if (data.messages) {
            this.$store.dispatch("chat/setMessages", data.messages);
          }
        })
        .catch(error => {
          if (error.response.data.erroCode) {
            this.showMessage(error.response.data.erroCode);
          } else {
            this.$toast.error(error.response.data.message);
          }
        });
    },
    requestBoxNewMessageHandle(messageItem) {
      this.bookingDialog.value = false;
      this.$store.dispatch("chat/pushMessage", messageItem);
      this.sendMessageToChatServer({
        senderUserId: this.$auth.user.id,
        receiverUserId: this.selectedContactUser.id,
        message: messageItem
      });
    },
    showMessage(code) {
      if (code == 101) {
        this.$toast.error(this.$i18n.t("chat_error_message_info_not_found"));
      }
      if (code == 102) {
        this.$toast.error(this.$i18n.t("chat_error_message_user_not_found"));
      }
      if (code == 103) {
        this.$toast.error(
          this.$i18n.t("chat_err_message_package_has_already_accepted")
        );
      }
      if (code == 104) {
        this.$toast.error(
          this.$i18n.t("chat_error_message_package_has_declined")
        );
      }
      if (code == 105) {
        this.$toast.error(
          this.$i18n.t("chat_error_message_not_permisson_for_action")
        );
      }

      if (code == 106) {
        this.$toast.error(
          this.$i18n.t("chat_error_message_payment_not_capture")
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-screen {
  background: #fcfdfe;
  height: calc(100vh - 10.5rem);
  overflow-y: auto;
  padding: 0 20px;
  width: 100%;

  .quick-booking-tag {
    color: white;
    font-weight: 300;
    border: 1px solid white;
    padding: 2px 3px;
    border-radius: 5px;
    font-size: 0.8em;
  }

  .chat-screen__text-message {
    .text-message--me {
      background: #49556a;
      border-radius: 5px;
      display: inline-block;
      padding: 8px 15px 12px 14px;
      max-width: 45%;
      .text-message__content {
        font-family: $font-family;
        font-size: 14px;
        line-height: 124%;
        color: #fcfdfe;
      }
    }

    .text-message--opponent {
      background: #ecf2f7;
      border-radius: 5px;
      display: inline-block;
      padding: 8px 15px 12px 10px;
      max-width: 45%;
      .text-message__content {
        font-family: $font-family;
        font-size: 14px;
        line-height: 124%;
        color: #49556a;
      }
    }
  }

  .chat-screen__structure-message {
    .booking-time {
      padding: 8px 8px 20px;
      background: #edb041;
      padding: 5px 5px;
      box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
      border-radius: 5px;
      &__header {
        background: transparent;
      }
      &__title {
        font-family: $font-family;
        font-size: 18px;
        line-height: 25px;
        text-transform: uppercase;
        color: #fcfdfe;
      }
      &__content {
        .booking-time-date {
          background: #fcfdfe;
          border-radius: 5px;
          border-radius: 5px;
          font-family: $font-family;
          font-size: 14px;
          line-height: 19px;
          color: #15577c;
          display: flex;
          justify-content: center;
        }
        .time-slot-and-booking-info-wrapper {
          margin-top: 5px;
          background: #f7fafc;
          border-radius: 5px;
          padding: 0px 10px 10px 10px;
          .time-slot {
            background: #6f8098;
            border-radius: 0px 0px 5px 5px;
            font-family: $font-family;
            font-size: 11px;
            line-height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fcfdfe;
          }
          .booking-info {
            margin-top: 5px;
            background: #15577c;
            border-radius: 5px;
            &__request-time {
              background: #15577c;
              font-family: $font-family;
              font-size: 11px;
              line-height: 15px;
              display: flex;
              align-items: center;
              text-align: center;
              color: #fcfdfe;
            }
            &__location {
              font-family: $font-family;
              font-size: 11px;
              line-height: 15px;
              display: flex;
              align-items: center;
              opacity: 0.8;
              text-align: center;
              color: #fcfdfe;
            }
          }
        }
      }
    }

    .big-text {
      max-width: 50%;
      font-family: $font-family;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      text-transform: uppercase;
      padding: 10px 10px;
      color: #19708b;
      background: #90daf1;
      box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
      border-radius: 5px;
    }

    .booking-package {
      width: 50%;
      padding: 20px 10px;
      background: #edb041;
      box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
      border-radius: 5px;
      &__title {
        font-family: $font-family;
        font-size: 18px;
        line-height: 25px;
        text-transform: uppercase;
        color: #fcfdfe;
      }
      &__description {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #19708b;
      }
      &__buyer-name {
        max-width: 100%;
        padding: 5px;
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #15577c;
        background: #fcfdfe;
        border-radius: 5px;
      }
      &__buyer-text {
        max-width: 100%;
        margin-top: 5px;
        padding: 5px;
        background: #f7fafc;
        border-radius: 5px;
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #15577c;
      }
    }
  }
}
</style>
