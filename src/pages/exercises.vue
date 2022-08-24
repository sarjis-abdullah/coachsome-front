<template>
  <v-container fluid>

    <!-- Mobile Header Start -->
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="headerText">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
          v-if="!exerciseDialog"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="handleCloseExercise"
          v-else
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <v-btn
          icon
          @click.stop="handleExerciseCreateBtn"
          v-if="!exerciseDialog"
        >
          <v-icon style="font-size: 25px!important;" class="common-top-add-icon">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
        <v-menu offset-y v-else-if="previewMode">
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
            <v-list-item :disabled="isAuthCoach && exerciseData.type == 'System'" @click.stop="editExercise(exerciseData)">
              <v-list-item-title>{{$t("btn_edit_ex")}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="duplicateExercise(exerciseData)">
              <v-list-item-title>{{$t("btn_duplicate")}}</v-list-item-title>
            </v-list-item>
            <v-list-item :disabled="isAuthCoach && exerciseData.type == 'System'" @click.stop="deleteExercise(exerciseData)">
              <v-list-item-title :style="[isAuthCoach && exerciseData.type == 'System' ? {'color': 'rgba(0, 0, 0, 0.38)'} : {'color': '#FF3A0D'}]">{{$t("btn_remove")}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <span v-else></span>
      </template>
    </mobile-top-nav>

    <!-- Desktop Header Start -->
    <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('dropdown_item_exercises')"></desktop-top-nav>
    
    <div :class="{'px-5' : $vuetify.breakpoint.mdAndUp}">
      <!-- No exercise start -->
      <v-row class="d-flex justify-center py-10" v-if="noExercise">
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

      <!-- mobile view start -->
      <v-row class="d-md-none" justify="center" align="center" v-if="exercises.length && !exerciseDialog && !exercisePreviewDialog">

        <v-col cols="12" sm="8" md="6" lg="4" xs="12" class="pt-5 pb-2" >
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            single-line
            solo
            @input="filteredList"
            dense
            hide-details
          ></v-text-field>
        </v-col>

        <!-- Exercise Table For Mobile Start -->
        <v-col cols="12" sm="8" md="6" lg="4" xs="12"  class="pb-10">
          <v-row>
            <v-col cols="12" v-for="(item, index) in table.rows" :key="index" class="py-0 my-0">
              <v-hover v-slot="{ hover }">
                <v-card :color="hover ? '#eef1f3' : '#FFFFFF'" class="exercise-table mobile-view " @click.native="showExercise(item)" exact >
                  <v-card-text class="pa-2 ma-2">
                    <div style="display:inline-block; align: center;vertical-align: middle;" >
                      <list-asset-view :asset_type="item.asset_type" :url="item.assets" ></list-asset-view>
                    </div>
                    <div style="display:inline-block;vertical-align: middle; padding-left: 8px" class="exercise-table--text mobile-view--text" >
                        {{item.exercise}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
        <!-- Exercise Table For Mobile End -->

        <!-- Exercise Form For Mobile Start -->
      </v-row>

      <!-- desktop view -->
      <v-row class="d-none d-md-block" >
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
                      outlined
                      dense
                      class="default-text-field"
                      color="#9FAEC2"
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
                              v-model="formValid"
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
                                        :items="exerciseInitialData.categories"
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
                                        :items="exerciseInitialData.sports"
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
                                        :items="exerciseInitialData.lavels"
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
                      <v-list-item :disabled="isAuthCoach && item.type == 'System'"  @click.stop="editExercise(item)">
                        <v-list-item-title>{{$t("btn_edit_ex")}}</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click.stop="duplicateExercise(item)">
                        <v-list-item-title>{{$t("btn_duplicate")}}</v-list-item-title>
                      </v-list-item>
                      <v-list-item :disabled="isAuthCoach && item.type == 'System'"  @click.stop="deleteExercise(item)">
                        <v-list-item-title :style="[isAuthCoach && item.type == 'System' ? {'color': 'rgba(0, 0, 0, 0.38)'} : {'color': '#FF3A0D'}]">{{$t("btn_remove")}}</v-list-item-title>
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

      <!-- Dialogs -->
      <v-row justify="center" align="center" >
        <v-col cols="12">
        <!-- Create Dialog -->
          <template v-if="exerciseDialog">
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <v-dialog color="#f7fafc" v-model="exerciseDialog" :max-width="dialogWidth" @click:outside="handleCloseExercise">
                <ExerciseForm 
                  @newExerciseAdded="handleCreateExercise($event)"
                  @saveExerciseData="handleUpdateExercise($event)" 
                  @closeCreateDialog="handleCloseExercise"
                  @exerciseDataUpdated="handleModifyExercise($event)"
                  :exerciseNewData="exerciseInitialData"
                  v-if="!previewMode"
                />
                <ExercisePreview v-else  :exerciseData="exerciseData"/>
              </v-dialog>
            </div>
            <div v-else>
              <ExerciseForm 
                @newExerciseAdded="handleCreateExercise($event)"
                @saveExerciseData="handleUpdateExercise($event)" 
                @closeCreateDialog="handleCloseExercise"
                @exerciseDataUpdated="handleModifyExercise($event)"
                :exerciseNewData="exerciseInitialData"
                v-if="!previewMode"
              />
              <ExercisePreview v-else  :exerciseData="exerciseData"/>
            </div>
          </template>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import {  ExerciseApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import ListAssetView from '@/components/exercise/ListAssetView.vue';
import ExerciseForm from '@/components/exercise/forms/ExerciseForm.vue';
import ExercisePreview from '@/components/exercise/forms/ExercisePreview.vue';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  layout: "exercise",
  components: {
    MobileTopNav,
    ListAssetView,
    ExerciseForm,
    ExercisePreview,
    DesktopTopNav
  },
  data() {
    return {
      previewMode: false,
      previewPage: false,
      exerciseInitialData: {
        categories : [],
        sports : [],
        lavels : [],
        tags : [],
        name : null,
        instructions : null,
        links : [],
        categoriesSelected : [],
        sportsSelected : [],
        lavelsSelected : [],
        tagsSelected : [],
        type : null,
        shareWithCoach: false,
        assets : [],
      },
      exerciseDialog: false,
      formValid: true,
      noExercise: false,
      exercisePreviewDialog: false,
      filterRequest: false,
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
      isLoading: false,
      loadingLimit: 8,
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
    };
  },
  watch:{
    '$route': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.$route?.query?.exerciseDialog || this.previewMode) {
          this.exerciseDialog = true
        }else{
          this.exerciseDialog = false;
        }
      }
    },
    exerciseDialog: function(val) {
      // console.log(val);
    },
    
  },
  computed:{
    dialogWidth(){
      if(this.previewMode){
        return "470px";
      }else{
        return "800px";
      }
      
    },
    exerciseCount(){
      return 0; 
    },
    headerText(){
      let title = this.$i18n.t('dropdown_item_exercises');
      if(this.exerciseDialog && !this.previewMode){
        title = this.exerciseInitialData.id != null ? this.$i18n.t('ex_edit') : this.$i18n.t('ex_create');
      }
      else if(this.previewMode){
        title = this.exerciseData.name;
      }
      else if(!this.exerciseDialog && !this.previewMode){
        title = this.$i18n.t('dropdown_item_exercises');
      }
      return title;
    },
    isAuthCoach() {
      return this.$auth && this.$auth.loggedIn && this.$auth.hasRole("coach");
    },
  },
  created() {
    this.langCode = this.$i18n.locale;
    this.getExercises();
    this.fetchCategories();
    this.fetchSports();
    this.fetchLavels();
  },
  methods: {

    filteredList() {
      let filteredData = [];
      if(this.search != null){

        this.exercises.filter((item)=>{
          if(this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))){
            filteredData.push(item);
          }
        })
        this.makeExerciseTableRow(filteredData);

      }else{
        this.makeExerciseTableRow(this.exercises);
      }
    },


    handleExerciseCreateBtn(){
      this.resetExerciseData();
      this.previewMode = false;
      this.openExerciseDialog()
      this.$nextTick(() => {});
    },

    closeExerciseDialog(){
      this.previewMode = false;
      if(this.exercises && this.exercises.length){
          this.noExercise = false;
      }else{
        this.noExercise = true;
      }
      this.$router.push({query:{}})
    },

    openExerciseDialog(){
      this.exerciseDialog =true;
      if(this.$vuetify.breakpoint.smAndDown){
        this.noExercise = false;
      }
      this.$router.push({query:{}});
      const query = {
        ...this.$route.query,
        exerciseDialog: true
      }
      this.$router.push({query})
    },

    openExercisePreviewDialog(){
      this.previewMode = true;
      this.openExerciseDialog();
    },

    handleCloseExercise(){
      this.resetExerciseData();
      this.exerciseDialog = false;
      this.exercisePreviewDialog = false;
      this.closeExerciseDialog();
    },

    handleCloseExercisePreviewDialog(){
      this.exercisePreviewDialog = false;
      this.closeExerciseDialog();
    },
      

    handleWithVideo(value){
      this.filter.withVideo = value;
    },


    removeFilterCategory(item) {
      this.filter.categoriesSelected.splice(this.filter.categoriesSelected.indexOf(item), 1);
      this.filter.categoriesSelected = [...this.filter.categoriesSelected];
    },

    removeFilterSport(item) {
      this.filter.sportsSelected.splice(this.filter.sportsSelected.indexOf(item), 1);
      this.filter.sportsSelected = [...this.filter.sportsSelected];
    },

    removeFilterLavel(item) {
      this.filter.lavelsSelected.splice(this.filter.lavelsSelected.indexOf(item), 1);
      this.filter.lavelsSelected = [...this.filter.lavelsSelected];
    },


    handleBack(){
      if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        this.$router.push(this.localePath(pathData.admin.profileMenu));
      }else if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }
    },


    handleColumnClick(value) {
      this.resetExerciseData();
      this.showExercise(value);
    },

    async fetchLavels() {
      const locale = this.$store.getters.getCurrLang;
      try {
        const { data } = await ExerciseApi(
          this.$axios
        ).getLavels({ locale });
        data.lavels.forEach(item => {
          this.exerciseInitialData.lavels.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.exerciseInitialData.lavels.sort(function(a, b) {
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
          this.exerciseInitialData.categories.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.exerciseInitialData.categories.sort(function(a, b) {
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
          this.exerciseInitialData.sports.push(
            Object.assign(item, { name: this.$i18n.t(item.t_key) })
          );
        });
        this.exerciseInitialData.sports.sort(function(a, b) {
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


    getExercises() {
      this.resetExerciseData();
      ExerciseApi(this.$axios)
        .getExerciseList()
        .then(({ data }) => {
          if (data.exercises) {
            if(data.exercises.length){
              this.noExercise = false;
              this.exercises = [];
              data.exercises.map(item => {
                this.exercises.push(item);
              });
            }else{
              this.noExercise = true;
            }
            this.makeExerciseTableRow(data.exercises);
          }
        })
        .catch(() => {});
    },

    async duplicateExercise(selectedExercise){

      this.exercisePreviewDialog = false;

      const index = this.exercises.findIndex(
                      item => item.id == selectedExercise.id
                    );

      let exercise = this.exercises[index];

      const { data } = await ExerciseApi(this.$axios).duplicateExercise(
        encodeURIComponent(selectedExercise.id)
      );

      this.resetExerciseData();
      
      if(exercise){
        this.exerciseInitialData.name = exercise.name;
        this.exerciseInitialData.instructions = exercise.instructions;
        this.exerciseInitialData.assets = data.exercise.assets;
        this.exerciseInitialData.links = data.exercise.assets;
        this.exerciseInitialData.categoriesSelected = exercise.category;
        this.exerciseInitialData.sportsSelected = exercise.sport;
        this.exerciseInitialData.lavelsSelected = exercise.lavel;
        this.exerciseInitialData.tagsSelected = exercise.tags;
        this.exerciseInitialData.shareWithCoach = exercise.shareWithCoach,
        this.previewMode = false;
        this.openExerciseDialog();
        
      }

    },

    handleModifyExercise(exercise){
      const index = this.table.rows.findIndex(
              item => item.id == exercise.id
            );
      Object.assign(this.table.rows[index],this.formatExerciseItem(exercise));
    },

    handleCreateExercise(payload){
      ExerciseApi(this.$axios)
        .createExercise(payload)
        .then(({ data }) => {
          if (data.exercise) {
            console.log(data.exercise);
            this.noExercise = false;
            if(this.exercises && this.exercises.length){
              let formattedRowList = this.formatExerciseRow([{ ...data.exercise }]);
              this.table.rows.unshift(formattedRowList[0]);
              this.exercises.push(data.exercise);
            }else{
              this.getExercises();
            }
            this.$toast.success("This Exercise has been created successfully.");
            this.previewMode = false;
            this.handleCloseExercise();
          }
        })
        .catch(({ response }) => {
          const { data } = response;
          if (data.message) {
            this.$toast.error(data.message);
          }
        });
    },

    handleUpdateExercise(payload){
       ExerciseApi(this.$axios)
        .updateExercise(payload)
        .then(({ data }) => {
          if (data.exercise) {
            const index = this.table.rows.findIndex(
              item => item.id == data.exercise.id
            );
            const excerciseIndex = this.exercises.findIndex(
              exercise => exercise.id == data.exercise.id
            );
            Object.assign(this.exercises[excerciseIndex],data.exercise);

            Object.assign(this.table.rows[index],this.formatExerciseItem(data.exercise));

            this.$toast.success('Exercise has been updated successfully!');
            this.previewMode = false;
            this.handleCloseExercise();
          }
          
        })
        .catch(({ response }) => {
          if (response.data.status == "error") {
            this.$toast.error(response.data.message);
          }
        });

    },

    editExercise(selectedExercise){
      
      this.exercisePreviewDialog = false;

      const index = this.exercises.findIndex(
                      item => item.id == selectedExercise.id
                    );

      let exercise = this.exercises[index];

      this.resetExerciseData();

      if(exercise){

        this.exerciseInitialData.id = exercise.id;
        this.exerciseInitialData.name = exercise.name;
        this.exerciseInitialData.assets = exercise.assets[0].url_type == "default" ? [] : exercise.assets;
        this.exerciseInitialData.links = exercise.assets[0].url_type == "default" ? [] : exercise.assets;
        this.exerciseInitialData.instructions = exercise.instructions;
        this.exerciseInitialData.categoriesSelected = exercise.category;
        this.exerciseInitialData.sportsSelected = exercise.sport;
        this.exerciseInitialData.lavelsSelected = exercise.lavel;
        this.exerciseInitialData.tagsSelected = exercise.tags;
        this.exerciseInitialData.shareWithCoach = exercise.shareWithCoach;
        this.exerciseInitialData.type = exercise.type;
        this.previewMode = false;
        this.openExerciseDialog();
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
            this.makeExerciseTableRow(data.exercises);
          }
        })
        .catch(() => {});

    },

    showExercise(selectedExercise){

      this.resetExerciseData();

      const index = this.exercises.findIndex(
                      item => item.id == selectedExercise.id
                    );

      let exercise = this.exercises[index];
      if(exercise){
        this.exerciseData = exercise;
        this.previewMode = true;
        this.openExercisePreviewDialog();
      }
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

            let exerciseIndex = this.exercises.findIndex(
              item => item.id == data.exercise.id
            );

            if (index != undefined) {
              this.table.rows.splice(index, 1);
            }
            
            if (exerciseIndex != undefined) {
              this.exercises.splice(exerciseIndex, 1);
            }

            this.$toast.success("Successfully deleted");
            this.previewMode = false;
            this.handleCloseExercise();

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

    handleRefresh(){
      this.getExercises();
    },

    resetExerciseData() {
      this.exerciseData = [];
      this.exerciseInitialData.id = null;
      this.exerciseInitialData.tags = [];
      this.exerciseInitialData.name = null;
      this.exerciseInitialData.instructions = null;
      this.exerciseInitialData.links = [];
      this.exerciseInitialData.categoriesSelected = [];
      this.exerciseInitialData.sportsSelected = [];
      this.exerciseInitialData.lavelsSelected = [];
      this.exerciseInitialData.tagsSelected = [];
      this.exerciseInitialData.type = null;
      this.exerciseInitialData.assets = [];
      this.exerciseInitialData.shareWithCoach = false;
      this.filter.typeSytem = false;
      this.filter.typeCustom = false;
      this.filter.withVideo = false;
      this.filterRequest = false;
      this.exerciseDialog = false;
      this.previewMode = false;
    },

    makeExerciseTableRow(exercises) {
      this.table.rows = [];
      this.table.rows = this.formatExerciseRow(exercises);
    },
    formatExerciseRow(exercises) {
      return exercises.map(item => {
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
  // .fullscreen {
  //   border-radius: 0;
  //   margin: 0;
  //   height: 100%;
  //   position: fixed;
  //   overflow-y: auto;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   z-index: 1;
  // }
</style>
