
<template>
  <section v-if="dogs">
    <dog-list :loggedinUser="loggedinUser" :dogs="dogs" @delete="deleteDog"></dog-list>
  </section>
</template>

<script>
import dogList from "../components/DogList.cmp.vue";

export default {
  data() {
    return {
      newDog: {
        name: ""
      }
    };
  },
  created() {
    this.$store.dispatch({ type: "loggedInUser" });
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
    loggedinUser() {
      if(!this.$store.getters.getcurrLoggedinUser) return
      console.log("loggedinUser", this.$store.getters.getcurrLoggedinUser[0]);
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
    dogList
  }
};
</script>

<style scoped>
</style>





