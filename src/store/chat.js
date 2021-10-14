import { messageApi, contactApi } from "@/api";

export const state = () => ({
  messages: [],
  contacts: [],
  selectedContactUser: null,
  totalNewMessageCount: 0,
  statusFilter: null,
  search: "",
  loading: false,
});

export const getters = {
  loading(state) {
    return state.loading;
  },
  messages(state) {
    return state.messages;
  },
  contacts(state) {
    return state.contacts;
  },
  selectedContactUser(state) {
    return state.selectedContactUser;
  },
  totalNewMessageCount(state) {
    return state.totalNewMessageCount;
  },
  statusFilter(state) {
    return state.statusFilter;
  }
};

export const mutations = {
  SET_ONLINE_STATUS(state, payload) {
    const { userId, isOnline } = payload;
    const contact = state.contacts.find(item => item.id == userId);
    if (contact) {
      contact.isOnline = isOnline;
    }
  },
  SET_STATUS_FILTER(state, payload) {
    state.statusFilter = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_SEARCH(state, payload) {
    state.search = payload;
  },
  SET_TOTAL_NEW_MESSAGE_COUNT(state, totalNewMessageCount) {
    state.totalNewMessageCount = totalNewMessageCount;
  },
  INCREMENT_TOTAL_NEW_MESSAGE_COUNT(state) {
    state.totalNewMessageCount += 1;
  },
  PUSH_MESSAGE(state, message) {
    state.messages.push(message);
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  PUSH_CONTACT(state, contact) {
    state.contacts.push(contact);
  },
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts;
  },
  SET_SELECTED_CONTACT_USER(state, contact) {
    state.selectedContactUser = contact;
  },
  DESTROY_SELECTED_CONTACT_USER(state) {
    state.selectedContactUser = null;
  },
  DESTROY_MESSAGES(state) {
    state.messages = [];
  },
  INCREMENT_CONTACT_USER_NEW_MESSAGE_COUNT(state, payload) {
    const { id } = payload;
    state.contacts.forEach(item => {
      if (item.id == id) {
        item.newMessageCount += 1;
      }
    });
    console.log("SenderId -> ", id);
    console.log("SelectedId -> ", state.selectedContactUser.id);
  },
  REFRESH_CONTACT_USER_NEW_MESSAGE_COUNT(state, payload) {
    const { id } = payload;
    state.contacts.forEach(item => {
      if (item.id == id) {
        item.newMessageCount = 0;
      }
    });
  },
  REFRESH_TOTAL_NEW_MESSAGE_COUNT(state) {
    state.totalNewMessageCount = 0;
  },
  RESET_CONTACT_USER_NEW_MESSAGE_COUNT(state, payload) {
    const { email } = payload;
    const contactUser = state.contacts.find(c => c.email == email);
    if (contactUser.newMessageCount) {
      contactUser.newMessageCount = 0;
    } else {
      contactUser.newMessageCount = 0;
    }
  }
};

export const actions = {
  setSearch(context, payload) {
    context.commit("SET_SEARCH", payload);
  },
  setSearch(context, payload) {
    context.commit("SET_SEARCH", payload);
  },
  setStatusFilter(context, payload) {
    context.commit("SET_STATUS_FILTER", payload);
  },
  setOnlineStatus(context, payload) {
    context.commit("SET_ONLINE_STATUS", payload);
  },
  pushMessage(context, message) {
    context.commit("PUSH_MESSAGE", message);
  },
  setMessages(context, messages) {
    context.commit("SET_MESSAGES", messages);
  },
  pushContact(context, contact) {
    context.commit("PUSH_CONTACT", contact);
  },
  setContacts(context, contacts) {
    context.commit("SET_CONTACTS", contacts);
  },
  setSelectedContactUser(context, contact) {
    context.commit("SET_SELECTED_CONTACT_USER", contact);
  },
  destroySelectedContactUser(context) {
    context.commit("DESTROY_SELECTED_CONTACT_USER");
  },
  destroyMessages(context) {
    context.commit("DESTROY_MESSAGES");
  },
  incrementTotalNewMessageCount(context) {
    context.commit("INCREMENT_TOTAL_NEW_MESSAGE_COUNT");
  },
  incrementContactUserNewMessageCount(context, payload) {
    context.commit("INCREMENT_CONTACT_USER_NEW_MESSAGE_COUNT", payload);
  },
  refreshContactUserNewMessageCount(context, payload) {
    context.commit("REFRESH_CONTACT_USER_NEW_MESSAGE_COUNT", payload);
  },
  resetContactUserNewMessageCount(context, payload) {
    context.commit("RESET_CONTACT_USER_NEW_MESSAGE_COUNT", payload);
    context.commit("REFRESH_TOTAL_NEW_MESSAGE_COUNT");
  },
  refreshTotalNewMessageCount(context) {
    context.commit("REFRESH_TOTAL_NEW_MESSAGE_COUNT");
  },
  setTotalNewMessageCount(context, totalNewMessageCount) {
    context.commit("SET_TOTAL_NEW_MESSAGE_COUNT", totalNewMessageCount);
  },
  async getMessageCount({ commit }) {
    const { data } = await messageApi(this.$axios).getNewCount();
    const { totalNewMessageCount } = data;
    if (totalNewMessageCount) {
      commit("SET_TOTAL_NEW_MESSAGE_COUNT", totalNewMessageCount);
    }
  },
  async getMessages({ state, commit }) {
    if (state.selectedContactUser) {
      const { data } = await messageApi(this.$axios).get({
        userId: state.selectedContactUser.id
      });
      if (data.messages) {
        let messages = data.messages.map(item => {
          return {
            id: item.id,
            type: item.type,
            me: item.me,
            content: item.content,
            created_at: item.created_at
          };
        });
        commit("SET_MESSAGES", messages);
      }
    }
  },
  async getContacts({ commit, state }) {
    // Reset user reset the last message and message count information
    commit("SET_LOADING", true);
    const { data } = await contactApi(this.$axios).get({
      resetUserId: state.selectedContactUser && state.selectedContactUser.id,
      "filter[status]": state.statusFilter,
      "filter[search]": state.search
    });
    commit("SET_LOADING", false);

    let users = data.users.map(item => {
      return {
        id: item.id,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        fullName: item.fullName,
        title: item.title,
        avatarImage: item.avatarImage,
        avatarName: item.avatarName,
        languages: item.languages,
        aboutText: item.aboutText,
        categories: item.categories,
        tags: item.tags,
        newMessageCount: item.newMessageCount,
        lastMessage: item.lastMessage,
        lastMessageTime: item.lastMessageTime,
        isOnline: item.isOnline,
        status: item.status
      };
    });
    commit("SET_CONTACTS", users);
  }
};
