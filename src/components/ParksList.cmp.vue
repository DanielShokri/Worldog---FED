<template>
  <section class="parksList" v-if="userLoc && gardens.length>0">
    <v-layout row wrap style="justify-content: space-between; padding:25px;">
      <div
        class="onlyDesk"
        v-for="nearestGarden in gardens"
        :key="nearestGarden.id"
        
      >
        <parkPrev style="margin-bottom: 20px;" :park="nearestGarden"></parkPrev>
    </div>

      <div class="onlyCell">
        <parkPrev @nextPark="plusDivs" style="margin: 0 auto;;" :park="parkToShow"></parkPrev>
      </div>
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
      photos: [],
      indexRoll: 0
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
                  console.log(this.gardens)
                });
            });
          });
      });
    });
  },
  computed: {
    parkToShow() {
      if (this.gardens.length > 0) return this.gardens[this.indexRoll];
    }
  },
  methods: {
    plusDivs(diff) {
      if (this.indexRoll >= 0 && this.indexRoll < 4) {
        if (diff === 1 && this.indexRoll === 3) {
          this.indexRoll = 0;
          this.parkToShow;
        } else if (diff === -1 && this.indexRoll === 0) {
          this.indexRoll = 3;
          this.parkToShow;
        } else {
          this.indexRoll += diff;
          this.parkToShow;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.hide {
  display: none;
}
.show {
  display: block;
}

.onlyDesk {
  display: block;
}

.onlyCell {
  display: none;
}

@media only screen and (max-width: 550px) {
  .onlyDesk {
    display: none;
  }

  .onlyCell {
    display: block;
  }
}
</style>