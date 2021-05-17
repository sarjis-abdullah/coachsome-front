<template>
  <v-card>
    <v-row>
      <v-col cols="12" :md="imageArea" class="pt-0 pb-0">
        <v-img :src="displayImage" class="grey darken-1" height="200px"></v-img>
      </v-col>

      <v-col cols="12" md="8" class="pb-0 pt-0">
        <div class="grey--text ml-4 mt-4">
          <span v-if="item.name">
            <v-icon small>person</v-icon>
            <span class="person-text">
              {{ item.name }}
            </span>
          </span>
          <span class="ml-1" v-if="item.date">
            <v-icon small>calendar_today</v-icon>
            <span class="calender-text">
              {{ item.date }}
            </span>
          </span>
        </div>
        <v-card-title class="text-ellipsis">
          {{ item.title }}
        </v-card-title>

        <v-card-subtitle class="text-ellipsis">
          <span v-html="truncate(item.body,60)"> </span>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            v-if="isShowingReadMoreBtn"
            color="primary-light-1"
            text
            x-small
            @click="readMoreBtnClickHandle"
          >
            {{ $t("blog_post_card_btn_label_read_more") }}
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      Default: "",
    },
    date: {
      type: String,
      Default: "",
    },
    landscape: {
      type: Boolean,
      Default: false,
    },
    title: {
      type: String,
      Default: "",
    },
    body: {
      type: String,
      Default: "",
    },
    image: {
      type: String,
    },
  },
  data: () => ({
    show: false,
    defaultImage:
      "https://icons.iconarchive.com/icons/mat-u/camill/128/Filetype-default-icon.png",
  }),
  computed: {
    imageArea() {
      return this.landscape ? "4" : 12;
    },
    displayImage() {
      return this.item.image == "" ? this.defaultImage : this.item.image;
    },
    isShowingReadMoreBtn() {
      return this.item.body && this.item.body.length != 0 ? true : false;
    },
  },
  methods: {
    truncate: function(value, limit) {
      if (value.length > limit) {
        value = value.substring(0, limit - 3) + "...";
      }
      return value;
    },
    readMoreBtnClickHandle() {
      this.$emit("on-read-more-btn-click");
    },
  },
};
</script>

<style lang="scss">
.calender-text {
  font-size: 10px;
}
.person-text {
  font-size: 10px;
}
</style>
