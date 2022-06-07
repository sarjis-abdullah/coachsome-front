<template>
  <div class="text-message">
    <div :class="{ 'd-flex flex-row-reverse': message.me }">
      <div
        :class="{
          'text-message--me': message.me,
          'text-message--opponent': !message.me
        }"
      >
        <span class="text-message-content">
          <div
            class="text-message-title"
            v-if="message.scope == messageData.SCOPE_GROUP"
          >
            <div v-if="message.senderUser.id != $auth.user.id">
              {{ message.senderUser.firstName }}
            </div>
          </div>
          <div
            style="word-break: break-all;white-space: pre-wrap;"
            v-html="message.content"
          ></div>

          <div class="text-message-time" v-if="message.createdAt">
            {{ time }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { messageData } from "@/data";
export default {
  props: ["message"],
  data() {
    return {
      messageData
    };
  },
  computed: {
    time() {
      return this.moment(this.message.createdAt)
        .locale(this.$i18n.locale)
        .format("DD MMM HH:mm");
    }
  },
  methods: {
    moment
  }
};
</script>

<style lang="scss" scoped>
.text-message {
  width: 100%;
  &--me {
    background: #49556a;
    border-radius: 5px;
    display: inline-block;
    padding: 8px 15px 12px 14px;
    max-width: 45%;
    .text-message-content {
      font-family: $font-family;
      font-size: 14px;
      line-height: 124%;
      color: #fcfdfe;
    }
  }
  &--opponent {
    background: #ECF2F7;
    border-radius: 5px;
    display: inline-block;
    padding: 8px 15px 12px 10px;
    max-width: 45%;
    .text-message-content {
      font-family: $font-family;
      font-size: 14px;
      line-height: 124%;
      color: #49556a;
    }
  }
  .text-message-time {
    margin-top: 5px;
    text-align: right;
    color: #999;
    width: 100%;
    font-size: 0.7em;
  }
  .text-message-title {
    margin-top: 5px;
    color: #999;
    width: 100%;
    font-size: 0.7em;
    font-weight:bold;
  }
}
</style>
