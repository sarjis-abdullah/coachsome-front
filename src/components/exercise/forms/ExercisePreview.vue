<template>
    <v-container fluid class="body-bg" v-if="exerciseData!=null" >
        <v-card class="exercise-preview body-bg" :class="{'py-10' : $vuetify.breakpoint.smAndDown}" elevation="0">

            <v-row class="mt-0 pt-0">
            <v-col cols="12" class="mt-n10 pt-n10">
                <swiper
                class="swiper"
                :options="{
                    lazyLoading: true,
                    watchSlidesVisibility: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    direction: 'horizontal',
                    loop: exerciseData.assets && exerciseData.assets.length > 1 ? true : false,
                    speed: 2450,
                    autoplay:false,
                    navigation: {
                    nextEl: exerciseData.assets && exerciseData.assets.length > 1 ? '.swiper-button-next' : '',
                    prevEl: exerciseData.assets && exerciseData.assets.length > 1 ? '.swiper-button-prev' : '',
                    },
                }"
                >
            
                <swiper-slide class="d-flex justify-center" v-for="(asset, index) in exerciseData.assets && exerciseData.assets" :key="index">
                    <div class="preview-slide">
                        <asset-preview :asset_type="asset.type" :url="asset.url"></asset-preview>
                        <div v-if="asset.type !='image'" class="swiper-lazy-preloader"></div>
                    </div>
                </swiper-slide>
            
                <div class="swiper-pagination" slot="pagination"></div>
                <div
                    v-if="exerciseData.assets && exerciseData.assets.length > 1 "
                    class="swiper-button-prev swiper-button-white"
                    slot="button-prev"
                >
                </div>
                <div
                    v-if="exerciseData.assets && exerciseData.assets.length > 1 "
                    class="swiper-button-next swiper-button-white"
                    slot="button-next"
                ></div>
                </swiper>
            </v-col>
            </v-row>
            <v-row >
            <v-col cols="12" class="d-none d-md-block">
                <span class="exercise-preview--title">{{$t("lbl_ex_name")}}</span>
                <span class="exercise-preview--description">{{exerciseData.name}}</span>
            </v-col>
            <v-col cols="12">
                <span class="exercise-preview--title">{{$t("lbl_ex_desc")}}</span>
                <span class="exercise-preview--description" v-html="exerciseData.instructions"></span>
            </v-col>
            <v-col cols="12">
                <span class="exercise-preview--breakdown">{{$t("lbl_ex_brk")}}</span>
            </v-col>
            <v-col cols="12">
                <span class="exercise-preview--title">{{$t("lbl_ex_cat")}}</span>
                <span class="exercise-preview--description" v-if="exerciseData.category.length" >
                <template v-for="(category, index) in exerciseData.category" >
                    {{$t(category.t_key)}}  
                    <span v-if="index == ( exerciseData.category.length-1)" :key="index"></span>
                    <span v-else :key="index">,</span>
                </template>
                </span>
            </v-col>
            <v-col cols="12">
                <span class="exercise-preview--title">{{$t("lbl_ex_sport")}}</span>
                <span class="exercise-preview--description" v-if="exerciseData.sport.length">
                <template v-for="(sport, index) in exerciseData.sport" >
                    {{$t(sport.t_key)}}  
                    <span v-if="index == ( exerciseData.sport.length-1)" :key="index"></span>
                    <span v-else :key="index">,</span>
                </template>
                </span>
            </v-col>
            <v-col cols="12">
                <span class="exercise-preview--title">{{$t("lbl_ex_lvl")}}</span>
                <span class="exercise-preview--description" v-if="exerciseData.lavel.length">
                <template v-for="(lavel, index) in exerciseData.lavel" >
                    {{$t(lavel.t_key)}}  
                    <span v-if="index == ( exerciseData.lavel.length-1)" :key="index"></span>
                    <span v-else :key="index">,</span>
                </template>
                </span>
            </v-col>
            <v-col cols="12" class="mb-5">
                <span class="exercise-preview--title">{{$t("lbl_ex_tags")}}</span>
                <span v-if="exerciseData.tags.length">
                <v-chip
                    v-for="(tag, index) in exerciseData.tags" :key="index"
                    class="exercise-preview--tag mt-2"
                    color="#6EB5CB"
                    small
                >{{tag}}</v-chip>
                </span>
            </v-col>

            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import AssetPreview from '@/components/exercise/AssetPreview.vue';

export default ({
  layout: "admin",
  components: {
    AssetPreview
  },
  props: 
    {
        exerciseData:{
            type: Object,
            default: () => {
                return [];
            }
        }
    },
  data() {
    return { 
        exerciseCreate: {
            dialog: false,
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
    }
  },
    watch:{
        instructions(value) {
            this.handleTiptopUpdatedValue(value)
        },
    },

  methods:{

    handleCloseExercise(){
        this.$emit("closeCreateDialog");
    },

  }

    
})
</script>
<style lang="scss" scoped>
    .exercise-preview{
    padding: 15px;
    &--title{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #49556A;
    }
    &--description{
        padding-top: 5px!important;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #9FAEC2;
        display: block!important;
    }
    &--breakdown{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 25px;
        line-height: 34px;
        color: #49556A;
    }
    &--tag{
        margin: 0 2px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        /* identical to box height, or 171% */

        text-align: center;
        letter-spacing: 0.4px;
        text-transform: capitalize;

        color: #FFFFFF;
    }
    }
</style>