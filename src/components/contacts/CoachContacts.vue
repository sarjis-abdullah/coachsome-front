<template>
  <section class="contacts-table__parent">
    <section>
      <v-card-title class="px-0">
        <header>
          <h6 class="left-title">Total Contacts: 4</h6>
        </header>
        <v-spacer />
        <section class="grid grid-cols-3-max-max gap-5">
          <div>
            <v-text-field
              dense
              label="Search"
              outlined
              prepend-inner-icon="mdi-magnify"
              hide-details
              class="search__text-field"
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
    <section class="contacts-table__wrapper">
      <table class="contacts-table">
        <thead>
          <tr>
            <th>
              <img
                :src="require('@/assets/img/svg-icons/checkbox.svg')"
                alt="checkbox"
                class="custom-checkbox"
              />
            </th>
            <th>
              Name
              <img
                :src="require('@/assets/img/svg-icons/keyboard-arrow-down.svg')"
                alt="keyboard-arrow-down"
              />
            </th>
            <th>
              Status
              <img
                :src="require('@/assets/img/svg-icons/keyboard-arrow-down.svg')"
                alt="keyboard-arrow-down"
              />
            </th>
            <th>
              Category
              <img
                :src="require('@/assets/img/svg-icons/keyboard-arrow-down.svg')"
                alt="keyboard-arrow-down"
              />
            </th>
            <th>
              Active Packages
              <img
                :src="require('@/assets/img/svg-icons/keyboard-arrow-down.svg')"
                alt="keyboard-arrow-down"
              />
            </th>
            <th class="text-center">
              Last Active
              <img
                :src="require('@/assets/img/svg-icons/keyboard-arrow-down.svg')"
                alt="keyboard-arrow-down"
              />
            </th>
            <th>
              <span></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, i) in contactsData">
            <CoachContactsSingleData :contact="item" :key="i" />
          </template>
        </tbody>
      </table>
    </section>
    <v-dialog v-model="toggleContactForm" persistent max-width="680">
      <v-card>
        <ContactForm
          @close-modal="toggleContactForm = !toggleContactForm"
        />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import CoachContactsSingleData from "@/components/contacts/CoachContactsSingleData";
import ContactForm from "@/components/contacts/ContactForm";
export default {
  components: {
    CoachContactsSingleData,
    ContactForm
  },
  data() {
    return {
      toggleContactForm: false,
      contactsData: [
        {
          package: {
            name: "Package_Name"
          }
        },
        {},
        {}
      ]
    };
  },
  methods: {
    showContactForm() {
      this.toggleContactForm = true;
    }
  }
};
</script>

<style>
.contacts-table {
  width: 100%;
  text-align: left;
}
.contacts-table td {
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  background-color: #ffffff;
  padding: 8px 24px;
}

.contacts-table th {
  font-weight: 600;
  padding: 12px 24px;
}

.contacts-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #ecf2f7;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #49556a;
}
.contacts-table th:first-child {
  border-top-left-radius: 12px;
}
.contacts-table th:last-child {
  border-top-right-radius: 12px;
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
.contacts-table .custom-checkbox {
  padding-left: 12px;
}
.contacts-table__parent .add-new-contact-btn {
  background: #15577c !important;
  border-radius: 10px;
  padding: 19px !important;
  text-transform: capitalize;
}
.contacts-table__parent .search__text-field {
  border-radius: 8px;
}
.contacts-table__parent .left-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #49556a;
}
.contacts-table__wrapper {
  border: 1px solid #ecf2f7;
  border-radius: 12px 12px 0 0;
}
</style>
