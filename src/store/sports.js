export const state = () => ({
  sports: []
});

export const getters = {
  all: state => {
    return state.sports;
  }
};

export const mutations = {
  SET_SPORTS(state, sports) {
    state.sports = sports;
  }
};

export const actions = {
  async loadAll({ commit }) {
    let {data} = await this.$axios.get("/sportCategories");
    commit("SET_SPORTS", data.sportCategories)
  }
};

