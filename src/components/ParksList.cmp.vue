<template>
  <section class="parksList" v-if="userLoc">
    <parkPrev v-for="nearestGarden in gardens" :park="nearestGarden" :key="nearestGarden.id"></parkPrev>
  </section>
</template>

<script>
import googleMapsService from "../services/googleMaps.service.js";
import dogsService from "../services/dogs.service";
import parkPrev from "../components/ParkPrev.cmp.vue" 

export default {
  name: "parkPreview",
  data() {
    return {
      distance: "",
      userLoc: null,
      gardens: []
    };
  },
  components: {
    parkPrev
  },
  created() {
    dogsService.getPosition().then(pos => {
      this.userLoc = {
        position: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      };
      googleMapsService.getInfo(this.userLoc.position).then(pos => {
        for (var i = 0; i < 3; i++) {
          this.gardens.push(pos[i]);
        }
      });
    });
  }
};
</script>
