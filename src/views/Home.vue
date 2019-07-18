<template>
  <div>
    <div>
      <img slot="img" src="../../public/img/home.svg" alt />
      <UsersFilter @setFilter="setFilter"></UsersFilter>
    </div>
    <!-- <bla2></bla2> -->
    <section class="hero is-light is-bold">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Parks</h1>
        <park-list></park-list>
      </div>
    </section>
    <section v-if="dogs" class="hero is-danger is-bold">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Dogs</h1>
        <dog-list :dogs="dogsToShow" @delete="deleteDog"></dog-list>
        <h1 v-on:click="seeMore" class="see-more">See More <b-icon class="icon" icon="chevron-right"></b-icon></h1>
        
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
import bla2 from "../components/bla2";
export default {
  name: "home",

  created() {
     this.$store.dispatch({ type: "loadCompImProfile" , comp: "gallery"} )
    this.$store.dispatch({ type: "loggedInUser" });
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
      dogs: null
    };
  },
  computed: {
    dogsToShow() {
      var newDogs = [this.dogs[0], this.dogs[1], this.dogs[2], this.dogs[3]];
      return newDogs;
    }
  },
  methods: {
  seeMore(){
    console.log('push')
     this.$router.push('/user')

  },
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
  components: { UserListMap, ParkList, UserLiList, UsersFilter, DogList, bla2 }
};
</script>
<style scoped lang="scss">
h1 {
     font-size: 24px;
    text-align: left;
    padding-left: 28px;
    display: flex;
    align-items: center;
.icon{
  font-size: 30px;
}
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
h1:hover{
cursor: pointer;
}
</style>