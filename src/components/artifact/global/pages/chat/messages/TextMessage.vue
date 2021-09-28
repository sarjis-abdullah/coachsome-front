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
          <div style="white-space: pre-line" v-html="message.content">
          </div>
          <div class="text-message-time" v-if="message.created_at">
            {{ time }}
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["message"],
  computed: {
    time() {
      return this.moment(this.message.created_at)
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
    background: #ecf2f7;
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
}
</style>
