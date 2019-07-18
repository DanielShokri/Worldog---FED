<template>
  <form @submit.prevent="loginUser">
    <div class="modal-card" style="min-width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input
            ref="username"
            v-model="user.name"
            type="text"
            placeholder="Your username"
            required
          ></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="user.pass"
            type="password"
            password-reveal
            placeholder="Your password"
            required
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");
export default {
  data() {
    return {
      user: {
        name: "",
        pass: ""
      }
    };
  },
  mounted() {
    this.$refs.username.focus();
  },
  created() {},
  methods: {
    loginUser() {
      this.$store
        .dispatch({ type: "userLogin", currUser: this.user })
        .then(() => {
          socket.on("friend req sent", user => {
            console.log("Listen to emit");
            this.$toast.open({
              message: `You have got freind request from ${user.owner.fullName}`,
              type: "is-success"
            });
          });
          this.$toast.open({
            message: "Login Successfully!",
            type: "is-success"
          });
          this.$emit("close");
        })
        .catch(err => {
          this.$toast.open({ message: "Login Failed!", type: "is-danger" });
          this.$emit("close");
        });
    }
  }
};
</script>