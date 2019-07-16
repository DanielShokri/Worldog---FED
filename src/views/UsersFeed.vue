
<template>
  <section v-if="dogs">
    <!-- <v-btn  color="indigo" class="btn-add-dog"> -->
      <!-- <router-link :to="'user/edit'">Add Dog</router-link> -->
    <!-- </v-btn> -->

    <!-- <toy-filter @set-filter="setFilter"></toy-filter> -->
    
    <dog-list :dogs="dogs" @delete="deleteDog"></dog-list>

  </section>
</template>

<script>
import dogList from "../components/DogList.cmp.vue";

export default {
  data() {
    return {
      newDog: {
        name: "",
       
      },
      user:{
      },
    };
  },
  created() {
    // this.$store.dispatch({
    //   type: "loadDogs"
    // });
    this.user = this.$store.getters.getLoggedinUser
  },
  methods: {
    deleteDog(dogId) {
      this.$store.dispatch({
        type: "deleteDog",
        dogId
      });
    }
  },

  computed: {
    dogs() {
      return this.$store.getters.dogsToShow;
    }
  },
  components: {
    dogList,
  }
};
</script>

<style scoped>

</style>





