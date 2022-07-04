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
        <v-dialog v-if="$vuetify.breakpoint.mdAndUp" v-model="createGroupDialog.value" max-width="600" @click:outside="closeCreateGroupDialog">
          <CreateGroupForm
            @catchEmailUserForNotification="catchEmailUserForNotification"
            @created="handleCreatedGroup"
            :open="createGroupDialog.value"
            @close="closeCreateGroupDialog"
          />
        </v-dialog>
        <v-dialog v-model="inviteGroupDialog.value" max-width="600">
          <InviteGroupForm
            @invited="inviteGroupDialog.value = false"
            :open="inviteGroupDialog.value"
            @close="inviteGroupDialog.value = false"
          />
        </v-dialog>
        <v-dialog v-model="groupImageEditDialog.value" max-width="400">
          <v-card>
            <v-card-title>
              <div>
                {{ $t("chat_dialog_title_edit_image") }}
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn icon @click="groupImageEditDialog.value = false">
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text>
              <cropper
                classname="cropper"
                :src="groupEditImgCropper"
                imageClassname="imageCropClassCustom"
                backgroundClassname="backgroundCropClassCustom"
                :maxWidth="250"
                :maxHeight="250"
                ref="groupCropper"
              ></cropper>
              <v-file-input
                full-width
                v-model="groupEditImgSrc"
                :rules="[
                  value =>
                    !value ||
                    value.size < 2000000 ||
                    'Avatar size should be less than 2 MB!'
                ]"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-btn
                dark
                depressed
                block
                :loading="groupEditImgLoading"
                color="primary-light-1"
                @click="handleGroupImageSaveBtnClick"
                >Save</v-btn
              >
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- Attachment -->
        <v-dialog v-model="addAttachmentDialog" max-width="400" style="z-index: 999!important; background: white">
          <upload-attachment ref="UploadAttachment" @cancel="handleAttachmentUploadCancel" @sendAttachment="uploadAttachmentFile($event)" ></upload-attachment>
        </v-dialog>

        <a-drawer
          class="d-none d-sm-flex d-md-none pa-0"
          title="Actions"
          placement="bottom"
          :visible="actionDialog"
          :closable="false"
          :height="400"
          @close="actionDialog = false"
        >
          <div style="display: flex; justify-content: center;" @click="actionDialog = false">
            <div class="drawer-close-btn" @click="actionDialog = false"></div>
          </div>
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
            <span class="d-md-none" style="position: fixed!important; top : 0!important; width: 100%">
              <v-list width="100%" color="transparent" class="pa-0 ma-0">
                <v-list-item>
                  <v-btn
                  disabled
                    icon
                  >
                  </v-btn>
                  <v-list-item-content class="pa-0 ma-0">
                    <v-list-item-title class="common-top-page-title"
                      
                    >{{ $t("pwa_chat_page_title_message") }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action style="text-align: center!important" :class="actionClass">
                    <v-btn
                    icon
                    @click="handleGroupBtnClick"
                  >
                    <v-icon style="font-size: 25px!important;" class="common-top-add-icon">
                      mdi-plus-circle-outline
                    </v-icon>
                  </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <div class="line"></div>
              <div class="left-sidebar__body">
              <div class="pl-4 pr-4 pt-5 d-md-none">
                <v-text-field
                  :label="$t('chat_field_label_txt_search')"
                  solo
                  dense
                  rounded
                  hide-details
                  prepend-inner-icon="search"
                  v-model="search"
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
                  rounded
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
              <div class="pl-4 pr-4 pt-5 d-none d-md-block">
                <v-text-field
                  :label="$t('chat_field_label_txt_search')"
                  solo
                  dense
                  hide-details
                  prepend-inner-icon="search"
                  v-model="search"
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
              <div :class="{'contact' : !$vuetify.breakpoint.smAndDown, 'contact-sm' : $vuetify.breakpoint.smAndDown}">
                <ContactList
                  :avatar-size="avatarSize"
                  @selected="onHandleContactItemSeleted"
                />
              </div>
            </div>
            </span>
            <div class="left-sidebar__header " v-if="!$vuetify.breakpoint.smAndDown">
              <div class="left-sidebar-title">
                {{ $t("chat_page_title_message") }}
              </div>
              <div class="left-sidebar-action">
                <v-btn
                  icon
                  @click="handleGroupBtnClick"
                >
                  <v-icon color="primary-light-1">
                    mdi-plus-circle-outline
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="left-sidebar__body d-none d-md-block">
              <div class="pl-4 pr-4 pt-5 d-md-none">
                <v-text-field
                  :label="$t('chat_field_label_txt_search')"
                  solo
                  dense
                  rounded
                  hide-details
                  prepend-inner-icon="search"
                  v-model="search"
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
                  rounded
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
              <div class="pl-4 pr-4 pt-5 d-none d-md-block">
                <v-text-field
                  :label="$t('chat_field_label_txt_search')"
                  solo
                  dense
                  hide-details
                  prepend-inner-icon="search"
                  v-model="search"
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
              <div :class="{'contact' : !$vuetify.breakpoint.smAndDown, 'contact-sm' : $vuetify.breakpoint.smAndDown}">
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
              <div
                class="content__header"
                :class="{ 'fixed-top': $vuetify.breakpoint.smAndDown }"
              >
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
                        class="d-md-none"
                        @click="handleBackBtnClick"
                      >
                        <v-icon x-large>mdi-chevron-left</v-icon>
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
                            @click="handleMobileHideActionBtnClick"
                            icon
                            color="primary-light-1"
                            class="text-normal d-md-none"
                          >
                             <v-icon>mdi-filter-variant</v-icon>
                          </v-btn>
                          <v-btn
                            @click="handleDesktopHideActionBtnClick"
                            outlined
                            small
                            rounded
                            color="primary-light-1"
                            class="text-normal d-none d-md-block"
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
                        class="d-md-none"
                        @click="handleBackBtnClick"
                      >
                        <v-icon x-large>mdi-chevron-left</v-icon>
                      </v-btn>
                      <div class="group-avatar">
                        <v-avatar
                          class="group-avatar__avatar"
                          :size="avatarSize"
                          color="primary-light-1"
                        >
                          <v-img
                            v-if="selectedContact.avatarImage"
                            :src="selectedContact.avatarImage"
                          ></v-img>
                          <img
                            v-else
                            :style="{ width: '20px' }"
                            :src="require(`@/assets/images/icons/group.svg`)"
                          />
                        </v-avatar>
                        <v-btn
                          v-if="selectedContact.isAdmin"
                          x-small
                          icon
                          class="group-avatar__btn"
                          @click="handleGroupImageEditBtn"
                        >
                          <v-icon color="black"
                            >mdi-camera-enhance-outline</v-icon
                          >
                        </v-btn>
                      </div>
                      <v-list-item-content class="pl-1">
                        <v-list-item-title
                          v-text="selectedContact.title"
                        ></v-list-item-title>
                        <v-list-item-subtitle>
                          <div class="d-flex align-center">
                            <div>
                              {{ selectedContact.description }}
                            </div>
                            <div>
                              <v-menu
                                v-if="selectedContact.isAdmin"
                                v-model="topicEditMenu"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    small
                                    color="primary-light-1"
                                    icon
                                  >
                                    <v-icon>
                                      mdi-pencil-outline
                                    </v-icon>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-list>
                                    <v-list-item>
                                      <v-text-field
                                        v-model="topicEditValue"
                                        :close-on-click="false"
                                        outlined
                                        hide-details
                                        :loading="topicEditLoading"
                                        dense
                                        label="Enter topics"
                                      ></v-text-field>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="primary-light-1"
                                        x-small
                                        text
                                        @click="topicEditMenu = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        x-small
                                        color="primary-light-1"
                                        text
                                        @click="handleTopicSaveBtnClick"
                                      >
                                        Save
                                      </v-btn>
                                    </v-list-item>
                                  </v-list>
                                </v-card>
                              </v-menu>
                            </div>
                          </div>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <div class="d-flex justify-center align-center">
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
                              <v-list-item
                                link
                                @click="inviteGroupDialog.value = true"
                              >
                                <v-list-item-avatar>
                                  <v-icon color="primary-light-1"
                                    >mdi-account-plus</v-icon
                                  >
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title
                                    class="primary-light-1--text"
                                    >Add People</v-list-item-title
                                  >
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                          <v-btn
                            @click="handleMobileHideActionBtnClick"
                            icon
                            color="primary-light-1"
                            class="text-normal d-md-none"
                          >
                             <v-icon>mdi-filter-variant</v-icon>
                          </v-btn>
                          <v-btn
                            @click="handleDesktopHideActionBtnClick"
                            outlined
                            small
                            rounded
                            color="primary-light-1"
                            class="text-normal d-none d-md-block"
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
                  </template>
                </v-list>
              </div>
              <div class="content__body" v-if="!$vuetify.breakpoint.smAndDown">
                <div class="message-list" v-if="!$vuetify.breakpoint.smAndDown">
                  <ChatScreen />
                </div>
                <div :class="{ 'fixed-bottom': $vuetify.breakpoint.smAndDown }">
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
                        <v-menu
                          top
                        >
                          <template v-slot:activator="{ on, attrs }">

                            <v-btn icon v-bind="attrs"
                              v-on="on">
                              <img
                                :src="
                                  require(`@/assets/images/icons/attachment.svg`)
                                "
                                alt="attachment-icon"
                              />
                            </v-btn>
                          </template>

                          <v-list style="padding: 0!important">
                            <v-list-item style="padding: 0 8px!important">
                              <v-list-item-content style="padding: 2px 0!important">
                                <div class="d-flex justify-space-between">
                                      <v-btn
                                        fab
                                        text
                                        small
                                        color="#49556A"
                                        @click="handleAttachmentUploadBtn()"
                                      >
                                        <v-icon dark>
                                          mdi-file-image
                                        </v-icon>
                                      </v-btn>
                                      <v-btn
                                        fab
                                        text
                                        small
                                        color="#49556A"
                                        @click="uploadVideo"
                                      >
                                        <v-icon dark>
                                          mdi-video
                                        </v-icon>
                                      </v-btn>
                              </div>
                                
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-menu>
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
                              :src="
                                require(`@/assets/images/icons/settings.svg`)
                              "
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
                        v-if="$vuetify.breakpoint.mdAndUp"
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
      <v-card flat v-if="!$vuetify.breakpoint.mdAndUp && createGroupDialog.value" class="hidden-md-and-up fullscreen bg-1">
        <div class="create-group-form-mobile">
          <CreateGroupForm 
          @created="handleCreatedGroup"
          @catchEmailUserForNotification="catchEmailUserForNotification"
          :open="createGroupDialog.value"
          @close="closeCreateGroupDialog"/>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import RequestBox from "@/components/artifact/global/pages/chat/RequestBox";
import PackageChoosing from "@/components/artifact/global/pages/chat/PackageChoosing";
import ChatScreen from "@/components/artifact/global/pages/chat/ChatScreen";
import ChatSetting from "@/components/artifact/global/pages/chat/ChatSetting";
import CreateGroupForm from "@/components/artifact/global/pages/chat/CreateGroupForm";
import InviteGroupForm from "@/components/artifact/global/pages/chat/InviteGroupForm";
import ContactList from "@/components/artifact/global/pages/chat/ContactList";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { endpoint } from "../api";
import { pathData, contactData } from "@/data";
import { messageData } from "@/data";
import UploadAttachment from '@/components/artifact/global/pages/chat/UploadAttachment'
import { addDoc, collection, db, doc, onSnapshot, query, getMessaging, getToken } from "@/plugins/firebase";
import VideoUpload from '@/components/exercise/forms/VideoUpload'
import axios from "axios"

export default {
  layout: "chat",
  head() {
    return {
      title: "Chat"
    };
  },
  components: {
    Cropper,
    CreateGroupForm,
    InviteGroupForm,
    RequestBox,
    PackageChoosing,
    ChatScreen,
    ChatSetting,
    ContactList,
    UploadAttachment,
    VideoUpload
  },
  props: {
    actionClass:{
      type: String,
      default: ""
    }
  },
  data: () => ({
    isVideo: false,
    notificationUsers: [],
    unsubSnapshot: null,
    chechContactQuery: false,
    touch_start: 0,
    touch_end: 0,
    slide_touch_start: 0,
    addAttachmentDialog:false,
    messageData,
    contactData,
    topicEditMenu: false,
    topicEditValue: "",
    topicEditLoading: false,
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
    inviteGroupDialog: {
      value: false
    },
    groupImageEditDialog: {
      value: false
    },
    groupEditImgSrc: null,
    groupEditImgCropper: "",
    groupEditImgLoading: false,
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
    },
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
    groupEditImgSrc(val) {
      if (val) {
        const reader = new FileReader();
        reader.onload = event => {
          this.groupEditImgCropper = event.target.result;
          this.$emit("image-selected");
        };
        reader.readAsDataURL(val);
        // console.log(val);
      } else {
        this.groupEditImgCropper = "";
      }
    },

    actionDialog(value){
      if(value == true){
        document.addEventListener( 'touchstart', this.startTouchListener);
        document.addEventListener( 'touchmove', this.startTouchMoveListener);
        document.addEventListener( 'touchend', this.touchEndListener);
      }
    },

    "$vuetify.breakpoint.smAndDown": function(){
      if(this.$vuetify.breakpoint.smAndDown && this.selectedContact != null){
        this.$router.push(this.localePath(pathData.pages.chatScreen.path));
      }
    },

    selectedContact(data) {
      this.$store.dispatch("chat/destroyMessages");
      let contact = data
      if (!this.chechContactQuery && this.$route?.query?.contactAbleUserId) {
        this.chechContactQuery = true
        const obj = this.contacts.find(item => item.connectionUserId == this.$route.query.contactAbleUserId)
        if (obj) {
          contact = obj
          this.onHandleContactItemSeleted(contact)
        }
      }
      if (contact) {
        this.$store.dispatch("chat/setSelectedContact", contact);

        if(this.$vuetify.breakpoint.smAndDown){
          this.$router.push(this.localePath(pathData.pages.chatScreen.path));
        }else{
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
                      createdAt: item.createdAt,
                      scope: item.scope
                    };
                    console.log('1');
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
                    console.log('2');
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
            this.topicEditValue = contact.description;
            const params = {
              groupId: contact.groupId
            };
            this.$axios
              .get(endpoint.GROUP_MESSAGES_GET, { params })
              .then(({ data }) => {
                data && data.data.length && data.data.forEach(item => {
                  let newMessage = {
                    id: item.id,
                    type: item.type,
                    me: item.me,
                    content: item.content,
                    createdAt: item.createdAt,
                    scope: item.scope,
                    senderUser: item.senderUser
                  };
                  console.log('3');
                  this.pushMessage(newMessage);
                });
              });
          }
        }
       
      }
    },
    addAttachmentDialog(value){
      if(!value){
        this.$refs.UploadAttachment.reset();
      }
    },
    "$route": {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.$route?.query?.createGroupDialog) {
          this.createGroupDialog.value = true
        }else {
          this.createGroupDialog.value = false
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if(to.fullPath.includes("/chat-screen")){
      next();
    }else{
      this.$store.dispatch("chat/setSelectedContact", null);
      next();
    }
  },
  created(){
    if(this.$route.fullPath != this.localePath(pathData.pages.chat.path) && this.$vuetify.breakpoint.smAndDown){
      this.$router.replace(this.localePath(pathData.pages.chat.path));
    }
  },
  async mounted() {
    // this.getFirebaseToken()
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
  beforeDestroy(){
    this.unsubSnapshot && this.unsubSnapshot();
    document.removeEventListener( 'touchstart', this.startTouchListener);
    document.removeEventListener( 'touchmove', this.startTouchMoveListener);
    document.removeEventListener( 'touchend', this.touchEndListener);
  },
  methods: {
    startTouchListener(e){
      this.touch_start = e.changedTouches[0].clientY;
    },
    startTouchMoveListener(e) {
      var touch_end =e.changedTouches[0].clientY;

      this.touch_end = touch_end;

      var height = touch_end - this.touch_start ;

      if(height > 0){
        if(height > 350){
          this.hideDrawer();
        }else{
          this.setDrawerHeight(height);
        }
        
      }
    },
    touchEndListener(){
      var touch_diff  = this.touch_end - this.touch_start

      if(touch_diff < 350){
        document.querySelector(".ant-drawer-content-wrapper").style.height = "400px";
        this.touch_start = 0;
        this.touch_end = 0;
      }
    },
    hideDrawer(){
      document.querySelector(".ant-drawer-content-wrapper").style.height = "0";
      setTimeout(()=>{
        this.actionDialog = false;
      },100)
      setTimeout(function(){
        document.querySelector(".ant-drawer-content-wrapper").style.height = "400px";
        this.touch_start = 0;
        this.touch_end = 0;
      }, 1000);
    },
    setDrawerHeight(height){
     document.querySelector(".ant-drawer-content-wrapper").style.height = 400 - height +"px";
    },
    uploadAttachmentFile(attachment){
      if (
        this.selectedContact &&
        attachment!= null &&
        this.hasNetwork
      ) {
        // Modify the content
        this.messageForm.content = this.messageForm.content.trim();

        // It has to confirm that the updated date is not changed or mixed every where
        let messageData = {
          me: true,
          type: "structure",
          fileType: this.isVideo ? 'video' : 'image',
          file: attachment,
          createdAt: new Date()
        }
        let newMessage = Object.assign(
          { ...messageData },
          { ...this.duration }
        );
        if (
          this.selectedContact.categoryId == contactData.CATEGORY_ID_PRIVATE
        ) {
          newMessage.scope = this.sendPrivateMessageToChatServer({
            senderUserId: this.$auth.user.id,
            receiverUserId: this.selectedContact.connectionUserId,
            message: newMessage
          });

        const formData = new FormData();
        formData.append('file', attachment);
        formData.append('receiverUserId', this.selectedContact.connectionUserId);
        formData.append('me',true);
        formData.append('type', 'structure');
        formData.append('fileType', this.isVideo ? 'video' : 'image');
        formData.append('createdAt', new Date());
        const headers = { 'Content-Type': 'multipart/form-data' };

          this.$axios
            .post(endpoint.MESSAGES_ATTACHMENT_POST, formData, {
              headers,
            })
            .then((data) => {
              let contact = this.contacts[0];
              if (contact.id != this.selectedContact.id) {
                this.$store.dispatch("chat/getContacts");
              }
              console.log('4');
              this.isVideo = false;
              this.pushMessage(data.data.message);
              this.addAttachmentDialog = false;
            })
            .catch((e) => {
              this.addAttachmentDialog = false;
              this.$toast.error("Something went wrong, Please try again!")
            });
        } else {
          const payload = {
            type: "structure",
            file: attachment,
            groupId: this.selectedContact.groupId,
            ...this.duration
          };
          this.sendGroupMessageToChatServer({
            senderUser: {
              id: this.$auth.user.id,
              firstName: this.$auth.user.last_name,
              lastName: this.$auth.user.first_name,
              email: this.$auth.user.email,
              image: this.$auth.user.image
            },
            groupId: this.selectedContact.groupId,
            message: newMessage,
            ...this.duration
          });

          const formData = new FormData();
          formData.append('file', attachment);
          formData.append('groupId', this.selectedContact.groupId);
          formData.append('type', 'structure');
          formData.append('createdAt', new Date());
          const headers = { 'Content-Type': 'multipart/form-data' };

          this.$axios
            .post(endpoint.GROUP_MESSAGES_ATTACHMENT_POST, formData, {
              headers,
            })
            .then(({ data }) => {
              let contact = this.contacts[0];
              if (contact.id != this.selectedContact.id) {
                this.$store.dispatch("chat/getContacts");
              }
              console.log('5');
              this.pushMessage(data.data);
              this.addAttachmentDialog = false;
            })
            .catch(err => {
              this.addAttachmentDialog = false;
              if (err.response.data.error) {
                this.$toast.error(err.response.data.error.message);
              }
            });
        }
      }
    },
    handleAttachmentUploadBtn() {
      this.addAttachmentDialog = true;
    },
    uploadVideo(){
      this.isVideo = true;
      this.addAttachmentDialog = true;
    },
    handleAttachmentUploadCancel() {
      this.addAttachmentDialog = false;
    },
    async handleGroupImageSaveBtnClick() {
      const groupCropperResult = this.$refs.groupCropper.getResult();
      if (groupCropperResult.canvas) {
        groupCropperResult.canvas.toBlob(blob => {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            const { groupId } = this.selectedContact;

            try {
              this.groupEditImgLoading = true;
              const { data } = await this.$axios.post(
                endpoint.GROUPS_ID_SAVE_IMAGE_POST(groupId),
                {
                  content: reader.result
                }
              );
              await this.$store.dispatch("chat/getContacts");
              let contact = this.contacts.find(item => item.groupId == groupId);
              this.selectedContact = contact;
              this.$toast.success("Successfully saved");
              this.groupEditImgSrc = null;
              this.groupEditImgCropper = "";
              this.groupImageEditDialog.value = false;
            } catch (error) {
              if (error.response.data.error) {
                this.$toast.error(error.response.data.error.message);
              }
            } finally {
              this.groupEditImgLoading = false;
            }
          };
        }, "image/png");
      }
    },
    handleGroupImageEditBtn() {
      this.groupImageEditDialog.value = true;
    },
    async handleTopicSaveBtnClick() {
      const { groupId } = this.selectedContact;

      try {
        this.topicEditLoading = true;
        const { data } = await this.$axios.put(
          endpoint.GROUPS_ID_CHANGE_TOPIC_PUT(groupId),
          {
            topic: this.topicEditValue
          }
        );
        await this.$store.dispatch("chat/getContacts");
        let contact = this.contacts.find(item => item.groupId == groupId);
        this.selectedContact = contact;
        this.$toast.success("Successfully updated");
        this.topicEditLoading = false;
        this.topicEditMenu = false;
      } catch (error) {
        if (error.response.data.error) {
          this.$toast.error(error.response.data.error.message);
        }
        this.topicEditLoading = false;
      }
    },
    async handleCreatedGroup() {
      this.closeCreateGroupDialog()
      await this.$store.dispatch("chat/getContacts");
      let contact = this.contacts[0];
      if (contact) {
        this.selectedContact = contact;
      }
    },
    onHandleContactItemSeleted(contact) {
      this.selectedContact = contact;
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
      console.log("call");
      this.$store.dispatch("chat/pushMessage", message);
    },
    handleGroupBtnClick() {
      this.createGroupDialog.value = true;
      const query = {
        ...this.$route.query,
        createGroupDialog: true
      }
      this.$router.push({query})
    },
    handleUnarchiveBtnClick() {
      if (this.selectedContact) {
        this.$axios
          .post(endpoint.CONTACTS_UNARCHIVE_POST, {
            contactId: this.selectedContact.id
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
      if (this.$route?.query?.contactAbleUserId) {
        const query = {
          ...this.$route?.query,
          checkContactUserQuery: true
        }
        this.$router.push({query})
      }
      this.$store.dispatch("chat/destroyMessages");
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
    //duplicated method
    // handleBackBtnClick() {
    //   this.selectedContact = null;
    // },
    handleRequestBoxCancelBtn() {
      this.bookingDialog.value = false;
    },

    sendPrivateMessageToChatServer(payload) {
      this.$socket.emit("private_message_send", {
        scope: messageData.SCOPE_PRIVATE,
        senderUserId: payload.senderUserId,
        receiverUserId: payload.receiverUserId,
        message: payload.message
      });
    },
    sendGroupMessageToChatServer(payload) {
      this.$socket.emit("group_message_send", {
        ...payload.message,
        scope: messageData.SCOPE_GROUP,
        senderUser: payload.senderUser,
        groupId: payload.groupId
      });
    },
    handleRequestBoxNewMessage(message) {
      let contact = this.selectedContact;
      if (contact) {
        console.log('6');
        this.pushMessage(message);
        this.sendPrivateMessageToChatServer({
          senderUserId: this.$auth.user.id,
          receiverUserId: contact.connectionUserId,
          message: message
        });
        this.$store.dispatch("chat/getContacts");
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

        if (
          this.selectedContact.categoryId == contactData.CATEGORY_ID_PRIVATE
        ) {
          newMessage.scope = this.sendPrivateMessageToChatServer({
            senderUserId: this.$auth.user.id,
            receiverUserId: this.selectedContact.connectionUserId,
            message: newMessage
          });
          const msgObj = {
            ...newMessage,
            receiverUserId: this.selectedContact.connectionUserId
          }
          
          this.$axios
            .post(endpoint.MESSAGES_POST, {
              ...newMessage,
              receiverUserId: this.selectedContact.connectionUserId
            })
            .then((res) => {
              let contact = this.contacts[0];
              if (contact.id != this.selectedContact.id) {
                this.$store.dispatch("chat/getContacts");
              }
              return res
            })
            .then(result => {
              this.pushNotification(msgObj)
              return result
            })

            //todo if needed
            // .then((res) => {
            //   msgObj.id = res?.data?.data?.id
            //   this.sentMessageToFirebaseDB(msgObj)
            // })
            .catch(() => {});
        } else {
          const payload = {
            type: "text",
            content: this.messageForm.content,
            groupId: this.selectedContact.groupId,
            ...this.duration
          };
          this.sendGroupMessageToChatServer({
            senderUser: {
              id: this.$auth.user.id,
              firstName: this.$auth.user.last_name,
              lastName: this.$auth.user.first_name,
              email: this.$auth.user.email,
              image: this.$auth.user.image
            },
            groupId: this.selectedContact.groupId,
            message: newMessage,
            ...this.duration
          });
          this.$axios
            .post(endpoint.GROUP_MESSAGES_POST, payload)
            .then(({ data }) => {
              let contact = this.contacts[0];
              if (contact.id != this.selectedContact.id) {
                this.$store.dispatch("chat/getContacts");
              }
              return data
            })
            .then(res=> {
              this.pushNotification(payload, true)
              return res
            })
            .catch(err => {
              if (err.response.data.error) {
                this.$toast.error(err.response.data.error.message);
              }
            });
        }
        console.log('7');
        this.pushMessage(newMessage);
        this.messageForm.content = "";
      }
    },
    handleClearSearch() {
      this.search = "";
    },
    closeCreateGroupDialog(){
      const query = {}
      this.$router.push({query})
      this.createGroupDialog.value = false;
    },
    getFirebaseToken(){
      //function is keeping for test purpose, it is not used in anywhere, will remove it
      if (process.client) {
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: 'BCNk4KVRK5Z8_wGbQy0B_9pLVvGmJlf1Qx6N_odSpRUMj_f9_juZdNVqzCDzWcfM_Z-n4iQ_GMMiE8mXBmimQUQ' })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken, "currentToken");
            // Send the token to your server and update the UI if necessary
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
      }
    },
    subscribeToFirebase(){
      //function is keeping for test purpose, it is not used in anywhere, will remove it
      const q = query(collection(db, "messages"));
      this.unsubSnapshot = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // this.isSentNotification = true
            console.log("New message from Firebase DB: ", change.doc.data());
          }
        });
      });
    },
    async sentMessageToFirebaseDB(msgObj = {}){
      //function is commented, if needed then will un-comment it
      const ob = msgObj;
      delete ob.scope
      ob.senderUserId = this.$auth.user.id
      try {
        const docRef = await addDoc(collection(db, "messages"), ob);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async pushNotification(data, groupChat = false){
      if (groupChat) {
        return this.handleGroupNotification()
      }
      let user = this.$auth.user
      let name = ""
      if(user?.full_name){
        name = user.full_name
      }else if(user?.first_name && user?.last_name){
        name = user.first_name + " " + user?.last_name
      }else {
        name = user.email
      }
      const response = await this.$axios.get("notification-user?userId=" + data.receiverUserId)
      let token = ""
      let status = "off"
      if (response?.data?.data?.token) {
        token = response.data.data.token
        status = response.data.data.status
      }
      if (!token || status == "off") {
        return
      }
      const obj = {
        "to": token,
        "notification": {
          title: "New message from " + name,
          body: data.content ? data.content : "Please check!",
          click_action: process.env.CLIENT_BASE_URL + "/chat?userId=" + data.receiverUserId,
          icon: "http://coachsome.com/apple-touch-icon-76x76.png"
        },
      }
      const url = "https://fcm.googleapis.com/fcm/send"
      await axios.post(url, obj, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=' + process.env.FIREBASE_CLOUD_MSG_SERVER_KEY,
        }
      })
    },
    catchEmailUserForNotification(emailUsers){
      this.notificationUsers = emailUsers
    },
    handleGroupNotification(){
      console.log("group");
      // const response = await this.$axios.get("notification-user?userIds=" + this.notificationUsers)
      // console.log(response);
    }
  }
};
</script>

<style lang="scss">
.fullscreen {
  border-radius: 0;
  margin: 0;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.ant-drawer-content-wrapper{
    // height: 400px!important;
    border-top-left-radius: 20px!important;
    border-top-right-radius: 20px!important;
  }
  .drawer-close-btn{
      border-top: 6px solid #9FAEC2;
      width: 80px;
      border-radius: 80px;
      position: absolute;
      top: 0;
      margin: 8px;
      text-align: center;
  }
  .ant-drawer-content{
    border-top-left-radius: 20px!important;
    border-top-right-radius: 20px!important;
  }
  .ant-drawer-header {
    display: flex!important;
    justify-content: center!important;
    border-bottom: 1px solid #9FAEC2!important;
  }
  .ant-drawer-title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    margin-top: 8px;
    color: #15577C;

  }
  .v-application{
  &--wrap{  
      background: #f7fafc!important;
  }
    
}
$header-height: 60px;
.chat-new-page {
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    -webkit-backface-visibility: hidden;
    width: 100%;
  }
  .fixed-top {
    position: fixed;
    z-index: 100;
    background: #f7fafc;
    // top: 45px;
    top: 0;
    -webkit-backface-visibility: hidden;
    width: 100%;
  }
  background: #f7fafc;
  .v-select__selections {
    color: rgba(0, 0, 0, 0.6) !important;
  }

  .ant-drawer-body {
    padding: 0px !important;
  }

  .v-textarea .v-input__control {
    // border: 2px solid #15577c !important;
  }

  .group-avatar {
    position: relative;
    &__btn {
      left: 10px;
      bottom: -6px;
      position: absolute;
    }
    &__avatar {
      position: relative;
    }
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
      .contact-sm {
        overflow: auto;
        overflow-y: scroll;
        // height: 100vh;
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
          color: $grey-700!important;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        &__description {
          font-family: $font-family;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          text-transform: capitalize;
          color: $grey-700!important;
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
      background: #f7fafc;
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
.v-list-item{
	&__action{
		margin: 0!important;
	}
}
// .v-list-item{
// 	padding: 0 16px 0 0!important;
// }
</style>