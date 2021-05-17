<template>
  <div class="purchased-card">
    <v-card :color="isHighlightedColor ? 'primary-light-2' : '#cad5e1'">
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col cols="12" md="2" class="text-center text-md-left">
            <!-- First -->
            <div>
              <v-avatar v-if="profileImage" size="45">
                <img :src="image" />
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
                    >help_outline</v-icon
                  >
                </template>
                <span>{{ packageDescription }}</span>
              </v-tooltip>
              <v-btn icon small class="ml-2" @click="goToChatPage">
                <v-icon color="primary-light-1">far fa-comment</v-icon>
              </v-btn>
              <v-btn icon color="white" @click.stop="isFavouriteBtnClickHandle">
                <v-icon v-if="isFavouriteData">star</v-icon>
                <v-icon v-if="!isFavouriteData">star_border</v-icon>
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
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { imageService } from "@/services";
import { pathData } from "@/data";

export default {
  props: [
    "bookingId",
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
    "isFavourite"
  ],
  data() {
    return {
      isFavouriteData: false
    };
  },
  watch: {
    profileImage: function(val) {
      if (val) {
        this.image = imageService.getImageByName(val);
      } else {
        this.image = imageService.getDefaultProfileImage();
      }
    },
    isFavourite: {
      handler: function(val) {
        this.isFavouriteData = val;
      },
      immediate: true
    }
  },
  computed: {
    image: function() {
      if (this.profileImage) {
        return imageService.getImageByName(this.profileImage);
      } else {
        return imageService.getDefaultProfileImage();
      }
    },
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
      if (this.isCoach) {
        if (this.isSold) {
          this.$router.push({
            path: pathData.pages.chat,
            query: { userId: this.packageBuyerUserId }
          });
        } else {
          this.$router.push({
            path: pathData.pages.chat,
            query: { userId: this.packageOwnerUserId }
          });
        }
      } else {
        this.$router.push({
          path: pathData.pages.chat,
          query: { userId: this.packageOwnerUserId }
        });
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
