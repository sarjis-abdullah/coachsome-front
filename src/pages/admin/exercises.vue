<template>
  <v-container fluid class="pt-0 mt-0">

    <!-- Header start -->
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('dropdown_item_exercises')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <v-btn
          icon
          @click.stop="handleExerciseCreateBtn"
        >
          <v-icon style="font-size: 25px!important;" class="common-top-add-icon">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
      </template>
    </mobile-top-nav>


    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{$t('dropdown_item_exercises')}}</div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>

    <!-- Header end -->

    <!-- No exercise start -->

    <v-row class="d-flex justify-center" v-if="noExercise">
        <v-col cols="12" md="4" class="no-exercise">
            <h4 class="no-exercise__text">{{$t("no_exercise_title")}}</h4>
            <p class="no-exercise__sub-text">{{$t("no_execise_sub_title")}}</p>
            <v-btn
                elevation="2"
                color="#15577C"
                class="no-exercise__button px-5"
                @click.stop="handleExerciseCreateBtn"
            >
                {{$t("no_exercise_button")}}
            </v-btn>
        </v-col>
    </v-row>

    <!-- No Exercise end -->

    <!-- mobile view -->
    <v-row class="d-md-none">
      <v-col cols="12" v-if="exercises.length" class="py-10">
        <v-row>
          <v-col cols="12" v-for="(item, index) in table.rows" :key="index" class="py-0 my-0">
            <v-card color="#FFFFFF" class="exercise-table mobile-view " @click.native="showExercise(item)" exact>
              <v-card-text class="pa-2 ma-2">
                <div style="display:inline-block; align: center;vertical-align: middle;" >
                  <list-asset-view :asset_type="item.asset_type" :url="item.assets" ></list-asset-view>
                </div>
                <div style="display:inline-block;vertical-align: middle; padding-left: 8px" class="exercise-table--text mobile-view--text" >
                    {{item.exercise}}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <!-- desktop view -->
    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div>
          <v-card>
            <v-card-title v-if="exercises.length">
              <v-row align="center" justify="space-between">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    single-line
                    solo
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">

                  <!-- Filter Start -->
                  <v-menu
                    :close-on-content-click="false"
                    :nudge-width="100"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        color="#49556A"
                        @click="loader = 'loading3'"
                        class="px-10"
                        :block="$vuetify.breakpoint.xsOnly"
                      >
                        <v-icon
                            left
                            dark
                        >
                            mdi-filter-outline
                        </v-icon>
                        {{$t("btn_filter")}}
                      </v-btn>
                    </template>


                    <v-card class="filter-exercise">
                      <v-card-title class="px-0">
                        <span class="filter-exercise__title pl-5">{{$t("ex_filter")}}</span>
                        <v-spacer></v-spacer>
                        <v-btn
                          v-if="filterRequest"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          color="#49556A"
                          style="text-transform: none"
                          @click="handleRefresh"
                          class="mr-5"
                        >
                          <v-icon
                              left
                              dark
                          >
                              mdi-refresh
                          </v-icon>
                          {{$t("btn_refresh")}}
                        </v-btn>
                        <div class="line mt-4"></div>
                    </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form
                            ref="form"
                            v-model="exerciseCreate.valid"
                            lazy-validation
                            class="mb-10"
                          >
                            <v-row>
                              <v-col cols="12">
                                <span class="filter-exercise__label">{{$t("ex_filter_from")}}</span>
                                <div class="d-flex justify-content-between">
                                  <v-checkbox
                                    class="pl-0 ml-0"
                                    v-model="filter.typeSytem"
                                    :label="$t('ex_coachsome')"
                                    color="#49556A"
                                    value="1"
                                    hide-details
                                  ></v-checkbox>
                                  <v-checkbox
                                    v-model="filter.typeCustom"
                                    class="pl-5"
                                    :label="$t('ex_custom_ex')"
                                    color="#49556A"
                                    value="1"
                                    hide-details
                                  ></v-checkbox>
                                </div>
                              </v-col>
                              <v-col cols="12">
                                <div class="line"></div>
                              </v-col>
                               <v-col cols="12" class="my-0 py-0">
                                  <!-- <r-t-l-switch :withVideo="filter.withVideo" @updated="handleWithVideo"></r-t-l-switch> -->

                                  <v-list class="pa-0 ma-0">
                                    <!-- Profile Status -->
                                    <v-list-item text class="pa-0 ma-0"> 
                                    <v-list-item-content>
                                      <v-list-item-title>
                                        <v-list-item-title class="filter-exercise--switch">{{$t('ex_with_video')}}</v-list-item-title>
                                      </v-list-item-title>
                                    </v-list-item-content>
                                      <v-list-item-icon>
                                        <client-only>
                                          <toggle-button
                                            :value="filter.withVideo"
                                            @input="handleWithVideo"
                                            :color="{ checked: '#5CC866', unchecked: '#EFEFEF' }"
                                            :sync="true"
                                            :font-size="12"
                                            :width="60"
                                            :height="30"
                                          />
                                        </client-only>
                                      </v-list-item-icon>
                                  </v-list-item>
                                  </v-list>


                              </v-col>
                              <v-col cols="12">
                                <div class="line"></div>
                              </v-col>

                              <!-- Category Section -->
                              <v-col cols="12" class="py-0 my-0">
                                  <p class="filter-exercise__label">{{$t("lbl_ex_cat")}}</p>
                                  <v-autocomplete
                                      v-model="filter.categoriesSelected"
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
                                      class="filter-exercise__input-field"
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
                                          @click:close="removeFilterCategory(item)"
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
                                  <p class="filter-exercise__label">{{$t("lbl_ex_sport")}}</p>
                                  <v-autocomplete
                                      v-model="filter.sportsSelected"
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
                                      class="filter-exercise__input-field"
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
                                          @click:close="removeFilterSport(item)"
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
                                  <p class="filter-exercise__label">{{$t("lbl_ex_lvl")}}</p>
                                  <v-autocomplete
                                      v-model="filter.lavelsSelected"
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
                                      class="filter-exercise__input-field"
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
                                          @click:close="removeFilterLavel(item)"
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
                              <v-col cols="12">
                                <v-btn
                                    elevation="2"
                                    color="#15577C"
                                    class="filter-exercise--button px-5"
                                    @click="handleFilterExercise"
                                >
                                    {{$t("chat_field_label_txt_search")}}
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>

                  </v-menu>

                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    solo
                    :block="$vuetify.breakpoint.xsOnly"
                    color="primary-light-1"
                    style="text-transform: none"
                    @click.stop="handleExerciseCreateBtn"
                    class="px-5"
                  >
                    {{$t("exercise_create_button")}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>

            <v-data-table
              v-if="exercises.length"
              :headers="table.headers"
              :items="table.rows"
              :search="search"
              class="exercise-table row-pointer"
              :header-props="{ sortIcon: 'mdi-chevron-down' }"
              :footer-props="{
                  'items-per-page-text' : $t('ex_table_rows_per_page')
              }"
              @click:row="handleColumnClick"
            >

            <!-- Search No results -->
            <template v-slot:no-results>
                <span>{{$t("ex_no_matching_results")}}</span>
            </template>

            <template v-slot:no-data>
                <span>{{$t("no_data_ex")}}</span>
            </template>
            

              <!-- table head start -->

              <template v-slot:header.assets="{ header }">
                {{$t("thead_exercises")}}( {{table.rows.length}} )
              </template>

              <template v-slot:header.category="{ header }">
                {{$t("thead_category")}}
              </template>

              <template v-slot:header.type="{ header }">
                {{$t("thead_type")}}
              </template>

              <template v-slot:header.actions="{ header }">
                <span></span>
              </template>
              
              <!-- table head end -->

              <!-- table column start -->

              <template v-slot:item.assets="{ item }">
                <div style="display:inline-block; align: center;vertical-align: middle;" >
                  <list-asset-view :asset_type="item.asset_type" :url="item.assets" ></list-asset-view>
                </div>
                <div style="display:inline-block;vertical-align: middle; padding-left: 8px" class="exercise-table--text" >
                    {{item.exercise}}
                </div>
              </template>

              <template v-slot:item.category="{ item }">
                <div class="exercise-table--text">
                  {{$t(item.category)}}
                </div>
                
                <!-- <span class="exercise-table--text" v-if="exerciseData.category.length" >
                  <template v-for="(category, index) in exerciseData.category" >
                    {{$t(category.t_key)}}  
                    <span v-if="index == ( exerciseData.category.length-1)" :key="index"></span>
                    <span v-else :key="index">,</span>
                  </template>
                </span> -->

              </template>
              <template v-slot:item.type="{ item }">
                 <div class="exercise-table--text">
                    {{item.type}}
                </div>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-menu offset-y >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      block
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click.stop="editExercise(item)">
                      <v-list-item-title>{{$t("btn_edit_ex")}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="duplicateExercise(item)">
                      <v-list-item-title>{{$t("btn_duplicate")}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="deleteExercise(item)">
                      <v-list-item-title style="color: #FF3A0D">{{$t("btn_remove")}}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <!-- table column end -->

            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>

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

        <!-- Exercise Create Dialog -->
        <template>
          <v-row justify="center">
            <v-dialog
              v-model="exerciseCreate.dialog"
              max-width="800px"
              :fullscreen="$vuetify.breakpoint.smAndDown"
              
            >
              <v-container fluid class="body-bg">
                <mobile-top-nav extraClass="body-bg" :headerText="$t('ex_create')">
                  <template v-slot:goBack>
                    <v-btn
                      icon
                      @click="exerciseCreate.dialog = false"
                    >
                      <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:action>
                    <span></span>
                  </template>
                </mobile-top-nav>

                <v-card elevation="0" class="body-bg">
                  <v-card-title v-if="$vuetify.breakpoint.mdAndUp">
                    <v-row>
                      <v-col cols="12" class="py-0 px-0">
                        <v-btn
                          color="#49556A"
                          icon
                          large
                          @click="exerciseCreate.dialog = false"
                          class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <span class="create-exercise__title">{{$t("ex_create")}}</span>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-form
                      ref="form"
                      v-model="exerciseCreate.valid"
                      lazy-validation
                      class="mb-15 create-exercise"
                    >
                      <v-row>
                        <v-col cols="12" class="pb-0 mb-0" :class="{'pt-8' : $vuetify.breakpoint.smAndDown}">
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
                                        v-if="links.length <=3"
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
                        <v-col cols="12" class="py-0 my-0" :class="{'pb-15' : $vuetify.breakpoint.smAndDown}">
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
                                class="no-exercise__button px-5"
                                @click="handleCreateExercise"
                                v-if="$vuetify.breakpoint.mdAndUp"
                              >
                                  {{$t("create_ex_btn")}}
                              </v-btn>
                              <v-footer v-else color="#f7fafc" class="pb-5" inset app bottom fixed > 
                                <v-row>
                                  <v-col cols="12" >
                                    <v-btn
                                      elevation="2"
                                      color="#15577C"
                                      class="no-exercise__button px-5"
                                      @click="handleCreateExercise"
                                      block
                                    >
                                      {{$t("create_ex_btn")}}
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-footer>
                          </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-dialog>
          </v-row>
        </template>


        <!-- Exercise Preview Dialog -->
        <template>
          <v-row justify="center">
            <v-dialog
              color="#f7fafc"
              v-model="exercisePreviewDialog"
              max-width="550px"
              :fullscreen="$vuetify.breakpoint.smAndDown"
            >

              <v-container fluid class="body-bg" v-if="exerciseData!=null" >
                <mobile-top-nav extraClass="body-bg" :headerText="exerciseData.name">
                  <template v-slot:goBack>
                    <v-btn
                      icon
                      @click.stop="exercisePreviewDialog = false"
                    >
                      <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:action>

                    <v-menu offset-y >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon style="font-size: 25px!important;" class="common-top-add-icon">mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click.stop="editExercise(exerciseData)">
                          <v-list-item-title>{{$t("btn_edit_ex")}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.stop="duplicateExercise(exerciseData)">
                          <v-list-item-title>{{$t("btn_duplicate")}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.stop="deleteExercise(exerciseData)">
                          <v-list-item-title style="color: #FF3A0D">{{$t("btn_remove")}}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </mobile-top-nav>


                <v-card class="exercise-preview body-bg" :class="{'py-10' : $vuetify.breakpoint.smAndDown}" elevation="0">

                  <v-row class="mt-0 pt-0">
                    <v-col cols="12" class="mt-n10 pt-n10">
                      <swiper
                        class="swiper"
                        :options="{
                          slidesPerView: 1,
                          spaceBetween: 30,
                          direction: 'horizontal',
                          loop: exerciseData.assets.length > 1 ? true : false,
                          speed: 2450,
                          autoplay:false,
                          navigation: {
                            nextEl: exerciseData.assets.length > 1 ? '.swiper-button-next' : '',
                            prevEl: exerciseData.assets.length > 1 ? '.swiper-button-prev' : '',
                          },
                        }"
                      >
                  
                        <swiper-slide class="d-flex justify-center" v-for="(asset, index) in exerciseData.assets" :key="index">
                          <div class="preview-slide">
                            <asset-preview :asset_type="asset.type" :url="asset.url"></asset-preview>
                          </div>
                        </swiper-slide>
                    
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div
                          v-if="exerciseData.assets.length > 1 "
                          class="swiper-button-prev swiper-button-white"
                          slot="button-prev"
                        >
                        </div>
                        <div
                          v-if="exerciseData.assets.length > 1 "
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
            </v-dialog>
          </v-row>
        </template>


        <!-- Exercise Edit Dialog -->
        <template>
          <v-row justify="center">
            <v-dialog
              v-model="exerciseEdit.dialog"
              max-width="800px"
              :fullscreen="$vuetify.breakpoint.smAndDown"
              
            >
              <v-container fluid class="body-bg">
                <mobile-top-nav extraClass="body-bg" :headerText="$t('ex_edit')">
                  <template v-slot:goBack>
                    <v-btn
                      icon
                      @click="exerciseEdit.dialog = false"
                    >
                      <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:action>
                    <span></span>
                  </template>
                </mobile-top-nav>

                <v-card elevation="0" class="body-bg">
                  <v-card-title v-if="$vuetify.breakpoint.mdAndUp">
                    <v-row>
                      <v-col cols="12" class="py-0 px-0">
                        <v-btn
                          color="#49556A"
                          icon
                          large
                          @click="exerciseEdit.dialog = false"
                          class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <span class="create-exercise__title">{{$t("ex_edit")}}</span>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text >
                    <v-container>
                      <v-form
                        ref="form"
                        v-model="exerciseEdit.valid"
                        lazy-validation
                        class="mb-10 create-exercise"
                      >
                        <v-row>
                          <v-col cols="12" class="pb-0 mb-0 px-0" :class="{'pt-8' : $vuetify.breakpoint.smAndDown}">
                              <p class="create-exercise__label">{{$t("lbl_ex_name")}} <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                              <v-text-field
                                  outlined
                                  dense
                                  :label="$t('hint_name')"
                                  v-model="exerciseEdit.data.name"
                                  :rules="[v => !!v || 'Exercise Name is required']"
                                  required
                                  class="create-exercise__input-field"
                              />
                          </v-col>
                          <v-col cols="12" class="py-0 my-0 px-0">
                              <p class="create-exercise__label">{{$t("lbl_instructions")}} <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                              <ExerciseEditor
                                :value="exerciseEdit.data.instructions"
                                @updated="handleTiptopUpdatedValueEdit"
                              />
                          </v-col>
                          <v-col cols="12" class="py-0 my-0 px-0">
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
                          <v-col cols="12" class="py-0 my-0 px-0">
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
                          <v-col cols="12" class="px-0">
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
                                  <v-col cols="12" sm="3" v-if="links.length <=3">
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

                          <v-col cols="12" class="px-0">
                            <span class="exercise-preview--breakdown">{{$t("lbl_ex_brk")}}</span>
                          </v-col>
                          <!-- Category Section -->
                          <v-col cols="12" class="py-0 my-0 px-0">
                              <p class="create-exercise__label">{{$t("lbl_ex_cat")}} </p>
                              
                              <v-autocomplete
                                  v-model="exerciseEdit.data.category"
                                  :items="categories"
                                  :item-text="$t('t_key')"
                                  return-object
                                  chips
                                  multiple
                                  clearable
                                  :label="$t('hint_cat_ex')"
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
                                      close
                                      @click="select"
                                      @click:close="removeEditCategory(item)"
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
                          <v-col cols="12" class="py-0 my-0 px-0">
                              <p class="create-exercise__label">{{$t("lbl_ex_sport")}} </p>
                              <v-autocomplete
                                  v-model="exerciseEdit.data.sport"
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
                                      @click:close="removeEditSport(item)"
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
                          <v-col cols="12" class="py-0 my-0 px-0">
                              <p class="create-exercise__label">{{$t("lbl_ex_lvl")}} </p>
                              <v-autocomplete
                                  v-model="exerciseEdit.data.lavel"
                                  :items="lavels"
                                  item-text="t_key"
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
                                      @click:close="removeEditLavel(item)"
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
                          <v-col cols="12" class="py-0 my-0 px-0" :class="{'pb-15' : $vuetify.breakpoint.smAndDown}">
                              <p class="create-exercise__label">{{$t("lbl_ex_tags")}} </p>
                              <v-combobox
                                  v-model="exerciseEdit.data.tags"
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
                                      @click:close="removeEditTag(item)"
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
                                  class="no-exercise__button px-5"
                                  @click="handleUpateExercise"
                                  v-if="$vuetify.breakpoint.mdAndUp"
                              >
                                  {{$t("ex_save")}}
                              </v-btn>
                              <v-footer v-else color="#f7fafc" class="pb-5" inset app bottom fixed > 
                                <v-row>
                                  <v-col cols="12" >
                                      <v-btn
                                        elevation="2"
                                        color="#15577C"
                                        class="no-exercise__button px-5"
                                        @click="handleUpateExercise"
                                        block
                                      >
                                        {{$t("ex_save")}}
                                      </v-btn>
                                  </v-col>
                                </v-row>
                              </v-footer>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-dialog>
          </v-row>
        </template>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { imageService } from "@/services";
import {  ExerciseApi } from "@/api";
import { pathData } from "@/data";
import VuePhoneNumberInput from "vue-phone-number-input";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import DarkboxExercise from "@/components/darkbox/Gallery";
import ListAssetView from '@/components/exercise/ListAssetView.vue';
import AssetView from '@/components/exercise/AssetView.vue';
import AssetPreview from '@/components/exercise/AssetPreview.vue';
import ExerciseEditor from "@/components/editor/ExerciseEditor";
import RTLSwitch from '@/components/exercise/RTLSwitch'


export default {
  layout: "admin",
  components: {
    VuePhoneNumberInput,
    MobileTopNav,
    DarkboxExercise,
    Cropper,
    ListAssetView,
    AssetView,
    AssetPreview,
    ExerciseEditor,
    RTLSwitch
  },
  data() {
    return {
      filterRequest: false,
      fileRecords: [],
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: [],
      name: '',
      file: '',
      success: '',
      uploadVideoDialog: false,
      noExercise: false,
      filter : {
        typeSytem: false,
        typeCustom: false,
        categoriesSelected: [],
        lavelsSelected: [],
        sportsSelected: [],
        withVideo: false,
      },
      exerciseData: null,
      exercises: [],
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
      links: [],
      categories: [],
      categoriesSelected: [],
      sports: [],
      sportsSelected: [],
      lavels: [],
      lavelsSelected: [],

      exerciseEdit: {
        editedIndex: -1,
        dialog: false,
        valid: true,
        data: {
          id: null,
          name: "",
          assets: [],
          instructions: "",
          category: [],
          sport: [],
          lavel: [],
          tags: [],
          type: ""
        }
      },
      exerciseCreate: {
        dialog: false,
        valid: true,
        initialValue: {
          name: "",
          instructions: "",
        }
      },
      exercisePreviewDialog: false,
      tagData: {
        tags: [],
        tagsSelected: []
      },
      search: "",
      table: {
        headers: [
          {
            text: this.$i18n.t("thead_exercises"),
            align: "start",
            value: "assets",
            class: "exercise-table--header",
          },
          { text: this.$i18n.t("thead_category"), value: "category", class: "exercise-table--header" },
          { text: this.$i18n.t("thead_type"), value: "type", class: "exercise-table--header" },
          { text: this.$i18n.t("thead_action"), value: 'actions', sortable: false, filterable: false, class: "exercise-table--header" },
        ],
        rows: []
      },

      url: {
        image: "",
        video: ""
      },
      videoForm: {
        valid: true,
        isLoading: false
      }
    };
  },
  computed:{
    exerciseCount(){
      return 0; 
    }
  },
  created() {
    this.langCode = this.$i18n.locale;
    this.getExercise();
    this.fetchCategories();
    this.fetchSports();
    this.fetchLavels();
  },
  methods: {

    handleUploadVideo(){
      this.$refs.fileInput.value = null;
      this.fileRecordsForUpload = [],
      this.fileRecords = [];
      this.uploadVideoDialog = false;
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
      this.$refs.fileInput.value = null;
      this.fileRecordsForUpload = [],
      this.fileRecords = [];
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
      .catch(function(){
          this.$toast.success("File is too large.");
      })
      .finally(() => {
        this.isLoading = false;
      });
      
    },
    
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      this.uploadFiles();
    },
      
    handleTiptopUpdatedValue(value) {
      this.exerciseCreate.initialValue.instructions = value;
    },
    handleTiptopUpdatedValueEdit(value) {
      this.exerciseEdit.data.instructions = value;
    },

    handleWithVideo(value){
      this.filter.withVideo = value;
    },

    handleExerciseCreateBtn(){
      this.resetExerciseData();
      this.exerciseCreate.dialog = true;
    },

    removeEditCategory(item) {
      this.exerciseEdit.data.category.splice(this.exerciseEdit.data.category.indexOf(item), 1);
      this.exerciseEdit.data.category = [...this.exerciseEdit.data.category];
    },

    removeCategory(item) {
      this.categoriesSelected.splice(this.categoriesSelected.indexOf(item), 1);
      this.categoriesSelected = [...this.categoriesSelected];
    },
    
    removeFilterCategory(item) {
      this.filter.categoriesSelected.splice(this.filter.categoriesSelected.indexOf(item), 1);
      this.filter.categoriesSelected = [...this.filter.categoriesSelected];
    },

    removeEditSport(item) {
      this.exerciseEdit.data.sport.splice(this.exerciseEdit.data.sport.indexOf(item), 1);
      this.exerciseEdit.data.sport = [...this.exerciseEdit.data.sport];
    },

    removeSport(item) {
      this.sportsSelected.splice(this.sportsSelected.indexOf(item), 1);
      this.sportsSelected = [...this.sportsSelected];
    },
    removeFilterSport(item) {
      this.filter.sportsSelected.splice(this.filter.sportsSelected.indexOf(item), 1);
      this.filter.sportsSelected = [...this.filter.sportsSelected];
    },

    removeEditLavel(item) {
      this.exerciseEdit.data.lavel.splice(this.exerciseEdit.data.lavel.indexOf(item), 1);
      this.exerciseEdit.data.lavel = [...this.exerciseEdit.data.lavel];
    },

    removeLavel(item) {
      this.lavelsSelected.splice(this.lavelsSelected.indexOf(item), 1);
      this.lavelsSelected = [...this.lavelsSelected];
    },

    removeFilterLavel(item) {
      this.filter.lavelsSelected.splice(this.filter.lavelsSelected.indexOf(item), 1);
      this.filter.lavelsSelected = [...this.filter.lavelsSelected];
    },

    removeEditTag(item){
      this.exerciseEdit.data.tags.splice(this.exerciseEdit.data.tags.indexOf(item), 1);
      this.exerciseEdit.data.tags = [...this.exerciseEdit.data.tags];
    },

    removeTag(item){
      this.tagData.tagsSelected.splice(this.tagData.tagsSelected.indexOf(item), 1);
      this.tagData.tagsSelected = [...this.tagData.tagsSelected];
    },

    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },

    async showExercise(exercise){
      this.resetExerciseData();
      const { data } = await ExerciseApi(this.$axios).previewExercise(
        encodeURIComponent(exercise.id)
      );

      if(data.exercise){
        this.exerciseData = data.exercise;
        this.exercisePreviewDialog = true;
      }
    },

    handleColumnClick(value) {
      this.resetExerciseData();
      this.showExercise(value);
    },

    deleteExercise(exercise){
            
      if (confirm("Are you sure?")) {
        this.isLoading = true;
        ExerciseApi(this.$axios)
          .destroyExercise(exercise.id)
          .then(({ data }) => {
            let index = this.table.rows.findIndex(
              exercise => exercise.id == data.exercise.id
            );
            if (index != undefined) {
              this.table.rows.splice(index, 1);
            }
            this.$toast.success("Successfully deleted");

            this.exercisePreviewDialog = false;

            if(this.table.rows.length == 0){
              this.noExercise = true;
              this.exercises = [];
            }
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }

    },

    async duplicateExercise(exercise){

      this.exercisePreviewDialog = false;

      const { data } = await ExerciseApi(this.$axios).duplicateExercise(
        encodeURIComponent(exercise.id)
      );


      this.resetExerciseData();
      if(data.exercise){

        this.exerciseCreate.initialValue.name = data.exercise.name;
        this.exerciseCreate.initialValue.instructions = data.exercise.instructions;
        this.links  = data.exercise.assets;
        this.categoriesSelected = data.exercise.category;
        this.sportsSelected = data.exercise.sport;
        this.lavelsSelected = data.exercise.lavel;
        this.tagData.tagsSelected = data.exercise.tags;

        this.handleTiptopUpdatedValue(data.exercise.instructions);

        this.exerciseCreate.dialog = true;
      }

      

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
              let formattedRowList = this.formatExerciseRow([{ ...data.exercise }]);
              this.noExercise = false;
              this.table.rows.unshift(formattedRowList[0]);
              this.exercises.push(formattedRowList[0]);
              this.$toast.success("This Exercise has been created successfully.");
              this.exerciseCreate.dialog = false;
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

    showFileChooser() {
      this.$refs.fileInput.click();
    },

    getExercise() {
      this.resetExerciseData();
      ExerciseApi(this.$axios)
        .getExerciseList()
        .then(({ data }) => {
          if (data.exercises) {
            if(data.exercises.length){
              this.noExercise = false;
              this.exercises.push(data.exercises);
            }else{
              this.noExercise = true;
            }
            this.makeExerciseTableRow(data.exercises);
          }
        })
        .catch(() => {});
    },

    async editExercise(exercise){
      this.exercisePreviewDialog = false;
      const { data } = await ExerciseApi(this.$axios).editExercise(
        encodeURIComponent(exercise.id)
      );
      this.resetExerciseData();
      if(data.exercise){
        
        this.exerciseEdit.data.id = data.exercise.id;
        this.exerciseEdit.data.name = data.exercise.name;
        this.exerciseEdit.data.assets = data.exercise.assets;

        this.links = data.exercise.assets;

        this.exerciseEdit.data.instructions = data.exercise.instructions;

        this.exerciseEdit.data.category = data.exercise.category;

        this.exerciseEdit.data.sport = data.exercise.sport;

        this.exerciseEdit.data.lavel = data.exercise.lavel;

        this.exerciseEdit.data.tags = data.exercise.tags;

        this.exerciseEdit.data.type = data.exercise.type;

        this.handleTiptopUpdatedValueEdit(data.exercise.instructions);

        this.exerciseEdit.dialog = true;
      }
    },

    handleFilterExercise(){

      this.filterRequest = true;

      let payload = {};
      payload.typeSytem = this.filter.typeSytem;
      payload.typeCustom = this.filter.typeCustom;
      payload.categoriesSelected = this.filter.categoriesSelected;
      payload.lavelsSelected = this.filter.lavelsSelected;
      payload.sportsSelected = this.filter.sportsSelected;
      payload.withVideo = this.filter.withVideo;

      ExerciseApi(this.$axios)
        .filterExerciseList(payload)
        .then(({ data }) => {
          if (data.exercises) {
            if(data.exercises.length){
              this.exercises.push(data.exercises);
            }
            // this.resetExerciseData();
            this.makeExerciseTableRow(data.exercises);
          }
        })
        .catch(() => {});

    },

    handleRefresh(){
      this.getExercise();
    },

    resetExerciseData() {

      this.exerciseEdit.data.id = null;
      this.exerciseEdit.data.name = "";
      this.exerciseEdit.data.assets = [];
      this.exerciseEdit.data.instructions = "";
      this.exerciseEdit.data.category = [];
      this.exerciseEdit.data.sport = [];
      this.exerciseEdit.data.lavel = [];
      this.exerciseEdit.data.tags = [];
      this.exerciseEdit.data.type = "";
      this.exerciseCreate.initialValue.name = "";
      this.instruction = "";
      this.tagData.tagsSelected = [];
      this.categoriesSelected = [];
      this.sportsSelected = [],
      this.lavelsSelected = [],
      this.links = [];
      this.exerciseData = null;
      this.exerciseCreate.initialValue.instructions = "";
      this.filter.typeSytem = false;
      this.filter.typeCustom = false;
      this.filter.categoriesSelected = [];
      this.filter.lavelsSelected = [];
      this.filter.sportsSelected = [];
      this.filter.withVideo = false;
      this.fileRecordsForUpload = [],
      this.fileRecords = [];
      this.uploadVideoDialog = false;
      this.filterRequest = false;
    },

    handleUpateExercise(){
      
      if(this.$auth && this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        var role = 1
      }else{
        role = 2
      }

      let payload = {};
      payload.id = this.exerciseEdit.data.id;
      payload.name = this.exerciseEdit.data.name;
      payload.instructions = this.exerciseEdit.data.instructions;
      payload.assets = this.links;
      payload.category = this.exerciseEdit.data.category;
      payload.sport = this.exerciseEdit.data.sport;
      payload.lavel = this.exerciseEdit.data.lavel;
      payload.tags = this.exerciseEdit.data.tags;
      payload.type = role;

       ExerciseApi(this.$axios)
        .updateExercise(payload)
        .then(({ data }) => {
          if (data.exercise) {
            const index = this.table.rows.findIndex(
              item => item.id == data.exercise.id
            );
            Object.assign(
              this.table.rows[index],
              this.formatExerciseItem(data.exercise)
            );
            this.$toast.success('Exercise has been updated successfully!');
          }
          this.exerciseEdit.dialog = false;
          
        })
        .catch(({ response }) => {
          if (response.data.status == "error") {
            this.$toast.error(response.data.message);
          }
        });

    },
    
    makeExerciseTableRow(exercise) {
      this.table.rows = [];
      this.table.rows = this.formatExerciseRow(exercise);
    },
    formatExerciseRow(exercise) {
      return exercise.map(item => {
        return this.formatExerciseItem(item);
      });
    },
    formatExerciseItem(item) {
      return {
        id: item.id,
        exercise: item.name,
        assets : item.assets.length ?  item.assets[Object.keys(item.assets)[0]].url : null,
        asset_type: item.assets.length ? item.assets[Object.keys(item.assets)[0]].type : 'image',
        category: item.category.length ? item.category[0].t_key : null,
        type: item.type,
        categories: item.category.length ? item.category : [],
      }
    },
    getImageUrl(name) {
      return imageService.getImageByName(name);
    },

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
    uploadImage(croppedImage) {
      let payload = {
        type: "image",
        image: croppedImage
      };
      // console.log(payload);
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
    }
  }
};
</script>
<style lang="scss" scoped>
    .name-btn {
        .v-btn {
            text-transform: none;
            color: $primary-light-1;
        }
        .v-btn:before {
            display: none;
        }
    }

    .v-input{
        &__slot {
            fieldset{
                color: yellow!important;

            }
        }
    }

    .btn-icon{
    margin-left: auto;
    padding-right: 10px;
    }

    .btn-text{
        margin-right: auto;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-transform: none !important;
        color: #49556A;
    }



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

.no-exercise{
    text-align: center;
    vertical-align: middle!important;
    &__text{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: 48px;
        text-align: center;
        color: #49556A;
    }
    &__sub-text{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
        color: #9FAEC2;
    }
    &__button{
        color: white;

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
.exercise-table{
  // &--img{
  //   max-height: 60px;
  //   max-width: 60px;
  //   border-radius: 10px!important;
  //   margin: 5px;
  // }
  &--text{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #49556A;
  }
  &--header{
    font-family: 'Open Sans'!important;
    font-style: normal!important;
    font-weight: 600!important;
    font-size: 12px!important;
    line-height: 16px!important;
    letter-spacing: 0.05em!important;
    text-transform: uppercase!important;
    color: #49556A!important;
  }
  &--button{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600!important;
    font-size: 14px;
    line-height: 18px;
    color: #15577C !important;
    text-transform: none;
    font-weight: bold!important;
  }
  .video-js {
		.vjs-big-play-button {
			font-size: 1.8em;
			line-height: 1.5em;
			height: 1.5em;
			width: 1.5em;
			display: block;
			position: absolute;
			top: 35% !important;
			left: 35% !important;
			padding: 0;
			cursor: pointer;
			opacity: 1;
			border: 0.08em solid #fff!important;
			background-color: #2b333f;
			background-color: transparent;
			border-radius: 50px!important;
			transition: all .4s;
		}
	}
}
.exercise-video{
  iframe {
    max-height: 60px;
    max-width: 60px;
    border-radius: 10px;
    margin: 5px;
  }
}

.v-menu{
  &__content {
    background: #FFFFFF!important;
    border-radius: 10px!important;
  }
}
::v-deep .v-data-table-header {
  background-color: #F7FAFC;
  font-family: 'Open Sans'!important;
    font-style: normal!important;
    font-weight: 600!important;
    font-size: 12px!important;
    line-height: 16px!important;
    letter-spacing: 0.05em!important;
    text-transform: uppercase!important;
    color: #49556A!important;
}
::v-deep .v-data-table {
  border-radius: 5px;  
}

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

  
.v-data-footer{
  &__select {
    margin-left: auto;
    margin-right: auto!important;
  }
}
.row-pointer:hover {
  cursor: pointer;
}

.filter-exercise{
  // min-width: 400px!important;
  max-width: 600px!important;
  // background: #F7FAFC!important;
  &--title{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
    color: #49556A;
  }
  &--button{
    background: #15577C;
    color: white;
    text-transform: none;
  }
  &--switch{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #49556A!important;
  }
}

  .mobile-view{
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    &--text{
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600!important;
      font-size: 16px!important;
      line-height: 22px!important;
    }
  }
</style>
