<template>
  <div class="coach-availability-page">
    <v-container >
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('avaiiability_page_title')">
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
        <div class="d-none d-md-block container-page">
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("avaiiability_page_title") }}</div>
            </v-col>
            <v-col cols="12">
              <div class="line"></div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <div class="section-title pb-2">{{ $t("text_times") }}</div>
              <div class="section-description">
                {{ $t("availability_section_desc") }}
              </div>
            </v-col>
            <v-col cols="12" md="9">
              <div id="selectable-area">
                <v-row v-for="(week, weekIndex) in defaultWeeks" :key="weekIndex">
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                      v-for="(day, dayIndex) in week.days"
                      :key="dayIndex"
                    >
                      <div>{{ $t(day.t_key) }}</div>
                      <v-row>
                        <v-col
                          cols="2"
                          md="2"
                          v-for="(time, timeIndex) in day.times"
                          :key="timeIndex"
                        >
                          <v-btn
                            @click.stop="
                              changeStatusForDefaultTime(
                                !time.status,
                                timeIndex,
                                dayIndex,
                                weekIndex
                              )
                            "
                            x-small
                            :color="time.status == 0 ? 'light' : 'orange lighten-4'"
                            class="mr-2 mt-2"
                          >
                            {{ time.text }}
                            <span
                              class="selectable-item"
                              :data-w="weekIndex"
                              :data-d="dayIndex"
                              :data-t="timeIndex"
                            ></span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6" class="ml-md-10 d-flex align-center">
                      <v-btn
                        dark
                        color="primary-light-1"
                        class="mr-3 mt-4"
                        hide-details
                        @click="saveDefaultAvailability"
                        >{{ $t("profile_save_btn") }}</v-btn
                      >
                      <v-switch
                        hide-details
                        v-model="week.is_fewer_time"
                        :label="
                          week.is_fewer_time
                            ? $t('input_label_all_time_slot')
                            : $t('input_label_fewer_time_slot')
                        "
                        @change="fewerSlotForDefaultTime(weekIndex)"
                        color="primary-light-1"
                      />
                    </v-col>
                  </v-row>
                </v-row>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="line my-5"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <div class="section-title pb-2">
                {{ $t("availability_section_scheduled_time_title") }}
              </div>
              <div class="section-description">
                {{ $t("availability_section_schedule_time_desc") }}
              </div>
            </v-col>
            <v-col cols="12" md="9">
              <v-expansion-panels v-model="weekPanel" multiple>
                <v-expansion-panel
                  v-for="(week, weekIndex) in weeks"
                  :key="weekIndex"
                >
                  <v-card flat tile>
                    <v-card-title
                      :style="{ backgroundColor: '#CAD5E1', paddingTop: 2 + 'px' }"
                    >
                      <span class="title-week">{{
                        $t("text_week") + " " + week.week_no
                      }}</span>
                      <span class="font-weight-light">
                        <v-btn
                          color="primary-light-1"
                          class="text-capitalize"
                          @click="togglePanel(week, weekIndex)"
                          text
                          x-small
                          >Edit</v-btn
                        >
                      </span>
                    </v-card-title>
                    <v-card-text :style="{ backgroundColor: '#ECF2F7' }">
                      <v-row>
                        <v-col v-for="(day, dayIndex) in week.days" :key="dayIndex">
                          <div>{{ $t(day.t_key) }}</div>
                          <v-row
                            v-for="(timeRange, timeRangeIndex) in day.time_ranges"
                            :key="timeRangeIndex"
                          >
                            <v-col>
                              <v-chip
                                @click:close="
                                  closed(
                                    timeRange,
                                    timeRangeIndex,
                                    dayIndex,
                                    weekIndex
                                  )
                                "
                                close
                                color="rgba(73, 85, 106, 0.15)"
                                label
                                small
                                >{{
                                  timeRange.start_time + " - " + timeRange.end_time
                                }}</v-chip
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-expansion-panel-content
                    :style="{ backgroundColor: '#E1E8F1' }"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                        v-for="(day, dayIndex) in week.days"
                        :key="dayIndex"
                      >
                        <div>{{ $t(day.t_key) }}</div>
                        <v-row>
                          <v-col
                            cols="4"
                            md="2"
                            v-for="(time, timeIndex) in day.times"
                            :key="timeIndex"
                          >
                            <v-btn
                              @click.stop="
                                changeStatus(
                                  !time.status,
                                  timeIndex,
                                  dayIndex,
                                  weekIndex
                                )
                              "
                              x-small
                              :color="
                                time.status == 0 ? 'light' : 'orange lighten-4'
                              "
                              class="mr-2 mt-2"
                              >{{ time.text }}</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="2" class="ml-md-10">
                        <v-btn
                          dark
                          color="primary-light-1"
                          block
                          class="mt-3"
                          @click="updateAvailabilitytimes(weekIndex)"
                          >{{ $t("profile_save_btn") }}</v-btn
                        >
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-switch
                          v-model="week.is_fewer_time"
                          :label="
                            week.is_fewer_time
                              ? $t('input_label_all_time_slot')
                              : $t('input_label_fewer_time_slot')
                          "
                          @change="fewerSlot(weekIndex)"
                          color="primary-light-1"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row class="d-sm-flex d-xs-flex d-lg-none">
            <v-col cols="12" class="mx-0 px-0">
              <client-back-footer class="px-0 py-0" />
            </v-col>
          </v-row>
        </div>
        <div class="d-md-none container-page">
          <v-row class=" pt-5">
            <v-col cols="12" class="px-0 mx-0">
              <div class="section-title pb-2">{{$t("pwa_availability_menu")}}</div>
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" class="px-0 mx-0">
              <v-btn 
                block
                @click.stop="times = true"
                :style="{
                          backgroundColor : times ? '#15577C !important' : '#F7FAFC!important',
                          color: times ? 'white !important' : '#15577C!important'
                        }"
              >
                {{$t("pwa_times")}}
              </v-btn>
            </v-col>
            <v-col cols="6" class="pl-0 ml-o">
              <v-btn
                block
                @click.stop="times = false"
                :style="{
                          backgroundColor : !times ? '#15577C !important' : '#F7FAFC!important',
                          color: !times ? 'white !important' : '#15577C!important'
                        }"
              >
                {{$t("pwa_scheduled_times")}}
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-if="times">
            <v-col cols="12" >
              <div class="section-description">
                {{ $t("availability_section_desc") }}
              </div>
            </v-col>
            <v-col cols="12">
              <div id="selectable-area">
                <v-row v-for="(week, weekIndex) in defaultWeeks" :key="weekIndex">
                  <v-row class="pa-0 ma-0">
                    <v-col
                      cols="12"
                      v-for="(day, dayIndex) in week.days"
                      :key="dayIndex"
                      class="time-card"
                    >
                      <div class="time-card-title my-1">{{ $t(day.t_key) }}</div>
                      <v-row>
                        <v-col
                          cols="3"
                          v-for="(time, timeIndex) in day.times"
                          :key="timeIndex"
                        >
                          <v-btn
                          block
                            @click.stop="
                              changeStatusForDefaultTime(
                                !time.status,
                                timeIndex,
                                dayIndex,
                                weekIndex
                              )
                            "
                            x-small
                            :color="time.status == 0 ? 'light' : 'orange lighten-4'"
                            class="mr-2 mt-2"
                          >
                            {{ time.text }}
                            <span
                              class="selectable-item"
                              :data-w="weekIndex"
                              :data-d="dayIndex"
                              :data-t="timeIndex"
                            ></span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    </v-row>
                    <!-- button -->
                    <v-row>
                    <v-col cols="12">
                      <v-btn
                        dark
                        block
                        color="primary-light-1"
                        hide-details
                        @click="saveDefaultAvailability"
                        >{{ $t("profile_save_btn") }}</v-btn
                      >
                      <v-switch
                        hide-details
                        v-model="week.is_fewer_time"
                        :label="
                          week.is_fewer_time
                            ? $t('input_label_all_time_slot')
                            : $t('input_label_fewer_time_slot')
                        "
                        @change="fewerSlotForDefaultTime(weekIndex)"
                        color="primary-light-1"
                      />
                    </v-col>
                    </v-row>
                </v-row>
              </div>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12" class="px-0 mx-0">
              <div class="section-description">
                {{ $t("availability_section_schedule_time_desc") }}
              </div>
            </v-col>
            <v-col cols="12" class="px-0 mx-0">
              <v-expansion-panels v-model="weekPanel" multiple>
                <v-expansion-panel
                  v-for="(week, weekIndex) in weeks"
                  :key="weekIndex"
                  class="my-2"
                >
                  <v-card flat tile class="week-panel">
                    <v-card-title
                      :style="{ backgroundColor: '#6F8098', paddingTop: 2 + 'px' }"
                      class="week-card-title"
                    >
                      <span class="title-week">{{
                        $t("text_week") + " " + week.week_no
                      }}</span>
                      <span class="font-weight-light">
                        <v-btn
                          color="white"
                          class="text-capitalize"
                          @click="togglePanel(week, weekIndex)"
                          text
                          x-small
                          >Edit</v-btn
                        >
                      </span>
                    </v-card-title>
                    <v-card-text :style="{ backgroundColor: '#FFFFFF' }">
                      <v-row>
                        <v-col v-for="(day, dayIndex) in week.days" :key="dayIndex">
                          <div>{{ $t(day.t_key) }}</div>
                          <v-row
                            v-for="(timeRange, timeRangeIndex) in day.time_ranges"
                            :key="timeRangeIndex"
                          >
                            <v-col>
                              <v-chip
                                @click:close="
                                  closed(
                                    timeRange,
                                    timeRangeIndex,
                                    dayIndex,
                                    weekIndex
                                  )
                                "
                                close
                                color="rgba(73, 85, 106, 0.15)"
                                label
                                small
                                >{{
                                  timeRange.start_time + " - " + timeRange.end_time
                                }}</v-chip
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-expansion-panel-content
                    :style="{ backgroundColor: '#E1E8F1' }"
                  >
                    <v-row>
                      <v-col
                        cols="12"
                        v-for="(day, dayIndex) in week.days"
                        :key="dayIndex"
                        class="time-card"
                      >
                      <div class="time-card-title my-1">{{ $t(day.t_key) }}</div>
                        <v-row>
                          <v-col
                            cols="3"
                            v-for="(time, timeIndex) in day.times"
                            :key="timeIndex"
                          >
                            <v-btn
                              @click.stop="
                                changeStatus(
                                  !time.status,
                                  timeIndex,
                                  dayIndex,
                                  weekIndex
                                )
                              "
                              x-small
                              :color="
                                time.status == 0 ? 'light' : 'orange lighten-4'
                              "
                              class="mr-2 mt-2"
                              >{{ time.text }}</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          dark
                          color="primary-light-1"
                          block
                          class="mt-3"
                          @click="updateAvailabilitytimes(weekIndex)"
                          >{{ $t("profile_save_btn") }}</v-btn
                        >
                      </v-col>
                      <v-col cols="12">
                        <v-switch
                          v-model="week.is_fewer_time"
                          :label="
                            week.is_fewer_time
                              ? $t('input_label_all_time_slot')
                              : $t('input_label_fewer_time_slot')
                          "
                          @change="fewerSlot(weekIndex)"
                          color="primary-light-1"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>

        </div>
    </v-container>
  </div>
</template>

<script>
import * as R from "ramda";
import { coachAvailabilityApi } from "@/api";
import { pathData } from "@/data";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import DragSelect from "dragselect";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "coach",
  components: {
    ClientBackFooter,
    MobileTopNav
  },
  data() {
    return {
      weekPanel: [],
      text: 'center',
      times: true,
      filterableId: [1, 2, 3, 4, 5],
      weeks: [
        {
          id: 1,
          text: "Week 1",
          is_fewer_time: 0,
          days: [
            {
              id: 1,
              name: "Monday",
              time_ranges: [
                {
                  start_time: 1,
                  end_time: 9
                },
                {
                  start_time: 10,
                  end_time: 23
                }
              ],
              filtered_times: [],
              times: [
                {
                  id: 1,
                  text: "00:00",
                  status: 0
                },
                {
                  id: 2,
                  text: "01:00",
                  status: 0
                },
                {
                  id: 3,
                  text: "02:00",
                  status: 0
                },
                {
                  id: 4,
                  text: "03:00",
                  status: 0
                },
                {
                  id: 5,
                  text: "04:00",
                  status: 0
                },
                {
                  id: 6,
                  text: "05:00",
                  status: 0
                },
                {
                  id: 7,
                  text: "06:00",
                  status: 0
                },
                {
                  id: 8,
                  text: "07:00",
                  status: 0
                },
                {
                  id: 9,
                  text: "08:00",
                  status: 0
                },
                {
                  id: 10,
                  text: "09:00",
                  status: 0
                },
                {
                  id: 11,
                  text: "10:00",
                  status: 0
                },
                {
                  id: 12,
                  text: "11:00",
                  status: 0
                },
                {
                  id: 13,
                  text: "12:00",
                  status: 1
                },
                {
                  id: 14,
                  text: "13:00",
                  status: 1
                },
                {
                  id: 15,
                  text: "14:00",
                  status: 1
                },
                {
                  id: 16,
                  text: "15:00",
                  status: 1
                },
                {
                  id: 17,
                  text: "16:00",
                  status: 1
                },
                {
                  id: 18,
                  text: "17:00",
                  status: 1
                },
                {
                  id: 19,
                  text: "18:00",
                  status: 0
                },
                {
                  id: 20,
                  text: "19:00",
                  status: 0
                },
                {
                  id: 21,
                  text: "20:00",
                  status: 0
                },
                {
                  id: 22,
                  text: "21:00",
                  status: 0
                },
                {
                  id: 23,
                  text: "22:00",
                  status: 0
                },
                {
                  id: 24,
                  text: "23:00",
                  status: 0
                }
              ]
            }
          ]
        }
      ],
      defaultWeeks: [
        {
          is_fewer_time: 0,
          days: [
            {
              id: 1,
              name: "Monday",
              time_ranges: [
                {
                  start_time: 1,
                  end_time: 9
                },
                {
                  start_time: 10,
                  end_time: 23
                }
              ],
              filtered_times: [],
              times: [
                {
                  id: 1,
                  text: "00:00",
                  status: 0
                },
                {
                  id: 2,
                  text: "01:00",
                  status: 0
                },
                {
                  id: 3,
                  text: "02:00",
                  status: 0
                },
                {
                  id: 4,
                  text: "03:00",
                  status: 0
                },
                {
                  id: 5,
                  text: "04:00",
                  status: 0
                },
                {
                  id: 6,
                  text: "05:00",
                  status: 0
                },
                {
                  id: 7,
                  text: "06:00",
                  status: 0
                },
                {
                  id: 8,
                  text: "07:00",
                  status: 0
                },
                {
                  id: 9,
                  text: "08:00",
                  status: 0
                },
                {
                  id: 10,
                  text: "09:00",
                  status: 0
                },
                {
                  id: 11,
                  text: "10:00",
                  status: 0
                },
                {
                  id: 12,
                  text: "11:00",
                  status: 0
                },
                {
                  id: 13,
                  text: "12:00",
                  status: 1
                },
                {
                  id: 14,
                  text: "13:00",
                  status: 1
                },
                {
                  id: 15,
                  text: "14:00",
                  status: 1
                },
                {
                  id: 16,
                  text: "15:00",
                  status: 1
                },
                {
                  id: 17,
                  text: "16:00",
                  status: 1
                },
                {
                  id: 18,
                  text: "17:00",
                  status: 1
                },
                {
                  id: 19,
                  text: "18:00",
                  status: 0
                },
                {
                  id: 20,
                  text: "19:00",
                  status: 0
                },
                {
                  id: 21,
                  text: "20:00",
                  status: 0
                },
                {
                  id: 22,
                  text: "21:00",
                  status: 0
                },
                {
                  id: 23,
                  text: "22:00",
                  status: 0
                },
                {
                  id: 24,
                  text: "23:00",
                  status: 0
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {},
  mounted() {
    coachAvailabilityApi(this.$axios)
      .availabilityPageTrigger()
      .then(response => {
        this.defaultWeeks = response.data.default_weeks;
        this.filterableId = response.data.filterable_id_list;
        this.weeks = response.data.weeks;
        this.$nextTick(() => {
          const ds = new DragSelect({
            selectables: document.querySelectorAll(".selectable-item"),
            area: document.getElementById("selectable-area")
          });

          ds.subscribe("callback", ({ items }) => {
            if (items.length > 1) {
              items.forEach(elm => {
                let time = this.defaultWeeks[elm.getAttribute("data-w")].days[
                  elm.getAttribute("data-d")
                ].times[elm.getAttribute("data-t")];
                time.status = 1;
              });
            }
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.coach.editMenu));
    },
    setAvailabilityProgress(val) {
      this.$store.dispatch("pageProgress/setAvailabilityProgress", val);
    },
    saveDefaultAvailability() {
      let payload = {
        is_fewer_time: this.defaultWeeks[0].is_fewer_time,
        days: this.defaultWeeks[0].days
      };
      coachAvailabilityApi(this.$axios)
        .saveDfaultAvailabilitytimes(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.setAvailabilityProgress(response.data.progress);
            this.$toast.success(response.data.message);
            if (response.data.week_status == "initial") {
              this.weeks = response.data.weeks;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateAvailabilitytimes(weekIndex) {
      let payload = {
        week_id: this.weeks[weekIndex].id,
        days: this.weeks[weekIndex].days,
        is_fewer_time: this.weeks[weekIndex].is_fewer_time
      };
      coachAvailabilityApi(this.$axios)
        .updateAvailabilitytimes(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.$toast.success(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closed(timeRange, timeRangeIndex, dayIndex, weekIndex) {
      this.weeks[weekIndex].days[dayIndex].times.forEach(item => {
        if (
          timeRange.start_time <= item.text.split(":")[0] &&
          timeRange.end_time >= item.text.split(":")[0]
        ) {
          item.status = 0;
        }
      });
      this.weeks[weekIndex].days[dayIndex].filtered_times.forEach(item => {
        if (
          timeRange.start_time <= item.text.split(":")[0] &&
          timeRange.end_time >= item.text.split(":")[0]
        ) {
          item.status = 0;
        }
      });
      this.weeks[weekIndex].days[dayIndex].time_ranges.splice(
        timeRangeIndex,
        1
      );
      this.updateAvailabilitytimes(weekIndex);
    },
    fewerSlot(weekIndex) {
      if (this.weeks[weekIndex].is_fewer_time == true) {
        this.weeks[weekIndex].days.forEach((item, index) => {
          this.weeks[weekIndex].days[index].times = this.weeks[weekIndex].days[
            index
          ].times.filter(item => {
            if (!this.filterableId.includes(item.id)) {
              return item;
            } else {
              this.weeks[weekIndex].days[index].filtered_times.push(item);
            }
          });
        });
      } else {
        this.weeks[weekIndex].days.forEach((item, index) => {
          item.filtered_times.forEach(item => {
            if (this.filterableId.includes(item.id)) {
              this.weeks[weekIndex].days[index].times.push(item);
            }
          });
          item.filtered_times = [];
          this.weeks[weekIndex].days[index].times.sort(this.compare);
        });
      }
    },
    fewerSlotForDefaultTime(weekIndex) {
      if (this.defaultWeeks[weekIndex].is_fewer_time == true) {
        this.defaultWeeks[weekIndex].days.forEach((item, index) => {
          this.defaultWeeks[weekIndex].days[index].times = this.defaultWeeks[
            weekIndex
          ].days[index].times.filter(item => {
            if (!this.filterableId.includes(item.id)) {
              return item;
            } else {
              this.defaultWeeks[weekIndex].days[index].filtered_times.push(
                item
              );
            }
          });
        });
      } else {
        this.defaultWeeks[weekIndex].days.forEach((item, index) => {
          item.filtered_times.forEach(item => {
            if (this.filterableId.includes(item.id)) {
              this.defaultWeeks[weekIndex].days[index].times.push(item);
            }
          });
          item.filtered_times = [];
          this.defaultWeeks[weekIndex].days[index].times.sort(this.compare);
        });
      }
    },
    changeStatus(status, timeIndex, dayIndex, weekIndex) {
      // Separate the enable time
      let tempArr = [];
      let preItemStatus = 0;
      this.weeks[weekIndex].days[dayIndex].times[timeIndex].status = status;
      this.weeks[weekIndex].days[dayIndex].times.forEach(item => {
        if (item.status == true) {
          if (!preItemStatus) {
            tempArr.push("break");
          }
          tempArr.push(item.text.split(":")[0]);
        }
        preItemStatus = item.status;
      });

      // Create range array
      var arr = [];
      let arrContainer = [];
      tempArr.forEach(item => {
        if (item == "break") {
          arr = [];
          arrContainer.push(arr);
        } else {
          arr.push(item);
        }
      });

      // Set Range
      this.weeks[weekIndex].days[dayIndex].time_ranges = [];
      arrContainer.forEach(item => {
        let range = {};
        range.start_time = item[0];
        range.end_time = R.last(item);
        this.weeks[weekIndex].days[dayIndex].time_ranges.push(range);
      });
    },
    changeStatusForDefaultTime(status, timeIndex, dayIndex, weekIndex) {
      // Separate the enable time
      let tempArr = [];
      let preItemStatus = 0;
      this.defaultWeeks[weekIndex].days[dayIndex].times[
        timeIndex
      ].status = status;
      this.defaultWeeks[weekIndex].days[dayIndex].times.forEach(item => {
        if (item.status == true) {
          if (!preItemStatus) {
            tempArr.push("break");
          }
          tempArr.push(item.text.split(":")[0]);
        }
        preItemStatus = item.status;
      });

      // Create range array
      var arr = [];
      let arrContainer = [];
      tempArr.forEach(item => {
        if (item == "break") {
          arr = [];
          arrContainer.push(arr);
        } else {
          arr.push(item);
        }
      });

      // Set Range
      this.defaultWeeks[weekIndex].days[dayIndex].time_ranges = [];
      arrContainer.forEach(item => {
        let range = {};
        range.start_time = item[0];
        range.end_time = R.last(item);
        this.defaultWeeks[weekIndex].days[dayIndex].time_ranges.push(range);
      });
    },
    togglePanel(item, index) {
      if (this.weekPanel.includes(index)) {
        this.weekPanel = [];
      } else {
        this.weekPanel = [index];
      }
    },
    compare(a, b) {
      const aText = a.text.split(":")[0];
      const bText = b.text.split(":")[0];
      if (aText > bText) return 1;
      if (bText > aText) return -1;
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.availabilty-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  text-transform: uppercase;

  color: #15577C;
}
.coach-availability-page {
  background: $body-bg;
  height: 100%;
  .title-week {
    font-family: $font-family;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: #f7fafc;
  }
}
.time-card{
  background: #FFFFFF;
  border-radius: 4px;
  width: 100%;
  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
  margin: 24px 0px;
}
.time-card-title{
  color: #15577C;
  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}
.week-card-title{
  background: #6F8098;
  box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
  display: flex;
  justify-content: space-between;
}
.week-panel{
  box-shadow: 0px 4px 12px rgba(10, 27, 43, 0.15);
  // border-radius: 8px!important;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}
.container-page{
  padding: 0 30px!important;
}
</style>
