<template>
  <div>
    <v-card max-width="268">
      <v-card-text class="chat-settings">
        <div class="chat-settings__title">
          Pressing Enter Key will:
        </div>
        <v-radio-group v-model="enterPressValue" @change="handleItemClick">
          <v-radio color="primary-light-1" value="send_message">
            <template v-slot:label>
              <div class="primary-light-1--text">
                {{ $t("Send message") }}
              </div>
            </template>
          </v-radio>
          <v-radio color="primary-light-1" value="line_break">
            <template v-slot:label>
              <div class="primary-light-1--text">
                {{ $t("Add a line break") }}
              </div>
            </template>
          </v-radio>
        </v-radio-group>
        <v-divider></v-divider>
        <div class="chat-settings__description mt-2">
          It’s always possible to use “Shift+Enter or Ctrl+Enter to type in
          multi-line messages.
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["enterPress"],
  data() {
    return {
      enterPressValue: "send_message"
    };
  },
  watch: {
    enterPress: {
      immediate: true,
      handler: function(value) {
        this.enterPressValue = value;
      }
    }
  },
  methods: {
    handleItemClick() {
      this.$emit("update", this.enterPressValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-settings {
  &__title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
  &__description {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 11px;
    color: #000000;
  }
}
</style>
#change
