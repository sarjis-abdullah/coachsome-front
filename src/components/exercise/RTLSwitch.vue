<template>

    <v-switch 
        class="v-input--reverse v-input--expand" 
        inset
        color="#5CC866"
        dense
        hide-details
        v-model="withVideo"
    >
        <template #label >{{$t("ex_with_video")}}</template>
    </v-switch>
    
</template>
<script>
    export default {
    props: 
        {
          withVideo: {
            type: Boolean,
            default: false
          }
        },
    watch: {
    withVideo(val) {
      this.$emit("updated", val);
    }
  }
    }
</script>
<style lang="scss">
.v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
  .v-application--is-ltr & {
    .v-input--selection-controls__input {
      margin-right: 0;
      margin-left: 8px;
    }
  }
  .v-application--is-rtl & {
    .v-input--selection-controls__input {
      margin-left: 0;
      margin-right: 8px;
    }
  }
}
.v-input--expand .v-input__slot {
  justify-content: space-between;
  .v-label {
    display: block;
    flex: 1;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #49556A;

  }
}
</style>