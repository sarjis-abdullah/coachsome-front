<template>
  <div class="single-image-lightbox">
    <img
      class="single-image-lightbox__img"
      :src="src"
      alt="Image"
      @click="showMultiple"
    />

    <!-- Top Badge -->
    <div class="badge" v-if="badgeKey == badgeData.TOP">
      <v-tooltip top max-width="170px">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="require('@/assets/images/badges/top.png')"
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
          {{ $t("badge_top_tooltip_txt") }}
        </p>
      </v-tooltip>
    </div>

    <!-- Popular Badge -->
    <div class="badge" v-if="badgeKey == badgeData.POPULAR">
      <v-tooltip top max-width="170px">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="require('@/assets/images/badges/popular.png')"
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
          {{ $t("badge_pupular_tooltip_txt") }}
        </p>
      </v-tooltip>
    </div>

    <!-- Trending Badge -->
    <div class="badge" v-if="badgeKey == badgeData.TRENDING">
      <v-tooltip top max-width="170px">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="require('@/assets/images/badges/trending.png')"
            alt="badge"
          />
        </template>
        <p
          :style="{
            textAlign: 'center',
            width: '100%'
          }"
        >
          {{ $t("badge_trending_tooltip_txt") }}
        </p>
      </v-tooltip>
    </div>

    <!-- Rising Badge -->
    <div class="badge" v-if="badgeKey == badgeData.RISING">
      <v-tooltip top max-width="170px">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="require('@/assets/images/badges/rising.png')"
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
          {{ $t("badge_rising_tooltip_txt") }}
        </p>
      </v-tooltip>
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
  &__img {
    cursor: pointer;
  }
  .badge {
    text-align: right;
    img {
      height: 48px;
      margin-top: -50px;
      margin-right: -5px;
      width: 44px;
      background: transparent;
    }
  }
}
</style>
