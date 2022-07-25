import { io } from "socket.io-client";
import { pathData } from "@/data";

export default ({ app }, inject) => {
  const socket = io(process.env.CHAT_SERVER_URL, {
    transports: ["polling"]
  });

  socket.on("connect", () => {
    if (app.$auth.loggedIn) {
      socket.emit("connected", app.$auth.user.id);
      socket.on("online", userId => {
        app.store.dispatch("chat/setOnlineStatus", {
          userId: userId,
          isOnline: true
        });
      });
      socket.on("offline", userId => {
        app.store.dispatch("chat/setOnlineStatus", {
          userId: userId,
          isOnline: false
        });
      });
      socket.on("private_message_receive", async data => {
        await app.store.dispatch("chat/getContacts");
        await app.store.getters["chat/contacts"];
        let selectedContact = app.store.getters["chat/selectedContact"];
        if (
          selectedContact &&
          selectedContact.connectionUserId == data.senderUserId
        ) {
          app.store.dispatch("chat/pushMessage", data.message);
        }
        // If the user is not in the chat page
        // Then total message should be incremented
        if (app.router.currentRoute.path != pathData.pages.chat.path) {
          app.store.dispatch("chat/incrementTotalNewMessageCount");
        }
      });
      socket.on("group_message_receive", async payload => {
        await app.store.dispatch("chat/getContacts");
        await app.store.getters["chat/contacts"];
        let selectedContact = app.store.getters["chat/selectedContact"];
        if (
          selectedContact &&
          selectedContact.groupId == payload.groupId &&
          app.$auth.user.id != payload.senderUser.id
        ) {
          app.store.dispatch("chat/pushMessage", { ...payload, me: false });
        }
      });
    }
  });
  inject("socket", socket);
};
