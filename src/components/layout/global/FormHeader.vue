<template>
  <div>
    <div @click="$emit('close')" class="cursor-pointer">
      <img
        class="pb-5"
        :src="require('@/assets/img/svg-icons/cancel.svg')"
        alt="Cancel Button"
      />
    </div>
    <div class="form-title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    },
};
</script>

<style lang="less" scoped></style>
