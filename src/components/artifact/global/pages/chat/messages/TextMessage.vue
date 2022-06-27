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
            style="word-wrap: break-word;white-space: pre-line;"
            v-html="message.content"
          ></div>
           <!-- v-html="getLink" -->

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
    },
    getLink() {
      return this.setLinks(this.message.content)
    }
  },
  methods: {
    moment,
    setLinks(text) {
      const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(Rexp, "<a class='link-text' style='color:#1890ff!important;text-decoration: underline;' href='$1' target='_blank'>$1</a> ");
    },

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
