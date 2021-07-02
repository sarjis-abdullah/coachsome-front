<template>
  <div id="silentbox-gallery">
    <slot />
    <div
      v-for="(image, index) in previewGallery"
      :key="index"
      class="silentbox-item"
    >
      <div
        v-if="removeable"
        class="remove-btn"
        @click.stop="handleRemoveBtnClick(index)"
      ></div>
      <div class="play-btn" v-if="image.type == 'video'">
        <img
          style="width: 50px;height: 50px;"
          :src="require('@/assets/images/public-profile/play-btn.svg')"
          alt=""
        />
      </div>
      <img
        @click.prevent="openOverlay(image, index)"
        :loading="lazyLoading ? 'lazy' : 'eager'"
        :src="image.thumbnail"
        :alt="image.alt"
        :width="image.thumbnailWidth"
        :height="image.thumbnailHeight"
      />
    </div>
    <silentbox-overlay
      v-if="overlay.visible"
      :overlay-item="overlay.item"
      :visible="overlay.visible"
      :total-items="totalItems"
      @closeSilentboxOverlay="hideOverlay"
      @requestNextSilentBoxItem="showNextItem"
      @requestPreviousSilentBoxItem="showPreviousItem"
    />
  </div>
</template>

<script>
import overlay from "./Overlay";
import itemMixin from "./mixins/item";
export default {
  name: "DarkboxGallery",
  mixins: [itemMixin],
  props: {
    lazyLoading: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    removeable: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    previewCount: {
      type: Number,
      default: null
    },
    gallery: {
      type: Array,
      default: () => {
        return [];
      }
    },
    image: {
      type: Object,
      default: () => {
        return {
          src: "",
          alt: "",
          thumbnailWidth: "auto",
          thumbnailHeight: "auto",
          thumbnail: "",
          autoplay: false,
          controls: true,
          description: ""
        };
      }
    }
  },
  components: {
    "silentbox-overlay": overlay
  },
  data() {
    return {
      overlay: {
        item: {
          src: "",
          alt: "",
          thumbnailWidth: "auto",
          thumbnailHeight: "auto",
          thumbnail: "",
          autoplay: false,
          controls: true,
          description: ""
        },
        visible: false,
        currentItem: 0
      }
    };
  },
  computed: {
    totalItems() {
      return this.gallery.length || 1;
    },
    previewGallery() {
      if (Number.isInteger(this.previewCount)) {
        return this.gallery.slice(0, this.previewCount).map(item => {
          return {
            ...this.overlay.item,
            ...item,
            thumbnail: this.setThumbnail(item),
            autoplay: this.setAutoplay(item)
          };
        });
      }
      return this.galleryItems;
    },
    galleryItems() {
      if (this.gallery.length > 0) {
        return this.gallery.map(item => {
          return {
            ...this.overlay.item,
            ...item,
            thumbnail: this.setThumbnail(item),
            autoplay: this.setAutoplay(item)
          };
        });
      }
      // return [
      //   {
      //     ...this.overlay.item,
      //     ...this.image,
      //     thumbnail: this.setThumbnail(this.image)
      //   }
      // ];
    }
  },
  methods: {
    handleRemoveBtnClick(index) {
      this.$emit("item-remove", index);
    },
    openOverlay(image, index = 0) {
      this.overlay.visible = true;
      this.overlay.item = image;
      this.overlay.currentItem = index;
      this.$emit("silentbox-overlay-opened", { item: image });
    },
    hideOverlay() {
      this.overlay.visible = false;
      this.$emit("silentbox-overlay-hidden", { item: this.overlay.item });
    },
    showNextItem() {
      let newItemIndex = this.overlay.currentItem + 1;
      newItemIndex =
        newItemIndex <= this.galleryItems.length - 1 ? newItemIndex : 0;
      this.overlay.item = this.galleryItems[newItemIndex];
      this.overlay.currentItem = newItemIndex;
      this.$emit("silentbox-overlay-next-item-displayed", {
        item: this.overlay.item
      });
    },
    showPreviousItem() {
      let newItemIndex = this.overlay.currentItem - 1;
      newItemIndex =
        newItemIndex > -1 ? newItemIndex : this.galleryItems.length - 1;
      this.overlay.item = this.galleryItems[newItemIndex];
      this.overlay.currentItem = newItemIndex;
      this.$emit("silentbox-overlay-previous-item-displayed", {
        item: this.overlay.item
      });
    },
    setAutoplay(item) {
      return item.autoplay ? "autoplay" : "";
    },
    setThumbnail(item) {
      if (this.isEmbedVideo(item.src) && item.thumbnail === undefined) {
        return this.getThumbnail(item.src);
      }
      return item.thumbnail || item.src;
    }
  }
};
</script>

<style lang="scss" scoped>
.silentbox-item {
  cursor: pointer;
  display: inline-block;
  text-decoration: underline;
}
/* silentbox */
#silentbox-gallery img {
  width: 100%;
}
@media only screen and (min-width: 1024px) {
  #silentbox-gallery {
    column-count: 4;
    column-gap: 1em;
  }
}
/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  #silentbox-gallery {
    column-count: 3;
    column-gap: 1em;
  }
}
/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  #silentbox-gallery {
    column-count: 2;
    column-gap: 1em;
  }
}
/* silentbox */

.silentbox-item {
  position: relative;
  .play-btn {
    position: absolute;
    top: 36%;
    left: 40%;
  }
  .remove-btn {
    &:before {
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
    &:before,
    &:after {
      background: red;
      content: "";
      height: 2px;
      right: 5px;
      position: absolute;
      top: 10px;
      transition: 250ms ease;
      width: 10px;
    }
  }
}
</style>
