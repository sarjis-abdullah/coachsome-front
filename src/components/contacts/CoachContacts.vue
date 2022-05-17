<template>
  <section class="contacts-table__parent">
    <v-data-table
      :headers="table.headers"
      :items="contactsData"
      :loading="loading"
      :options.sync="options"
      class="contact-user-table"
      :header-props="{ sortIcon: 'mdi-chevron-down' }"
      :footer-props="{
        'items-per-page-options': [5, 10, 15, 20, 50, 100, -1]
      }"
      :server-items-length="totalItems"
    >
      <template v-slot:top>
        <section>
          <v-card-title class="px-0">
            <header v-if="contactsData">
              <h6 class="left-title">{{$t("coach_contacts_top_left_subtitle")}}: {{ totalItems }}</h6>
            </header>
            <v-spacer />
            <section class="grid grid-cols-3-max-max gap-5">
              <div>
                <v-text-field
                  :debounce-events="['onclick', 'oninput', 'onkeydown']"
                  v-debounce:800ms="debouncedInitData"
                  dense
                  v-model="search"
                  label="Search"
                  outlined
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                ></v-text-field>
              </div>
              <div>
                <v-btn
                  @click="showContactForm"
                  class="add-new-contact-btn"
                  depressed
                  color="primary"
                >
                  {{ $t("contact_user_add_new_contact") }}
                </v-btn>
              </div>
            </section>
          </v-card-title>
        </section>
      </template>
      <!-- table head start -->

      <template v-slot:header.assets="{ header }">
        <v-checkbox></v-checkbox>
      </template>
      <template v-slot:header.actions="{ header }">
        <span></span>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          v-if="item && item.status == 'pending'"
          color="#EDB041"
          x-small
          text-color="#775D00"
          style="font-weight: 500;"
        >
          Pending
        </v-chip>
        <v-chip
          v-else-if="item && item.status == 'inactive' || !item.package"
          color="#FEE2E2"
          x-small
          text-color="#991B1B"
          style="font-weight: 500;"
        >
          Not Active
        </v-chip>
        <v-chip
          v-else-if="item && item.status == 'active'"
          color="#D1FAE5"
          x-small
          text-color="#065F46"
          style="font-weight: 500;"
        >
          Active
        </v-chip>
        
      </template>
      <template v-slot:item.package="{ item }">
        <span v-if="item.package">
          <img
            :src="require('@/assets/img/svg-icons/contacts-package.svg')"
            alt="contacts-package"
            class="pr-2"
          />
          {{ item.package.title }}
        </span>

        <span v-else class="no-package">No Active Packages </span>
      </template>

      <!-- table head end -->
      <template v-slot:item.assets="{ item }">
        <v-avatar>
          <img
            v-if="!item && item.profileUrl && item.profileUrl.square"
            :src="item.profileUrl.square"
            :alt="item.name"
            width="40"
            height="40"
          />
          <v-btn icon v-else>
            <v-icon size="50">mdi-account-box</v-icon>
          </v-btn>
        </v-avatar>
      </template>

      <template v-slot:item.actions="{ item }">
        <section class="grid grid-cols-3 gap-5 justify-end">
          <!-- <img
            :src="require('@/assets/img/svg-icons/notebook.svg')"
            alt="notebook"
            @click="gotoNotesPage"
          /> -->
          <img
            @click="
              $router.replace('/chat?contactByUserId=' + item.contactByUserId)
            "
            class="cursor-pointer"
            :src="require('@/assets/img/svg-icons/chat.svg')"
            alt="chat"
          />
          <div class="text-center">
            <v-menu top offset-y close-on-content-click>
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  :src="threeDotIcon"
                  alt="three-dot-horizontal"
                />
              </template>

              <v-list>
                <v-list-item
                  v-for="(data, index) in !item.categoryName
                    ? moreItems
                    : filteredMoreItems"
                  :key="index"
                >
                  <v-list-item-title
                    @click="handleClick(data, item)"
                    class="cursor-pointer"
                  >
                    <span :style="`color: ${data.color}`">
                      {{ data.text }}
                    </span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </section>
      </template>
    </v-data-table>
    <v-dialog v-model="toggleContactForm" max-width="680">
      <v-card>
        <ContactForm
          @close-modal="
            () => {
              toggleContactForm = !toggleContactForm;
              editMode = false;
              editContactData = {};
            }
          "
          @reloadAllData="reloadAllData"
          :editMode="editMode"
          :editContactData="editContactData"
        />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import ContactForm from "@/components/contacts/ContactForm";
import API from "@/api/coach/contactUser";
const threeDotIcon = require("@/assets/img/svg-icons/three-dot-horizontal.svg");
export default {
  components: {
    ContactForm
  },
  data() {
    return {
      threeDotIcon,
      search: "",
      toggleContactForm: false,
      loading: false,
      contactsData: [],
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: ["id"]
      },
      totalItems: null,
      editMode: false,
      editContactData: {}
    };
  },
  computed: {
    moreItems() {
      return [
        {
          text: this.$t("coach_contacts_edit"),
          key: "edit",
          color: "#000000",
          method: this.toggleEditForm
        },
        {
          text: this.$t("coach_contacts_resend_invitation_mail"),
          key: "resendInvitationEmail",
          color: "#000000",
          method: this.resendInvitationMail
        },
        {
          text: this.$t("coach_contacts_remove_contact"),
          key: "removeContact",
          color: "#FF633F",
          method: this.removeContactUser
        }
      ];
    },
    filteredMoreItems() {
      return this.moreItems.filter(item => item.key != "edit");
    },
    paginationQuery() {
      let sortBy =
        this.options.sortBy && this.options.sortBy.length
          ? this.options.sortBy
          : ["id"];
      let sortDesc = "desc";
      if (this.options.itemsPerPage === -1) {
        return `?withoutPagination=1`;
      } else {
        return `?page=${this.options.page}&per_page=${this.options.itemsPerPage}&order_direction=${sortDesc}&order_by=${sortBy}`;
      }
    },
    query() {
      const q = this.paginationQuery;
      return this.search != "" ? q + "&lazyQuery=" + this.search : q;
    },
    table() {
      return {
        headers: [
          {
            text: "",
            align: "start",
            filterable: false,
            value: "assets",
            sortable: false,
            class: "contact-user-table--header"
          },
          { text: this.$t("coach_contacts_name_header"), value: "firstName", class: "contact-user-table--header" },
          { text: this.$t("coach_contacts_status_header"), value: "status", class: "contact-user-table--header" },
          {
            text: this.$t("coach_contacts_category"),
            value: "categoryName",
            class: "contact-user-table--header"
          },
          {
            text: this.$t("coach_contacts_active_package"),
            value: "package",
            sortable: false,
            class: "contact-user-table--header"
          },
          {
            text: this.$t("coach_contacts_last_active"),
            value: "lastActiveAt",
            class: "contact-user-table--header"
          },
          {
            text: this.$t("coach_contacts_actions"),
            value: "actions",
            sortable: false,
            class: "contact-user-table--header"
          }
        ],
        rows: []
      }
    },
  },
  watch: {
    paginationQuery: {
      handler() {
        this.getAllData();
        this.editMode = false;
        this.editContactData = {};
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.getAllData();
  },
  methods: {
    showContactForm() {
      this.toggleContactForm = true;
    },
    async getAllData(query = this.paginationQuery) {
      this.loading = true;
      try {
        const response = await API(this.$axios).getAllContactUsers(query);
        this.contactsData = response.data.data;
        this.contactsData = this.contactsData.map(item => {
          let name = item.email;
          if (item.firstName && item.lastName) {
            name = item.firstName + " " + item.lastName;
          }
          if (item.bookedItems && item.bookedItems.length) {
            let data = item.bookedItems[0];
            if (data?.order?.package_snapshot) {
              data = JSON.parse(data.order.package_snapshot);
            }
            if (data?.details) {
              item.package = data.details;
            }
          }
          return { ...item, name };
        });
        this.totalItems = response?.data?.meta?.total;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async reloadAllData() {
      await this.getAllData();
    },
    gotoNotesPage() {
      console.log("gotoNotesPage");
    },
    async resendInvitationMail(item) {
      try {
        this.loading = true;
        const response = await API(this.$axios).resendInvitationMail(
          "?id=" + item.id
        );
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async removeContactUser(item) {
      try {
        this.loading = true;
        const response = await API(this.$axios).removeContactUser(item.id);
        this.getAllData();
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    toggleEditForm(item) {
      this.editMode = true;
      this.toggleContactForm = true;
      this.editContactData = { ...item };
    },
    debouncedInitData() {
      this.getAllData(this.query);
    },
    handleClick(item, data) {
      item.method(data);
    }
  }
};
</script>

<style lang="scss">
.contacts-table__parent {
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    padding: 8px 20px !important;
  }

  .v-menu {
    &__content {
      background: #ffffff !important;
      border-radius: 10px !important;
    }
  }
  .v-data-table-header {
    background-color: #ecf2f7;
  }
  ::v-deep .v-data-table {
    border-radius: 5px;
  }
  .v-data-table-header th span {
    font-family: "Open Sans" !important;
    font-style: normal !important;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #49556a;
  }
  .grid {
    display: grid;
  }
  .grid-cols-3 {
    grid-template-columns: max-content max-content max-content;
  }
  .gap-5 {
    gap: 20px;
  }
  .left-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #49556a;
  }
}
</style>
