<template>
  <section class="parksList" v-if="userLoc" style="mar">
    <v-layout row wrap>
      <v-flex xs12 sm6 mb4 lg3 v-for="nearestGarden in gardens" :key="nearestGarden.id">
        <parkPrev style="margin-bottom: 20px;" :park="nearestGarden"></parkPrev>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import googleMapsService from "../services/googleMaps.service.js";
import dogsService from "../services/dogs.service";
import parkPrev from "../components/ParkPrev.cmp.vue";

export default {
  name: "parksList",
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
        for (var i = 0; i < 4; i++) {
          this.gardens.push(pos[i]);
          this.photos.push(this.gardens[i].photos[0].photo_reference);
          this.gardens[
            i
          ].img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.gardens[i].photos[0].photo_reference}&key=AIzaSyCrVxVPta_TOsFatlYL7vOx_stAJNlV8ws`;
        }
        var parking = JSON.parse(JSON.stringify(this.gardens));
        this.$store
          .dispatch({ type: "loadParks", gardens: parking })
          .then(() => {
            this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
              this.$store
                .dispatch({ type: "loadParksLocFromUser" })
                .then(() => {
                  this.gardens = this.$store.getters.getParks;
                });
            });
          });
      });
    });
  },
  computed: {}
};
</script>


<style>
</style>