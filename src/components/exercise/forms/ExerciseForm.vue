<template>
    <v-container fluid class="body-bg">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="12" xs="12">
                <!-- video Upload dialog start -->
                <VideoUpload 
                    :videoDialog="uploadVideoDialog" 
                    @videoUploaded="handleCustomVideo($event)" 
                    @cancelVideoUpload="uploadVideoDialog = false" 
                />
                <!-- video Upload dialog end -->
                
                <v-card elevation="0" class="body-bg">
                    <v-card-title v-if="$vuetify.breakpoint.mdAndUp">
                    <v-row>
                        <v-col cols="12" class="py-0 px-0">
                        <v-btn
                            color="#49556A"
                            icon
                            large
                            @click="handleCloseExercise"
                            class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        </v-col>
                        <v-col cols="12" class="pt-0">
                        <span class="create-exercise__title">{{$t(exercisePropsData.id != null ? "ex_edit" : "ex_create")}}</span>
                        </v-col>
                    </v-row>
                    </v-card-title>
                    <v-card-text :class="{'px-0' : $vuetify.breakpoint.smAndDown}">
                        <v-form
                            ref="form"
                            v-model="exerciseCreate.valid"
                            lazy-validation
                            class="create-exercise"
                        >
                            <v-row>
                                <v-col cols="12" class="pb-0 mb-0" >
                                    <p class="create-exercise__label">{{$t("lbl_ex_name")}} <v-badge color="#f7fafc"><span style="color: red">*</span></v-badge></p>
                                    <v-text-field
                                        outlined
                                        dense
                                        :label="$t('hint_name')"
                                        v-model="exercisePropsData.name"
                                        :rules="[v => !!v || 'Exercise Name is required']"
                                        required
                                        class="create-exercise__input-field"
                                    />
                                </v-col>
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_instructions")}} <v-badge color="#f7fafc"><span style="color: red">*</span></v-badge></p>
                                    <ExerciseEditor
                                        :value="exercisePropsData.instructions"
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
                                        <v-col cols="12" sm="3"  v-if="exercisePropsData.links != ''" v-for="(link, index) in exercisePropsData.links" v-bind:key="index">
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
                                                v-if="exercisePropsData.links.length <=3"
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
                                    <span class="exercise-preview--breakdown">{{$t("lbl_ex_brk")}}</span>
                                </v-col>

                                <!-- Category Section -->
                                <v-col cols="12" class="py-0 my-0">
                                    <p class="create-exercise__label">{{$t("lbl_ex_cat")}} </p>
                                    <v-autocomplete
                                        v-model="exercisePropsData.categoriesSelected"
                                        :items="exercisePropsData.categories"
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
                                        v-model="exercisePropsData.sportsSelected"
                                        :items="exercisePropsData.sports"
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
                                        v-model="exercisePropsData.lavelsSelected"
                                        :items="exercisePropsData.lavels"
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
                                <v-col cols="12" class="py-0 my-0" >
                                    <p class="create-exercise__label">{{$t("lbl_ex_tags")}} </p>
                                    <v-combobox
                                        v-model="exercisePropsData.tagsSelected"
                                        :items="exercisePropsData.tags"
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
                                <v-col cols="12" class="pt-0 mt-0 px-0">
                                    <v-btn
                                        elevation="2"
                                        color="#15577C"
                                        class="create-exercise__button px-5"
                                        @click="handleSaveExercise"
                                        v-if="$vuetify.breakpoint.mdAndUp"
                                    >
                                        {{$t(exercisePropsData.id != null ? "ex_save" : "create_ex_btn")}}
                                    </v-btn>
                                    <v-footer :class="{'px-10' : $vuetify.breakpoint.smAndUp}" v-else color="#f7fafc" class="pb-5" inset app bottom fixed > 
                                    <v-row>
                                        <v-col cols="12" >
                                            <v-btn
                                            elevation="2"
                                            color="#15577C"
                                            class="create-exercise__button px-5"
                                            @click="handleSaveExercise"
                                            block
                                            >
                                            {{$t(exercisePropsData.id != null ? "ex_save" : "create_ex_btn")}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    </v-footer>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import AssetView from '@/components/exercise/AssetView.vue';
import ExerciseEditor from "@/components/editor/ExerciseEditor";
import {  ExerciseApi } from "@/api";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { pathData } from "@/data";
import VideoUpload from '@/components/exercise/forms/VideoUpload'

export default ({
    layout: "admin",
    components: {
        AssetView,
        ExerciseEditor,
        Cropper,
        VideoUpload
    },
    props: 
    {
        exerciseNewData: {
            type: Object,
            default: () => {
                return [];
            }
        },
        
    },
    data() {
        return { 
            exerciseCreate: {
                valid: true,
            },
            videoForm: {
                valid: true,
                isLoading: false
            },
            url: {
                image: "",
                video: ""
            },
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
            exercisePropsData: {}
        }
    },
    watch:{
        instructions(value) {
            this.handleTiptopUpdatedValue(value)
        },
    },

    created () {
        this.exercisePropsDataevent()
    },
    methods:{
        exercisePropsDataevent () {
            this.exercisePropsData = JSON.parse(JSON.stringify(this.exerciseNewData));
        },
        handleCloseExercise(){
            this.$emit("closeCreateDialog");
        },

        handleTiptopUpdatedValue(value) {
        this.exercisePropsData.instructions = value;
        },

        handleCustomVideo(video){
            this.exercisePropsData.links.push(Object.assign(video, { src: video.url }));
            this.uploadVideoDialog = false;
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
                this.exercisePropsData.links.push(Object.assign(data.item, { src: data.item.url }));
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
            this.exercisePropsData.links.push(Object.assign(data.item, { src: data.item.url }));
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
            this.exercisePropsData.links.push(Object.assign(data.item, { src: data.item.url }));
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
                this.exercisePropsData.links.push(Object.assign(data.item, { src: data.item.url }));
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
        let id = this.exercisePropsData.links[linkIndex].id;
        ExerciseApi(this.$axios)
            .removeItem(id)
            .then(response => {
            if (response.data.status == "success") {
                this.$toast.success(response.data.message);
                this.exercisePropsData.links.splice(linkIndex, 1);
                this.loadingLimit = this.loadingLimit - 1;
            }
            })
            .catch(() => {});
        },

        handleSaveExercise(){

            if(this.$auth && this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
                var role = 1
            }else{
                role = 2
            }

            let payload = {};

            payload.name = this.exercisePropsData.name;
            payload.instructions = this.exercisePropsData.instructions;
            payload.assets = this.exercisePropsData.links;
            payload.category = this.exercisePropsData.categoriesSelected;
            payload.sport = this.exercisePropsData.sportsSelected;
            payload.lavel = this.exercisePropsData.lavelsSelected;
            payload.tags = this.exercisePropsData.tagsSelected;
            payload.type = role;

            if(this.exercisePropsData.id != null){
                payload.id = this.exercisePropsData.id;
                this.$emit("saveExerciseData", payload);
            }else{
                this.$emit("newExerciseAdded", payload);
            }
            
            this.resetData();
        },

        resetData() {
        this.fileRecordsForUpload = [],
        this.fileRecords = [];
        this.filterRequest = false;
        this.exercisePropsData.instructions = "";
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

            var selectedCategoryIndex = this.exercisePropsData.categoriesSelected.findIndex(function(category){
                return category.id == item.id;
            })

            if (selectedCategoryIndex !== -1) this.exercisePropsData.categoriesSelected.splice(selectedCategoryIndex, 1);
            this.exercisePropsData.categoriesSelected = [...this.exercisePropsData.categoriesSelected];
        },
        removeSport(item) {
            // this.exercisePropsData.sportsSelected.splice(this.exercisePropsData.sportsSelected.indexOf(item), 1);

            var selectedSportIndex = this.exercisePropsData.sportsSelected.findIndex(function(sport){
                return sport.id == item.id;
            })

            if (selectedSportIndex !== -1) this.exercisePropsData.sportsSelected.splice(selectedSportIndex, 1);

            this.exercisePropsData.sportsSelected = [...this.exercisePropsData.sportsSelected];
        },
        removeLavel(item) {

            // this.exercisePropsData.lavelsSelected.splice(this.exercisePropsData.lavelsSelected.indexOf(item), 1);

            var selectedLavelIndex = this.exercisePropsData.lavelsSelected.findIndex(function(lavel){
                return lavel.id == item.id;
            })

            if (selectedLavelIndex !== -1) this.exercisePropsData.lavelsSelected.splice(selectedLavelIndex, 1);

            this.exercisePropsData.lavelsSelected = [...this.exercisePropsData.lavelsSelected];
        },
        removeTag(item){
            // this.exercisePropsData.tagsSelected.splice(this.exercisePropsData.tagsSelected.indexOf(item), 1);

            var selectedTagIndex = this.exercisePropsData.tagsSelected.findIndex(function(tag){
                return tag.id == item.id;
            })

            if (selectedTagIndex !== -1) this.exercisePropsData.tagsSelected.splice(selectedTagIndex, 1);

            this.exercisePropsData.tagsSelected = [...this.exercisePropsData.tagsSelected];
        },
    },
    beforeDestroy () {
        console.log('exerciseNewData : ', this.exerciseNewData);
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