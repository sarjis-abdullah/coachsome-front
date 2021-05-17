import io from "socket.io-client";

export const state = () => ({
  io: process.client ? io(process.env.CHAT_SERVER_URL) : null
});

export const getters = {
  io(state) {
    return state.io;
  }
};

export const mutations = {};

export const actions = {
  joinAuthUserToRoom({ state }) {
    let user = this.$auth.user;
    if (state.io && user) {
      state.io.emit("room", { email: user.email });
    }
  }
};
