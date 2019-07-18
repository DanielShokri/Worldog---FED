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
import io from "socket.io-client";
const socket = io("http://localhost:3000");

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
    this.$store.dispatch({ type: "loggedInUser" });
  },
  updated() {
    console.log(this.$store.getters.getcurrLoggedinUser)
    if (!this.$store.getters.getcurrLoggedinUser[0]) return;
    else {
      socket.on("friend req sent", user => {
        console.log("Listen to emit");
        this.$toast.open({
          message: `You have got freind request from ${user.owner.fullName}`,
          type: "is-success"
        });
      });
    }
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
