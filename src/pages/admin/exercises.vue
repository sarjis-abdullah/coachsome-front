<template>
  <v-container fluid>

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
        <span></span>
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

    <v-row class="d-flex justify-center" v-if="!exercises.length">
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

    <v-row>
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
                  <v-btn
                    outlined
                    color="#49556A"
                    @click="loader = 'loading3'"
                    class="px-10"
                    >
                        <v-icon
                            left
                            dark
                        >
                            mdi-filter-outline
                        </v-icon>
                        Filter
                    </v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    solo
                    color="primary-light-1"
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
              class="exercise-table"
              :header-props="{ sortIcon: 'mdi-chevron-down' }"
            >

              <template v-slot:header.assets="{ header }">
                <v-checkbox
                ></v-checkbox>
              </template>

              <template v-slot:header.exercise="{ header }">
                Exercises( {{table.rows.length}} )
              </template>
              

              <template v-slot:item.assets="{ item }">
                    <list-asset-view :asset_type="item.asset_type" :url="item.assets"></list-asset-view>
              </template>

              <template v-slot:item.exercise="{ item }">
                <div class="exercise-table--text">
                    {{item.exercise}}
                </div>
              </template>
              <template v-slot:item.category="{ item }">
                <div class="exercise-table--text">
                  {{item.category}}
                </div>
              </template>
              <template v-slot:item.type="{ item }">
                 <div class="exercise-table--text">
                    {{item.type}}
                </div>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                    >
                        mdi-dots-horizontal
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click.stop="editExercise(item)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="showExercise(item)">
                      <v-list-item-title>Preview</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="deleteExercise(item)">
                      <v-list-item-title style="color: #FF3A0D">Remove</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
            </template>

            </v-data-table>


            <!-- Reason Dialog -->
            <v-dialog v-model="userEdit.reasonDialog" max-width="290">
              <v-card>
                <v-card-title class="headline">Reason</v-card-title>

                <v-card-text>
                  <v-textarea
                    solo
                    counter="42"
                    maxlength="42"
                    v-model="userEdit.data.reason"
                    label="Enter the reason"
                  ></v-textarea>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary-light-1"
                    text
                    @click="userEdit.reasonDialog = false"
                    >Cancel</v-btn
                  >

                  <v-btn
                    color="primary-light-1"
                    text
                    @click="userEdit.reasonDialog = false"
                    >Ok</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- User Edit Dialog -->
            <v-dialog
              v-model="userEdit.dialog"
              persistent
              max-width="70%"
              scrollable
            >
              <v-card>
                <v-card-title>
                  <span class="title black--text">User Profile</span>
                  <span class="ml-5 primary-light-1--text">{{
                    userEdit.data.name
                  }}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <!-- General Group -->
                    <v-row>
                      <v-col cols="12">
                        <span class="subtitle-2">General</span>
                      </v-col>
                    </v-row>
                    <!-- Email -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">EMAIL</div>
                        <div class="section-description">
                          Create a catchy title for your package
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="userEdit.data.email"
                          label="Email"
                          required
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Role -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">Role</div>
                        <div class="section-description">
                          Role is the part of the system.
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.roleId"
                          :items="roleList"
                          item-text="name"
                          item-value="id"
                          label="Select badge"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <!-- Mobile -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">MOBILE</div>
                        <div class="section-description">
                          This number will be used to notify you of changes in
                          you bookings or other time critical information
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <VuePhoneNumberInput
                          :default-country-code="userEdit.data.phone.code"
                          :only-countries="['DK', 'US']"
                          v-model="userEdit.data.phone.number"
                          @update="setUserEditDataMobileInfo"
                          :translations="{
                            countrySelectorLabel: $t(
                              'profile_section_mobile_label_country_code'
                            ),
                            phoneNumberLabel: $t(
                              'profile_section_mobile_input_label_phone_number'
                            ),
                            example: $t(
                              'profile_section_mobile_input_label_example'
                            )
                          }"
                        />
                      </v-col>
                    </v-row>

                    <!-- User Status -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">USER STATUS</div>
                        <div class="section-description">
                          This status show a coachsome select status of a
                          specific user in relation to the world
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          @change="userEdit.reasonDialog = true"
                          solo
                          v-model="userEdit.data.activityStatusId"
                          :items="activityStatusList"
                          item-text="display_text"
                          item-value="id"
                          label="Select status"
                        ></v-select>
                        <div v-if="userEdit.data.reason">
                          <div class="caption warning--text">Reason</div>
                          <div>{{ userEdit.data.reason }}</div>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Ranking Group -->
                    <v-row>
                      <v-col cols="12">
                        <span class="subtitle-2">Ranking</span>
                      </v-col>
                    </v-row>
                    <!-- Ranking -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">RANKING</div>
                        <div class="section-description">
                          Internal ranking points to promote a coach. Calculated
                          from the system
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-slider
                          color="primary-light-1"
                          v-model="userEdit.data.ranking"
                          :max="100"
                          class="align-center"
                        >
                          <template v-slot:append>
                            <v-text-field
                              v-model="userEdit.data.ranking"
                              class="mt-0 pt-0"
                              type="number"
                              style="width: 60px"
                            ></v-text-field>
                          </template>
                        </v-slider>
                      </v-col>
                    </v-row>

                    <!-- Star Status -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">STAR STATUS</div>
                        <div class="section-description">
                          This status show a coachsome select status of a
                          specific user in relation to the world
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.starStatusId"
                          :items="starStatusList"
                          item-text="display_text"
                          item-value="id"
                          label="Select status"
                          persistent-hint
                          single-line
                        ></v-select>
                      </v-col>
                    </v-row>

                    <!-- Skill Level -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">SKILL LEVEL</div>
                        <div class="section-description">
                          This is a Coachsome chosen skill level on the coach
                          and it is an estimation from our limited experience
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <span>
                          <v-slider
                            v-model="userEdit.data.skillLevelSlider.value"
                            :min="userEdit.data.skillLevelSlider.min"
                            :max="userEdit.data.skillLevelSlider.max"
                          ></v-slider>
                        </span>
                      </v-col>
                    </v-row>

                    <!-- Coach badge -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">Coach badge</div>
                        <div class="section-description">
                          Select the badge the coach should have. There are four
                          levels total.
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.badgeId"
                          :items="badges"
                          item-text="name"
                          item-value="id"
                          label="Select badge"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary-light-1"
                    text
                    @click="userEdit.dialog = false"
                    >Close</v-btn
                  >
                  <v-btn color="primary-light-1" text @click="updateUser"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>


            <!-- Exercise Create Dialog -->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="exerciseCreate.dialog"
                  persistent
                  max-width="800px"
                >
                  <v-card class="create-exercise">
                    <v-card-title>
                      <span class="create-exercise__title">Create New Exercise</span>
                      <v-spacer></v-spacer>
                      <v-btn
                            color="#49556A"
                            icon
                            @click="exerciseCreate.dialog = false"
                            class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <div class="line"></div>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="exerciseCreate.valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col cols="12" class="pb-0 mb-0">
                                <p class="create-exercise__label">Exercise Name <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-text-field
                                    outlined
                                    dense
                                    label="Name your exercise"
                                    v-model="exerciseCreate.initialValue.name"
                                    :rules="[v => !!v || 'Exercise Name is required']"
                                    required
                                    class="create-exercise__input-field"
                                />
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Instructions <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-textarea
                                    outlined
                                    v-model="exerciseCreate.initialValue.instructions"
                                    name="input-7-4"
                                    label="Add exercise instructions"
                                    class="create-exercise__input-field"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Video URL <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-form ref="videoForm" v-model="videoForm.valid" lazy-validation>
                                    <v-text-field
                                        label="Enter a valid youtube or vimoe link"
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
                                    ></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <v-btn
                                    text
                                    color="#15577C"
                                    class="px-0"
                                    @click="saveVideoUrl()"
                                >
                                    <img class="btn-icon"  :src="require('@/assets/images/icons/video-url.svg')" alt="">  <span class="btn-text"> Upload a Video</span>
                                </v-btn>
                            </v-col>



                            <!-- image upload -->
                            <v-col cols="12">
                                <div class="create-exercise__label pb-2">Upload Photos</div>
                                <div class="create-exercise__description pb-2">
                                    Upload up to 4 images. Accepted: jpg, jpeg, png
                                </div>
                                <v-row>
                                    <v-col cols="3"  v-if="links != ''" v-for="(link, index) in links" v-bind:key="index">
                                      <v-badge 
                                        top
                                        avatar
                                        color="rgb(0 0 0 / 0%) !important"
                                        offset-x="15"
                                        offset-y="15" 
                                        style="width: 100%; height: 200px;"
                                      >
                                        <v-btn style="height:22px!important; width:22px!important"  slot="badge" x-small fab color="#49556A" @click="handleRemoveBtnClick(index)">
                                            <v-icon color="white" x-small >mdi-close</v-icon>
                                        </v-btn>
                                        <asset-view :url="link.url" :asset_type="link.type"></asset-view>
                                      </v-badge>   
                                    </v-col>
                                    <v-col cols="3" v-if="imgSrc">
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
                                    <v-col cols="3" v-if="links.length <=3">
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


                            <!-- Category Section -->
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Category <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-autocomplete
                                    v-model="categoriesSelected"
                                    :items="categories"
                                    item-text="name"
                                    return-object
                                    chips
                                    clearable
                                    label="What category suits this exercise best?"
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
                                <p class="create-exercise__label">Sports <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-autocomplete
                                    v-model="sportsSelected"
                                    :items="sports"
                                    item-text="name"
                                    return-object
                                    chips
                                    clearable
                                    label="What sport is this exercise targeted for?"
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
                                <p class="create-exercise__label">Lavel <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-autocomplete
                                    v-model="lavelsSelected"
                                    :items="lavels"
                                    item-text="name"
                                    return-object
                                    chips
                                    clearable
                                    label="What sport is this exercise targeted for?"
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
                                <p class="create-exercise__label">Tags <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-combobox
                                    v-model="tagData.tagsSelected"
                                    :items="tagData.tags"
                                    clearable
                                    label="Add relevant tags to easilier identify the exercise"
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
                                >
                                    Create Exercise
                                </v-btn>
                            </v-col>

                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

            <!-- Exercise Preview Dialog -->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="exercisePreviewDialog"
                  max-width="600px"
                >
                  <v-card class="exercise-preview">

                    <v-row v-if="exerciseData!=null" class="mt-0 pt-0">
                      <v-col cols="12" class="mt-n10 pt-n10">
                        <swiper
                          class="swiper"
                          :options="{
                            slidesPerView: 1,
                            spaceBetween: 10,
                            direction: 'horizontal',
                            loop: true,
                            speed: 2500,
                            autoplay:false,
                            navigation: {
                              nextEl: '.swiper-button-next',
                              prevEl: '.swiper-button-prev'
                            },

                            breakpoints: {
                              1024: {
                                slidesPerView: 1,
                                spaceBetween: 30
                              },
                              768: {
                                slidesPerView: 1,
                                spaceBetween: 30
                              },
                              640: {
                                slidesPerView: 1,
                                spaceBetween: 20
                              },
                              320: {
                                slidesPerView: 1,
                                spaceBetween: 10
                              }
                            }
                          }"
                        >
                    
                          <swiper-slide class="d-flex justify-center" v-for="(asset, index) in exerciseData.assets" :key="index">
                            <div class="logo-slide">
                              <asset-preview :asset_type="asset.type" :url="asset.url"></asset-preview>
                            </div>
                          </swiper-slide>
                      
                          <div class="swiper-pagination" slot="pagination"></div>
                          <div
                            class="swiper-button-prev"
                            slot="button-prev"
                          ></div>
                          <div
                            class="swiper-button-next"
                            slot="button-next"
                          ></div>
                        </swiper>
                      </v-col>
                    </v-row>
                    <v-row v-if="exerciseData!=null">
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Exercise Name</span>
                        <span class="exercise-preview--description">{{exerciseData.name}}</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Exercise Description</span>
                        <span class="exercise-preview--description">{{exerciseData.instructions}}</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--breakdown">Exercise Breakdown</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Category</span>
                        <span class="exercise-preview--description">{{exerciseData.category[0].name}}</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Sport</span>
                        <span class="exercise-preview--description">{{exerciseData.sport[0].name}}</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Lavel</span>
                        <span class="exercise-preview--description">{{exerciseData.lavel[0].name}}</span>
                      </v-col>
                      <v-col cols="12" class="py-1 my-1">
                        <span class="exercise-preview--title">Tags</span>
                          <v-chip
                            v-for="(tag, index) in exerciseData.tags" :key="index"
                            class="exercise-preview--tag"
                            color="#6EB5CB"
                            small
                          >{{tag}}</v-chip>
                      </v-col>

                    </v-row>

                    
                    
                    
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

            <!-- Exercise Edit Dialog -->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="exerciseEdit.dialog"
                  persistent
                  max-width="800px"
                >
                  <v-card class="create-exercise">
                    <v-card-title>
                      <span class="create-exercise__title">Edit Exercise</span>
                      <v-spacer></v-spacer>
                      <v-btn
                            color="#49556A"
                            icon
                            @click="exerciseEdit.dialog = false"
                            class="exercise__close-button"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <div class="line"></div>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="exerciseEdit.valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col cols="12" class="pb-0 mb-0">
                                <p class="create-exercise__label">Exercise Name <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-text-field
                                    outlined
                                    dense
                                    label="Name your exercise"
                                    v-model="exerciseEdit.data.name"
                                    :rules="[v => !!v || 'Exercise Name is required']"
                                    required
                                    class="create-exercise__input-field"
                                />
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Instructions <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-textarea
                                    outlined
                                    v-model="exerciseEdit.data.instructions"
                                    name="input-7-4"
                                    label="Add exercise instructions"
                                    class="create-exercise__input-field"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Video URL <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-form ref="videoForm" v-model="videoForm.valid" lazy-validation>
                                    <v-text-field
                                        label="Enter a valid youtube or vimoe link"
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
                                    ></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" class="py-0 my-0">
                                <v-btn
                                    text
                                    color="#15577C"
                                    class="px-0"
                                    @click="saveVideoUrl()"
                                >
                                    <img class="btn-icon"  :src="require('@/assets/images/icons/video-url.svg')" alt="">  <span class="btn-text"> Upload a Video</span>
                                </v-btn>
                            </v-col>



                            <!-- image upload -->
                            <v-col cols="12">
                                <div class="create-exercise__label pb-2">Upload Photos</div>
                                <div class="create-exercise__description pb-2">
                                    Upload up to 4 images. Accepted: jpg, jpeg, png
                                </div>
                                <v-row>
                                    <v-col cols="3"  v-if="links != ''" v-for="(link, index) in links" v-bind:key="index">
                                      <v-badge 
                                        top
                                        avatar
                                        color="rgb(0 0 0 / 0%) !important"
                                        offset-x="15"
                                        offset-y="15" 
                                        style="width: 100%; height: 200px;"
                                      >
                                        <v-btn style="height:22px!important; width:22px!important"  slot="badge" x-small fab color="#49556A" @click="handleRemoveBtnClick(index)">
                                            <v-icon color="white" x-small >mdi-close</v-icon>
                                        </v-btn>
                                        <asset-view :url="link.url" :asset_type="link.type"></asset-view>
                                      </v-badge>   
                                    </v-col>
                                    <v-col cols="3" v-if="imgSrc">
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
                                    <v-col cols="3" v-if="links.length <=3">
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


                            <!-- Category Section -->
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Category <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                
                                <v-autocomplete
                                    v-model="exerciseEdit.data.category"
                                    :items="categories"
                                    item-text="name"
                                    return-object
                                    chips
                                    multiple
                                    clearable
                                    label="What category suits this exercise best?"
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
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Sports <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-autocomplete
                                    v-model="exerciseEdit.data.sport"
                                    :items="sports"
                                    item-text="name"
                                    return-object
                                    chips
                                    multiple
                                    clearable
                                    label="What sport is this exercise targeted for?"
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
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Lavel <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-autocomplete
                                    v-model="exerciseEdit.data.lavel"
                                    :items="lavels"
                                    item-text="t_key"
                                    return-object
                                    chips
                                    multiple
                                    clearable
                                    label="What sport is this exercise targeted for?"
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
                            <v-col cols="12" class="py-0 my-0">
                                <p class="create-exercise__label">Tags <v-badge color="white"><span style="color: red">*</span></v-badge></p>
                                <v-combobox
                                    v-model="exerciseEdit.data.tags"
                                    :items="tagData.tags"
                                    clearable
                                    label="Add relevant tags to easilier identify the exercise"
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
                                    @click="handleUpateExercise"
                                >
                                    Save Exercise
                                </v-btn>
                            </v-col>

                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { imageService } from "@/services";
import { adminUserApi, adminImpersonateApi, ExerciseApi } from "@/api";
import { pathData } from "@/data";
import VuePhoneNumberInput from "vue-phone-number-input";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";



// ---------------
import DarkboxGallery from "@/components/darkbox/Gallery";
import ListAssetView from '../../components/exercise/ListAssetView.vue';
import AssetView from '../../components/exercise/AssetView.vue';
import AssetPreview from '../../components/exercise/AssetPreview.vue';


export default {
  layout: "admin",
  components: {
    VuePhoneNumberInput,
    MobileTopNav,
    DarkboxGallery,
    Cropper,
    ListAssetView,
    AssetView,
    AssetPreview
  },
  data() {
    return {
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
            text: "",
            align: "start",
            filterable: false,
            value: "assets",
            sortable: false,  
            class: "exercise-table--header"
          },
          { text: "Exercises("+'0'+")", value: "exercise", class: "exercise-table--header"},
          { text: "Category", value: "category", class: "exercise-table--header" },
          { text: "Type", value: "type", class: "exercise-table--header" },
          { text: 'Actions', value: 'actions', sortable: false, class: "exercise-table--header" },
        ],
        rows: []
      },

        // ------------------------------------



     dialog: {
        category: false,
        tag: false,
      },

      url: {
        image: "",
        video: ""
      },
      videoForm: {
        valid: true,
        isLoading: false
      },
      
      badges: [],
      activityStatusList: [],
      starStatusList: [],
      roleList: [],

      
      
      userEdit: {
        editedIndex: -1,
        dialog: false,
        reasonDialog: false,
        data: {
          id: null,
          name: "",
          email: "",
          phone: {
            code: "",
            number: ""
          },
          ranking: 0,
          skillLevelSlider: {
            min: 0,
            max: 100,
            value: 40
          },
          starStatusId: null,
          activityStatusId: null,
          reason: null,
          badgeId: null,
          roleId: null
        }
      },
      
    };
  },
  computed:{
    instruction() {
      return this.exerciseCreate.initialValue.instructions;
    },
    exerciseCount(){
      return 0; 
    }
  },
  watch: {
    "exerciseCreate.dialog": function() {
      this.exerciseCreate.initialValue.name = "";
      this.exerciseCreate.initialValue.instructions = "";
    }
  },
  created() {
    this.getExercise();
    this.langCode = this.$i18n.locale;
    this.fetchCategories();
    this.fetchSports();
    this.fetchLavels();
  },
  methods: {

    handleExerciseCreateBtn(){
      this.resetExerciseData();
      this.exerciseCreate.dialog = true;
    },

    removeEditCategory(item) {
      this.exerciseEdit.data.category.splice(this.exerciseEdit.data.category.indexOf(item), 1);
      this.exerciseEdit.data.category = [...this.exerciseEdit.data.category];
    },

    removeEditSport(item) {
      this.exerciseEdit.data.sport.splice(this.exerciseEdit.data.sport.indexOf(item), 1);
      this.exerciseEdit.data.sport = [...this.exerciseEdit.data.sport];
    },

    removeEditLavel(item) {
      this.exerciseEdit.data.lavel.splice(this.exerciseEdit.data.lavel.indexOf(item), 1);
      this.exerciseEdit.data.lavel = [...this.exerciseEdit.data.lavel];
    },


    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },

    async showExercise(exercise){
      const { data } = await ExerciseApi(this.$axios).previewExercise(
        encodeURIComponent(exercise.id)
      );

      this.resetExerciseData();

      if(data.exercise){
        this.exerciseData = data.exercise;
        this.exercisePreviewDialog = true;
      }
    },

    deleteExercise(exercise){
            
      if (confirm("Are you sure?")) {
        this.isLoading = true;
        ExerciseApi(this.$axios)
          .destroyExercise(exercise.id)
          .then(({ data }) => {
            let index = this.table.rows.findIndex(
              exercise => exercise.id == exercise.id
            );

            if (index != undefined) {
              this.table.rows.splice(index, 1);
            }
            this.$toast.success("Successfully deleted");
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

    handleCreateExercise(){

      if(this.$auth && this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        var role = 1
      }else{
        role = 2
      }

      let payload = {};
      payload.name = this.exerciseCreate.initialValue.name;
      payload.instructions = this.instruction;
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
              this.table.rows.unshift(formattedRowList[0]);
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
      ExerciseApi(this.$axios)
        .getExerciseList()
        .then(({ data }) => {
          // console.log(data);
          if (data.exercises) {
            if(data.exercises.length){
              this.exercises.push(data.exercises);
            }
            this.makeExerciseTableRow(data.exercises);
          }
        })
        .catch(() => {});
    },

    async editExercise(exercise){
      const { data } = await ExerciseApi(this.$axios).previewExercise(
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

        this.exerciseEdit.dialog = true;
      }
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
    

    resetUserData() {
      this.userEdit.data.id = "";
      this.userEdit.data.email = "";
      this.userEdit.data.phone.code = "";
      this.userEdit.data.phone.number = "";
      this.userEdit.data.skillLevelSlider.value = "";
      this.userEdit.data.activityStatusId = "";
      this.userEdit.data.activityStatusId = "";
      this.userEdit.data.reason = "";
      this.userEdit.data.ranking = "";
      this.userEdit.data.badgeId = null;
      this.userEdit.data.roleId = null;
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
        assets : item.assets[Object.keys(item.assets)[0]].url,
        asset_type: item.assets[Object.keys(item.assets)[0]].type,
        category: item.category[0].name,
        type: item.type
      }
    },

    setUserEditDataMobileInfo(item) {
      if (item.countryCode) {
        this.userEdit.data.phone.code = item.countryCode;
      }
      if (item.phoneNumber) {
        this.userEdit.data.phone.number = item.phoneNumber;
      }
    },


    setUserDataToEdit(selectedRow) {
      this.resetUserData();
      if (selectedRow) {
        console.log(selectedRow);
        this.userEdit.data.id = selectedRow.id;
        this.userEdit.data.name = selectedRow.name;
        this.userEdit.data.email = selectedRow.email;
        this.userEdit.data.phone.code = selectedRow.phoneCode;
        this.userEdit.data.phone.number = selectedRow.phoneNumber;
        this.userEdit.data.activityStatusId = selectedRow.activityStatusId;
        this.userEdit.data.starStatusId = selectedRow.starStatusId;
        this.userEdit.data.reason = selectedRow.activityStatusReason;
        this.userEdit.data.ranking = selectedRow.ranking;
        this.userEdit.data.badgeId = selectedRow.badgeId;
        this.userEdit.data.roleId = selectedRow.roleId;
        this.userEdit.dialog = true;
      }
    },
    async changeUser(item) {
      if (!this.$auth.user.is_switched) {
        try {
          const { data } = await adminImpersonateApi(this.$axios).switched({
            id: item.id
          });
          this.$auth.setUser(data.user);
          this.$auth.setUserToken(data.accessToken);
          if (this.$auth.hasRole(["coach"])) {
            this.$router.push(this.localePath(pathData.coach.editProfile));
          } else if (this.$auth.hasRole(["athlete"])) {
            this.$router.push(this.localePath(pathData.athlete.editProfile));
          } else {
            this.$router.push(this.localePath(pathData.admin.dashboard));
          }
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
      } else {
        this.$toast.error("You are now switched user.");
      }
    },
    getImageUrl(name) {
      return imageService.getImageByName(name);
    },





    // -----------------------------------

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
    width: 150px;
    height: 150px;
    border-radius: 15px;
    position: relative;
    border: 2px dashed #becce1;
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
    display: flex;
    align-items: center;
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
  background-color: #ECF2F7;
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
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #9FAEC2;
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

  .logos-swiper {
    background: rgba(196, 196, 196, 0.1);
  }
  .logo-slide {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .swiper-slide {
    display: inline-flex;
    width: auto;
  }

</style>
