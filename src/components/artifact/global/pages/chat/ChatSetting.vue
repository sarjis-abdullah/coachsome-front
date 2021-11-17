<template>
  <div>
    <v-card max-width="268">
      <v-card-text class="chat-settings">
        <div class="chat-settings__title">
          {{ $t("chat_setting_enter_key_will") }}
        </div>
        <v-radio-group v-model="enterPressValue" @change="handleItemClick">
          <v-radio color="primary-light-1" value="send_message">
            <template v-slot:label>
              <div class="primary-light-1--text">
                {{ $t("chat_settings_label_send_message") }}
              </div>
            </template>
          </v-radio>
          <v-radio color="primary-light-1" value="line_break">
            <template v-slot:label>
              <div class="primary-light-1--text">
                {{ $t("chat_settings_add_a_line_break") }}
              </div>
            </template>
          </v-radio>
        </v-radio-group>
        <v-divider></v-divider>
        <div class="chat-settings__description mt-2">
          {{ $t("chat_settings_description") }}
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
