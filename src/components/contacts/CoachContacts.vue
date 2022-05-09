<template>
  <section
    class=""
    style="border: 1px solid #ECF2F7;
    border-radius: 12px 12px 0 0;"
  >
    <table class="contacts-table">
      <thead>
        <tr>
          <th>
            <img
              :src="require('@/assets/img/svg-icons/checkbox.svg')"
              alt="checkbox"
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
          <CoachContactsSingleData :contact="item" :key="i"/>
        </template>
      </tbody>
    </table>
  </section>
</template>

<script>
import CoachContactsSingleData from "@/components/contacts/CoachContactsSingleData"
export default {
  components: {
    CoachContactsSingleData,
  },
  data() {
    return {
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
</style>
