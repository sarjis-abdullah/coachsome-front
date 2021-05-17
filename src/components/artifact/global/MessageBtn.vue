<template>
  <div>
    <div v-if="totalNewMessageCount > 0">
      <v-badge :color="badgeColor" bordered overlap>
        <v-btn
          class="text-normal"
          v-bind="{ ...$props }"
          @click="btnClickHandle"
        >
          <slot></slot>
        </v-btn>
        <template v-slot:badge>
          {{ totalNewMessageCount }}
        </template>
      </v-badge>
    </div>
    <div v-else>
      <v-btn class="text-normal" v-bind="{ ...$props }" @click="btnClickHandle">
        <slot></slot>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary-light-1",
    },
    text: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    badgeColor: {
      type: String,
      default: "red",
    },
    to: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      notifications: [],
      selectedNotification: [],
    };
  },
  computed: {
    totalNewMessageCount() {
      return this.$store.getters["chat/totalNewMessageCount"];
    },
  },
  methods: {
    btnClickHandle() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped></style>
