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
        <a-drawer
          class="d-none d-sm-flex d-md-none pa-0"
          title="Actions"
          placement="bottom"
          :visible="actionDialog"
          @close="actionDialog = false"
        >
          <div
            :style="{
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center'
            }"
            @click="handleCalenderClick"
          >
            <v-icon
              color="primary-light-1"
              :style="{ marginRight: '5px', padding: 0 }"
              >mdi-calendar-plus</v-icon
            >
            <div class="action-item__title primary-light-1--text">
              {{ $t("chat_title_booing_req") }}
            </div>
          </div>
        </a-drawer>
        <!-- ./Dialog -->

        <!-- left-sidebar -->
        <v-col cols="12" :md="leftSidebarMd" v-if="leftSidebarSection">
          <div class="left-sidebar">
            <div class="left-sidebar__header">
              <div class="left-sidebar-title">
                {{ $t("chat_page_title_message") }}
              </div>
              <div class="left-sidebar-action">
                <v-btn icon color="primary-light-1">
                  <v-icon color="primary-light-1">
                    mdi-plus-circle-outline
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="left-sidebar__body">
              <div class="pl-4 pr-4 pt-5">
                <v-text-field
                  :label="$t('chat_field_label_txt_search')"
                  autocomplete="off"
                  solo
                  dense
                  hide-details
                  :prepend-inner-icon="search"
                  v-model="search"
                  clearable
                  @click="handleClearSearch"
                ></v-text-field>
                <v-select
                  v-model="selectedFilterItem"
                  class="mt-5"
                  :items="filters"
                  item-value="id"
                  item-text="key"
                  dense
                  solo
                  append-icon="expand_more"
                >
                  <template v-slot:selection="{ item }">
                    <div>
                      {{ $t(item.key) }}
                    </div>
                  </template>
                  <template v-slot:item="{ item }">
                    <div>
                      {{ $t(item.key) }}
                    </div>
                  </template>
                </v-select>
              </div>
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
                <div class="no-contact" v-if="!contacts.length">
                  <img
                    class="no-contact__icon"
                    :src="require(`@/assets/images/icons/message-tick.svg`)"
                    alt=""
                  />
                  <div class="no-contact__title">
                    No new messages
                  </div>
                  <div class="no-contact__description">
                    Start your first messages by getting your first customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- content -->
        <slide-x-left-transition>
          <v-col cols="12" :md="contentMd" v-if="contentSection">
            <div class="content">
              <div class="content__header">
                <v-list two-line width="100%" color="transparent">
                  <v-list-item v-if="selectedContactUser">
                    <v-btn
                      icon
                      v-if="$vuetify.breakpoint.smAndDown"
                      @click="handleBackBtnClick"
                    >
                      <v-icon small>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-badge
                      bordered
                      bottom
                      :color="selectedContactUser.isOnline ? 'green' : 'grey'"
                      dot
                      offset-x="10"
                      offset-y="10"
                    >
                      <v-avatar size="40" color="primary-light-1">
                        <v-img
                          v-if="selectedContactUser.avatarImage"
                          :src="selectedContactUser.avatarImage"
                        ></v-img>
                        <div
                          v-else
                          v-html="selectedContactUser.avatarName"
                        ></div>
                      </v-avatar>
                    </v-badge>
                    <v-list-item-content class="pl-1">
                      <v-list-item-title
                        v-text="selectedContactUser.fullName"
                      ></v-list-item-title>

                      <v-list-item-subtitle>
                        {{
                          selectedContactUser.isOnline
                            ? $t("chat_status_active_txt")
                            : $t("chat_status_inactive_txt")
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
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
                          {{
                            actionDialog
                              ? $t("chat_btn_label_hide_actions")
                              : $t("chat_btn_label_show_actions")
                          }}
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
                          {{
                            rightSidebar
                              ? $t("chat_btn_label_hide_actions")
                              : $t("chat_btn_label_show_actions")
                          }}
                        </v-btn>
                      </div>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </div>
              <div class="content__body">
                <div class="message-list">
                  <ChatScreen />
                </div>
                <v-textarea
                  dense
                  rows="1"
                  auto-grow
                  autocomplete="off"
                  solo
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
                      <v-btn icon small>
                        <img
                          :src="require(`@/assets/images/icons/attachment.svg`)"
                          alt="attachment-icon"
                        />
                      </v-btn>
                    </div>
                  </template>
                  <template v-slot:append>
                    <v-menu
                      v-model="settingsMenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" small>
                          <img
                            :src="require(`@/assets/images/icons/settings.svg`)"
                            alt="emoji-icon"
                          />
                        </v-btn>
                      </template>
                      <ChatSetting />
                    </v-menu>
                    <v-menu
                      v-model="emojiMenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" small>
                          <img
                            :src="require(`@/assets/images/icons/emoji.svg`)"
                            alt="emoji-icon"
                          />
                        </v-btn>
                      </template>
                      <v-card>
                        <VEmojiPicker @select="selectEmoji" />
                      </v-card>
                    </v-menu>
                  </template>
                  <template v-slot:append-outer>
                    <div>
                      <v-btn icon @click="handleMessageInput" small>
                        <img
                          :src="require(`@/assets/images/icons/send.svg`)"
                          alt="send-icon"
                        />
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
            v-if="rightSidebar"
            class="pa-0 ma-0  d-none d-sm-none d-md-flex"
          >
            <div class="right-sidebar">
              <div class="right-sidebar__header">
                <div class="right-sidebar-title">
                  {{ $t("chat_title_txt_actions") }}
                </div>
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
                      <div class="action-item__title">
                        {{ $t("chat_title_booing_req") }}
                      </div>
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
import ChatSetting from "@/components/artifact/global/pages/chat/ChatSetting";

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
    ChatScreen,
    ChatSetting
  },
  data: () => ({
    pressingEnter: "send_message",
    settingsMenu: false,
    emojiMenu: false,
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
    selectedFilterItem: 1,
    filters: [
      {
        id: 1,
        key: "chat_filter_item_all_conversation",
        label: "All Conversation"
      },
      {
        id: 2,
        key: "chat_filter_item_all_read",
        label: "Read"
      },
      {
        id: 3,
        key: "chat_filter_item_all_unread",
        label: "Unread"
      },
      {
        id: 4,
        key: "chat_filter_item_all_archived",
        label: "Archived"
      }
    ],
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
      return this.rightSidebar && this.$vuetify.breakpoint.smAndDown;
    },
    contacts() {
      return this.$store.getters["chat/contacts"];
    },
    filteredContactUsers() {
      let items = this.contacts;

      if (this.search) {
        items = items.filter(item => {
          return item.fullName
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }

      if (this.selectedFilterItem != 1) {
        const filterValue = this.filters.find(
          filter => filter.id == this.selectedFilterItem
        );
        items = items.filter(filterItem => {
          return filterItem.status == filterValue.label;
        });
      }
      return items;
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
              isOnline: item.isOnline,
              status: item.status
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
          } else {
            if (this.contacts && this.$vuetify.breakpoint.mdAndUp) {
              let user = this.contacts[0];
              if (user) {
                this.activeChat = user.id;
                this.selectedContactUser = user;
              }
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
    selectEmoji(emoji) {
      this.messageForm.content += emoji.data;
      console.log(emoji);
    },
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
      this.actionDialog = false;
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
$header-height: 50px;
.chat-new-page {
  background: #f7fafc;
  .v-select__selections {
    color: rgba(0, 0, 0, 0.6) !important;
  }

  .ant-drawer-body {
    padding: 0px !important;
  }

  .v-textarea .v-input__control {
    border: 2px solid #15577c !important;
  }

  .chat-settings {
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      color: #000000;
    }
    &__description {
      font-family: $font-family;
      font-weight: normal;
      font-size: 8px;
      line-height: 11px;
      color: #000000;
    }
  }

  .left-sidebar {
    &__header {
      padding-left: 1.2em;
      padding-right: 0.5em;
      border-bottom: 1px solid #e1e8f1;
      height: $header-height;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-sidebar-title {
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

      .no-contact {
        width: 100%;
        text-align: center;
        margin-top: 5px;
        &__title {
          font-family: $font-family;
          font-weight: bold;
          font-size: 18px;
          line-height: 25px;
          text-align: center;
          text-transform: capitalize;
          color: $primary-light-1;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        &__description {
          font-family: $font-family;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          text-transform: capitalize;
          color: $primary-light-1;
        }
      }
    }
  }
  .content {
    height: 100%;
    &__header {
      border-left: 1px solid #e1e8f1;
      border-right: 1px solid #e1e8f1;
      border-bottom: 1px solid #e1e8f1;
      height: $header-height;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__body {
      background: #fcfdfe;
      border-left: 1px solid #e1e8f1;
      border-right: 1px solid #e1e8f1;
      padding-bottom: 15px;
    }
  }
  .right-sidebar {
    width: 100%;
    &__header {
      border-bottom: 1px solid #e1e8f1;
      height: $header-height;
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
      .action-item::hover {
        cursor: pointer;
      }
    }
  }
}
</style>
