
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img src="https://i.ibb.co/n8DtFs5/logo.png" width="160" height="28" />

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>

        <router-link class="navbar-item" to="/user">Users</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="/signup">
              <strong>Sign up</strong>
            </router-link>
            <button class="button is-light" @click="cardModal()">Login</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- <router-link to="/">Home</router-link>
        <router-link to="/signup">Signup</router-link>
        <router-link to="/user">Users Feed</router-link>
  -->
</template>

<script>
import Login from './Login'
export default {
  data() {
    return {
      user: {
        name: '',
        pass: ''
      }
    }
  },
  methods: {
    cardModal() {
      this.$modal.open({
        parent: this,
        component: Login,
        hasModalCard: true,
        customClass: "custom-class custom-class-2"
      });
    },
    loginUser(){
      console.log(this.user)
      this.$store.dispatch({ type: "userLogin", user });
    }
  }
};
</script>