<template>
  <div class="chat-page">
    <v-container fluid fill-height class="pa-0">
      <!-- Chat page -->
      <v-row no-gutters>
        <v-col cols="12">
          <div class="chat-page-wrapper">
            <div class="chat-box">
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
              <!-- ./Dialog -->

              <v-row no-gutters>
                <!-- LEFT SIDE -->
                <v-col cols="12" md="4">
                  <div v-if="isShowingContactPanel" class="chat-box__left">
                    <div
                      class="chat-sidebar"
                      :style="{
                        height: 'calc(100vh - 10rem)',
                        overflowY: 'scroll'
                      }"
                    >
                      <v-row no-gutters justify="end">
                        <v-col v-if="isShowingProfilePanel" cols="10">
                          <div class="profile">
                            <div class="profile__header d-flex align-center">
                              <div>
                                <v-avatar
                                  v-if="profileCard.avatarImage"
                                  size="48"
                                  class="my-0 py-0"
                                >
                                  <v-img :src="profileCard.avatarImage"></v-img>
                                </v-avatar>
                                <v-avatar
                                  v-if="!profileCard.avatarImage"
                                  color="primary-light-1"
                                  size="48"
                                  class="my-0 py-0"
                                >
                                  <span>{{ profileCard.avatarName }}</span>
                                </v-avatar>
                              </div>
                              <div>
                                <div class="profile-name ml-4">
                                  {{ profileCard.name }}
                                </div>
                                <div
                                  class="profile-language ml-4"
                                  v-if="profileCard.languages.length > 0"
                                >
                                  <span>
                                    <v-icon color="primary-light-2"
                                      >chat_bubble_outline</v-icon
                                    >
                                  </span>
                                  <span
                                    v-for="(language,
                                    i) in profileCard.languages"
                                    :key="i"
                                  >
                                    {{ $t(language.t_key) }}
                                    <span
                                      v-if="
                                        i != profileCard.languages.length - 1
                                      "
                                      >,</span
                                    >
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="profile__body">
                              <div
                                class="profile-about-text mt-3"
                                v-if="profileCard.aboutText"
                              >
                                <read-more
                                  :more-str="$t('btn_label_view_more')"
                                  :text="profileCard.aboutText"
                                  link="#"
                                  :less-str="$t('general_label_read_less')"
                                  :max-chars="150"
                                ></read-more>
                              </div>
                              <div class="profile-tags pt-3">
                                <span
                                  v-for="(tag, i) in profileCard.tags"
                                  :key="i"
                                >
                                  <span v-if="i < 3">
                                    <v-btn
                                      x-small
                                      color="#E1E8F1"
                                      depressed
                                      class="mr-2"
                                    >
                                      {{ tag.name }}
                                    </v-btn>
                                  </span>
                                  <span v-if="i == 3">
                                    + {{ profileCard.tags.length - 3 }}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <div class="cantact">
                            <v-card elevation="0" class="mt-10" color="#ECF2F7">
                              <v-card-title>
                                <div class="contact__title">
                                  {{ $t("chat_contact_box_title") }}
                                </div>
                              </v-card-title>
                              <v-card-text>
                                <v-text-field
                                  class="mx-3"
                                  flat
                                  :label="
                                    $t('chat_contact_search_input_placeholder')
                                  "
                                  autocomplete="off"
                                  solo
                                  prepend-inner-icon="search"
                                  v-model="search"
                                  clearable
                                  @click="handleClearSearch"
                                ></v-text-field>
                                <v-list color="transparent">
                                  <v-list-item-group
                                    v-model="activeChat"
                                    active-class="border"
                                    color="primary-light-1"
                                  >
                                    <v-list-item
                                      v-for="(item,
                                      index) in filteredContactUsers"
                                      :key="index"
                                      :value="item.id"
                                      @click.stop="
                                        handleSelectedContactUser(item)
                                      "
                                    >
                                      <!-- Avatar -->
                                      <div class="py-2 pr-1">
                                        <div v-if="item.newMessageCount > 0">
                                          <v-badge
                                            avatar
                                            bordered
                                            overlap
                                            bottom
                                            color="red"
                                          >
                                            <v-avatar
                                              color="primary-light-1"
                                              size="48"
                                              class="my-0 py-0"
                                            >
                                              <span v-if="item.avatarImage">
                                                <v-img
                                                  :src="item.avatarImage"
                                                ></v-img>
                                              </span>
                                              <span v-else>
                                                {{ item.avatarName }}
                                              </span>
                                            </v-avatar>
                                            <template v-slot:badge>
                                              <v-avatar badge>
                                                {{ item.newMessageCount }}
                                              </v-avatar>
                                            </template>
                                          </v-badge>
                                        </div>
                                        <div v-else>
                                          <v-avatar
                                            color="primary-light-1"
                                            size="48"
                                            class="my-0 py-0"
                                          >
                                            <v-img
                                              v-if="item.avatarImage"
                                              class="elevation-6"
                                              :src="item.avatarImage"
                                            ></v-img>
                                            <span v-if="!item.avatarImage">{{
                                              item.avatarName
                                            }}</span>
                                          </v-avatar>
                                        </div>
                                      </div>

                                      <v-list-item-content>
                                        <v-list-item-title>
                                          <div class="connection">
                                            <div class="connection__title">
                                              {{ item.fullName }}
                                            </div>
                                            <div class="connection__time"></div>
                                          </div>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                          <div class="connection-sub-title">
                                            {{ item.title }}
                                          </div>
                                        </v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list-item-group>
                                </v-list>
                              </v-card-text>
                            </v-card>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
                <!-- ./LEFT SIDE -->

                <!-- RIGHT SIDE -->
                <v-col cols="12" md="8">
                  <div class="chat-box__right pr-md-5">
                    <div class="chat-body" v-if="selectedContactUser">
                      <div class="chat-body__header">
                        <v-toolbar
                          v-if="!isShowingContactPanel"
                          color="primary-light-2"
                          elevation="0"
                          dark
                        >
                          <v-toolbar-title>
                            <v-btn icon @click="handleBackBtnClick">
                              <v-icon>arrow_back</v-icon>
                            </v-btn>
                            {{ profileCard.name }}
                          </v-toolbar-title>
                        </v-toolbar>
                      </div>
                      <div class="chat-body__screen">
                        <chat-screen> </chat-screen>
                      </div>
                      <div class="chat-body__status-bar">
                        <span v-if="!hasNetwork">
                          Offline now. You are able to send message as soon as
                          you are back online.
                        </span>
                      </div>
                      <div class="chat-body__actions">
                        <v-textarea
                          rows="1"
                          row-height="15"
                          auto-grow
                          autocomplete="off"
                          flat
                          class="mx-3"
                          v-model="messageForm.content"
                          :label="$t('chat_chat_box_input_placeholder')"
                          type="text"
                          solo
                          hide-details
                          @keyup.enter="messageForm.content + '\n'"
                        >
                          <template v-slot:append>
                            <!-- <v-btn icon>
                        <v-icon>emoji_emotions</v-icon>
                          </v-btn>-->
                            <v-btn icon @click.stop="handleCalenderClick">
                              <v-icon>calendar_today</v-icon>
                            </v-btn>
                          </template>
                        </v-textarea>
                        <v-btn
                          depressed
                          dark
                          color="primary-light-1"
                          @click="handleMessageInput"
                          >{{ $t("chat_btn_label_send") }}</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <!-- ./RIGHT SIDE -->
            </div>
          </div>
          <!-- ./chat-page -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RequestBox from "@/components/artifact/global/pages/chat/RequestBox";
import PackageChoosing from "@/components/artifact/global/pages/chat/PackageChoosing";
import ChatScreen from "@/components/artifact/global/pages/chat/ChatScreen";

import { chatApi } from "@/api";
import { imageService } from "@/services";
import { pathData } from "@/data";

export default {
  layout: "chat",
  components: {
    RequestBox,
    PackageChoosing,
    ChatScreen
  },
  data: () => ({
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
    selectedContactUser() {
      if (this.selectedContactUser) {
        this.doEmptyInMessageList();
        this.$store.dispatch(
          "chat/setSelectedContactUser",
          this.selectedContactUser
        );
        this.$store.dispatch("chat/resetContactUserNewMessageCount", {
          ...this.selectedContactUser
        });

        this.packageChoosingDialog.props.userId = this.selectedContactUser.id;
        this.bookingDialog.requestBox.props.userId = this.selectedContactUser.id;
        this.profileCard.name = this.selectedContactUser.fullName;
        this.profileCard.aboutText = this.selectedContactUser.aboutText;
        this.profileCard.avatarImage = this.selectedContactUser.avatarImage;
        this.profileCard.avatarName = this.selectedContactUser.avatarName;
        this.profileCard.languages = this.selectedContactUser.languages;
        this.profileCard.tags = this.selectedContactUser.tags;
        let params = {
          selectedUserId: this.selectedContactUser.id
        };
        chatApi(this.$axios)
          .getMessage(params)
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
                this.socket.emit("new_message", {
                  from: this.$auth.user,
                  to: this.selectedContactUser,
                  message: messageItem
                });
              });
            }
          });
      }
    }
  },
  mounted() {
    console.log("......mounted().....");
    console.log("user", this.$auth.user.email);
    this.socket = this.$nuxtSocket({ name: "main" });
    this.socket.emit("room", { email: this.$auth.user.email });

    this.socket.on("disconnect", () => {
      console.log(`Disconnect`);
    });

    this.socket.on("connect", () => {
      console.log(`Connected`);
    });

    this.socket.on("new_message", data => {
      console.log(data);
    });

    // This is very sensitive.
    // Since the date is not updated without refresh, we should manually refresh it
    // Now this created_at is updated after 1 second
    // ISO string is needed for standard time showing in different timezone
    setInterval(() => {
      this.duration.created_at = new Date().toISOString();
    }, 1000);

    // Fetch contact users
    chatApi(this.$axios)
      .init()
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

          this.$store.dispatch("chat/setContacts", contactUsers);

          // If it has any userId form the url
          if (this.$route.query.userId) {
            let user = this.contacts.find(
              item => item.id == this.$route.query.userId
            );
            if (user) {
              this.selectedContactUser = user;
              this.$router.replace(pathData.pages.chat);
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
    doEmptyInMessageList() {
      this.$store.dispatch("chat/destroyMessages");
    },
    handleRequestBoxNewMessage(messageItem) {
      this.pushMessage(messageItem);
      this.bookingDialog.value = false;
      this.socket.emit("new_message", {
        from: this.$auth.user,
        to: this.selectedContactUser,
        message: messageItem
      });
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

        this.socket.emit("new_message", {
          from: this.$auth.user,
          to: this.selectedContactUser,
          message: newMessage
        });

        const receiverUserId = this.selectedContactUser
          ? this.selectedContactUser.id
          : null;

        let payload = {
          ...newMessage,
          receiverUserId
        };

        chatApi(this.$axios)
          .storeMessage(payload)
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
.chat-page {
  background: $body-bg;
  height: 100%;
  .v-avatar {
    justify-content: center;
  }
  $text-field-rounded-border-radius: 10px;
  .chat-box {
    &__left {
      /* width */
      .chat-sidebar::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      .chat-sidebar::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      /* Handle */
      .chat-sidebar::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: #888;
      }

      /* Handle on hover */
      .chat-sidebar::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .profile {
        padding-top: 28px;
        padding-left: 28px;
        padding-bottom: 28px;
        background: #fcfdfe;
        background: #fcfdfe;
        box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
        border-radius: 20px 0px 0px 20px;
        &__header {
          .profile-name {
            font-family: $font-family;
            font-size: 18px;
            line-height: 25px;
            text-transform: uppercase;
            color: #15577c;
          }
          .profile-language {
            font-family: $font-family;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
          }
        }
        &__body {
          .profile-about-text {
            font-family: $font-family;
            font-size: 14px;
            line-height: 19px;
            color: #1a202d;
          }
        }
      }
      .contact {
        &__title {
          font-family: $font-family;
          font-size: 18px;
          line-height: 25px;
          text-transform: uppercase;
          color: #15577c;
        }
      }
      .connection {
        display: flex;
        justify-content: space-between;
        &__title {
          font-family: $font-family;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #2c3749;
        }
        &__time {
          font-family: $font-family;
          font-size: 11px;
          line-height: 15px;
          text-transform: uppercase;
          color: #6f8098;
        }
      }
      .connection-sub-title {
        font-family: $font-family;
        font-size: 14px;
        line-height: 124%;
        color: #49556a;
      }
    }

    &__right {
      height: 100%;
      .chat-body {
        width: 100%;
        &__status-bar {
          font-family: $font-family;
          display: flex;
          justify-content: center;
          background: orange;
        }
        &__actions {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          background: #ecf2f7;
          border-radius: 20px;
          box-shadow: 0px 2px 2px rgba(73, 85, 106, 0.15);
          padding: 10px 10px;
        }
      }
    }
  }
}
</style>
