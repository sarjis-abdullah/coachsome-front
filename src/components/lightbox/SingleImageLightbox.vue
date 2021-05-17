<template>
  <div class="single-image-lightbox">
    <img
      class="single-image-lightbox__img"
      :src="src"
      alt="Image"
      @click="showMultiple"
    />
    <client-only>
      <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    title: String
  },
  components: {},
  data() {
    return {
      imgs: "",
      visible: false,
      index: 0
    };
  },
  methods: {
    showMultiple() {
      this.imgs = [
        {
          title: this.title,
          src: this.src
        }
      ];
      this.index = 0;
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
.single-image-lightbox {
  &__img {
    cursor: pointer;
  }
}
</style>
