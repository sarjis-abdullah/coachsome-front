<template>
  <div>
    <client-only>
      <tiptap-vuetify
        v-model="description"
        :extensions="extensions"
        :placeholder="$t('hint_instructions')"
        counter="35"
        maxlength="150"
        :card-props="{ flat: true, outlined: true, dense: true, color: '#9FAEC2' }"
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
      description: "",
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
  // watch: {
  //   value: {
  //     immediate: true,
  //     deep: true,
  //     handler(newValue, oldValue) {
        
  //     }
  //   }
  // },
  created(){
    this.description = this.value;
  },
  watch: {
    description(val) {
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
  &__content{
    p{
      color: #6F8098 !important;
    }
  }
}

</style>
