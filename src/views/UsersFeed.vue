
<template>
  <section v-if="dogs">
<UsersFilter @setFilter="setFilter"></UsersFilter>
  <dog-list :loggedinUser="loggedinUser" :dogs="dogs" @delete="deleteDog"></dog-list>
  </section>
</template>

<script>
import dogList from "../components/DogList.cmp.vue";
  import UsersFilter from "../components/UsersFilter.cmp";

export default {

  data() {
    return {
    
    };
  },
  created() {
         this.$store.dispatch({ type: "loadCompInProfile" , comp: "gallery"} )

    this.$store.dispatch({ type: "loggedInUser" });
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: "loadDogs", filterBy });
    },
    deleteDog(dogId) {
      this.$store.dispatch({
        type: "deleteDog",
        dogId
      });
    }
  },

  computed: {
    loggedinUser() {
      if(!this.$store.getters.getcurrLoggedinUser) return
      return this.$store.getters.getcurrLoggedinUser[0];
    },
  
     dogs() {
      const dogs = this.$store.getters.dogsToShow;
      if(!this.loggedinUser) return dogs
      else{
        const dogsToShow = dogs.filter(dog => dog._id !== this.loggedinUser._id);
        return dogsToShow;
      }
    }
  },
  components: {
    dogList,
     UsersFilter
  }
};
</script>

<style scoped>
</style>





