<template>
  <div>
    <v-list color="transparent">
      <v-list-item-group
        active-class="border"
        color="primary-light-1"
        v-model="active"
      >
        <template
          v-for="item in contacts"
          @click.stop="handleSelectedContact(item)"
        >
          <!-- Private Contact -->
          <v-list-item
            v-if="item.categoryId == contactData.CATEGORY_ID_PRIVATE"
            link
            :key="item.id"
            :value="item.id"
            @click.stop="handleSelectedContact(item)"
          >
            <v-list-item-avatar
              color="primary-light-1"
              class="d-flex justify-center"
              :size="avatarSize"
            >
              <v-img v-if="item.avatarImage" :src="item.avatarImage"></v-img>
              <div v-else v-html="item.avatarName">
                {{ item.avatarName }}
              </div>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle>
                <div v-if="item.lastMessage">
                  {{ item.lastMessage }}
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                {{ item.lastMessageTime }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <!-- Gruop Contact -->
          <v-list-item
            v-if="item.categoryId == contactData.CATEGORY_ID_GROUP"
            link
            :key="item.id"
            :value="item.id"
            @click.stop="handleSelectedContact(item)"
          >
            <v-list-item-avatar
              color="primary-light-1"
              :size="avatarSize"
              class="d-flex justify-center"
            >
              <v-img v-if="item.avatarImage" :src="item.avatarImage"></v-img>
              <img
                v-else
                :style="{ width: '20px' }"
                :src="require(`@/assets/images/icons/group.svg`)"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle>
                <div v-if="item.lastMessage">
                  {{ item.lastMessage }}
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                {{ item.lastMessageTime }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <div class="no-contact" v-if="!contacts.length">
      <img
        class="no-contact__icon"
        :src="require(`@/assets/images/icons/message-tick.svg`)"
        alt=""
      />
      <div class="no-contact__title">
        No new messages
      </div>
      <div class="no-contact__description">
        Start your first messages by getting your first customers
      </div>
    </div>
  </div>
</template>

<script>
import { contactData } from "@/data";

export default {
  props: ["avatarSize"],
  data() {
    return {
      contactData,
      active: null
    };
  },
  computed: {
    contacts() {
      return this.$store.getters["chat/contacts"];
    }
  },
  watch: {
    "$store.state.chat.selectedContact": function(val) {
      if (val) {
        this.active = val.id;
      }
    }
  },
  methods: {
    handleSelectedContact(item) {
      this.$emit("selected", item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
