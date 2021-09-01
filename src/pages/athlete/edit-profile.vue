<template>
  <div class="athlete-edit-profile">
    <v-container fluid class="page-container view-profile__wrapper">
      <v-row justify="center">
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="page-title">
                {{ $t("profile_athlete_page_title") }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_profile_picture_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_profile_pic_desc") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-col cols="6" md="4" lg="3">
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex flex-column justify-center align-center"
                  >
                    <v-avatar
                      color="teal"
                      size="125"
                      v-if="!userProfileImage"
                      tile
                    >
                      <span class="white--text headline">
                        {{ initialImageContent }}
                      </span>
                    </v-avatar>
                    <v-avatar
                      size="125"
                      color="primary"
                      v-if="userProfileImage"
                      tile
                    >
                      <img :src="userProfileImage" alt="Profile Image" />
                    </v-avatar>
                    <v-btn
                      color="primary-light-1"
                      dark
                      tile
                      depressed
                      @click.stop="editImageDialog.show = true"
                    >
                      {{ $t("profile_button_label_change_image") }}
                    </v-btn>
                    <EditImageDialog
                      :show="editImageDialog.show"
                      @hide="editImageDialog.show = false"
                      @uploaded="editImageDialog.show = false"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_profile_name_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_profile_name_desc") }}
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="profileData.profile_name"
                solo
                counter="35"
                maxlength="35"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_about_you_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_about_you_desc") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <TiptopEditor
                :value="tipTopEditor.value"
                @updated="handleTiptopUpdatedValue"
              />
            </v-col>
          </v-row>

          <v-row class="py-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_mobile_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_mobile_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12" md="8">
                  <VuePhoneNumberInput
                    :default-country-code="profileData.mobile_code"
                    v-model="profileData.mobile_no"
                    @update="updateMobileInfo"
                    :translations="{
                      countrySelectorLabel: $t(
                        'profile_section_mobile_label_country_code'
                      ),
                      phoneNumberLabel: $t(
                        'profile_section_mobile_input_label_phone_number'
                      ),
                      example: $t('profile_section_mobile_input_label_example')
                    }"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Language Section -->
          <v-row class="py-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_language_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_language_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="d-flex flex-wrap">
                <v-chip
                  v-for="lang in languagesSelected"
                  :key="lang.id"
                  class="mr-5 mt-5"
                  dark
                  small
                  close
                  close-icon="clear"
                  color="primary-light-2"
                  @click:close="removeLanguage(lang)"
                  >{{ $t(lang.t_key) }}</v-chip
                >
                <div class="mt-5">
                  <v-dialog
                    v-model="dialog.language"
                    scrollable
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" text small>
                        {{ $t("profile_add_more_btn_label") }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        {{ $t("profile_mod_title_select_lang") }}
                        <v-spacer></v-spacer>
                        <v-card-actions>
                          <v-btn
                            color="primary-light-1"
                            text
                            @click="dialog.language = false"
                            >{{ $t("btn_label_ok") }}</v-btn
                          >
                        </v-card-actions>
                      </v-card-title>
                      <v-card-text class="pt-5">
                        <v-combobox
                          v-model="languagesSelected"
                          :items="languages"
                          item-text="name"
                          item-value="id"
                          chips
                          clearable
                          :label="$t('profile_mod_title_select_lang')"
                          multiple
                          solo
                          dense
                        >
                          <template
                            v-slot:selection="{ attrs, item, select, selected }"
                          >
                            <v-chip
                              v-bind="attrs"
                              :input-value="selected"
                              close
                              small
                              label
                              @click="select"
                              @click:close="removeLanguage(item)"
                            >
                              <strong>{{ $t(item.t_key) }}</strong
                              >&nbsp;
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ $t(data.item.t_key) }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </v-combobox>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Birthday Section -->
          <v-row class="py-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_birthday_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_birthday_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    readonly
                    solo
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    {{ $t("btn_label_cancel") }}
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    {{ $t("text_ok") }}
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- Birthday Section -->

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <!-- Category Section -->
          <v-row class="py-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_category_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_category_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="d-flex flex-wrap">
                <div
                  class="mr-5 mt-5"
                  v-for="category in categoriesSelected"
                  :key="category.id"
                >
                  <v-chip
                    small
                    dark
                    close
                    close-icon="clear"
                    color="primary-light-2"
                    @click:close="removeCategory(category)"
                    >{{ $t(category.t_key) }}</v-chip
                  >
                </div>
                <div class="mt-5">
                  <v-dialog
                    v-model="dialog.category"
                    scrollable
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" text small>
                        {{ $t("profile_add_more_btn_label") }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        {{ $t("profile_modal_heading_select_category") }}
                        <v-spacer></v-spacer>
                        <v-card-actions>
                          <v-btn
                            color="primary-light-1"
                            text
                            @click="dialog.category = false"
                            >{{ $t("btn_label_ok") }}</v-btn
                          >
                        </v-card-actions>
                      </v-card-title>
                      <v-card-text class="pt-5">
                        <v-combobox
                          v-model="categoriesSelected"
                          :items="categories"
                          item-text="name"
                          item-value="id"
                          chips
                          clearable
                          :label="$t('profile_modal_heading_select_category')"
                          multiple
                          solo
                          dense
                          persistent-hint
                          autocomplete="off"
                        >
                          <template
                            v-slot:selection="{ attrs, item, select, selected }"
                          >
                            <v-chip
                              v-bind="attrs"
                              :input-value="selected"
                              small
                              label
                              close
                              @click="select"
                              @click:close="removeCategory(item)"
                            >
                              <strong>{{ $t(item.t_key) }}</strong
                              >&nbsp;
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ $t(data.item.t_key) }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </v-combobox>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Tags -->
          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>
          <v-row class="py-10">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_sport_tag_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_athlete_sport_tag_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="d-flex flex-wrap">
                <div
                  v-for="(item, i) in tagData.tagsSelected"
                  :key="i"
                  class="mr-5 mt-5"
                >
                  <v-chip
                    small
                    dark
                    close
                    close-icon="clear"
                    color="primary-light-2"
                    @click:close="removeTag(item)"
                    >{{ item }}</v-chip
                  >
                </div>
                <div class="mt-5">
                  <v-dialog v-model="dialog.tag" scrollable max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on" text small>
                        {{ $t("profile_add_more_btn_label") }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        {{ $t("profile_modal_heading_select_tag") }}
                        <v-spacer></v-spacer>
                        <v-card-actions>
                          <v-btn
                            color="primary-light-1"
                            text
                            @click="dialog.tag = false"
                            small
                            >{{ $t("text_ok") }}</v-btn
                          >
                        </v-card-actions>
                      </v-card-title>
                      <v-card-text class="pt-5">
                        <v-row justify="center" align="center">
                          <v-col cols="12">
                            <v-combobox
                              v-model="tagData.tagsSelected"
                              :items="tagData.tags"
                              clearable
                              :label="$t('profile_modal_heading_select_tag')"
                              multiple
                              solo
                              append-icon
                            >
                              <template
                                v-slot:selection="{
                                  attrs,
                                  item,
                                  select,
                                  selected
                                }"
                              >
                                <v-chip
                                  v-bind="attrs"
                                  :input-value="selected"
                                  close
                                  @click="select"
                                  @click:close="removeTag(item)"
                                  label
                                  small
                                >
                                  <strong>{{ item }}</strong
                                  >&nbsp;
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_social_profile_title") }}
              </div>
              <div class="section-description">
                {{ $t("profile_social_profile_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <label for class="input-social-label">
                {{ $t("profile_facebook") }}
              </label>
              <v-text-field
                v-model="profileData.social_acc_fb_link"
                solo
              ></v-text-field>
              <label for class="input-social-label">
                {{ $t("profile_twitter") }}
              </label>
              <v-text-field
                v-model="profileData.social_acc_twitter_link"
                solo
              ></v-text-field>
              <label for class="input-social-label">
                {{ $t("profile_instagram") }}
              </label>
              <v-text-field
                v-model="profileData.social_acc_instagram_link"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mb-5">
            <v-col cols="12" md="4">
              <div class="section-title pb-2">
                {{ $t("profile_athlete_personalized_url") }}
              </div>
              <div class="section-description">
                {{ $t("personalized_athlete_url_description") }}
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <label for class="input-social-label">
                {{ $t("profile_link_label") }}
              </label>
              <v-text-field
                v-model="personalizedUrl"
                @click="dialog.personalize.show = true"
                solo
                readonly
                :class="['mb-0']"
              ></v-text-field>
              <v-dialog
                v-model="dialog.personalize.show"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title>
                    <span class="title">
                      {{ $t("profile_personalized_url") }}
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            solo
                            :prefix="origin + '/'"
                            placeholder="yourname"
                            v-model="dialog.personalize.userName"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary-light-1"
                      text
                      @click="dialog.personalize.show = false"
                      >{{ $t("text_close") }}</v-btn
                    >
                    <v-btn color="primary-light-1" text @click="updateUserName">
                      {{ $t("profile_save_btn") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="mx-0 px-0">
              <client-back-footer class="px-0 py-0">
                <template v-slot:left>
                  <v-btn
                    class="ml-5"
                    color="primary-light-1"
                    dark
                    small
                    @click="saveProfile()"
                    >{{ $t("profile_save_btn") }}</v-btn
                  >
                </template>
                <template v-slot:right>
                  <span
                    class="d-sm-flex d-xs-flex d-md-none justify-end mr-5"
                  ></span>
                </template>
              </client-back-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { profileApi } from "@/api";

import { statusCodeData, pathData } from "@/data";
import { storageHelper } from "@/helper";
import { bookingService } from "@/services";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import EditImageDialog from "@/components/profile/EditImageDialog";
import TiptopEditor from "@/components/editor/TiptopEditor";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  layout: "athlete",
  components: {
    ClientBackFooter,
    EditImageDialog,
    TiptopEditor,
    VuePhoneNumberInput
  },

  data() {
    return {
      origin: "",
      tipTopEditor: { value: "" },
      editImageDialog: {
        show: false
      },
      profilePicture: {
        img: "",
        file: null,
        rules: [
          value =>
            !value ||
            value.size < 5000000 ||
            "Image size should be less than 5 MB!"
        ]
      },
      initialImageContent: "",
      imageUploadDialog: false,
      dialog: {
        category: false,
        tag: false,
        lang: false,
        personalize: {
          show: false,
          userName: ""
        }
      },
      value: "",
      uploadImageData: null,
      profileImage: null,
      languages: [],
      languagesSelected: [],
      categories: [],
      categoriesSelected: [],
      tagData: {
        tags: [],
        tagsSelected: []
      },
      phone: {
        code: ["+1", "+45"]
      },
      items: [
        { id: 1, code: 88 },
        { id: 2, code: 99 }
      ],
      date: new Date().toISOString().substr(0, 10),
      pickerDate: null,
      menu: false,
      menu2: false,
      profileData: {
        image: "",
        profile_name: "",
        about_me: "",
        mobile_no: "32 12 34 56",
        mobile_code: "DK",
        birth_day: "",
        user_name: "",
        personalized_url: "",
        sport_tag_list_id: [],
        category_tag_list_id: [],
        language_tag_list_id: [],
        social_acc_fb_link: "",
        social_acc_twitter_link: "",
        social_acc_instagram_link: ""
      }
    };
  },
  computed: {
    userProfileImage() {
      return this.$auth.user.image;
    },
    personalizedUrl() {
      return this.origin + "/" + this.profileData.user_name;
    }
  },
  watch: {
    date(val) {
      this.profileData.birth_day = val;
    },
    "profileData.user_name": function(val) {
      this.dialog.personalize.userName = val;
    },
    "profilePicture.file": function(val) {
      this.profilePicture.img = URL.createObjectURL(val);
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.origin = window.location.origin;
  },
  methods: {
    handleTiptopUpdatedValue(value) {
      this.profileData.about_me = value;
    },
    init() {
      // Redirect booking page if booking not completed
      let booking = bookingService.getBookingInfo();
      if (booking && booking.status != "Completed") {
        this.$router.push(
          this.localePath(pathData.pages.bookingPackage(booking.packageId))
        );
      }

      // If any question found in local storage
      let questionBox = storageHelper.get("question_box");
      if (questionBox && !questionBox.isUserAuthenticatedAtTheTimeOfCreating) {
        let questionBoxHolder = { ...questionBox };
        storageHelper.destroy("question_box");
        this.$router.push("/" + questionBoxHolder.userName);
      } else {
        storageHelper.destroy("question_box");
      }

      profileApi(this.$axios)
        .authUserProfileInfo()
        .then(response => {
          this.initialImageContent = response.data.initial_image_content;
          this.profileData.profile_name = response.data.profile_name;
          this.profileData.about_me = response.data.about_me;
          this.profileData.mobile_no = response.data.mobile_no;
          this.profileData.mobile_code = response.data.mobile_code;
          this.profileData.birth_day = response.data.birth_day;
          this.date = response.data.birth_day;
          this.profileData.social_acc_fb_link =
            response.data.social_acc_fb_link;
          this.profileData.social_acc_twitter_link =
            response.data.social_acc_twitter_link;
          this.profileData.social_acc_instagram_link =
            response.data.social_acc_instagram_link;
          this.profileData.user_name = response.data.user.user_name;

          this.tipTopEditor.value = response.data.about_me;

          this.categories = response.data.sport_category;
          this.languages = response.data.languages;

          this.languagesSelected = response.data.selectedLanguages;
          this.categoriesSelected = response.data.selectedCategories;
          this.tagData.tagsSelected = response.data.selectedSportTags.map(
            item => item.name
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateUserName() {
      if (this.dialog.personalize.userName) {
        profileApi(this.$axios)
          .updateUserName(this.dialog.personalize.userName)
          .then(response => {
            if (response.data.status == "success") {
              this.profileData.user_name = this.dialog.personalize.userName;
              this.$store.dispatch(
                "updateUserName",
                this.dialog.personalize.userName
              );
              this.$toast.success(response.data.message);
            } else {
              this.$toast.error(response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    updateMobileInfo(item) {
      this.profileData.mobile_code = item.countryCode;
      this.profileData.mobile_no = item.phoneNumber;
    },
    removeCategory(item) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(item), 1);
      this.categoriesSelected = [...this.categoriesSelected];
    },
    removeTag(item) {
      console.log(item);
      this.tagData.tagsSelected.splice(
        this.tagData.tagsSelected.indexOf(item),
        1
      );
    },
    removeLanguage(item) {
      this.languagesSelected.splice(this.languagesSelected.indexOf(item), 1);
      this.languagesSelected = [...this.languagesSelected];
    },
    saveProfile() {
      let payload = this.profileData;

      payload.language_tag_list_id = this.languagesSelected.map(
        item => item.id
      );

      payload.category_tag_list_id = this.categoriesSelected.map(
        item => item.id
      );

      payload.sport_tag_list_name = this.tagData.tagsSelected;

      profileApi(this.$axios)
        .profileSave(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.$toast.success(this.$i18n.t(response.data.t_key));
            this.setPageProgress(response.data.progress);
          }
        })
        .catch(error => {
          if (
            error.response.status == statusCodeData.HTTP_UNPROCESSABLE_ENTITY
          ) {
            this.$toast.error(this.$i18n.t(error.response.data.t_key));
          }
        });
    },
    setPageProgress(val) {
      this.$store.dispatch("pageProgress/setProfileProgress", val);
    }
  }
};
</script>

<style lang="scss">
.athlete-edit-profile {
  height: 100%;
  background: $body-bg;
  .view-profile__wrapper {
    .v-input .v-input__slot {
      @include shadow-2;
    }

    .v-input input {
      background: #ffffff !important;
      border-radius: 8px !important;
      height: 32px !important;
      min-height: 32px !important;
    }

    .input-social-label {
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: $grey-700;
    }

    .example-info {
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #9faec2;
    }

    .image-upload {
      width: 100%;
      position: relative;

      &__input {
        display: none;
      }

      &__btn {
        position: absolute;
        bottom: -29px;
      }

      &__preview {
        width: 100%;
      }
    }

    .tiptap-vuetify-editor .ProseMirror {
      min-height: 100px;
      outline: 0 !important;
      margin: 20px !important;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-variant-ligatures: none;
      overflow: auto;
    }
  }
}
</style>
