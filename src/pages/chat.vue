<template>
  <div class="chat-new-page">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Dialog -->
        <v-dialog v-model="bookingDialog.value" max-width="400">
          <RequestBox
            v-bind="bookingDialog.requestBox.props"
            @new-message="handleRequestBoxNewMessage"
            @cancel="handleRequestBoxCancelBtn"
          />
        </v-dialog>
        <v-dialog v-model="packageChoosingDialog.value" max-width="400">
          <PackageChoosing
            v-bind="{
              isOpen: packageChoosingDialog.value,
              ...packageChoosingDialog.props
            }"
            @cancel="handlePackageChoosingCancel"
            @select-package="handleSelectPackage"
          />
        </v-dialog>
        <v-dialog
          v-model="actionDialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card>
            <v-card-title>
              <div class="subtitle-1">Actions</div>
              <v-spacer></v-spacer>
              <v-btn icon @click="actionDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list nav color="transparent" class="pa-0">
                <v-list-item @click="handleCalenderClick" link class="pa-0">
                  <v-icon color="primary-light-1">mdi-calendar-plus</v-icon>
                  <div class="primary-light-1--text ml-5">Booking Request</div>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- ./Dialog -->

        <!-- left-sidebar -->
        <v-col cols="12" :md="leftSidebarMd" v-if="leftSidebarSection">
          <div class="left-sidebar">
            <div class="left-sidebar__header">
              <div class="left-sidebar-title">Messages</div>
              <div class="left-sidebar-action">
                <v-btn icon color="primary-light-1">
                  <v-icon color="primary-light-1">
                    mdi-plus-circle-outline
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="left-sidebar__body">
              <v-text-field
                class="ma-5"
                rounded
                :label="$t('chat_contact_search_input_placeholder')"
                autocomplete="off"
                solo
                dense
                hide-details
                prepend-inner-icon="search"
                v-model="search"
                clearable
                @click="handleClearSearch"
              ></v-text-field>
              <v-select
                class="px-5 mt-5"
                :value="0"
                :items="['All Conversation', 'Unread']"
                dense
                solo
                append-icon="expand_more"
              ></v-select>
              <div class="contact">
                <v-list color="transparent">
                  <v-list-item-group
                    v-model="activeChat"
                    active-class="border"
                    color="primary-light-1"
                  >
                    <template
                      v-for="item in filteredContactUsers"
                      @click.stop="handleSelectedContactUser(item)"
                    >
                      <v-list-item
                        link
                        :key="item.id"
                        :value="item.id"
                        @click.stop="handleSelectedContactUser(item)"
                      >
                        <v-list-item-avatar
                          color="primary-light-1"
                          class="d-flex justify-center"
                        >
                          <v-img
                            v-if="item.avatarImage"
                            :src="item.avatarImage"
                          ></v-img>
                          <div v-else v-html="item.avatarName">
                            {{ item.avatarName }}
                          </div>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-html="item.fullName"
                          ></v-list-item-title>
                          <v-list-item-subtitle>
                            <div v-if="item.lastMessage">
                              <div
                                v-if="
                                  JSON.parse(item.lastMessage).type == 'text'
                                "
                              >
                                {{ JSON.parse(item.lastMessage).text_content }}
                              </div>
                            </div>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>
                            {{ item.lastMessageTime }}
                          </v-list-item-action-text>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </div>
            </div>
          </div>
        </v-col>

        <!-- content -->
        <slide-x-left-transition>
          <v-col cols="12" :md="contentMd" v-if="contentSection">
            <div class="content">
              <div class="content__header">
                <div class="d-flex" v-if="selectedContactUser">
                  <v-btn
                    icon
                    v-if="$vuetify.breakpoint.smAndDown"
                    @click="handleBackBtnClick"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-badge
                    bordered
                    bottom
                    :color="selectedContactUser.isOnline ? 'green' : 'grey'"
                    dot
                    class="ml-5"
                    offset-x="10"
                    offset-y="10"
                  >
                    <v-avatar size="40" color="primary-light-1">
                      <v-img
                        v-if="selectedContactUser.avatarImage"
                        :src="selectedContactUser.avatarImage"
                      ></v-img>
                      <div v-else v-html="selectedContactUser.avatarName"></div>
                    </v-avatar>
                  </v-badge>
                  <div class="ml-3">
                    <div>
                      {{ selectedContactUser.fullName }}
                    </div>
                    <div>
                      {{ selectedContactUser.isOnline ? "Active" : "Inactive" }}
                    </div>
                  </div>
                </div>
                <div v-else></div>
                <div>
                  <v-btn
                    v-if="$vuetify.breakpoint.smAndDown"
                    @click="handleMobileHideActionBtnClick"
                    outlined
                    small
                    rounded
                    color="primary-light-1"
                    class="text-normal"
                  >
                    {{ actionDialog ? "Hide Actions" : "Show Actions" }}
                  </v-btn>
                  <v-btn
                    v-if="!$vuetify.breakpoint.smAndDown"
                    @click="handleDesktopHideActionBtnClick"
                    outlined
                    small
                    rounded
                    color="primary-light-1"
                    class="text-normal"
                  >
                    {{ rightSidebar ? "Hide Actions" : "Show Actions" }}
                  </v-btn>
                </div>
              </div>
              <div class="content__body">
                <div class="message-list">
                  <ChatScreen />

                </div>
                <v-textarea
                  rows="1"
                  row-height="15"
                  auto-grow
                  autocomplete="off"
                  outlined
                  rounded
                  class="mx-3"
                  v-model="messageForm.content"
                  :label="$t('chat_chat_box_input_placeholder')"
                  type="text"
                  hide-details
                  @keyup.enter="messageForm.content + '\n'"
                >
                  <template v-slot:prepend>
                    <div>
                      <v-btn icon>
                        <v-icon>
                          mdi-attachment
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <template v-slot:append>
                    <div>
                      <v-btn icon>
                        <v-icon>
                          emoji_emotions
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <template v-slot:append-outer>
                    <div>
                      <v-btn icon @click="handleMessageInput">
                        <v-icon>
                          mdi-send
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>
                </v-textarea>
              </div>
            </div>
          </v-col>
        </slide-x-left-transition>

        <!-- right-sidebar -->
        <slide-x-left-transition>
          <v-col
            cols="12"
            :md="rightSidebarMd"
            class="pa-0 ma-0"
            v-if="rightSidebar && $vuetify.breakpoint.mdAndUp"
          >
            <div class="right-sidebar">
              <div class="right-sidebar__header">
                <div class="right-sidebar-title">Actions</div>
              </div>
              <div class="right-sidebar__body">
                <v-list nav color="transparent" class="pa-0">
                  <v-list-item @click="handleCalenderClick" link class="pa-0">
                    <div class="action-item">
                      <div class="action-item__icon">
                        <v-icon color="primary-light-1"
                          >mdi-calendar-plus</v-icon
                        >
                      </div>
                      <div class="action-item__title">Booking Request</div>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-col>
        </slide-x-left-transition>
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
    socket: null,
    // column
    leftSidebarMd: 3,
    contentMd: 6,
    rightSidebarMd: 3,
    rightSidebar: true,
    actionDialog: false,
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
    isSelectedContactUserActive() {
      if (this.selectedContactUser) {
        return this.selectedContactUser.isOnline ? true : false;
      } else {
        return false;
      }
    },
    contentSection() {
      let show = true;
      if (!this.selectedContactUser && this.$vuetify.breakpoint.smAndDown) {
        show = false;
      }
      return show;
    },
    leftSidebarSection() {
      let show = true;
      if (this.selectedContactUser && this.$vuetify.breakpoint.smAndDown) {
        show = false;
      }
      return show;
    },
    rightSidebarSection() {
      let show = true;
      if (!this.$vuetify.breakpoint.mdAndUp) {
        show = false;
      }
      return show;
    },
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
              lastMessageTime: item.lastMessageTime,
              isOnline: item.isOnline
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
    handleDesktopHideActionBtnClick() {
      this.rightSidebar = !this.rightSidebar;
      if (this.rightSidebar) {
        this.contentMd = 6;
      } else {
        this.contentMd = 9;
      }
    },
    handleMobileHideActionBtnClick() {
      this.actionDialog = !this.actionDialog;
    },
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
  .left-sidebar {
    &__header {
      border-bottom: 1px solid #e1e8f1;
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-sidebar-title {
        margin-left: 10px;
        font-family: $font-family;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-transform: capitalize;
        color: $primary-light-1;
      }
    }
    &__body {
      .contact {
        height: calc(100vh - 19rem);
        overflow: auto;
      }
      /* width */
      .contact::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      .contact::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      .contact::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: #888;
      }

      /* Handle on hover */
      .contact::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
  .content {
    height: 100%;
    &__header {
      border-left: 1px solid #e1e8f1;
      border-right: 1px solid #e1e8f1;
      border-bottom: 1px solid #e1e8f1;
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
      .right-sidebar-title {
        margin-left: 10px;
        font-family: $font-family;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-transform: capitalize;
        color: $primary-light-1;
      }
    }
    &__body {
      .action-item {
        display: flex;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e1e8f1;
        padding-left: 10px;
        width: 100%;
        &__icon {
          margin-right: 5px;
        }
        &__title {
          margin-left: 5px;
          font-family: $font-family;
          font-weight: 600;
          font-size: 14px;
          line-height: 124%;
          color: $primary-light-1;
        }
      }
    }
  }
}
</style>
