<template>
  <div>
    <client-only>
      <tiptap-vuetify
        v-model="value"
        :extensions="extensions"
        :placeholder="$t('hint_instructions')"
        counter="35"
        maxlength="150"
        :card-props="{ flat: true, outlined: true, dense: true, color: '#9e9e9e' }"
        class="mb-4"
      />
    </client-only>
  </div>
</template>
<script>
import { TiptapVuetify, Bold, Italic,Underline,  BulletList, OrderedList, ListItem } from 'tiptap-vuetify'

export default {
  props: ["value",],
  components: {
    TiptapVuetify
  },
  data() {
    return {
      extensions: [
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        ListItem
      ],

    };
  },
  watch: {
    value(val) {
      this.$emit("updated", val);
    }
  }
};
</script>

<style lang="scss">

</style>
