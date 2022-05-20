<template>

  <div class="loading-overlay d-flex justify-center align-center" v-if="loading"> 
      <div class="loading-spinner"></div>
  </div>
  
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  z-index: 10;
  font-family: sans-serif;
}
.loading-overlay {
  background: rgba(255, 255, 255, 0.822);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999!important;
  align-items: center;
  justify-content: center;
  display: flex;
}
.loading-spinner {
    position: fixed;
    left: 50%;
    transform: translate(-50%,-50%) translateZ(0);
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 1;
    background: url('@/assets/img/icons/android-chrome-512x512.png');
     background-size: contain;
	  /*animation: spinning 1.5s infinite ease-in-out;*/
}

.loading-spinner:after {
	content:"";
	position:absolute;
	width:80px;
	height:80px;
	background-color:rgba(0,0,0,0);
	border-radius:100%;
	margin:-15px;
	box-shadow: 0 4px 0 0 #15577C;
	transition: all 1s linear;
	animation: lds-eclipse 1s linear infinite;
}



@keyframes spinning {
	0% { transform: translate(-50%,-50%) scale(1) translateZ(0);}
	50% { transform: translate(-50%,-50%) scale(1.1) translateZ(0);}
	100% { transform: translate(-50%,-50%) scale(1) translateZ(0);}
}

@keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
