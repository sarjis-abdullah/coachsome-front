<template>
  <div class="single-image-lightbox">
    <div class="single-image-lightbox__top-section">
      <div>
        <div
          v-for="(item, i) in badges"
          :key="i"
          class="single-image-lightbox-badge"
        >
          <v-tooltip top max-width="170px" v-if="badgeKey == item.key">
            <template v-slot:activator="{ on, attrs }">
              <v-img
                height="48"
                width="44"
                v-bind="attrs"
                v-on="on"
                :src="item.image"
                alt="badge"
              />
            </template>
            <p
              :style="{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
                textAlign: 'center',
                width: '100%'
              }"
            >
              {{ $t(item.t_key) }}
            </p>
          </v-tooltip>
        </div>
      </div>
      <img
        class="single-image-lightbox__img"
        :src="src"
        alt="Image"
        @click="showMultiple"
      />
    </div>
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
import { badgeData } from "@/data";

export default {
  props: {
    src: String,
    title: String,
    badgeKey: {
      type: String,
      default: badgeData.NO_RANK
    }
  },
  components: {},
  data() {
    return {
      badges: [
        {
          key: badgeData.TOP,
          image: require("@/assets/images/badges/top.png"),
          t_key: "badge_top_tooltip_txt"
        },
        {
          key: badgeData.POPULAR,
          image: require("@/assets/images/badges/popular.png"),
          t_key: "badge_pupular_tooltip_txt"
        },
        {
          key: badgeData.TRENDING,
          image: require("@/assets/images/badges/trending.png"),
          t_key: "badge_trending_tooltip_txt"
        },
        {
          key: badgeData.RISING,
          image: require("@/assets/images/badges/rising.png"),
          t_key: "badge_rising_tooltip_txt"
        }
      ],
      imgs: "",
      visible: false,
      index: 0,
      badgeData: { ...badgeData }
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
  &__top-section {
    position: relative;
    .single-image-lightbox__img {
      cursor: pointer;
    }
    .single-image-lightbox-badge {
      position: absolute;
      bottom: -13px;
      right: 0;
    }
  }
}
</style>
