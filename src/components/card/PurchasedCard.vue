<template>
  <div class="purchased-card">
    <v-card :color="isHighlightedColor ? 'primary-light-2' : '#cad5e1'">
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col cols="12" md="2" class="text-center text-md-left">
            <!-- First -->
            <div>
              <v-avatar v-if="profileImage" size="45">
                <img :src="profileImage" />
              </v-avatar>
              <v-avatar v-if="!profileImage" size="45" color="primary-light-1">
                <span class="white--text">
                  {{ profileAvatarName }}
                </span>
              </v-avatar>
            </div>
          </v-col>
          <v-col cols="12" md="3" class="text-center text-md-left">
            <!-- Second -->
            <div>
              <div class="package-card-title">
                {{ packageTitle }}
              </div>
              <div class="package-card-name">{{ profileName }} {{ date }}</div>
            </div>
          </v-col>
          <v-col cols="12" md="3" class="text-center">
            <!-- Third -->
            <div class="d-flex justify-center">
              <v-tooltip right max-width="250">
                <template v-slot:activator="{ on }">
                  <v-icon small color="primary-light-1" v-on="on"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <div>
                  <div>{{ packageDescription }}</div>
                </div>
                <v-divider></v-divider>
              </v-tooltip>
              <v-btn icon class="ml-2" @click="goToChatPage">
                <v-icon color="primary-light-1">mdi-comment-outline</v-icon>
              </v-btn>
              <v-btn icon color="white" @click.stop="isFavouriteBtnClickHandle">
                <v-icon v-if="isFavouriteData">mdi-star-outline</v-icon>
                <v-icon v-if="!isFavouriteData">mdi-star</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-center text-md-right">
            <!-- Fourth -->
            <div class="purchased-card-action">
              <div class="purchased-card-action__btn">
                <span v-if="isCoach">
                  <span v-if="status == 'Pending'">
                    <v-btn
                      color="orange"
                      depressed
                      x-small
                      @click="pendingRequstBtnClickHandle"
                    >
                      {{ $t("booking_purchased_card_btn_label_pending_req") }}
                    </v-btn>
                  </span>
                  <span v-if="status != 'Pending'">
                    <v-btn
                      v-if="isSold"
                      color="primary-light-1"
                      depressed
                      dark
                      x-small
                      @click="scheduleNextSessionBtnClickHandle"
                    >
                      {{
                        $t(
                          "booking_pending_req_btn_label_schedule_next_session"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="!isSold"
                      color="primary-light-1"
                      depressed
                      dark
                      x-small
                      @click="bookNextSessionBtnClickHandle"
                    >
                      {{
                        $t("booking_pending_req_btn_label_book_next_session")
                      }}
                    </v-btn>
                  </span>
                </span>
                <span v-if="isAthlete">
                  <v-btn
                    color="primary-light-1"
                    v-if="status == 'Accepted'"
                    depressed
                    dark
                    x-small
                    @click="bookNextSessionBtnClickHandle"
                  >
                    {{ $t("booking_pending_req_btn_label_book_next_session") }}
                  </v-btn>
                  <span v-if="status == 'Pending'">
                    <v-btn
                      color="orange"
                      depressed
                      x-small
                      @click="pendingRequstBtnClickHandle"
                    >
                      {{ $t("booking_purchased_card_btn_label_pending_req") }}
                    </v-btn>
                  </span>
                </span>
              </div>
              <div class="purchased-card-action__text">
                {{ leftSession }}
                {{ $t("booking_purchased_cared_action_partial_text") }}
                {{ totalSession }}
              </div>
              <div>
                <v-btn
                  plain
                  @click="show = !show"
                  x-small
                  color="primary-light-1"
                  class="text-normal"
                >
                  {{ show ? "Hide" : "Details" }}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <div>
                <strong>{{ "Booking ID" }}</strong>
              </div>
              <div>
                {{ bookingId }}
              </div>
            </div>
            <div v-if="orderKey">
              <div>
                <strong>{{ "Order Key" }}</strong>
              </div>
              <div>
                {{ orderKey }}
              </div>
            </div>

            <div>
              <div>
                <strong>{{ "Title" }}</strong>
              </div>
              <div>
                {{ packageTitle }}
              </div>
            </div>
            <div>
              <div>
                <strong>{{ "Description" }}</strong>
              </div>
              <div>
                {{ packageDescription }}
              </div>
            </div>
            <div v-if="readableDate">
              <div>
                <strong>{{ "Date" }}</strong>
              </div>
              <div>
                {{ readableDate }}
              </div>
            </div>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { pathData } from "@/data";

export default {
  props: [
    "bookingId",
    "orderKey",
    "status",
    "packageTitle",
    "profileName",
    "totalSession",
    "leftSession",
    "profileImage",
    "profileAvatarName",
    "date",
    "isSold",
    "packageDescription",
    "packageOwnerUserId",
    "packageBuyerUserId",
    "isFavourite",
    "readableDate"
  ],
  data() {
    return {
      isFavouriteData: false,
      show: false
    };
  },
  watch: {
    isFavourite: {
      handler: function(val) {
        this.isFavouriteData = val;
      },
      immediate: true
    }
  },
  computed: {
    isHighlightedColor() {
      if (this.isCoach) {
        return this.isSold ? false : true;
      } else {
        return false;
      }
    },
    isCoach() {
      return this.hasRole(["coach"]);
    },
    isAthlete() {
      return this.hasRole(["athlete"]);
    }
  },
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
    isFavouriteBtnClickHandle() {
      this.isFavouriteData = !this.isFavouriteData;
      this.$emit("click-favourite-btn", {
        bookingId: this.bookingId,
        isFavourite: this.isFavourite
      });
    },
    pendingRequstBtnClickHandle() {
      this.goToChatPage();
    },
    scheduleNextSessionBtnClickHandle() {
      this.goToChatPage();
    },
    bookNextSessionBtnClickHandle() {
      this.goToChatPage();
    },
    goToChatPage() {
      if (this.isSold) {
        this.$router.push(
          this.localePath({
            ...pathData.pages.chat,
            query: { userId: this.packageBuyerUserId }
          })
        );
      } else {
        this.$router.push(
          this.localePath({
            ...pathData.pages.chat,
            query: { userId: this.packageOwnerUserId }
          })
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.purchased-card {
  box-shadow: 0px 4px 4px rgba(73, 85, 106, 0.15);
  border-radius: 6px;

  .package-card-layout {
    width: 100%;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    &__first {
      width: 10%;
      text-align: center;
    }
    &__second {
      width: 20%;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &__third {
      width: 30%;
    }
    &__fourth {
      width: 40%;
      text-align: right;
    }
  }
  .package-card-title {
    font-family: $font-family;
    font-size: 18px;
    text-transform: uppercase;
    color: #000000;
    width: 100%;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .package-card-name {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-transform: uppercase;
  }
}
</style>
