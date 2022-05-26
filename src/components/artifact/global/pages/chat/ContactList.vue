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
                {{
                  item.lastMessageTime
                    ? moment(item.lastMessageTime)
                        .locale($i18n.locale)
                        .format("DD MMM HH:mm")
                    : ""
                }}
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
                {{
                  item.lastMessageTime
                    ? moment(item.lastMessageTime)
                        .locale($i18n.locale)
                        .format("DD MMM HH:mm")
                    : ""
                }}
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
        {{ $t("chat_contact_list_no_contact_title") }}
      </div>
      <div class="no-contact__description px-4">
        {{ $t("chat_contact_list_no_contact_desc") }}
      </div>
    </div>
  </div>
</template>

<script>
import { contactData } from "@/data";
import moment from "moment";

export default {
  props: ["avatarSize"],
  data() {
    return {
      moment,
      contactData,
      active: null
    };
  },
  computed: {
    contacts() {
      this.$store.dispatch("chat/setNavOnChat", false);
      return this.$store.getters["chat/contacts"];
    }
  },
  watch: {
    "$store.state.chat.selectedContact": function(val) {
      if (val) {
        this.active = val.id;
      }
    },
    '$route': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.$route?.query?.contactAbleUserId && this.contacts?.length && !this.$route?.query.checkContactUserQuery) {
          const item = this.contacts.find(item=> item.connectionUserId == this.$route?.query?.contactAbleUserId)
          if (item) {
            const query = {
              ...this.$route?.query,
              checkContactUserQuery: true
            }
            this.$router.push({query})
            this.$emit("selected", item);
          }
        }
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

<style lang="scss" scoped>
.no-contact{
  &__description{
    word-break: keep-all;
  }
}
</style>
