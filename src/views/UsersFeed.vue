
<template>
  <section v-if="dogs">

    <!-- <toy-filter @set-filter="setFilter"></toy-filter> -->

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
    this.$store.dispatch({
      type: "loadDogs"
    });
    this.$store.dispatch({ type: "loggedInUser" });
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
    loggedinUser() {
      console.log("loggedinUser", this.$store.getters.getcurrLoggedinUser);
      return this.$store.getters.getcurrLoggedinUser;
    },
    dogs() {
      return this.$store.getters.dogsToShow;
    }
  },
  components: {
    dogList
    // toyFilter,
  }
};
</script>

<style scoped>
</style>





