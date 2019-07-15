<template>
  <div>
    <section class="section">

      <div class="container">
        <h1 class="title">MeetHav</h1>
        <h2 class="subtitle">
          Meet new and intrensting dog's nearby
        </h2>
        
      </div>
    </section>

    <section class="hero is-primary">
      <div class="hero-body">
        <h1 class="parks-title">Nearby Parks</h1>
        <park-list></park-list>
        <div class="container"></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <UserListMap></UserListMap>
        <userLiList></userLiList>
      </div>
    </section>
  </div>
</template>

<script>
import UserListMap from "../components/UsersListMap.cmp";
import UserLiList from "../components/UserLiList.cmp";
import ParkList from "../components/ParksList.cmp.vue";

export default {
  name: "home",
  components: { UserListMap, ParkList, UserLiList },

  created() {
    this.$store.dispatch({ type: "loggedInUser" });
  }
};
</script>
<style scoped>
.hero-body {
  margin: 0 30px;
}
.home-section {
  padding: 0;
}
.home-section img{
  width: 100%;
}
</style>