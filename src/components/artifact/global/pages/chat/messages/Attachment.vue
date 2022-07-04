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
            <Media
              v-if="message.content.key == 'video'"
              :kind="'video'"
              :isMuted="false"
              :src="message.content.url"
              :autoplay="false"
              :controls="true"
              :loop="false"
              :ref="'video_player'"
              width="100%"
              @play="showPlayerIcon = false"
              @pause="showPlayerIcon = true"
            >
            </Media>
            
            <img v-else class="attachment-img" height="185" :src="message.content.url" alt="">

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
import Media from "@dongido/vue-viaudio";

export default {
  props: ["message", "key"],
  components: { Media },
  data() {
    return {
      messageData,
      showPlayerIcon: true
    };
  },
  methods: {
    moment,
    handleVideoPlay(){
      this.showPlayerIcon = false;
      this.$refs.video_player.play();
    }
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
      &video{
        width:40%; 
        background: black;
      }
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
