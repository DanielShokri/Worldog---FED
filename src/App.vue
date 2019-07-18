<template>
  <v-app>
    <v-content>
      <app-header></app-header>
      <chat v-if="isChatOpen"></chat>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
<<<<<<< HEAD
import io from "socket.io-client";
const socket = io("http://localhost:3000");
=======
import socket from "./services/socket.service.js";
import chat from "./components/chat.cmp.vue";

>>>>>>> 427e0576c1bc7ea3291dacad36b9bf3c1f5dd634
export default {
  components: {
    AppHeader,
    chat
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
  },
  computed: {
    isChatOpen() {
      return this.$store.getters.isChatOpen;
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
