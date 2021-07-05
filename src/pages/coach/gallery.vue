<template>
  <div class="coach-gallery-page">
    <v-container fluid class="page-container gallery-page">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="page-title">{{ $t("page_title_image_and_video") }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <div class="section-title pb-2">{{ $t("text_video") }}</div>
          <div class="section-description">
            {{ $t("image_and_video_vidoe_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="6">
              <v-form ref="videoForm" v-model="videoForm.valid" lazy-validation>
                <v-text-field
                  label="Enter a valid youtube or vimoe url"
                  :rules="[
                    v => !!v || 'Youtube or vimoe url is required',
                    v =>
                      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/.test(
                        v
                      ) ||
                      /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(
                        v
                      ) ||
                      'Url is not valid'
                  ]"
                  v-model="url.video"
                  :loading="videoForm.isLoading"
                  dense
                  solo
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn color="primary-light-1" dark @click="saveVideoUrl()">{{
                $t("btn_label_add")
              }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <div class="section-title pb-2">{{ $t("text_image") }}</div>
          <div class="section-description">
            {{ $t("image_and_video_img_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-row justify="start" align="center">
            <v-col cols="12" md="4">
              <div
                class="drop-zone"
                @dragenter="dragging = true"
                @dragleave="dragging = false"
              >
                <div class="drop-zone__info" @drag="showFileChooser">
                  <div class="drop-zone__icon">
                    <img
                      :src="require('@/assets/images/gallery/upload.svg')"
                      alt=""
                    />
                  </div>
                  <div class="drop-zone__title mt-5">
                    Drag a photo or click to
                  </div>
                  <div class="drop-zone__browse-btn">
                    Browse
                  </div>
                  <div class="drop-zone__limit-info"></div>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  @change="setImage"
                />
              </div>
            </v-col>
            <v-col cols="12" md="8" v-if="imgSrc">
              <v-card outlined elevation="0" color="transparent">
                <v-card-text>
                  <cropper
                    classname="cropper"
                    :src="imgSrc"
                    imageClassname="imageCropClassCustom"
                    backgroundClassname="backgroundCropClassCustom"
                    :stencil-props="{
                      minAspectRatio: 1 / 1,
                      maxAspectRatio: 1 / 1
                    }"
                    ref="imageCropper"
                  ></cropper>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    @click="handleImageUploadBtnClick"
                    class="text-normal"
                    text
                    depressed
                    :loading="isLoading"
                    color="primary-light-1"
                    dark
                    >{{ $t("Upload") }}</v-btn
                  >
                  <v-btn
                    @click="handleCancelBtnClick"
                    class="text-normal"
                    text
                    depressed
                    color="red"
                    dark
                    >{{ $t("Cancel") }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <div class="section-title pb-2">{{ $t("text_gallery") }}</div>
          <div class="section-description">
            {{ $t("image_and_video_gallery_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <darkbox-gallery
                :gallery="links"
                removeable
                @item-remove="handleDarkboxGalleryItemRemove"
              ></darkbox-gallery>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                v-if="showLoadMoreBtn"
                :loading="loadMoreBtnLoading"
                color="primary-light-1"
                @click="triggerLoadMoreBtn"
                text
                >Load More</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="d-sm-flex d-xs-flex d-lg-none">
        <v-col cols="12" class="mx-0 px-0">
          <client-back-footer class="px-0 py-0" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { coachAssetApi } from "@/api";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import DarkboxGallery from "@/components/darkbox/Gallery";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  layout: "coach",
  components: {
    ClientBackFooter,
    DarkboxGallery,
    Cropper
  },
  data() {
    return {
      file: "",
      dragging: false,
      imgSrc: null,
      videoForm: {
        valid: true,
        isLoading: false
      },
      loadMoreBtnLoading: false,
      isLoading: false,
      loadingLimit: 8,
      imageUpload: {
        image: "",
        hasImage: false,
        dialog: false,
        uploadedImage: null
      },
      url: {
        image: "",
        video: ""
      },
      links: []
    };
  },
  methods: {
    handleCancelBtnClick() {
      this.imgSrc = null;
    },
    handleImageUploadBtnClick() {
      const imageCropperResult = this.$refs.imageCropper.getResult();
      if (imageCropperResult.canvas) {
        imageCropperResult.canvas.toBlob(blob => {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.uploadImage(reader.result);
          };
        }, "image/png");
      }
    },
    showFileChooser() {
      this.$refs.fileInput.click();
    },
    setImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.dragging = false;
        return;
      }
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }

      if (file.size >= 10240000) {
        alert("Please check file size no over 10 MB.");
        this.dragging = false;
        return;
      }

      if (!file.type.match("image/jpeg|image/jpg|image/png|image/gif")) {
        alert("File type should be jpg, jpeg or png");
        this.dragging = false;
        return;
      }

      this.file = file;
      this.dragging = false;
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          this.$emit("image-selected");
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    setImageAndVideoProgress(val) {
      this.$store.dispatch("pageProgress/setImageAndVideoProgress", val);
    },
    triggerLoadMoreBtn() {
      this.loadMoreBtnLoading = true;
      setTimeout(() => {
        this.loadingLimit += 4;
        this.loadMoreBtnLoading = false;
      }, 3000);
    },
    handleDarkboxGalleryItemRemove(linkIndex) {
      let id = this.links[linkIndex].id;
      coachAssetApi(this.$axios)
        .removeGallery(id)
        .then(response => {
          if (response.data.status == "success") {
            this.$toast.success(response.data.message);
            this.links.splice(linkIndex, 1);
            this.loadingLimit = this.loadingLimit - 1;
          }
        })
        .catch(() => {});
    },
    // setImage: function(output) {
    //   this.imageUpload.hasImage = true;
    //   this.imageUpload.image = output;
    // },
    uploadImage(croppedImage) {
      let payload = {
        type: "image",
        image: croppedImage
      };
      this.isLoading = true;
      coachAssetApi(this.$axios)
        .saveImageUrl(payload)
        .then(({ data }) => {
          this.links.push(Object.assign(data.item, { src: data.item.url }));
          this.$toast.success(data.message);
          this.setImageAndVideoProgress(data.progress);
          this.imgSrc = null;
          this.$refs.fileInput.value = null;
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
    saveVideoUrl() {
      if (this.$refs.videoForm.validate()) {
        let payload = {
          url: this.url.video,
          type: "video"
        };
        this.videoForm.isLoading = true;
        coachAssetApi(this.$axios)
          .saveVideoUrl(payload)
          .then(({ data }) => {
            this.$toast.success(data.message);
            this.links.push(Object.assign(data.item, { src: data.item.url }));
            this.setImageAndVideoProgress(data.progress);
            this.url.video = "";
            this.$refs.videoForm.reset();
          })
          .catch(() => {})
          .finally(() => {
            this.videoForm.isLoading = false;
          });
      }
    },
    validateVideoUrl() {
      let validate = true;
      if (this.url.video.length == 0) {
        this.$toast.error(
          this.$i18n.t("image_and_video_validation_url_should_not_empty")
        );
        validate = false;
      }
      return validate;
    }
  },
  created() {
    coachAssetApi(this.$axios)
      .gallery()
      .then(({ data }) => {
        this.links = data.items.map(item => {
          return {
            id: item.id,
            type: item.type,
            src: item.url
          };
        });
      })
      .catch(() => {});
  },
  computed: {
    showLoadMoreBtn() {
      return this.links.length > 0 && this.loadingLimit < this.links.length;
    }
  }
};
</script>

<style lang="scss">
.coach-gallery-page {
  background: $body-bg;
  height: 100%;

  .drop-zone {
    width: 100%;
    height: 200px;
    position: relative;
    border: 2px dashed #eee;
    &__info {
      color: #a8a8a8;
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translate(0, -50%);
      text-align: center;
      .drop-zone__title {
        color: #787878;
      }
      .drop-zone__limit-info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
      }
      .drop-zone__over {
        background: #5c5c5c;
        opacity: 0.8;
      }
      .drop-zone__browse-btn {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        text-align: center;
        color: $primary-light-1;
      }
    }
    input {
      position: absolute;
      cursor: pointer;
      top: 0px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .gallery-page {
    #fileInput {
      display: none;
    }

    /* silentbox */
    #silentbox-gallery a img {
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
  }
}
</style>
