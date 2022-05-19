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

  }

  $background-color_1: #2B333F;
  $background-color_2: rgba(43, 51, 63, 0.7);

  .video-js {
    .vjs-big-play-button {
      font-size: 1.8em;
      line-height: 1.5em;
      height: 1.5em;
      width: 3em;
      display: block;
      position: absolute;
      top: 40%!important;
      left: 32%!important;
      padding: 0;
      cursor: pointer;
      opacity: 1;
      border: 0.06666em solid #fff;
      background-color: $background-color_1;
      background-color: $background-color_2;
      border-radius: 0.3em;
      transition: all 0.4s;
    }
  }


  }
  

</style>