<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">MeetHav</h1>
        <h2 class="subtitle">
          Meet new and intrensting dog's nearby
          <!-- <strong>sections</strong>, like the one you're currently reading -->
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
import UserLiList from "../components/UserLiList.cmp"
import ParkList from "../components/ParksList.cmp.vue"

export default {
  name: "home",
  components: { UserListMap,ParkList, UserLiList  },

  created() {
    this.$store.dispatch({ type: "loggedInUser" })
  }
};
</script>
<style scoped>
/* .hero-body {
  height: 300px;
}
.parks-title {
  width: 148px;
  height: 50px;
} */
</style>