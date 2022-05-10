<template>
    <video-embed ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
    <img v-else class="exercise-table--img" :src="url" alt="exercise" />
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

 iframe {
    max-height: 90px;
    max-width: 90px;
    border-radius: 10px;
    margin: 5px;
  }
  .exercise-table{
    &--img{
        max-height: 90px;
        max-width: 90px;
        border-radius: 10px!important;
        margin: 5px;
    }
  }
</style>