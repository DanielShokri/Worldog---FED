
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
      return this.$store.getters.getcurrLoggedinUser;
    },
    dogs() {
      return this.$store.getters.dogsToShow;
    }
  },
  components: {
    dogList
  }
};
</script>

<style scoped>
</style>





