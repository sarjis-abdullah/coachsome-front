<template>
    <video-embed ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video' " :src="url"></video-embed>
        <video-player   class="exercise-video"
          v-else-if="asset_type == 'custom-video'"
          ref="videoPlayer"
          :options="{
              muted: true,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: url
              }],
          }"
          :playsinline="true"
        ></video-player>
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
        },
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

    .video-js{
      
      max-height: 155px!important;
      max-width: 155px!important;
      border-radius: 10px!important;
      margin: 5px;
      overflow: hidden;
      .vjs-big-play-button {
        font-size: 1.8em;
        line-height: 2.1em;
        height: 2.1em;
        width: 2.1em;
        display: block;
        position: absolute;
        top: 38% !important;
        left: 38% !important;
        padding: 0;
        cursor: pointer;
        opacity: 1;
        border: 0.08em solid #fff;
        background-color: #2B333F;
        background-color: transparent;
        border-radius: 0.3em;
        transition: all 0.4s;
        border-radius: 50px;
      }
    }


  }
  

</style>