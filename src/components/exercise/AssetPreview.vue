<template>
    <video-embed :params="{sandbox : 'allow-popups'}" ref="myVideo" css="embed-responsive-1by1" class="exercise-video" v-if="asset_type == 'video'" :src="url"></video-embed>
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