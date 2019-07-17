<template>
  <div>
    <!-- <section class="section"> -->
    <!-- <div class="container"> -->
    <div>
      <img slot="img" src="../../public/img/home.svg" alt />
      <UsersFilter @setFilter="setFilter"></UsersFilter>
    </div>

    <section class="hero is-light is-bold">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Parks</h1>
        <park-list></park-list>
        <div class="container"></div>
      </div>
    </section>
    <section v-if="dogs" class="hero is-danger is-bold">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Dogs</h1>
        <dog-list :dogs="dogsToShow" @delete="deleteDog"></dog-list>
        <div class="container"></div>
      </div>
    </section>

    <!-- <section class="section"> -->
    <div class="container">
      <userLiList></userLiList>
    </div>
    <!-- </section> -->
  </div>
</template>

<script>
import UserListMap from "../components/UsersListMap.cmp";
import UserLiList from "../components/UserLiList.cmp";
import ParkList from "../components/ParksList.cmp.vue";
import DogList from "../components/DogList.cmp.vue";
import UsersFilter from "../components/UsersFilter.cmp";
export default {
  name: "home",

  created() {

    this.$store.dispatch({ type: "loggedInUser" })
    this.$store.dispatch({ type: "loadDogs" }).then(() => {
      this.$store.dispatch({ type: "loadUserLoc" }).then(() => {
        this.$store.dispatch({ type: "loadSortDogs" }).then(() => {
          this.dogs = this.$store.getters.dogsToShow;
        });
      });
    });
  },
    data() {
    return {
      dogs: null,
    };
  },
  computed: {
    dogsToShow() {
      var newDogs = [this.dogs[0],this.dogs[1],this.dogs[2],this.dogs[3]]
      return newDogs;
    
    }
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
  components: { UserListMap, ParkList, UserLiList, UsersFilter, DogList }
};
</script>
<style scoped>
h1 {
  font-size: 20px;
  text-align: left;
  padding-left: 28px;
}
.hero-body {
  margin: 0 30px;
}
.home-section {
  padding: 0;
}
.home-section img {
  width: 100%;
}
.home-header {
  background-image: url("../../public/img/home.svg");
}
</style>