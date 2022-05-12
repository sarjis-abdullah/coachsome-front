<template>
    <video-embed ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
    <img v-else class="create-exercise__img" :src="url" alt="exercise" />
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

  
  .create-exercise{
    iframe{
      max-height: 160px;
      max-width: 160px;
      border-radius: 10px!important;
      margin: 5px;
    }
    &__img{
      max-height: 155px;
      max-width: 155px;
      border-radius: 10px!important;
      margin: 5px;
    }
  }
</style>