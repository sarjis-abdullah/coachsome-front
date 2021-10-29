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
        <v-dialog v-model="createGroupDialog.value" max-width="600">
          <CreateGroupForm @close="createGroupDialog.value = false" />
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
                <v-btn
                  icon
                  color="primary-light-1"
                  @click="handleGroupBtnClick"
                >
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
                  solo
                  dense
                  hide-details
                  prepend-inner-icon="search"
                  v-model="search"
                  :loading="loading"
                  clearable
                  @input="handleSearch"
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
                  @change="handleFilterChange"
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
                <ContactList
                  :avatar-size="avatarSize"
                  @selected="onHandleContactItemSeleted"
                />
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
                  <template v-if="selectedContact">
                    <v-list-item
                      v-if="
                        selectedContact.categoryId ==
                          contactData.CATEGORY_ID_PRIVATE
                      "
                    >
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
                        :color="selectedContact.isOnline ? 'green' : 'grey'"
                        dot
                        offset-x="10"
                        offset-y="10"
                      >
                        <v-avatar :size="avatarSize" color="primary-light-1">
                          <v-img
                            v-if="selectedContact.avatarImage"
                            :src="selectedContact.avatarImage"
                          ></v-img>
                          <div v-else v-html="selectedContact.avatarName"></div>
                        </v-avatar>
                      </v-badge>
                      <v-list-item-content class="pl-1">
                        <v-list-item-title
                          v-text="selectedContact.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle>
                          {{
                            selectedContact.isOnline
                              ? $t("chat_status_active_txt")
                              : $t("chat_status_inactive_txt")
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <div class="d-flex align-center">
                          <div>
                            <v-menu
                              v-if="!isArchiveFilter"
                              offset-y
                              min-width="200"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="primary-light-1"
                                  icon
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                              </template>
                              <v-list dense>
                                <v-list-item link @click="handleUnreadBtnClick">
                                  <v-list-item-avatar>
                                    <v-icon color="primary-light-1"
                                      >mdi-check</v-icon
                                    >
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title
                                      class="primary-light-1--text"
                                      >Mark as unread</v-list-item-title
                                    >
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                  link
                                  @click="handleArchiveBtnClick"
                                >
                                  <v-list-item-avatar>
                                    <v-icon color="primary-light-1"
                                      >mdi-archive</v-icon
                                    >
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title
                                      class="primary-light-1--text"
                                      >Archive Chat</v-list-item-title
                                    >
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                            <v-tooltip v-else top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="handleUnarchiveBtnClick"
                                >
                                  <v-icon color="primary-light-1" small>
                                    mdi-archive
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Unarchive</span>
                            </v-tooltip>
                          </div>
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
                    <v-list-item
                      v-if="
                        selectedContact.categoryId ==
                          contactData.CATEGORY_ID_GROUP
                      "
                    >
                      <v-btn
                        icon
                        v-if="$vuetify.breakpoint.smAndDown"
                        @click="handleBackBtnClick"
                      >
                        <v-icon small>mdi-arrow-left</v-icon>
                      </v-btn>
                      <v-avatar :size="avatarSize" color="primary-light-1">
                        <img
                          :style="{ width: '20px' }"
                          :src="
                            selectedContact.avatarImage ||
                              require(`@/assets/images/icons/group.svg`)
                          "
                        />
                      </v-avatar>
                      <v-list-item-content class="pl-1">
                        <v-list-item-title
                          v-text="selectedContact.title"
                        ></v-list-item-title>
                        <v-list-item-subtitle> </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
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
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-list>
              </div>
              <div class="content__body">
                <div class="message-list">
                  <ChatScreen />
                </div>
                <v-textarea
                  dense
                  :rows="1"
                  auto-grow
                  autocomplete="off"
                  solo
                  rounded
                  class="mx-3"
                  v-model="messageForm.content"
                  :label="$t('chat_chat_box_input_placeholder')"
                  type="text"
                  hide-details
                  @keyup.enter="handleEnterPress"
                >
                  <template v-slot:prepend>
                    <div>
                      <v-btn icon>
                        <img
                          :src="require(`@/assets/images/icons/attachment.svg`)"
                          alt="attachment-icon"
                        />
                      </v-btn>
                    </div>
                  </template>
                  <template v-slot:append>
                    <v-menu
                      v-if="$vuetify.breakpoint.mdAndUp"
                      v-model="settingsMenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          x-small
                          class="mr-3"
                        >
                          <img
                            class="mt-1"
                            :src="require(`@/assets/images/icons/settings.svg`)"
                            alt="setting-icon"
                          />
                        </v-btn>
                      </template>
                      <ChatSetting
                        :enter-press="chatSetting.enterPress"
                        @update="handleUpdatedChatSetting"
                      />
                    </v-menu>
                    <v-menu
                      v-model="emojiMenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" x-small>
                          <img
                            class="mt-1"
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
import CreateGroupForm from "@/components/artifact/global/pages/chat/CreateGroupForm";
import ContactList from "@/components/artifact/global/pages/chat/ContactList";

import { endpoint } from "../api";
import { pathData, contactData } from "@/data";

export default {
  layout: "chat",
  head() {
    return {
      title: "Chat"
    };
  },
  components: {
    CreateGroupForm,
    RequestBox,
    PackageChoosing,
    ChatScreen,
    ChatSetting,
    ContactList
  },
  data: () => ({
    contactData,
    avatarSize: 40,
    chatSetting: {
      enterPress: "send_message"
    },
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
    createGroupDialog: {
      value: false
    },
    search: "",
    selectedContact: null,
    messages: [],
    duration: {
      createdAt: ""
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
      createdAt: new Date()
    }
  }),
  computed: {
    isArchiveFilter() {
      return this.selectedFilterItem == 4;
    },
    loading() {
      return this.$store.getters["chat/loading"];
    },
    isSelectedContactUserActive() {
      if (this.selectedContact) {
        return this.selectedContact.isOnline ? true : false;
      } else {
        return false;
      }
    },
    contentSection() {
      let show = true;
      if (!this.selectedContact && this.$vuetify.breakpoint.smAndDown) {
        show = false;
      }
      return show;
    },
    leftSidebarSection() {
      let show = true;
      if (this.selectedContact && this.$vuetify.breakpoint.smAndDown) {
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
    hasNetwork() {
      return true;
    }
  },
  watch: {
    selectedContact(contact) {
      if (contact) {
        this.$store.dispatch("chat/destroyMessages");
        this.$store.dispatch("chat/setSelectedContact", contact);

        // Fetch private message
        if (contact.categoryId == contactData.CATEGORY_ID_PRIVATE) {
          const params = { contactId: contact.id };
          this.$axios
            .get(endpoint.MESSAGES_GET, { params })
            .then(({ data }) => {
              // Old messages
              if (data.messages) {
                data.messages.forEach(item => {
                  let newMessage = {
                    id: item.id,
                    type: item.type,
                    me: item.me,
                    content: item.content,
                    createdAt: item.createdAt
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
                  this.sendPrivateMessageToChatServer({
                    senderUserId: this.$auth.user.id,
                    receiverUserId: contact.id,
                    message: messageItem
                  });
                });
              }
            });
        }

        // Fetch group message
        if (contact.categoryId == contactData.CATEGORY_ID_GROUP) {
          const params = {
            groupId: contact.groupId
          };
          this.$axios
            .get(endpoint.GROUP_MESSAGES_GET, { params })
            .then(({ data }) => {
              data.data.forEach(item => {
                let newMessage = {
                  id: item.id,
                  type: item.type,
                  me: item.me,
                  content: item.content,
                  createdAt: item.createdAt
                };
                this.pushMessage(newMessage);
              });
            });
        }
      }
    }
  },
  async mounted() {
    // This is very sensitive.
    // Since the date is not updated without refresh, we should manually refresh it
    // Now this createdAt is updated after 1 second
    // ISO string is needed for standard time showing in different timezone
    setInterval(() => {
      this.duration.createdAt = new Date().toISOString();
    }, 1000);

    // Fetch setting
    this.$axios.get(endpoint.CHAT_SETTINGS_GET).then(({ data }) => {
      if (data.data) {
        this.chatSetting.enterPress = data.data.enterPress;
      }
    });

    await this.$store.dispatch("chat/getContacts");

    // Set contact
    if (this.$route.query.userId) {
      let contact = this.contacts.find(
        item => item.connectionUserId == this.$route.query.userId
      );
      if (contact) {
        this.selectedContact = contact;
        this.$router.replace(this.localePath(pathData.pages.chat));
      }
    } else {
      // If there has no selected contact
      if (this.contacts && this.$vuetify.breakpoint.mdAndUp) {
        let contact = this.contacts[0];
        if (contact) {
          this.selectedContact = contact;
        }
      }
    }
  },
  methods: {
    onHandleContactItemSeleted(item) {
      this.selectedContact = item;
    },
    getSelectedContact() {
      return this.$store.getters["chat/selectedContact"];
    },
    setSelectedContact(payload) {
      this.$store.dispatch("chat/setSelectedContact", payload);
    },
    getContacts() {
      return this.$store.dispatch("chat/getContacts");
    },
    setMessages(payload) {
      this.$store.dispatch("chat/setMessages", payload);
    },
    pushMessage(message) {
      this.$store.dispatch("chat/pushMessage", message);
    },
    handleGroupBtnClick() {
      this.createGroupDialog.value = true;
    },
    handleUnarchiveBtnClick() {
      if (this.selectedContact) {
        this.$axios
          .post(endpoint.CONTACTS_UNARCHIVE_POST, {
            userId: this.selectedContact.id
          })
          .then(() => {
            this.selectedContact = null;
            this.$store.dispatch("chat/getContacts");
            this.$store.dispatch("chat/setMessages", []);
          });
      }
    },
    async handleSearch() {
      await this.$store.dispatch("chat/setSearch", this.search);
      this.getContacts();
    },
    async handleFilterChange(val) {
      let selected = this.filters.find(item => item.id == val);
      if (selected) {
        await this.$store.dispatch("chat/setStatusFilter", selected.label);
        this.getContacts();
      }
      this.selectedContact = null;
    },
    async handleArchiveBtnClick() {
      let contact = this.selectedContact;
      if (contact) {
        await this.$axios.post(endpoint.CONTACTS_ARCHIVE_POST, {
          contactId: contact.id
        });
        this.getContacts();
        this.selectedContact = null;
        this.setMessages([]);
      }
    },
    async handleUnreadBtnClick() {
      let contact = this.selectedContact;
      if (contact) {
        await this.$axios.post(endpoint.CONTACTS_UNREAD_POST, {
          contactId: contact.id
        });
        this.getContacts();
        this.setMessages([]);
      }
    },
    async handleUpdatedChatSetting(val) {
      try {
        const { data } = await this.$axios.post(
          endpoint.CHAT_SETTINGS_ENTER_PRESS_POST,
          {
            value: val
          }
        );

        if (data.data) {
          this.chatSetting.enterPress = data.data.enterPress;
        }
        this.$toast.success("Successfully updated");
      } catch (error) {
        console.error(error);
      }
    },
    selectEmoji(emoji) {
      this.messageForm.content += emoji.data;
    },
    handleBackBtnClick() {
      this.selectedContact = null;
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
      this.selectedContact = null;
    },
    handleRequestBoxCancelBtn() {
      this.bookingDialog.value = false;
    },

    sendPrivateMessageToChatServer(payload) {
      this.$socket.emit("private_message_send", {
        senderUserId: payload.senderUserId,
        receiverUserId: payload.receiverUserId,
        message: payload.message
      });
    },
    sendGroupMessageToChatServer(payload) {
      this.$socket.emit("group_message_send", {
        senderUserId: payload.senderUserId,
        groupId: payload.groupId,
        message: payload.message
      });
    },
    handleRequestBoxNewMessage(message) {
      let contact = this.selectedContact;
      if (contact) {
        this.pushMessage(message);
        this.sendPrivateMessageToChatServer({
          senderUserId: this.$auth.user.id,
          receiverUserId: contact.connectionUserId,
          message: message
        });
        this.bookingDialog.value = false;
      }
    },
    handleSelectPackage(item) {
      if (item) {
        let contact = this.selectedContact;
        this.packageChoosingDialog.value = false;
        this.bookingDialog.requestBox.props.userId = contact
          ? contact.connectionUserId
          : null;
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
    handleEnterPress(e) {
      if (this.chatSetting.enterPress == "line_break") {
        this.messageForm.content + "\n";
      } else {
        if (!e.shiftKey) {
          this.handleMessageInput();
        }
      }
    },
    handleShiftEnterPress() {
      this.messageForm.content += "\n";
    },
    handleMessageInput() {
      if (
        this.selectedContact &&
        !/^ *$/.test(this.messageForm.content) &&
        this.hasNetwork
      ) {
        // Modify the content
        this.messageForm.content = this.messageForm.content.trim();

        // It has to confirm that the updated date is not changed or mixed every where
        let newMessage = Object.assign(
          { ...this.messageForm },
          { ...this.duration }
        );
        this.pushMessage(newMessage);

        if (
          this.selectedContact.categoryId == contactData.CATEGORY_ID_PRIVATE
        ) {
          this.sendPrivateMessageToChatServer({
            senderUserId: this.$auth.user.id,
            receiverUserId: this.selectedContact.connectionUserId,
            message: newMessage
          });

          this.$axios
            .post(endpoint.MESSAGES_POST, {
              ...newMessage,
              receiverUserId: this.selectedContact.connectionUserId
            })
            .then(() => {})
            .catch(() => {});
          this.messageForm.content = "";
        } else {
          console.log(this.selectedContact.groupId);
          const payload = {
            type: "text",
            content: this.messageForm.content,
            groupId: this.selectedContact.groupId
          };
          this.sendGroupMessageToChatServer({
            senderUserId: this.$auth.user.id,
            groupId: this.selectedContact.groupId,
            message: newMessage
          });
          this.$axios
            .post(endpoint.GROUP_MESSAGES_POST, payload)
            .then(({ data }) => {
              console.log(data.data);
            })
            .catch(err => {
              if (err.response.data.error) {
                this.$toast.error(err.response.data.error.message);
              }
            });
        }
      }
    },
    handleClearSearch() {
      this.search = "";
    }
  }
};
</script>

<style lang="scss">
$header-height: 60px;
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
        overflow: auto;
        height: 100%;
        height: calc(100vh - 16rem);
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
