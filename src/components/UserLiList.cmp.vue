<template>
  <section class="userLiList" v-if="dogs && userLoc">
    <h1>{{dogsSortDistance}}</h1>
    <ul>
      <li v-for="dog in dogs" :key="dog._id">{{dog.owner.fullName}}</li>
    </ul>
  </section>
</template>

<script>
import dogsService from "../services/dogs.service";
import googleMapsService from "../services/googleMaps.service.js";

export default {
  name: "usersMap",
  data() {
    return {
      userLoc: null,
      dogs: null,
      dogsList: null
    };
  },
  computed: {
    userLocation() {
      return this.userLoc;
    },
    dogsSortDistance() {
      var x = [];
      for (var i = 0; i < this.dogs.length; i++) {
        x.push(this.dogs[i].location.lat + "," + this.dogs[i].location.lng);
      }
      x = x.join("|");
      console.log(x);

      googleMapsService
        .getDist({
          userLoc: this.userLoc.position.lat + "," + this.userLoc.position.lng,
          usersLoc: x
        })
        .then(res => {
          console.log(res.elements);
          for (var i = 0; i < this.dogs.length; i++) {
            this.dogs[i].distanceText = res.elements[i].distance.text;
            this.dogs[i].distanceValue = res.elements[i].distance.value;
          }
        });
      return "";
    }
  },
  methods: {},
  components: {},
  created() {
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.dogs = this.$store.getters.dogsToShow;
    });
    dogsService.getPosition().then(pos => {
      this.userLoc = {
        position: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      };
    });
  }
};
</script>