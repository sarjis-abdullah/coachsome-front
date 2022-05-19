<template>
    <video-embed :params="{sandbox : 'allow-popups'}" ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
    <span v-else-if="asset_type == 'custom-video'">
      <Media
          :kind="'video'"
          :isMuted="false"
          :src="url"
          :autoplay="false"
          :controls="true"
          :loop="false"
          :ref="'video_player'"
          width="100%"
          @play="showPlayerIcon = false"
          @pause="showPlayerIcon = true"
      >
      </Media>

      <img @click.stop="handleVideoPlay" v-if="showPlayerIcon" class="player_icon" width="70" :src="require('@/assets/images/exercise/play-circle.svg')" alt="">

    </span>
      
    <img v-else class="exercise-preview__image" :src="url" alt="exercise" />

   
    

</template>


<script>
import Media from "@dongido/vue-viaudio";
    export default {
      components:{
        Media
      },
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
      data() {
          return {
            showPlayerIcon: true
          }
        },
      methods:{
        handleVideoPlay(){
          this.showPlayerIcon = false;
          this.$refs.video_player.play();
        }

      }
    }
</script>

<style lang="scss">
  .swiper-container {
      z-index: 0!important;
  }

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
      video{ 
        height:400px!important; 
        width:100%; 
        position:absolute; 
        z-index:999;
        left: 0;
        right: 0;
        background: black;
      }
      &__image{
        height:400px; 
        width:100%; 
        left: 0;
        right: 0;
      }
    }
    .preview-swiper {
      background: rgba(196, 196, 196, 0.1);
    }
    .preview-slide {
      margin-top: 20px;
      display: flex!important;
      height: 400px!important;
      width: 100%!important;

    }
    .swiper-slide {
      display: inline-flex;
      width: auto;
    }
    .swiper-button-prev:after, .swiper-button-next:after {
      font-size: 40px!important;
      font-weight: bold!important;
    }

    .player_icon{
      vertical-align: middle;
      border-style: none;
      position: absolute;
      top: 42%;
      left: 42%;
      z-index: 999 !important;
      cursor: pointer;
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
      video{ 
        height:300px!important; 
        width:100%; 
        position:absolute; 
        z-index:999;
        left: 0;
        right: 0;
        background: black;
      }
      &__image{
        height:300px; 
        width:100%; 
        left: 0;
        right: 0;
      }
    }
    .player_icon{
      vertical-align: middle;
      border-style: none;
      position: absolute;
      top: 40%;
      left: 42%;
      z-index: 999 !important;
      cursor: pointer;
    }
    .preview-swiper {
      background: rgba(196, 196, 196, 0.1);
    }
    .preview-slide {
      margin-top: 20px;
      display: flex!important;
      height: 300px!important;
      width: 100%!important;
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