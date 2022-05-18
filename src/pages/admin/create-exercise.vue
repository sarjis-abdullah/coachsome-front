<template>
    <v-container fluid class="pt-0 mt-0">

        <!-- Header start -->
        <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('ex_create')">
        <template v-slot:goBack>
            <v-btn
            icon
            @click="handleBack"
            >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
            </v-btn>
        </template>
        <template v-slot:action>
            <span></span>
        </template>
        </mobile-top-nav>

        <v-row>
            <v-col cols="12">

                <!-- Video Upload Dialog -->

                <v-dialog
                v-model="uploadVideoDialog"
                max-width="400px"
                >
                <v-card class="pa-5">
                    <v-card-title class="pt-0 mt-0">
                    <span class="upload-video-title">Choose a video</span>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="#49556A"
                            icon
                            @click="uploadVideoDialog = false"
                            class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <div class="line"></div>
                    </v-card-title>
                    <v-card-body>
                    <v-row>
                        <v-col cols="12" >
                        <template>
                            <VueFileAgent
                            class="px-15 py-10"
                            ref="exerciseFile"
                            :theme="'grid'"
                            :multiple="true"
                            :deletable="true"
                            :meta="true"
                            :accept="'video/*'"
                            :maxSize="'20MB'"
                            :maxFiles="1"
                            :helpText="'Choose images or video files'"
                            :errorText="{
                                type: 'Invalid file type. Only images or zip Allowed',
                                size: 'Files should not exceed 20MB in size',
                            }"
                            @select="filesSelected($event)"
                            v-model="fileRecords"
                            >
                            <template v-slot:file-preview-new>
                            <div style="padding: 50px 0" key="new">
                                <img
                                :src="require('@/assets/img/svg-icons/image-upload.svg')"
                                alt=""
                                />
                            </div>
                            </template >
                            
                            </VueFileAgent>
                        </template>
                        </v-col>
                    </v-row>
                    </v-card-body>
                </v-card>
                </v-dialog>

                <!-- <v-card class="create-exercise">
                    <v-card-text>
                      <v-container> -->
                    <v-row>
                        <v-col cols="12" class="px-5 py-10">
                            <v-form
                            ref="form"
                            v-model="exerciseCreate.valid"
                            lazy-validation
                            class="mb-10"
                            >
                            <v-row class="create-exercise">
                                <v-col cols="12" class="pb-0 mb-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_name")}} <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                    <v-text-field
                                        outlined
                                        dense
                                        :label="$t('hint_name')"
                                        v-model="exerciseCreate.initialValue.name"
                                        :rules="[v => !!v || 'Exercise Name is required']"
                                        required
                                        class="create-exercise__input-field"
                                    />
                                </v-col>
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_instructions")}} <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                    <ExerciseEditor
                                    :value="exerciseCreate.initialValue.instructions"
                                    @updated="handleTiptopUpdatedValue"
                                    />
                                </v-col>
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_video")}}
                                    </p>
                                    <v-form ref="videoForm" v-model="videoForm.valid" lazy-validation>
                                        <v-text-field
                                            :label="$t('hint_video')"
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
                                            outlined
                                            dense
                                            class="create-exercise__input-field"
                                            @change="saveVideoUrl()"
                                        ></v-text-field>
                                    </v-form>
                                </v-col>
                                <v-col cols="12" class="py-0 my-0">
                                    <v-btn
                                        text
                                        color="#15577C"
                                        class="px-0"
                                        @click="uploadVideoDialog = true"
                                    >
                                        <img class="btn-icon"  :src="require('@/assets/images/icons/video-url.svg')" alt="">  <span class="btn-text"> {{$t("ex_upload_video")}}</span>
                                    </v-btn>
                                </v-col>



                                <!-- image upload -->
                                <v-col cols="12">
                                    <div class="create-exercise__label pb-2">{{$t("ex_up_photos")}}</div>
                                    <div class="create-exercise__description pb-2">
                                        {{$t("ex_up_photos_desc")}}
                                    </div>
                                    <v-row>
                                        <v-col cols="12" sm="3"  v-if="links != ''" v-for="(link, index) in links" v-bind:key="index">
                                        <v-badge 
                                            top
                                            avatar
                                            color="rgb(0 0 0 / 0%) !important"
                                            :offset-x="{'15' : !$vuetify.breakpoint.xsOnly}"
                                            offset-y="15" 
                                            style="width: 100%; height: 200px;"
                                        >
                                            <v-btn style="height:22px!important; width:22px!important"  slot="badge" x-small fab color="#49556A" @click="handleRemoveBtnClick(index)">
                                                <v-icon color="white" x-small >mdi-close</v-icon>
                                            </v-btn>
                                            <asset-view :url="link.url" :asset_type="link.type"></asset-view>
                                        </v-badge>   
                                        </v-col>
                                        <v-col cols="12" sm="3" v-if="imgSrc">
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
                                            <v-card-actions class="justify-center py-0 my-0">
                                            <v-btn
                                                @click="handleImageUploadBtnClick"
                                                class="text-normal"
                                                text
                                                x-small
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
                                                x-small
                                                depressed
                                                color="red"
                                                dark
                                                >{{ $t("Cancel") }}</v-btn
                                            >
                                            </v-card-actions>
                                        </v-card>
                                        </v-col>
                                        <v-col cols="12" sm="3">

                                            <div
                                                class="drop-zone"
                                                @dragenter="dragging = true"
                                                @dragleave="dragging = false"
                                            >
                                                <div class="drop-zone__info" @drag="showFileChooser">
                                                <div class="drop-zone__icon">
                                                    <img
                                                    :src="require('@/assets/img/svg-icons/image-upload.svg')"
                                                    alt=""
                                                    />
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
                                    </v-row>

                                </v-col>

                                <v-col cols="12">
                                <span class="create-exercise--breakdown">{{$t("lbl_ex_brk")}}</span>
                                </v-col>


                                <!-- Category Section -->
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_cat")}} </p>
                                    <v-autocomplete
                                        v-model="categoriesSelected"
                                        :items="categories"
                                        :item-text="$t('t_key')"
                                        return-object
                                        chips
                                        clearable
                                        :label="$t('hint_cat_ex')"
                                        :menu-props="{closeOnContentClick: true}"
                                        outlined
                                        multiple
                                        dense
                                        persistent-hint
                                        autocomplete="off"
                                        class="create-exercise__input-field"
                                    >
                                        <template
                                        v-slot:selection="{ attrs, item, select, selected }"
                                        >
                                        <v-chip
                                            v-bind="attrs"
                                            :input-value="selected"
                                            small
                                            label
                                            @click="select"
                                            close
                                            @click:close="removeCategory(item)"
                                        >
                                            <strong>{{ item.name }}</strong
                                            >&nbsp;
                                        </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                            {{ data.item.name }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                <!-- Sports Section -->
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_sport")}} </p>
                                    <v-autocomplete
                                        v-model="sportsSelected"
                                        :items="sports"
                                        :item-text="$t('t_key')"
                                        return-object
                                        chips
                                        multiple
                                        clearable
                                        :label="$t('hint_sport_ex')"
                                        :menu-props="{closeOnContentClick: true}"
                                        outlined
                                        dense
                                        persistent-hint
                                        autocomplete="off"
                                        class="create-exercise__input-field"
                                    >
                                        <template
                                        v-slot:selection="{ attrs, item, select, selected }"
                                        >
                                        <v-chip
                                            v-bind="attrs"
                                            :input-value="selected"
                                            small
                                            label
                                            @click="select"
                                            close
                                            @click:close="removeSport(item)"
                                        >
                                            <strong>{{ item.name }}</strong
                                            >&nbsp;
                                        </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                            {{ data.item.name }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                <!-- lavel Section -->
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_lvl")}} </p>
                                    <v-autocomplete
                                        v-model="lavelsSelected"
                                        :items="lavels"
                                        :item-text="$t('t_key')"
                                        return-object
                                        chips
                                        clearable
                                        :label="$t('hint_sport_ex')"
                                        :menu-props="{closeOnContentClick: true}"
                                        outlined
                                        dense
                                        multiple
                                        persistent-hint
                                        autocomplete="off"
                                        color="#9FAEC2"
                                        class="create-exercise__input-field"
                                    >
                                        <template
                                        v-slot:selection="{ attrs, item, select, selected }"
                                        >
                                        <v-chip
                                            v-bind="attrs"
                                            :input-value="selected"
                                            small
                                            label
                                            @click="select"
                                            close
                                            @click:close="removeLavel(item)"
                                        >
                                            <strong>{{ item.name }}</strong
                                            >&nbsp;
                                        </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                            {{ data.item.name }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                <!-- Tags -->
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_tags")}} </p>
                                    <v-combobox
                                        v-model="tagData.tagsSelected"
                                        :items="tagData.tags"
                                        clearable
                                        :label="$t('hint_tags_ex')"
                                        multiple
                                        outlined
                                        dense
                                        append-icon
                                        color="#9FAEC2"
                                        class="create-exercise__input-field"
                                    >
                                        <template
                                        v-slot:selection="{ attrs, item, select, selected }"
                                        >
                                        <v-chip
                                            v-bind="attrs"
                                            :input-value="selected"
                                            close
                                            @click="select"
                                            @click:close="removeTag(item)"
                                            label
                                            small
                                        >
                                            <strong>{{ item }}</strong
                                            >&nbsp;
                                        </v-chip>
                                        </template>
                                    </v-combobox>
                                </v-col>
                                <v-col cols="12" class="pt-0 mt-0">
                                    <v-btn
                                        elevation="2"
                                        color="#15577C"
                                        class="create-exercise__button px-5"
                                        @click="handleCreateExercise"
                                        block
                                    >
                                        {{$t("create_ex_btn")}}
                                    </v-btn>
                                </v-col>

                            </v-row>
                            </v-form>
                        </v-col>
                    </v-row>
                      <!-- </v-container>
                    </v-card-text>
                  </v-card> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import AssetView from '@/components/exercise/AssetView.vue';
import ExerciseEditor from "@/components/editor/ExerciseEditor";
import { imageService } from "@/services";
import {  ExerciseApi } from "@/api";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { pathData } from "@/data";

export default ({
  layout: "admin",
  components: {
    MobileTopNav,
    AssetView,
    ExerciseEditor,
    Cropper
  },
  data() {
    return { 
        exerciseCreate: {
            dialog: false,
            valid: true,
            initialValue: {
            name: "",
            instructions: "",
            }
        },
        videoForm: {
            valid: true,
            isLoading: false
        },
        url: {
            image: "",
            video: ""
        },
        links: [],
        categories: [],
        categoriesSelected: [],
        sports: [],
        sportsSelected: [],
        lavels: [],
        lavelsSelected: [],
        uploadVideoDialog: false,
        file: "",
        dragging: false,
        imgSrc: null,
        fileRecords: [],
        uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
        fileRecordsForUpload: [],
        name: '',
        success: '',
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
        tagData: {
            tags: [],
            tagsSelected: []
        },
    }
  },
    created() {
        this.langCode = this.$i18n.locale;
        this.fetchCategories();
        this.fetchSports();
        this.fetchLavels();
    },
  methods:{

    handleTiptopUpdatedValue(value) {
      this.exerciseCreate.initialValue.instructions = value;
    },


    async fetchLavels() {
      const locale = this.$store.getters.getCurrLang;
      try {
        const { data } = await ExerciseApi(
          this.$axios
        ).getLavels({ locale });
        data.lavels.forEach(item => {
          this.lavels.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.lavels.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error.response);
      }
    },

    async fetchCategories() {
      const locale = this.$store.getters.getCurrLang;
      try {
        const { data } = await ExerciseApi(
          this.$axios
        ).getCategories({ locale });
        data.categories.forEach(item => {
          this.categories.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.categories.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error.response);
      }
    },

    async fetchSports() {
      const locale = this.$store.getters.getCurrLang;
      try {
        const { data } = await ExerciseApi(
          this.$axios
        ).getSports({ locale });
        data.sportCategories.forEach(item => {
          this.sports.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
          this.sports.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.sports.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error.response);
      }
    },
    saveVideoUrl() {
      if (this.$refs.videoForm.validate()) {
        let payload = {
          url: this.url.video,
          type: "video"
        };
        this.videoForm.isLoading = true;
        ExerciseApi(this.$axios)
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
    uploadFiles: function () {

      var form = new FormData();

      form.append('type', 'custom-video');
      form.append('file',this.fileRecordsForUpload[0].file);
      
      this.$axios.post( '/exercise-assets',
        form,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(({ data }) => {
        this.links.push(Object.assign(data.item, { src: data.item.url }));
        this.$toast.success(data.message);
        this.setImageAndVideoProgress(data.progress);
        this.imgSrc = null;
        this.$refs.fileInput.value = null;
        this.fileRecordsForUpload = [],
        this.fileRecords = [];
        this.uploadVideoDialog = false;
      })
      .catch(function(){})
      .finally(() => {
        this.isLoading = false;
      });
      
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      this.uploadFiles();
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
    uploadImage(croppedImage) {
      let payload = {
        type: "image",
        image: croppedImage
      };
      console.log(payload);
      this.isLoading = true;
      ExerciseApi(this.$axios)
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
        ExerciseApi(this.$axios)
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
    },
    handleRemoveBtnClick(linkIndex) {
      let id = this.links[linkIndex].id;
      ExerciseApi(this.$axios)
        .removeItem(id)
        .then(response => {
          if (response.data.status == "success") {
            this.$toast.success(response.data.message);
            this.links.splice(linkIndex, 1);
            this.loadingLimit = this.loadingLimit - 1;
          }
        })
        .catch(() => {});
    },
    handleCreateExercise(){

      if(this.$auth && this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        var role = 1
      }else{
        role = 2
      }

      let payload = {};
      payload.name = this.exerciseCreate.initialValue.name;
      payload.instructions = this.exerciseCreate.initialValue.instructions;
      payload.assets = this.links;
      payload.category = this.categoriesSelected;
      payload.sport = this.sportsSelected;
      payload.lavel = this.lavelsSelected;
      payload.tags = this.tagData.tagsSelected;
      payload.type = role;

      //  if (this.$refs.form.validate()) {
        ExerciseApi(this.$axios)
          .createExercise(payload)
          .then(({ data }) => {
            if (data.exercise) {
              this.$toast.success("This Exercise has been created successfully.");
              this.$router.push(this.localePath(pathData.admin.exercises));
            }
          })
          .catch(({ response }) => {
            const { data } = response;
            if (data.message) {
              this.$toast.error(data.message);
            }
          });
      // }

    },
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.exercises));
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
    removeCategory(item) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(item), 1);
      this.categoriesSelected = [...this.categoriesSelected];
    },
    removeSport(item) {
      this.sportsSelected.splice(this.sportsSelected.indexOf(item), 1);
      this.sportsSelected = [...this.sportsSelected];
    },
    removeLavel(item) {
      this.lavelsSelected.splice(this.lavelsSelected.indexOf(item), 1);
      this.lavelsSelected = [...this.lavelsSelected];
    },
    removeTag(item){
      this.tagData.tagsSelected.splice(this.tagData.tagsSelected.indexOf(item), 1);
      this.tagData.tagsSelected = [...this.tagData.tagsSelected];
    },
  }

    
})
</script>
<style lang="scss" scoped>
    .create-exercise{
        iframe{
            max-height: 160px;
            max-width: 160px;
            border-radius: 10px!important;
            margin: 5px;
        }
        &__title{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 25px;
            line-height: 34px;
            color: #49556A;
        }
        &__img{
            max-height: 155px;
            max-width: 155px;
            border-radius: 10px!important;
            margin: 5px;
        }
        &__description{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            display: flex;
            align-items: center;
            color: #9FAEC2;
            padding-bottom: 15px;
        }
        &__close-button{
            //
        }
        &__button{
            text-transform: none;
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            color: #ECF2F7;
        }
        &__label{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            display: flex;
            align-items: center;
            color: #49556A;
        }
        &__input-field{
            color: #9FAEC2!important;
        }
        &--breakdown{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 25px;
            line-height: 34px;
            color: #49556A;
        }
    }


    .drop-zone {
        width: 155px;
        height: 155px;
        border-radius: 15px;
        position: relative;
        border: 2px dashed #becce1;
        margin-top: 5px;
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
    .upload-video-title{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        color: #49556A;
    }
</style>