<template>
  <tr class="contacts-single-data">
    <td>
      <v-avatar>
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
          width="40"
          height="40"
        />
      </v-avatar>
    </td>
    <td>Kasper Frandsen</td>
    <td>
      <v-chip x-small>
        Active
      </v-chip>
    </td>
    <td>Online</td>
    <td>
      <span v-if="contact && contact.package">
        <img
          :src="require('@/assets/img/svg-icons/contacts-package.svg')"
          alt="contacts-package"
          class="pr-2"
        />
        {{ contact.package.name }}
      </span>

      <span v-else class="no-package">No Active Packages </span>
    </td>
    <td class="text-center">1 month ago</td>
    <td class="cursor-pointer">
      <section class="grid grid-cols-3 gap-5 justify-end">
        <img
          :src="require('@/assets/img/svg-icons/notebook.svg')"
          alt="notebook"
          @click="gotoChat"
        />
        <img :src="require('@/assets/img/svg-icons/chat.svg')" alt="chat" />
        <!-- Three Dots horizontal -->
        <template>
          <div class="text-center">
            <v-menu
              top
              offset-y
              close-on-content-click
            >
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  :src="
                    require('@/assets/img/svg-icons/three-dot-horizontal.svg')
                  "
                  alt="three-dot-horizontal"
                />
              </template>

              <v-list>
                <v-list-item v-for="(item, index) in moreItems" :key="index">
                  <v-list-item-title class="cursor-pointer">
                    <span :style="`color: ${item.color}`">
                      {{ item.text }}
                    </span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </section>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      moreItems: [
        {
          text: "Resend Invitation Email",
          color: "#000000"
        },
        {
          text: "Remove Contact",
          color: "#FF633F"
        }
      ]
    };
  },
  methods: {
    gotoChat() {
      console.log("gotoChat");
    }
  }
};
</script>
<style scoped>
.contacts-single-data {
  border: 1px solid #ecf2f7;
}
.no-package {
  color: #9faec2;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
