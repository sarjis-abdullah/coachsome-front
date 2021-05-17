export const state = () => ({
  filterDialog: false
});

export const getters = {
  filterDialog(state) {
    return state.filterDialog;
  }
};

export const mutations = {
  HIDE_FILTER_DIALOG(state) {
    state.filterDialog = false;
  },
  SHOW_FILTER_DIALOG(state) {
    state.filterDialog = true;
  }
};

export const actions = {
  hideFilterDialog(context) {
    context.commit("HIDE_FILTER_DIALOG");
  },
  showFilterDialog(context) {
    context.commit("SHOW_FILTER_DIALOG");
  }
};
