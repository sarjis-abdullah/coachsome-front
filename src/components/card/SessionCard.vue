<template>
  <div >
  <v-card class="session-card" v-if="status == 'Accepted'">
    <v-card-actions>
          <v-list-item three-line>
            <v-list-item-avatar
              color="primary-light-1"
              class="d-flex justify-center"
              size="60"
            >
              <v-img v-if="profileImage.square" :src="profileImage.square"></v-img>
              <div v-else >
                {{ profileAvatarName }}
              </div>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="session-card__title" v-html="profileName"></v-list-item-title>
              <v-list-item-subtitle>
                <div class="session-card__date_time">
                  {{ date }} , {{ time }}
                </div>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <div class="session-card__address">
                  {{ address}}
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
    </v-card-actions>
  </v-card>
</div>
</template>
<script>
import packageHelper from "@/helper/package";
import { currencyService } from "@/services";

export default {
  props: [
    "date",
    "time",
    "isCoachToCoach",
    "status",
    "profileName",
    "profileImage",
    "profileAvatarName",
    "city",
    "zip",
    "address",
  ],
  data() {
    return {
      currencyService
    };
  },
  computed: {
    isCampPackage() {
      let isCampPackage = false;
      if (this.category) {
        isCampPackage = packageHelper.getCampPackageId() == this.category.id;
      }
      return isCampPackage;
    }
  }
};
</script>

<style lang="scss" scoped>
.session-card {
  @include shadow-3;
  background: $white;
  border-radius: 12px;
  &__title {
    font-family: $font-family;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    text-transform: capitalize;
    color: #15577C;
  }
  &__date_time{
    font-family: $font-family;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #9FAEC2;
  }
  &__address{
    font-family: $font-family;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-transform: capitalize;
    color: #9FAEC2;
  }
}
</style>
