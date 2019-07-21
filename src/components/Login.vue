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
import socket from '../services/socket.service.js'

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
        .then((res) => {
          socket.emit("user login", this.$store.getters.getcurrLoggedinUser[0]._id);
          this.$toast.open({
            message: "Login Successfully!",
            type: "is-success",
            duration: 2000
          });
          this.$emit("close");
        })
        .catch(err => {
          this.$toast.open({ message: "Login Failed!", type: "is-danger",duration: 2000 });
          this.$emit("close");
        });
    }
  }
};
</script>