<template>
  <div>
    <cookie-dialog :open="isOpenCookieDialog"></cookie-dialog>
  </div>
</template>

<script>
import CookieDialog from "@/components/dialogs/CookieDialog";

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
  mounted() {
    this.socket = this.$nuxtSocket({ name: "main" });
    if (this.$auth.loggedIn) {
      this.socket.on("connect", () => {
        console.log(this.$auth.user.email + " room is created");
        this.socket.emit("room", { email: this.$auth.user.email });
      });

      this.socket.on("new_message", data => {
        this.$store.dispatch("chat/getContacts");
        this.$store.dispatch("chat/getMessageCount");
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

      this.socket.on("disconnect", () => {
        console.log("<GlobalHeader/> disconnect");
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
