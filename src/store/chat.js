import { chatApi } from "@/api";
import { imageService } from "@/services";

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
    if (contactUser && contactUser.newMessageCount) {
      contactUser.newMessageCount++;
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
  },
  async getMessageCount({ commit }) {
    const { data } = await chatApi(this.$axios).getTotalNewMessageCount();
    const { totalNewMessageCount } = data;
    if (totalNewMessageCount) {
      commit("SET_TOTAL_NEW_MESSAGE_COUNT", totalNewMessageCount);
    }
  },
  async getContacts({ state, commit }) {
    if (!state.contacts.length) {
      const { data } = await chatApi(this.$axios).init();
      let users = data.users;
      if (users) {
        let contactUsers = users.map(item => {
          return {
            id: item.id,
            email: item.email,
            firstName: item.firstName,
            lastName: item.lastName,
            fullName: item.fullName,
            title: item.title,
            avatarImage: item.avatarImage
              ? imageService.getImageByName(item.avatarImage)
              : null,
            avatarName: item.avatarName,
            languages: item.languages,
            aboutText: item.aboutText,
            categories: item.categories,
            tags: item.tags,
            newMessageCount: item.newMessageCount,
            lastMessage: item.lastMessage,
            lastMessageTime: item.lastMessageTime
          };
        });
        commit("SET_CONTACTS", contactUsers);
      }
    }
  }
};
