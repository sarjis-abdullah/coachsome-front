<template>
    <video-embed ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
    <img v-else class="exercise-preview__img" :src="url" alt="exercise" />
</template>

<script>
    export default {
        props: 
		{
			asset_type: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			}
		}
    }
</script>

<style lang="scss">
  .exercise-preview{
    iframe{
      width: 556px !important;
      height: 400px!important;
      margin: 5px;
    }
    &__img{
      height: 400px!important;
      width: 556px !important;
      margin: 5px;
    }
  }
</style>