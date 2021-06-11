<template>
  <div>
    <cookie-dialog :open="isOpenCookieDialog"></cookie-dialog>
  </div>
</template>

<script>
import CookieDialog from "@/components/dialogs/CookieDialog";
import { chatApi } from "@/api";

export default {
  components: {
    CookieDialog
  },
  data() {
    return {
      socket: null
    };
  },
  computed: {
    isOpenCookieDialog() {
      if (process.browser) {
        if (localStorage.getItem("cookie:accept") === null) {
          return true;
        } else {
          return false;
        }
      }
    },
    selectedContactUser() {
      return this.$store.getters["chat/selectedContactUser"];
    }
  },
  created() {},
  mounted() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch("chat/getContacts");
      this.$store.dispatch("chat/getMessageCount");
      this.socket = this.$nuxtSocket({ name: "main" });
      this.socket.emit("room", { email: this.$auth.user.email });
      this.socket.on("new_message", data => {
        console.log("<GlobalHeader/>", data);
        this.$store.dispatch("chat/refreshTotalNewMessageCount");
        if (this.selectedContactUser) {
          if (this.selectedContactUser.email == data.email) {
            let message = {
              id: data.message.id ? data.message.id : null,
              me: false,
              type: data.message.type,
              content: data.message.content,
              created_at: new Date()
            };
            this.pushMessage(message);
          } else {
            this.$store.dispatch("chat/incrementContactUserNewMessageCount", {
              email: data.email
            });
          }
        } else {
          this.$store.dispatch("chat/incrementContactUserNewMessageCount", {
            email: data.email
          });
        }
      });
    }
  },
  methods: {
    pushMessage(message) {
      this.$store.dispatch("chat/pushMessage", message);
    }
  }
};
</script>

<style lang="scss" scoped></style>
