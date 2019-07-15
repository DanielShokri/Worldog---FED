<template>
  <!-- <section class="parksList" v-if="userLoc"> -->
  <v-layout row wrap style="justify-content: space-evenly;">
    <v-flex style="max-width: 30rem;" xs12 sm6 mb4 lg3  v-for="nearestGarden in gardens" :key="nearestGarden.id">
      <parkPrev :park="nearestGarden"></parkPrev>
    </v-flex>
  </v-layout>
  <!-- </section> -->
</template>

<script>
import googleMapsService from "../services/googleMaps.service.js";
import dogsService from "../services/dogs.service";
import parkPrev from "../components/ParkPrev.cmp.vue";

export default {
  name: "parkPreview",
  data() {
    return {
      distance: "",
      userLoc: null,
      gardens: [],
      photos: []
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
          this.photos.push(this.gardens[i].photos[0].photo_reference);
          this.gardens[i].img = (`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            this.gardens[i].photos[0].photo_reference
          }&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`)
        }
      });
    });
  },
  computed: {
    // getImg() {
    //   if (this.photos.length > 0)
    //     return [
    //       `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
    //         this.photos[0]
    //       }&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`,
    //       `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
    //         this.photos[1]
    //       }&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`,
    //       `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
    //         this.photos[2]
    //       }&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`
    //     ];
    // }
  }
};
</script>


<style>
.park-list {
  width: 100%;
}
</style>