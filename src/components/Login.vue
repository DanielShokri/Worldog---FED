<template>
  <form @submit.prevent="loginUser">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input v-model="user.name" type="text" placeholder="Your username" required></b-input>
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
export default {
  data() {
    return {
      user: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch({ type: "userLogin", currUser: this.user });
    }
  }
};
</script>