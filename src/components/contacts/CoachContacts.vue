<template>
  <section class="contacts-table__parent">
    <v-data-table
      :headers="table.headers"
      :items="contactsData"
      :loading="loading"
      :options.sync="options"
      class="exercise-table"
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
              <h6 class="left-title">Total Contacts: {{ totalItems }}</h6>
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
                  Add New Contact
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
      <template v-slot:item.status="{ status }">
        <v-chip
          color="#FEE2E2"
          x-small
          text-color="#991B1B"
          style="font-weight: 500;"
        >
          Not active
        </v-chip>
      </template>
      <template v-slot:item.package="{ item }">
        <span v-if="item.package">
          <img
            :src="require('@/assets/img/svg-icons/contacts-package.svg')"
            alt="contacts-package"
            class="pr-2"
          />
          {{ item.package.name }}
        </span>

        <span v-else class="no-package">No Active Packages </span>
      </template>

      <!-- table head end -->
      <template v-slot:item.assets="{ assets }">
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
            width="40"
            height="40"
          />
        </v-avatar>
      </template>

      <template v-slot:item.actions="{ item }">
        <section class="grid grid-cols-3 gap-5 justify-end">
          <img
            :src="require('@/assets/img/svg-icons/notebook.svg')"
            alt="notebook"
            @click="gotoChat"
          />
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
          @close-modal="()=> {
            toggleContactForm = !toggleContactForm
            editMode = false
            editContactData = {}
            }"
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
      table: {
        headers: [
          {
            text: "",
            align: "start",
            filterable: false,
            value: "assets",
            sortable: false,
            class: "exercise-table--header"
          },
          { text: "Name", value: "firstName", class: "exercise-table--header" },
          { text: "Status", value: "status", class: "exercise-table--header" },
          {
            text: "Category",
            value: "categoryName",
            class: "exercise-table--header"
          },
          {
            text: "Active Package",
            value: "package",
            sortable: false,
            class: "exercise-table--header"
          },
          {
            text: "Last Active",
            value: "lastActiveAt",
            class: "exercise-table--header"
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
            class: "exercise-table--header"
          }
        ],
        rows: []
      },
      options: {
        page: 1,
        itemsPerPage: 2,
        sortBy: ["id"]
        // sortBy: ["id", "firstName", "categoryname", "email", "status"]
      },
      totalItems: null,
      editMode: false,
      editContactData: {},
    };
  },
  computed: {
    moreItems() {
      return [
        {
          text: "Edit",
          color: "#000000",
          method: this.toggleEditForm
        },
        {
          text: "Resend Invitation Email",
          color: "#000000",
          method: this.resendInvitationMail
        },
        {
          text: "Remove Contact",
          color: "#FF633F",
          method: this.removeContactUser
        }
      ];
    },
    filteredMoreItems() {
      return this.moreItems.filter(item => item.text != "Edit");
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
    }
  },
  watch: {
    paginationQuery: {
      handler() {
        this.getAllData();
        this.editMode = false
        this.editContactData = {}
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
          if (item.firstName && item.lastname) {
            name = item.firstName + " " + item.lastName;
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
    gotoChat() {
      console.log("gotoChat");
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
      this.editMode = true
      this.toggleContactForm = true
      this.editContactData = {...item}
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
