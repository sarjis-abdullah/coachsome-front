import { messageApi, contactApi, endpoint } from "@/api";
import { contactData, pathData } from "@/data";

export const state = () => ({
  messages: [],
  contacts: [],
  selectedContact: null,
  totalNewMessageCount: 0,
  statusFilter: null,
  search: "",
  loading: false,
  hideNavOnChat: false,
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
  selectedContact(state) {
    return state.selectedContact;
  },
  totalNewMessageCount(state) {
    return state.totalNewMessageCount;
  },
  statusFilter(state) {
    return state.statusFilter;
  },
  getNavOnChatStatus(state){
    return state.hideNavOnChat;
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
  SET_SELECTED_CONTACT(state, contact) {
    state.selectedContact = contact;
  },
  DESTROY_SELECTED_CONTACT_USER(state) {
    state.selectedContact = null;
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
    // console.log("SenderId -> ", id);
    // console.log("SelectedId -> ", state.selectedContact.id);
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
  },
  UPDATE_SELECTED_CONTACT(state, payload) {
    state.selectedContact = { ...state.selectedContact, ...payload };
  },
  HIDE_NAV_ON_CHAT(state, flag){
    state.hideNavOnChat = flag;
  }
};

export const actions = {
  updateSelectedContact(context, payload) {
    context.commit("UPDATE_SELECTED_CONTACT", payload);
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
  setSelectedContact(context, contact) {
    if( window.$nuxt.$root.$route.fullPath != pathData.pages.chatScreen && window.$nuxt.$root.$vuetify.breakpoint.smAndDown){
      this.$router.push(this.localePath(pathData.pages.chatScreen));
    }
    context.commit("SET_SELECTED_CONTACT", contact);
  },
  destroySelectedContactUser(context) {
    context.commit("DESTROY_SELECTED_CONTACT_USER");
  },
  destroyMessages(context) {
    if(window.$nuxt.$root.$route.fullPath != pathData.pages.chat.path &&  window.$nuxt.$root.$vuetify.breakpoint.smAndDown){
      this.$router.push(this.localePath(pathData.pages.chat.path));
    }
    context.commit("DESTROY_SELECTED_CONTACT_USER");
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
  async getContacts({ commit, state }) {
    commit("SET_LOADING", true);
    let params = {
      selectedContactId: state.selectedContact && state.selectedContact.id,
      statusFilter: state.statusFilter,
      searchFilter: state.search
    };
    const { data } = await contactApi(this.$axios).get(params);
    commit("SET_LOADING", false);

    let contacts = data && data.data && data.data.length ? data.data.map(item => {
      let contact = {
        id: item.id,
        title: "",
        avatarImage: null,
        avatarName: "",
        categoryId: item.categoryId,
        groupId: null,
        lastMessage: item.lastMessage,
        lastMessageTime: item.lastMessageTime,
        newMessageCount: item.newMessageCount,
        connectionUserId: item.connectionUserId,
        isOnline: false
      };

      // Private Contact
      if (item.categoryId == contactData.CATEGORY_ID_PRIVATE) {
        let user = item.users.length ? item.users[0] : null;
        if (user) {
          contact.title = item.contactName;
          contact.avatarImage = user.profile.image;
          contact.avatarName = user.firstName && user.lastName ?  
            user.firstName.charAt(0).toUpperCase() +
            user.lastName.charAt(0).toUpperCase() : "";
          contact.isOnline = user.isOnline;
        }
      }

      // Group Contact
      if (item.categoryId == contactData.CATEGORY_ID_GROUP) {
        let group = item.group ? item.group : null;
        if (group) {
          contact.groupId = group.id;
          contact.isAdmin = group.isAdmin;
          contact.title = group.name;
          contact.description = group.description;
          contact.avatarImage = group.image;
          contact.avatarName = group.name ? group.name.charAt(0).toUpperCase() : "";
        }
      }
      return contact;
    }) : []
    commit("SET_CONTACTS", contacts);
  },
  setNavOnChat(context,flag){
    context.commit("HIDE_NAV_ON_CHAT", flag);
  }
};
