
<template>
  <section v-if="dogs && loggedinUser" >
    <!-- <v-btn  color="indigo" class="btn-add-dog"> -->
    <!-- <router-link :to="'user/edit'">Add Dog</router-link> -->
    <!-- </v-btn> -->

    <!-- <toy-filter @set-filter="setFilter"></toy-filter> -->
<<<<<<< HEAD

    <dog-list :loggedinUser="loggedinUser" :dogs="dogs" @delete="deleteDog"></dog-list>
=======
    
    <dog-list :dogs="dogs" @delete="deleteDog"></dog-list>

>>>>>>> 0bdbb19cf539365ba44ade02250be171cccfa57f
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
<<<<<<< HEAD
    this.$store.dispatch({
      type: "loadDogs"
    });
    this.$store.dispatch({ type: "loggedInUser" });
    // this.user =
  },
  methods: {
    // setFilter(filterBy) {
    //   this.$store.commit("setFilter", filterBy);
    // },

=======
    // this.$store.dispatch({
    //   type: "loadDogs"
    // });
    this.user = this.$store.getters.getLoggedinUser
  },
  methods: {
>>>>>>> 0bdbb19cf539365ba44ade02250be171cccfa57f
    deleteDog(dogId) {
      this.$store.dispatch({
        type: "deleteDog",
        dogId
      });
    }
  },

  computed: {
    loggedinUser() {
      console.log("login user", this.$store.getters.getcurrLoggedinUser);
      return this.$store.getters.getcurrLoggedinUser;
    },
    dogs() {
      return this.$store.getters.dogsToShow;
    }
  },
  components: {
<<<<<<< HEAD
    dogList
    // toyFilter,
=======
    dogList,
>>>>>>> 0bdbb19cf539365ba44ade02250be171cccfa57f
  }
};
</script>

<style scoped>
</style>





