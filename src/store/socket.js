
export const state = () => ({
  io: null
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
