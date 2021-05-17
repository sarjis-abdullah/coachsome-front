<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{ $t("page_title_translation") }}</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-header color="white">
          <v-card-title>
            <span class="title">{{ formTitle }}</span>
          </v-card-title>
        </v-card-header>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <div v-if="serverErrors">
                <div v-for="(value, key) in serverErrors" :key="key">
                  <v-alert v-if="value.gl_key" :value="true" type="error">
                    <span v-if="value.gl_key[0]"
                      >The key has already been taken. please change the key
                      name.</span
                    >
                  </v-alert>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <h5 class="py-1">Page name</h5>
              <v-text-field
                v-model="editedItem.page_name"
                label="Page name"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="py-1">Group name</h5>
              <v-text-field
                v-model="editedItem.group"
                label="Group name"
                placeholder="Group name"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="py-1">Key Name</h5>
              <span v-if="this.editedIndex === -1">
                <v-text-field
                  v-model="editedItem.gl_key"
                  label="Key Name"
                  solo
                  data-vv-name="Key"
                  v-validate="'required'"
                ></v-text-field>
              </span>
              <span v-else>
                <v-text-field
                  v-model="editedItem.gl_key"
                  label="Key Name"
                  solo
                  disabled
                  data-vv-name="Key"
                  v-validate="'required'"
                ></v-text-field>
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <h5 class="py-1">English</h5>
              <v-textarea
                solo
                v-model="editedItem.en_value"
                name="input-7-4"
                label="English"
                data-vv-name="english"
                v-validate="'required'"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <h5 class="py-1">Danish</h5>
              <v-textarea
                solo
                v-model="editedItem.dn_value"
                name="input-7-4"
                label="Danish"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <h5 class="py-1">Swedish</h5>
              <v-textarea
                solo
                v-model="editedItem.sv_value"
                name="input-7-4"
                label="Swedish"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <span v-if="this.editedIndex === -1">
            <v-btn color="success" class="mr-3" @click="validateBeforeSubmit"
              >Save</v-btn
            >
          </span>
          <span v-else>
            <v-btn color="success" class="mr-3" @click="validateBeforeUpdate"
              >Update</v-btn
            >
          </span>
          <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog -->

    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-row justify="center" align="center">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  solo
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  @click="dialog = true"
                  color="primary-light-1"
                  depressed
                  dark
                  >{{ $t("btn_label_translation_add") }}</v-btn
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
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
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { adminTranslationApi } from "@/api";

export default {
  layout: "admin",
  data: () => ({
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
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    isLoading: false,
    fullPage: true,
    serverErrors: [],
    langData: [],

    pagination: {
      rowsPerPage: 20
    },
    editedIndex: -1,
    editedItem: {
      group: " ",
      gl_key: "",
      en_value: "",
      dn_value: "",
      sv_value: "",
      page_name: ""
    },
    defaultItem: {
      group: "",
      gl_key: "",
      en_value: "",
      dn_value: "",
      sv_value: "",
      page_name: ""
    }
  }),
  components: {},
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
    truncate(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.snackbar = true;
          this.save();
          this.$validator.reset();
        }
      });
    },
    validateBeforeUpdate() {
      this.save();
      this.$validator.reset();
    },
    initialize() {
      this.langData = [
        {
          group: "button",
          gl_key: "",
          en_value: "",
          dn_value: "",
          sv_value: "",
          page_name: ""
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
      adminTranslationApi(this.$axios)
        .store({
          gl_key: items.gl_key,
          status: 1,
          en_value: items.en_value,
          dn_value: items.dn_value,
          sv_value: items.sv_value,
          page_name: items.page_name,
          group: items.group
        })
        .then(data => {
          this.langData.push(data.data.data);
          this.serverErrors = [];
          this.close();
        })
        .catch(error => {
          this.isLoading = false;
          this.serverErrors = Object.values(error.response.data);
        });
    },
    updateTranslationData(items, editIndex) {
      adminTranslationApi(this.$axios)
        .update({
          gl_key: items.gl_key,
          status: 1,
          en_value: items.en_value,
          dn_value: items.dn_value,
          sv_value: items.sv_value,
          page_name: items.page_name,
          group: items.group
        })
        .then(data => {
          Object.assign(this.langData[editIndex], data.data.data);
          this.close();
        })
        .catch(() => {});
    },
    editItem(item) {
      this.editedIndex = this.langData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.langData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.langData.splice(index, 1);
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
