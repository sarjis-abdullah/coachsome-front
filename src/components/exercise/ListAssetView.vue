<template>
    <video-embed ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
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


  .exercise-table{
     iframe {
      max-height: 90px;
      max-width: 90px;
      border-radius: 10px;
      margin: 5px;
    }
    &--img{
        max-height: 90px;
        max-width: 90px;
        border-radius: 10px!important;
        margin: 5px;
    }
    .video-js{
      height: 90px!important;
      width: 90px!important;
      border-radius: 10px!important;
      margin: 5px;
      overflow: hidden;
      .vjs-big-play-button {
        font-size: 1.8em;
        line-height: 1.5em;
        height: 1.5em;
        width: 1.5em;
        display: block;
        position: absolute;
        top: 35% !important;
        left: 35% !important;
        padding: 0;
        cursor: pointer;
        opacity: 1;
        border: 0.08em solid #fff!important;
        background-color: #2b333f;
        background-color: transparent;
        border-radius: 50px!important;
        transition: all .4s;
      }
      
    }

    .ytp-large-play-button {
        left: 30% !important;
        top: 55% !important;
        width: 3em !important;
        height: 3em!important;
        border: 2px solid white !important;
        border-radius: 50px!important;
      }
      .ytp-large-play-button-bg {
          fill: transparent!important;
      }


  }


  

</style>