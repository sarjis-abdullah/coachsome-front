<template>
  <div class="chat-new-page">
    <v-container fluid class="pt-0">
      <v-row no-gutters>
        <!-- left-sidebar -->
        <v-col cols="12" md="3">
          <div class="left-sidebar">
            <div class="left-sidebar__header">
              <div class="page-title primary--text">Messages</div>
              <div class="page-action">
                <v-btn icon color="primary">
                  <v-icon color="primary">
                    mdi-plus-circle-outline
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="left-sidebar__body">
              <v-text-field
                class="mt-5"
                rounded
                dense
                solo
                label="Search in chat history"
                prepend-inner-icon="mdi-magnify"
              >
              </v-text-field>
              <v-select
                :value="0"
                :items="['All Conversation', 'Unread']"
                dense
                solo
                append-icon="expand_more"
              ></v-select>
              <div class="caontact">
                <div class="contact-item">
                  <v-list color="transparent" nav>
                    <template v-for="(item, index) in items">
                      <v-list-item :key="index" link>
                        <v-list-item-avatar>
                          <v-img :src="item.avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-html="item.title"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="item.subtitle"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>
                            13.5.2021
                          </v-list-item-action-text>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- content -->
        <v-col cols="12" md="6">
          <div class="content">
            <div class="content__header">
              <div class="d-flex">
                <v-badge
                  bordered
                  bottom
                  color="green"
                  dot
                  class="ml-5"
                  offset-x="10"
                  offset-y="10"
                >
                  <v-avatar size="40">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                    ></v-img>
                  </v-avatar>
                </v-badge>
                <div class="ml-3">
                  <div>Kennth Dreyer</div>
                  <div>Active</div>
                </div>
              </div>
              <div>
                <v-btn outlined small rounded>
                  Hide Actions
                </v-btn>
              </div>
            </div>
            <div class="content__body"></div>
          </div>
        </v-col>

        <!-- right-sidebar -->
        <v-col cols="12" md="3">
          <div class="right-sidebar">
            <div class="right-sidebar__header">
              <div class="ml-5">Actions</div>
            </div>
            <div class="right-sidebar__body"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RequestBox from "@/components/artifact/global/pages/chat/RequestBox";
import PackageChoosing from "@/components/artifact/global/pages/chat/PackageChoosing";
import ChatScreen from "@/components/artifact/global/pages/chat/ChatScreen";

import { contactApi, messageApi } from "@/api";
import { pathData } from "@/data";

export default {
  layout: "chat",
  head() {
    return {
      title: "Chat"
    };
  },
  components: {
    RequestBox,
    PackageChoosing,
    ChatScreen
  },
  data: () => ({
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Kenneth Dreyer",
        subtitle: `Super - I’ll see you there`
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      }
    ],
    socket: null,
    bookingDialog: {
      value: false,
      requestBox: {
        props: {
          userId: null,
          bookingId: null,
          packageSession: null,
          packageOwnerUserId: null,
          packageBuyerUserId: null,
          date: new Date().toISOString().substr(0, 10)
        }
      }
    },
    packageChoosingDialog: {
      props: {
        userId: null
      },
      value: false
    },
    search: "",
    profileCard: {
      name: "",
      aboutText: "",
      avatarImage: null,
      avatarName: "",
      languages: [],
      tags: []
    },
    selectedContactUser: null,
    users: [],
    activeChat: null,
    messages: [],
    duration: {
      created_at: ""
    },
    messageForm: {
      me: true,
      type: "text",
      content: "",
      created_at: new Date()
    },
    dayBox: []
  }),
  computed: {
    contacts() {
      return this.$store.getters["chat/contacts"];
    },
    filteredContactUsers() {
      if (!this.search) {
        return this.contacts;
      } else {
        return this.contacts.filter(item => {
          return item.fullName
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
    },
    hasNetwork() {
      return true;
    },
    isShowingContactPanel() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.selectedContactUser == null;
      } else {
        return true;
      }
    },
    isShowingProfilePanel() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return false;
      } else {
        return this.selectedContactUser != null;
      }
    }
  },
  watch: {
    "bookingDialog.value": function(val) {
      console.log(val);
    },
    selectedContactUser(val, preVal) {
      if (this.selectedContactUser) {
        this.$store.dispatch("chat/destroyMessages");
        this.$store.dispatch(
          "chat/setSelectedContactUser",
          this.selectedContactUser
        );
        this.$store.dispatch("chat/refreshContactUserNewMessageCount", {
          id: this.selectedContactUser.id
        });
        this.packageChoosingDialog.props.userId = this.selectedContactUser.id;
        this.bookingDialog.requestBox.props.userId = this.selectedContactUser.id;
        this.profileCard.name = this.selectedContactUser.fullName;
        this.profileCard.aboutText = this.selectedContactUser.aboutText;
        this.profileCard.avatarImage = this.selectedContactUser.avatarImage;
        this.profileCard.avatarName = this.selectedContactUser.avatarName;
        this.profileCard.languages = this.selectedContactUser.languages;
        this.profileCard.tags = this.selectedContactUser.tags;

        messageApi(this.$axios)
          .get({ userId: this.selectedContactUser.id })
          .then(({ data }) => {
            // Old messages
            if (data.messages) {
              data.messages.forEach(item => {
                let newMessage = {
                  id: item.id,
                  type: item.type,
                  me: item.me,
                  content: item.content,
                  created_at: item.created_at
                };
                this.pushMessage(newMessage);
              });
            }

            // New messages
            if (data.newMessages) {
              data.newMessages.forEach(item => {
                let messageItem = {
                  type: item.type,
                  content: item.content
                };
                this.pushMessage(messageItem);
                this.sendMessageToChatServer({
                  senderUserId: this.$auth.user.id,
                  receiverUserId: this.selectedContactUser.id,
                  message: messageItem
                });
              });
            }
          });
      }
    }
  },
  mounted() {
    // This is very sensitive.
    // Since the date is not updated without refresh, we should manually refresh it
    // Now this created_at is updated after 1 second
    // ISO string is needed for standard time showing in different timezone
    setInterval(() => {
      this.duration.created_at = new Date().toISOString();
    }, 1000);

    contactApi(this.$axios)
      .get()
      .then(({ data }) => {
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
              avatarImage: item.avatarImage,
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

          this.$store.dispatch("chat/setContacts", contactUsers);

          // If it has any userId form the url
          if (this.$route.query.userId) {
            let user = this.contacts.find(
              item => item.id == this.$route.query.userId
            );
            if (user) {
              this.activeChat = user.id;
              this.selectedContactUser = user;
              this.$router.replace(this.localePath(pathData.pages.chat));
            }
          }
        }
      })
      .catch(() => {});
  },
  beforeDestroy() {
    this.$store.dispatch("chat/destroySelectedContactUser");
  },
  methods: {
    handleBackBtnClick() {
      this.selectedContactUser = null;
    },
    handleRequestBoxCancelBtn() {
      this.bookingDialog.value = false;
    },
    pushMessage(message) {
      this.$store.dispatch("chat/pushMessage", message);
    },
    sendMessageToChatServer(payload) {
      this.$socket.emit("private_message_send", {
        senderUserId: payload.senderUserId,
        receiverUserId: payload.receiverUserId,
        message: payload.message
      });
    },
    handleRequestBoxNewMessage(message) {
      this.pushMessage(message);
      this.sendMessageToChatServer({
        senderUserId: this.$auth.user.id,
        receiverUserId: this.selectedContactUser.id,
        message: message
      });
      this.bookingDialog.value = false;
    },
    handleSelectPackage(item) {
      if (item) {
        this.packageChoosingDialog.value = false;
        this.bookingDialog.requestBox.props.userId = this.selectedContactUser.id;
        this.bookingDialog.requestBox.props.bookingId = item.bookingId;
        this.bookingDialog.requestBox.props.packageSession = item.session;
        this.bookingDialog.requestBox.props.isSold = item.isSold;
        this.bookingDialog.requestBox.props.packageOwnerUserId =
          item.packageOwnerUserId;
        this.bookingDialog.requestBox.props.packageBuyerUserId =
          item.packageBuyerUserId;
        this.bookingDialog.value = true;
      }
    },
    handlePackageChoosingCancel() {
      this.packageChoosingDialog.value = false;
    },
    handleCalenderClick() {
      this.packageChoosingDialog.value = true;
    },
    handleSelectedContactUser(user) {
      this.selectedContactUser = user;
    },
    handleMessageInput() {
      if (!/^ *$/.test(this.messageForm.content) && this.hasNetwork) {
        // Modify the content
        this.messageForm.content = this.messageForm.content.trim();

        // It has to confirm that the updated date is not changed or mixed every where
        let newMessage = Object.assign(
          { ...this.messageForm },
          { ...this.duration }
        );
        this.pushMessage(newMessage);

        this.sendMessageToChatServer({
          senderUserId: this.$auth.user.id,
          receiverUserId: this.selectedContactUser.id,
          message: newMessage
        });

        messageApi(this.$axios)
          .store({
            ...newMessage,
            receiverUserId: this.selectedContactUser
              ? this.selectedContactUser.id
              : null
          })
          .then(() => {})
          .catch(() => {});
        this.messageForm.content = "";
      }
    },
    handleClearSearch() {
      this.search = "";
    }
  }
};
</script>

<style lang="scss">
.chat-new-page {
  background: #f7fafc;
  height: 100%;
  .left-sidebar {
    &__header {
      border-bottom: 1px solid #e1e8f1;
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__body {
      padding: 8px;
      border-right: 1px solid #e1e8f1;
      height: 90vh;
      overflow-y: hidden;
    }
  }
  .content {
    height: 100%;
    &__header {
      border-left: 1px solid #e1e8f1;
      border-right: 1px solid #e1e8f1;
      border-bottom: 1px solid #e1e8f1;
      height: 83px;
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
    }
    &__body {
      border-left: 1px solid #e1e8f1;
      border-right: 1px solid #e1e8f1;
    }
  }
  .right-sidebar {
    &__header {
      border-bottom: 1px solid #e1e8f1;
      height: 83px;
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__body {
    }
  }
}
</style>
