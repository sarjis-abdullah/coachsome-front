<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // The location of Uluru
      const uluru = { lat: -25.344, lng: 131.036 };
      // The map, centered at Uluru
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru
      });
      // The marker, positioned at Uluru
      const marker = new window.google.maps.Marker({
        position: uluru,
        map: map
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
  width: 100%;
  /* The width is the width of the web page */
}
</style>
