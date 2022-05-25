<template>
        <!-- Video Upload Dialog -->

        <v-dialog
          v-model="videoDialog"
          max-width="400px"
        >
          <v-card class="pa-5">
            <v-card-title class="pt-0 mt-0">
              <span class="upload-video-title">Choose a video</span>
              <v-spacer></v-spacer>
              <v-btn
                    color="#49556A"
                    icon
                    @click="handleUploadVideo"
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
                      @beforedelete="onBeforeDelete($event)"
                      @delete="fileDeleted($event)"
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
</template>

<script>
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import AssetView from '@/components/exercise/AssetView.vue';
import ExerciseEditor from "@/components/editor/ExerciseEditor";
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
    props: 
    {
        videoDialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return { 
            file: "",
            fileRecords: [],
            uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
            fileRecordsForUpload: [],
            isLoading: false,
            loadingLimit: 8,
        }
    },

    methods:{

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
                this.$refs.exerciseFile.value = null;
                this.fileRecordsForUpload = [],
                this.fileRecords = [];
                this.$emit('videoUploaded', data.item)
                this.$toast.success(data.message);
                this.setImageAndVideoProgress(data.progress);
                
                
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

        handleUploadVideo(){
            this.$refs.exerciseFile.value = null;
            this.fileRecordsForUpload = [],
            this.fileRecords = [];
            this.$emit('cancelVideoUpload');
        },

        onBeforeDelete: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                if (confirm('Are you sure you want to delete?')) {
                this.fileDelete(fileRecord); // will trigger 'delete' event
                }
            }
        },
        fileDelete: function (fileRecord) {
            var i = this.fileRecordsForUpload.indexOf(fileRecord);
            this.$refs.exerciseFile.value = null;
            this.fileRecordsForUpload = [],
            this.fileRecords = [];
        },

    
        setImageAndVideoProgress(val) {
            this.$store.dispatch("pageProgress/setImageAndVideoProgress", val);
        },

    }

    
})
</script>
<style lang="scss" scoped>

</style>