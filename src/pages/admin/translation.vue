<template>
  <client-only>
    <v-container fluid>
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('page_title_translation')">
        <template v-slot:goBack>
          <v-btn
            icon
            @click="handleBack"
          >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('page_title_translation')"></desktop-top-nav>

      <div :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
        <v-row>
          <v-col>
            <v-tabs v-model="tab" show-arrows>
              <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card v-if="item == 'Seo'">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        >Profile Page</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <ProfileSeo />
                        <v-card> </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        >Home Page</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <HomeSeo />
                        <v-card> </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        >Marketplace Page</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <MarketplaceSeo />
                        <v-card> </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
                <v-card v-if="item == 'General'">
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="Search"
                      outlined
                      dense
                      class="default-text-field"
                      color="#9FAEC2"
                      hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>

                    <v-btn
                      @click="dialog = true"
                      color="primary-light-1"
                      depressed
                      dark
                      >{{ $t("btn_label_translation_add") }}</v-btn
                    >
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="langData"
                    class="elevation-1"
                    :search="search"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.id }}</td>
                      <td>{{ props.item.page_name }}</td>
                      <td>{{ props.item.group }}</td>
                      <td>{{ props.item.gl_key }}</td>
                      <td>{{ truncate(props.item.dn_value, 100) }}</td>
                      <td>{{ truncate(props.item.sv_value, 100) }}</td>
                    </template>

                    <template v-slot:[`item.en_value`]="{ item }">
                      {{ truncate(item.en_value, 100) }}
                    </template>
                    <template v-slot:[`item.dn_value`]="{ item }">
                      {{ truncate(item.dn_value, 100) }}
                    </template>
                    <template v-slot:[`item.sv_value`]="{ item }">
                      {{ truncate(item.sv_value, 100) }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon small class="mr-2" @click="editItem(item, item.id)"
                        >edit</v-icon
                      >
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="1000px" scrollable>
          <v-card>
            <v-card-title>
              <div class="title">{{ formTitle }}</div>
              <v-spacer></v-spacer>
              <v-btn icon color="primary-light-1" @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-2">Page name</div>
                    <v-text-field
                      v-model="editedItem.page_name"
                      :rules="[v => !!v || 'Page name is required']"
                      label="Page name"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-2">Group name</div>
                    <v-text-field
                      v-model="editedItem.group"
                      :rules="[v => !!v || 'Group name is required']"
                      label="Group name"
                      placeholder="Group name"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="subtitle-2">Key Name</div>
                    <span v-if="this.editedIndex === -1">
                      <v-text-field
                        v-model="editedItem.gl_key"
                        label="Key Name"
                        :rules="[v => !!v || 'Key name is required']"
                        solo
                      ></v-text-field>
                    </span>
                    <span v-else>
                      <v-text-field
                        v-model="editedItem.gl_key"
                        label="Key Name"
                        solo
                        disabled
                      ></v-text-field>
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-2">English</div>
                    <v-textarea
                      solo
                      v-model="editedItem.en_value"
                      name="input-7-4"
                      label="English"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-2">Danish</div>
                    <v-textarea
                      solo
                      v-model="editedItem.dn_value"
                      name="input-7-4"
                      label="Danish"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-2">Swedish</div>
                    <v-textarea
                      solo
                      v-model="editedItem.sv_value"
                      name="input-7-4"
                      label="Swedish"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <span v-if="this.editedIndex === -1">
                <v-btn
                  :loading="isLoading"
                  dark
                  color="primary-light-1"
                  @click="handleSaveBtnClick"
                  >Save</v-btn
                >
              </span>
              <span v-else>
                <v-btn
                  :loading="isLoading"
                  dark
                  color="primary-light-1"
                  @click="handleUpdateBtnClick"
                  >Update</v-btn
                >
              </span>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog -->
      </div>
    </v-container>
  </client-only>
</template>

<script>
import ProfileSeo from "@/components/artifact/admin/translation/seo/ProfileSeo";
import HomeSeo from "@/components/artifact/admin/translation/seo/HomeSeo";
import MarketplaceSeo from "@/components/artifact/admin/translation/seo/MarketplaceSeo";
import { adminTranslationApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  layout: "admin",
  head() {
    return {
      title: this.$auth.user.first_name + " " + this.$auth.user.last_name
    };
  },
  components: {
    ProfileSeo,
    HomeSeo,
    MarketplaceSeo,
    MobileTopNav,
    DesktopTopNav
  },
  data: () => ({
    tributeValue: "",
    valid: true,
    tab: null,
    items: ["General", "Seo"],
    dialog: false,
    search: "",
    headers: [
      { text: "Id ", value: "id", sortable: true },
      { text: "Page name", value: "page_name", sortable: true },
      { text: "Group Name", value: "group", sortable: false },
      { text: "Key name", value: "gl_key", sortable: false },
      { text: "English ", value: "en_value", sortable: false },
      { text: "Danish", value: "dn_value", sortable: false },
      { text: "Swedish", value: "sv_value", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    isLoading: false,
    fullPage: true,
    serverErrors: [],
    langData: [],

    pagination: {
      rowsPerPage: 20
    },
    editedIndex: -1,
    editedItem: {
      page_name: "",
      group: " ",
      gl_key: "",
      en_value: "",
      dn_value: "",
      sv_value: ""
    },
    defaultItem: {
      page_name: "",
      group: "",
      gl_key: "",
      en_value: "",
      dn_value: "",
      sv_value: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.getTranslationData();
  },

  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    truncate(str, num) {
      if (str && str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    handleSaveBtnClick() {
      if (this.validate()) {
        this.save();
      }
    },
    handleUpdateBtnClick() {
      if (this.validate()) {
        this.save();
      }
    },
    initialize() {
      this.langData = [
        {
          group: "",
          page_name: "",
          gl_key: "",
          en_value: "",
          dn_value: "",
          sv_value: ""
        }
      ];
    },
    getTranslationData() {
      adminTranslationApi(this.$axios)
        .get()
        .then(data => {
          this.langData = data.data.data;
        })
        .catch(() => {});
    },
    storeTranslationData(items) {
      this.isLoading = true;
      adminTranslationApi(this.$axios)
        .store({
          status: 1,
          page_name: items.page_name,
          group: items.group,
          gl_key: items.gl_key,
          en_value: items.en_value,
          dn_value: items.dn_value,
          sv_value: items.sv_value
        })
        .then(data => {
          this.langData.push(data.data.data);
          this.serverErrors = [];
          this.$toast.success("The item is created successfully.");
          this.close();
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateTranslationData(items, editIndex) {
      this.isLoading = true;
      adminTranslationApi(this.$axios)
        .update({
          status: 1,
          id: items.id,
          page_name: items.page_name,
          group: items.group,
          gl_key: items.gl_key,
          en_value: items.en_value,
          dn_value: items.dn_value,
          sv_value: items.sv_value
        })
        .then(data => {
          Object.assign(this.langData[editIndex], data.data.data);
          this.$toast.success("The item is updated successfully.");
          console.log(data);
          this.close();
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.langData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateTranslationData(this.editedItem, this.editedIndex);
      } else {
        this.storeTranslationData(this.editedItem);
      }
    }
  }
};
</script>

<style></style>
