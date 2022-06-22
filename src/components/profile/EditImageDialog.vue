<template>
  <div class="edit-image-dialog">
      <v-card class="edit-image-dialog__wrapper body-bg" elevation="0" >
        <v-card-title class="d-none d-md-block">
          <v-row>
              <v-col cols="12" class="py-0 px-0">
              <v-btn
                  color="#49556A"
                  icon
                  large
                  @click="handleCloseBtnClick"
                  class="exercise__close-button"
              >
                  <v-icon>mdi-close</v-icon>
              </v-btn>
              </v-col>
              <v-col cols="12" class="pt-0">
              <span class="subtitle">{{$t("profile_edit_image_title_profile_image")}}</span>
              </v-col>
          </v-row>
        </v-card-title>


        <v-divider class="d-none d-md-block"></v-divider>

        <v-card-text class="pt-5">
          <v-row>
            <v-col v-show="isOriginalCropperShowing" cols="12" md="3" sm="12">
              <v-card class="mx-auto body-bg" elevation="0" tile>
                <div class="subtitle">
                  {{ $t("profile_edit_image_title_original_image") }}
                </div>
                <cropper
                  ref="originalCropper"
                  :src="imgSrc"
                  :stencil-props="{
                    handlers: {},
                    movable: false,
                    scalable: false
                  }"
                  image-restriction="stencil"
                  :stencilSize="
                    ({ boundaries }) => {
                      return {
                        width: boundaries.width,
                        height: boundaries.height
                      };
                    }
                  "
                />

                <v-card-actions>
                  <v-btn
                    @click.prevent="showFileChooser"
                    icon
                    x-small
                    fab
                    color="primary-light-1"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn
                    @click="handleRemoveBtnClick"
                    outlined
                    icon
                    x-small
                    fab
                    color="primary-light-1"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col v-show="isFileUploadBtnShowing" cols="12" md="3" sm="12">
              <div>
                <div class="subtitle">
                  {{ $t("profile_edit_image_title_profile_image") }}
                </div>
                <div
                  :class="['dropZone', dragging ? 'dropZone-over' : '']"
                  @dragenter="dragging = true"
                  @dragleave="dragging = false"
                >
                  <div class="dropZone-info" @drag="showFileChooser">
                    <span class="fa fa-cloud-upload dropZone-title"></span>
                    <span class="dropZone-title">
                      {{ $t("profile_edit_image_drop_file_or_click_upload") }}
                    </span>
                    <div class="dropZone-upload-limit-info">
                      <div>
                        {{ $t("profile_edit_image_maximum_file_size") }}
                      </div>
                    </div>
                  </div>
                  <input
                    ref="input"
                    type="file"
                    name="image"
                    accept="image/*"
                    @change="setImage"
                  />
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <div class="subtitle">
                {{ $t("profile_edit_image_title_square_image") }}
              </div>
              <cropper
                classname="cropper"
                :src="imgSrc"
                imageClassname="imageCropClassCustom"
                backgroundClassname="backgroundCropClassCustom"
                :stencil-props="{
                  minAspectRatio: 1 / 1,
                  maxAspectRatio: 1 / 1
                }"
                ref="squareCropper"
              ></cropper>
              <div
                v-if="isShowingCroppingPlaceHolder"
                class="crop-placeholder"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <div class="subtitle">
                {{ $t("profile_edit_image_title_landscape_cropper") }}
              </div>
              <cropper
                classname="cropper"
                :src="imgSrc"
                imageClassname="imageCropClassCustom"
                backgroundClassname="backgroundCropClassCustom"
                :stencil-props="{
                  minAspectRatio: 16 / 9,
                  maxAspectRatio: 16 / 9
                }"
                ref="landscapeCropper"
              ></cropper>
              <div
                v-if="isShowingCroppingPlaceHolder"
                class="crop-placeholder"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <div class="subtitle">
                {{ $t("profile_edit_image_title_portrait_cropper") }}
              </div>
              <cropper
                classname="cropper"
                :src="imgSrc"
                imageClassname="imageCropClassCustom"
                backgroundClassname="backgroundCropClassCustom"
                ref="portraitCropper"
              ></cropper>
              <div
                v-if="isShowingCroppingPlaceHolder"
                class="crop-placeholder"
              />
            </v-col>
            <v-col cols="12">
                <v-footer class="px-7 pb-5 d-md-none" color="#f7fafc" inset app bottom fixed > 
                  <v-row>
                      <v-col cols="12" >
                        <v-btn
                          v-if="isShowingCroppedBtn"
                          :loading="isLoadingCroppedBtn"
                          color="success"
                          depressed
                          :disabled="imgSrc == null"
                          tile
                          @click="handleCroppedBtnClick"
                          style="width: 200px; border-radius: 5px"
                          :block="$vuetify.breakpoint.smAndDown"
                        >
                          {{ $t("crop") }}
                        </v-btn>
                        <v-btn
                          dark
                          v-if="isShowingSaveBtn"
                          :loading="isLoadingSaveBtn"
                          color="primary-light-1"
                          depressed
                          tile
                          @click="handleSaveBtnClick"
                          style="width: 200px; border-radius: 5px"
                          :block="$vuetify.breakpoint.smAndDown"
                        >
                          {{ $t("profile_edit_image_btn_label_save") }}
                        </v-btn>
                      </v-col>
                  </v-row>
                </v-footer>
            </v-col>
          </v-row>
          
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions class="px-5 d-none d-md-block">
          <v-btn
            v-if="isShowingCroppedBtn"
            :loading="isLoadingCroppedBtn"
            color="success"
            depressed
            :disabled="imgSrc == null"
            tile
            @click="handleCroppedBtnClick"
            style="width: 200px; border-radius: 5px"
            :block="$vuetify.breakpoint.smAndDown"
          >
            {{ $t("crop") }}
          </v-btn>
          <v-btn
            dark
            v-if="isShowingSaveBtn"
            :loading="isLoadingSaveBtn"
            color="primary-light-1"
            depressed
            tile
            @click="handleSaveBtnClick"
            style="width: 200px; border-radius: 5px"
            :block="$vuetify.breakpoint.smAndDown"
          >
            {{ $t("profile_edit_image_btn_label_save") }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { sharedProfileApi } from "@/api";

export default {
  props: ["show", "isDeleted"],
  components: {
    Cropper
  },
  data() {
    return {
      file: "",
      dragging: false,
      dialog: false,
      imgSrc: null,
      image: {},
      isLoadingSaveBtn: false,
      cropper: {
        original: {
          cropData: null
        },
        square: {
          cropData: null
        },
        landscape: {
          cropData: null
        },
        portrait: {
          cropData: null
        }
      },
      isCropped: false,
      isLoadingCroppedBtn: false,
      cropped: {
        original: null,
        square: null,
        landscape: null,
        portrait: null
      }
    };
  },
  watch: {
    isDeleted(val) {
      if (val) {
        this.imgSrc = null;
      }
    },
    show(val) {
      this.dialog = val;
      this.isCropped = false;
      if (val) {
        this.getImages();
      }
    },
    dialog(val) {
      if (!val) {
        this.$emit("hide");
      }
    }
  },
  computed: {
    isFileUploadBtnShowing() {
      return !this.imgSrc;
    },
    isOriginalCropperShowing() {
      return this.imgSrc;
    },
    isShowingSaveBtn() {
      return this.imgSrc && this.isCropped;
    },
    isShowingCroppedBtn() {
      return !this.isCropped;
    },
    isShowingCroppingPlaceHolder() {
      return !this.imgSrc;
    },
    extension() {
      return this.file ? this.file.name.split(".").pop() : "";
    }
  },
  created(){
    this.getImages();
  },
  methods: {
    async handleProfileImageDelete() {
      try {
        const { data } = await sharedProfileApi(this.$axios).destroyImages();
        if (data.image) {
          this.$store.dispatch("updateUserImage", null);
          this.$toast.success("Successfully destroy your profile image.");
        }
        this.imgSrc = null;
      } catch (error) {
        console.log(error);
      }
    },
    async handleSaveBtnClick() {
      try {
        this.isLoadingSaveBtn = true;
        const { data } = await sharedProfileApi(this.$axios).uploadImages({
          ...this.cropped
        });
        if (data.image) {
          this.$auth.fetchUser();
          this.$emit("uploaded");
          this.$toast.success("Successfully saved your profile image.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingSaveBtn = false;
      }
    },
    async getImages(images) {
      try {
        const { data } = await sharedProfileApi(this.$axios).getImages(images);
        if (data.image) {
          this.image = data.image;
          if (data.image.original) {
            this.imgSrc = data.image.original;
          } else {
            this.imgSrc = data.image.old;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleRemoveBtnClick() {
      this.handleProfileImageDelete();
    },
    handleCroppedBtnClick() {
      this.isLoadingCroppedBtn = true;

      // let p1 = new Promise(resolve => {
        const originalCropperResult = this.$refs.originalCropper.getResult();
        if (originalCropperResult.canvas) {
          originalCropperResult.canvas.toBlob(
            blob => {
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                this.cropper.original.cropper = reader.result;
                // this.cropped.original = reader.result;
              };
            },
            "image/jpeg",
            0.0008
          );
        }
      // });

      // let p2 = new Promise(resolve => {
        const squareCropperResult = this.$refs.squareCropper.getResult();
        if (squareCropperResult.canvas) {
          squareCropperResult.canvas.toBlob(
            blob => {
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                this.cropper.square.cropper = reader.result;
                this.cropped.square = reader.result;
              };
            },
            "image/jpeg",
            0.2
          );
        }
      // });
      // let p3 = new Promise(resolve => {
        const landscapeCropperResult = this.$refs.landscapeCropper.getResult();
        if (landscapeCropperResult.canvas) {
          landscapeCropperResult.canvas.toBlob(
            blob => {
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                this.cropper.landscape.cropper = reader.result;
                this.cropped.landscape = reader.result;
              };
            },
            "image/jpeg",
            0.0008
          );
        }
      // });
      // let p4 = new Promise(resolve => {
        const portraitCropperResult = this.$refs.portraitCropper.getResult();
        if (portraitCropperResult.canvas) {
          portraitCropperResult.canvas.toBlob(
            blob => {
              let reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                this.cropper.portrait.cropper = reader.result;
                this.cropped.portrait = reader.result;
              };
            },
            "image/jpeg",
            0.0008
          );
        }
        this.isLoadingCroppedBtn = false;
        this.isCropped = true;
        console.log( this.cropped);
      // });

      // Promise.all([p1, p2, p3, p4]).then(values => {
      //   this.isLoadingCroppedBtn = false;
      //   this.isCropped = true;
      //   console.log(values[0]);
      //   console.log(values[1]);
      //   console.log(values[2]);
      //   console.log(values[3]);
      //   this.cropped.original = values[0];
      //   this.cropped.square = values[1];
      //   this.cropped.landscape = values[2];
      //   this.cropped.portrait = values[3];
      // });
    },
    handleCloseBtnClick() {
      this.$emit("hide");
      this.imgSrc = null;
      this.isLoadingSaveBtn = false;
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    setImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.dragging = false;
        return;
      }
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$toast.error("Please select an image file");
        return;
      }
      let size = parseFloat(file.size / (1024 * 1024)).toFixed(2);

      if (size > 6) {
        this.$toast.error("Please select image size less than 5 MB");
        this.dragging = false;
        return;
      }

      if (!file.type.match("image/jpeg|image/jpg|image/png|image/gif")) {
        this.$toast.error("File type should be jpg, jpeg or png");
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
        this.$toast.error("Sorry, FileReader API not supported");
      }
    }
  }
};
</script>

<style lang="scss">
.edit-image-dialog {
  &__wrapper {
    height: auto;
    .subtitle{
      font-family: $font-family!important;
      font-style: normal !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      line-height: 24px !important;
      padding-bottom: 5px!important;
      display: flex;
      align-items: center;
      text-transform: capitalize !important;
      color: #49556A !important;
    }
    .dropZone {
      width: 100%;
      height: 200px;
      position: relative;
      border: 2px dashed #becce1;
      &-info {
        color: #a8a8a8;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0, -50%);
        text-align: center;
      }
      &-title {
        color: #787878;
      }
      & input {
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
      &-upload-limit-info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
      }
      &-over {
        background: #5c5c5c;
        opacity: 0.8;
      }
    }
    .dropZone:hover {
      border: 2px solid $primary-light-1;
    }
    .dropZone:hover .dropZone-title {
      color: $primary-light-1;
    }

    .crop-placeholder {
      width: 100%;
      height: 200px;
      background: #ccc;
    }
  }
}
</style>
