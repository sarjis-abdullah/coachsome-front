<template>
  <div :class="parentClass">
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <div @click="$emit('close')" class="cursor-pointer">
        <img
          class="pb-5"
          :src="require('@/assets/img/svg-icons/cancel.svg')"
          alt="Cancel Button"
        />
      </div>
      <div class="form-title">
        {{ title }}
      </div>
    </div>
    <div v-else class="hidden-md-and-up">
      <MobileTopNav :headerText="title">
        <template v-slot:goBack>
          <v-btn icon @click="$emit('close')">
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
        </template>
      </MobileTopNav>
    </div>
  </div>
</template>

<script>
import MobileTopNav from "@/components/layout/global/MobileTopNav";
export default {
  components: {
    MobileTopNav
  },
  props: {
    title: {
      type: String,
      required: true
    },
    parentClass: {
      type: [String, Object],
      required: false,
      default: ""
    }
  }
};
</script>

<style scoped>
.form-title {
  font-size: 25px;
  line-height: 35px;
  color: #49556a;
}
</style>
