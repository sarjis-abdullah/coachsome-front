<template>
    <video-embed :params="{sandbox : 'allow-popups'}" ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
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

  @media only screen and (min-width: 400px ) {
    .exercise-preview{
      iframe{ 
        height:400px!important; 
        width:100%; 
        position:absolute; 
        z-index:999;
        left: 0;
        right: 0;
      }
      &__img{
        height:400px; 
        width:100%; 
        left: 0;
        right: 0;
      }

      .video-js{
        height: 400px!important;
        width: 500px!important;
        border-radius: 10px!important;
        margin: 5px;
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
          top: 45% !important;
          left: 45% !important;
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
    .preview-swiper {
      background: rgba(196, 196, 196, 0.1);
    }
    .preview-slide {
      margin-top: 20px;
      display: flex!important;

      // align-items: center!important;
      // justify-content: center!important;
      height: 400px!important;
      width: 100%!important;
      img {
        width: 100%!important;
      }
    }
    .swiper-slide {
      display: inline-flex;
      width: auto;
    }
    .swiper-button-prev:after, .swiper-button-next:after {
      font-size: 40px!important;
      font-weight: bold!important;
    }


  }
  @media only screen and (max-width: 399px) {
    .exercise-preview{
      iframe{ 
        height:300px!important; 
        width:100%; 
        position:absolute; 
        z-index:999;
        left: 0;
        right: 0;
      }
      &__img{
        height:300px; 
        width:100%; 
        left: 0;
        right: 0;
      }
      .video-js{
        height: 300px!important;
        width: 400px!important;
        border-radius: 10px!important;
        margin: 5px;

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
    .preview-swiper {
      background: rgba(196, 196, 196, 0.1);
    }
    .preview-slide {
      margin-top: 20px;
      display: flex!important;

      // align-items: center!important;
      // justify-content: center!important;
      height: 300px!important;
      width: 100%!important;
      img {
        width: 100%!important;
      }
    }
    .swiper-slide {
      display: inline-flex;
      width: auto;
    }
    .swiper-button-prev:after, .swiper-button-next:after {
      font-size: 40px!important;
      font-weight: bold!important;
    }

  }
</style>