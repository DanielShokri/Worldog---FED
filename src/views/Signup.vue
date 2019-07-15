<template>
  <div class="page-wrapper bg-red p-t-180 p-b-100 font-robo">
    <div class="wrapper wrapper--w960">
      <div class="card card-2">
        <div class="card-heading"></div>
        <div class="card-body">
          <h2 class="title">Registration</h2>

          <v-form @submit.prevent="saveUser" id="signup-form">
            <v-text-field v-model="user.username" :rules="nameRules" label="Username" required></v-text-field>
            <v-text-field
              v-model="user.password"
              name="input-10-2"
              label="Password"
              type="password"
              class="input-group--focused"
            ></v-text-field>
            <v-btn color="dark" type="submit" form="signup-form">Register</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      valid: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      email: ""
    };
  },
  methods: {
    async saveUser() {
      let user = this.user;
      try {
        const signupUser = await this.$store.dispatch({type: "userSignup", user});
        this.$toast.open({message: "Register Successfully!",type: "is-success"});
        this.$router.push('/')
        return signupUser;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
@import "../../public/css/main.css";
</style>