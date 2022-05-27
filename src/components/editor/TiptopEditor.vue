<template>
  <div>
    <client-only>
      <tiptap-vuetify
        v-model="innerValue"
        :extensions="extensions"
        :placeholder="$t('profile_athlete_placeholder_about_us')"
        counter="35"
        maxlength="150"
        :card-props="{ flat: true, outlined: true, dense: true, color: '#9FAEC2' }"
        class="mb-4"
      />
    </client-only>
  </div>
</template>
<script>
import { TiptapVuetify,Bold, Italic, Underline, History } from "tiptap-vuetify";

export default {
  props: ["value"],
  components: {
    TiptapVuetify
  },
  data() {
    return {
      innerValue: "",
      extensions: [Bold, Italic, Underline, History]
    };
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
    innerValue(val) {
      this.$emit("updated", val);
    }
  }
};
</script>

<style>
.v-application .grey.lighten-4 {
    background-color: #6F8098 !important;
    border-color: #6F8098 !important;
}
</style>
<style lang="scss">
.tiptap-vuetify-editor{
  &__btn-icon{
    color: white!important
  }
}

</style>
