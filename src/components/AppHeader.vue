
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <img
        class="logo"
        @click="goHome"
        src="https://i.imgur.com/d7kCfoE.png"
        width="170"
        height="100"
      />
      <!-- https://i.ibb.co/n8DtFs5/logo.png -->
      <a
        v-on:click="toggleNav"
        role="button"
        class="navbar-burger burger"
        v-bind:class="{ 'is-active': isActive}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active': isActive}">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/user">Users</router-link>
      </div>
      <div class="navbar-end">
      <div v-if="getUser === null">
        <div class="navbar-item">
          <div class="buttons" style="justify-content: center;">
            <router-link class="button is-primary" to="/signup">
              <strong>Sign up</strong>
            </router-link>
            <button class="button is-light" @click="cardModal()">Login</button>
          </div>
        </div>
      </div>
      <div v-if="getUser !== null" class="navbar-menu" v-bind:class="{ 'is-active': isActive}">
          <b-dropdown position="is-bottom-left" aria-role="menu">
            <a class="navbar-item" slot="trigger" role="button">
              <v-badge left>
                <template v-slot:badge>
                  <span v-if="getNotfications">{{getNotfications.length}}</span>
                </template>
              </v-badge>
              <span>Menu</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item custom aria-role="menuitem">
              Logged as
              <b>{{getUser.owner.fullName}}</b>
            </b-dropdown-item>
            <b-dropdown-item @click="goToMyNotfication" aria-role="menuitem">
              <b-icon icon="bell"></b-icon>Notification's
            </b-dropdown-item>
            <b-dropdown-item @click="goToMyProfile" value="settings">
              <b-icon icon="settings"></b-icon>Profile
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="menuitem" />
            <b-dropdown-item value="logout" @click="userLogout" aria-role="menuitem">
              <b-icon icon="logout"></b-icon>Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
        </div>
      </div>
  </nav>
</template>

<script>
import Login from "./Login";
export default {
  data() {
    return {
      isActive: false,
      user: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    },
    goHome() {
      this.$router.push("/");
    },
    goToMyNotfication() {
      this.$store.dispatch({ type: "loadCompInProfile", comp: "Notfication" });
      this.$router.push(`/user/${this.getUser._id}`);
    },
    goToMyProfile() {
      this.$store.dispatch({ type: "loadCompInProfile", comp: "Gallery" });

      this.$router.push(`/user/${this.getUser._id}`);
    },
    cardModal() {
      this.$modal.open({
        parent: this,
        component: Login,
        hasModalCard: true,
        customClass: "custom-class custom-class-2"
      });
    },
    userLogout() {
      this.$store.dispatch({ type: "userLogout" }).then(() => {
        this.$toast.open({
          message: "You have logout",
          type: "is-danger",
          duration: 2000
        });
      });
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getcurrLoggedinUser;
    },
    getNotfications() {
      return this.$store.getters.getNotfications;
    }
  }
};
</script>


<style scope>
.logo:hover {
  cursor: pointer;
}
.buttons{
  justify-content: center;
}
/* .navbar-menu{
  display: block;
} */
</style>