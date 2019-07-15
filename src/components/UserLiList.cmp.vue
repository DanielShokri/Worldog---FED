<template>
  <section class="userLiList" v-if="dogs">

     <ul>
      <li v-for="dog in dogs" :key="dog._id">{{dog.owner.fullName}}</li>
     </ul>
  </section>
</template>

<script>
import dogsService from "../services/dogs.service";
import googleMapsService from "../services/googleMaps.service.js";

export default {
  name: "usersList",
  data() {
    return {
      userLoc: null,
      dogs: null,
      dogsList: null
    };
  },
  computed: {},
  methods: {},
  components: {},
  created() {
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.dogs = this.$store.getters.dogsToShow;
          console.log(this.dogs)
        });
      });
    });

    // .then(() => {
    //   this.dogs = this.$store.getters.dogsToShow;
    // });
    // dogsService.getPosition().then(pos => {
    //   this.userLoc = {
    //     position: {
    //       lat: pos.coords.latitude,
    //       lng: pos.coords.longitude
    //     }
    //   };
    // });
  }
};
</script>