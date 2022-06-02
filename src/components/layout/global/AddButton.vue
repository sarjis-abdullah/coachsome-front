<template>
  <div>
    <v-btn @click="$emit('add')" class="white--text" depressed color="#15577C">
      {{ title }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
