export const state = () => ({
  messages: [],
  contacts: [],
  selectedContactUser: null,
  totalNewMessageCount: 0
});

export const getters = {
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
  }
};

export const mutations = {
  SET_TOTAL_NEW_MESSAGE_COUNT(state, totalNewMessageCount) {
    state.totalNewMessageCount = totalNewMessageCount;
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
    const { email } = payload;
    const contactUser = state.contacts.find(c => c.email == email);
    if (contactUser.newMessageCount) {
      contactUser.newMessageCount++;
    } else {
      contactUser.newMessageCount = 1;
    }
  },
  REFRESH_TOTAL_NEW_MESSAGE_COUNT(state) {
    state.totalNewMessageCount = 0;
    state.contacts.forEach(item => {
      if (item.newMessageCount) {
        state.totalNewMessageCount += item.newMessageCount;
      }
    });
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
  incrementContactUserNewMessageCount(context, payload) {
    context.commit("INCREMENT_CONTACT_USER_NEW_MESSAGE_COUNT", payload);
    context.commit("REFRESH_TOTAL_NEW_MESSAGE_COUNT");
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
  }
};
