<template>
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
      <v-col cols="12" md="4">
        <v-text-field v-model="url.video" solo></v-text-field>
      </v-col>
      <v-col cols="12" md="2" class="mt-2">
        <v-btn block color="primary-light-1" dark @click="saveVideoUrl()">{{
          $t("btn_label_add")
        }}</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <div class="section-title pb-2">{{ $t("text_image") }}</div>
        <div class="section-description">
          {{ $t("image_and_video_img_desc") }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <!-- Image Upload Dialog -->
        <v-dialog v-model="imageUpload.dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="url.image" v-on="on" solo></v-text-field>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Upload Image</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <image-uploader
                      :preview="true"
                      :className="[
                        'fileinput',
                        { 'fileinput--loaded': imageUpload.hasImage }
                      ]"
                      capture="environment"
                      :debug="1"
                      doNotResize="gif"
                      :autoRotate="true"
                      outputFormat="verbose"
                      @input="setImage"
                    >
                      <label for="fileInput" slot="upload-label">
                        <figure>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              class="path1"
                              d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                            />
                          </svg>
                        </figure>
                        <span class="upload-caption">
                          {{
                            imageUpload.hasImage ? "Replace" : "Click to upload"
                          }}
                        </span>
                      </label>
                    </image-uploader>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="imageUpload.dialog = false"
                >Close</v-btn
              >
              <v-btn
                color="blue darken-1"
                v-if="imageUpload.hasImage"
                text
                @click="uploadImage()"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Image Upload Dialog -->
      </v-col>
      <v-col cols="12" md="2" class="mt-2">
        <v-btn block color="primary-light-1" dark @click="saveImageUrl()">{{
          $t("btn_label_add")
        }}</v-btn>
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
            <darkbox-gallery :gallery="links" removeable @item-remove="handleDarkboxGalleryItemRemove"></darkbox-gallery>
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
</template>

<script>
import { coachAssetApi } from "@/api";
import { imageService } from "@/services";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import DarkboxGallery from "@/components/darkbox/Gallery";

export default {
  layout: "coach",
  components: {
    ClientBackFooter,
    DarkboxGallery
  },
  data() {
    return {
      loadMoreBtnLoading: false,
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
    handleDarkboxGalleryItemRemove(linkIndex){
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
    setImage: function(output) {
      this.imageUpload.hasImage = true;
      this.imageUpload.image = output;
    },
    uploadImage() {
      // this.imageUpload.dialog = false
      let payload = {
        url: this.url.image,
        type: "image",
        image: this.imageUpload.image.dataUrl
      };

      coachAssetApi(this.$axios)
        .saveImageUrl(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.setImageAndVideoProgress(response.data.progress);
            this.$toast.success(response.data.message);
            this.imageUpload.uploadedImage = response.data.gallery;
            this.url.image = imageService.getImageByName(
              response.data.gallery.file_name
            );
            this.imageUpload.dialog = false;
          }
        })
        .catch(() => {});
    },
    saveImageUrl() {
      if (this.validateImageUrl()) {
        this.imageUpload.uploadedImage.url = this.url.image;
        this.links.push(this.imageUpload.uploadedImage);
        this.url.image = "";
      }
    },
    validateImageUrl() {
      let validate = true;
      if (this.url.image.length == 0) {
        this.$toast.error(
          this.$i18n.t("image_and_video_validation_url_should_not_empty")
        );
        validate = false;
      }
      return validate;
    },
    saveVideoUrl() {
      if (this.validateVideoUrl()) {
        let payload = {
          url: this.url.video,
          type: "video"
        };

        coachAssetApi(this.$axios)
          .saveVideoUrl(payload)
          .then(res => {
            if (res.data.status == "success") {
              this.$toast.success(res.data.message);
              this.setImageAndVideoProgress(res.data.progress);
              this.links.push(res.data.gallery);
              this.url.video = "";
            }
          })
          .catch(() => {});
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
      .then(response => {
        response.data.forEach(item => {
          if (item.type == "image") {
            item.src = imageService.getImageByName(item.file_name);
          } else if (item.type == "video") {
            item.src = item.url;
          } else {
            item.src = "";
          }
          return item;
        });
        this.links = response.data;
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
</style>
