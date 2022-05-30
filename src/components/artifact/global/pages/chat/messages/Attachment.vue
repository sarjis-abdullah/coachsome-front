<template>
  <div class="attachment-message">
    <div :class="{ 'd-flex flex-row-reverse': message.me }">
      <div
        :class="{
          'attachment-message--me': message.me,
          'attachment-message--opponent': !message.me
        }"
      >
        <span class="attachment-message-content">
          <div
            class="attachment-message-title"
            v-if="message.scope == messageData.SCOPE_GROUP"
          >
            <div v-if="message.senderUser.id != $auth.user.id">
              {{ message.senderUser.firstName }}
            </div>
          </div>
           <img class="attachment-img" height="185" :src="message.content.url" alt="">

          <div class="attachment-message-time" v-if="message.createdAt">
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
.attachment-message {
  width: 100%;
  &--me {
    background: #49556a;
    border-radius: 5px;
    display: inline-block;
    padding: 8px 15px 12px 14px;
    max-width: 75%;
    .attachment-message-content {
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
    max-width: 75%;
    .attachment-message-content {
      font-family: $font-family;
      font-size: 14px;
      line-height: 124%;
      color: #49556a;
    }
  }
  .attachment-img{
    width: 100%!important;
  }
  .attachment-message-time {
    margin-top: 5px;
    text-align: right;
    color: #999;
    width: 100%;
    font-size: 0.7em;
  }
  .attachment-message-title {
    margin-top: 5px;
    color: #999;
    width: 100%;
    font-size: 0.7em;
    font-weight:bold;
  }
}
</style>
