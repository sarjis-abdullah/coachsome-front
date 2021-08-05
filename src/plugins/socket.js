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
        console.log(userId + " is online");
      });

      socket.on("offline", userId => {
        console.log(userId + " is offline");
      });

      socket.on("private_message_receive", async data => {
        console.log(data);

        await app.store.dispatch("chat/getContacts");
        await app.store.getters["chat/contacts"];
        let selectedUser =  app.store.getters["chat/selectedContactUser"];

        if (selectedUser && selectedUser.id == data.senderUserId) {
          app.store.dispatch("chat/pushMessage", data.message);
        }

        // If the user is not in the chat page
        // Then total message should be incremented
        if (app.router.currentRoute.path != pathData.pages.chat.path) {
          app.store.dispatch("chat/incrementTotalNewMessageCount");
        }
      });
    }
  });
  inject("socket", socket);
};
