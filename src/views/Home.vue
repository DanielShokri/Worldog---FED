<template>
  <div>
    <!-- <section class="section"> -->
    <!-- <div class="container"> -->
    <div>
      <img slot="img" src="../../public/img/home.svg" alt />
      <UsersFilter @setFilter="setFilter"></UsersFilter>
    </div>

    <section class="hero is-danger is-bold">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Parks</h1>
        <park-list></park-list>
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
import UsersFilter from "../components/UsersFilter.cmp";
export default {
  name: "home",
  components: { UserListMap, ParkList, UserLiList, UsersFilter },

  created() {
    this.$store.dispatch({ type: "loggedInUser" });
  },
  methods: {
    setFilter(filterBy){
      // console.log('This is home filter', filterBy)
      this.$store.dispatch({ type: 'loadDogs', filterBy })
    }
  },
};
</script>
<style scoped>
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