<template>
  <v-app>
    <v-content>
      <app-header></app-header>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import socket from "./services/socket.service.js";
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    socket.on("friend req sent", user => {
      console.log("Listen to emit");
      this.$toast.open({
        message: `You have got freind request from ${user}`,
        type: "is-success"
      });
    });
    this.$store.dispatch({ type: "loggedInUser" });
  }
};
</script>


<style lang="scss">
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
