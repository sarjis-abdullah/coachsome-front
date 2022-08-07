<template>
    <div>
        <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{title}}</div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>