
<template>
  <section v-if="dogs">
    <v-btn  color="indigo" class="btn-add-dog">
      <router-link :to="'/add-dog'">Add Dog</router-link>
    </v-btn>

    <!-- <toy-filter @set-filter="setFilter"></toy-filter> -->

    <dog-list :dogs="dogs" @delete="deleteDog"></dog-list>

    
    
  </section>
</template>

<script>
import dogList from "../components/DogList.cmp.vue";
// import toyFilter from "../components/toy-filter.vue";

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
    this.$store.dispatch({
      type: "loadDogs"
    });
    this.user = this.$store.getters.getLoggedinUser
  },
  methods: {
   
    // setFilter(filterBy) {
    //   this.$store.commit("setFilter", filterBy);
    // },

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
    // toyFilter,
    
  }
};
</script>

<style scoped>

</style>





